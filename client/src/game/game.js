// import packages
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useSwipeable } from 'react-swipeable';
import { FixedSizeList } from 'react-window';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Box, Grid, Card, CardContent, Button, Typography, CardActions, List, ListItem, ButtonGroup } from '@mui/material';

// import modules
import { CREATE_MAP, ADD_ENTITY, MOVE, HEAL, REMOVE_ENTITY, RESET_STATE, DAMAGE, GAIN_XP, LOAD_STATE, LEVEL_UP, INCREASE_FLOOR, GAIN_COINS, GAIN_STATS, SPEND_COINS, ADD_TO_LOG } from '../utils/actions';
import Entity from './entity';
import Auth from '../utils/auth';
import { getMe, saveState } from '../utils/api';

function Game() {

  // set up state
  const [mapDisplay, setMapDisplay] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const windowWidth = window.innerWidth;

  // create a map based on window size
  function generateMap() {
    const mapWidth = (windowWidth < 700) ? Math.floor(windowWidth / 15) : 50;
    const mapHeight = (windowWidth < 700) ? Math.floor(windowWidth / 15) : 50;
    dispatch({
      type: CREATE_MAP,
      payload: { width: mapWidth, height: mapHeight }
    });
    addToLog("New map generated");
  }

  // find a random free tile in the map
  function getFreeTile() {
    const randNum = Math.floor(Math.random() * Object.keys(state.map.freeTiles).length);
    const key = Object.keys(state.map.freeTiles).splice(randNum, 1)[0];
    return key;
  }

  // function for calculating stats
  function calculateStats(base, level) {
    return Math.floor(((2 * base * level) / 30) + level);
  }

  // funciton for calculating level based on xp
  function calculateLevel(xp) {
    return Math.floor((xp ** 0.5) / 3);
  }

  // spawn player at a random free tile
  function spawnPlayer() {
    const key = getFreeTile();
    const freeTile = state.map.freeTiles[key];
    const player = {
      x: freeTile.x,
      y: freeTile.y,
      tileClass: 'player',
      entityName: 'player',
      attributes: {
        health: state.entities.player.attributes.health,
        damage: state.entities.player.attributes.damage,
        xp: state.entities.player.attributes.xp,
        level: state.entities.player.attributes.level,
        coins: state.entities.player.attributes.coins,
        bonusDamage: state.entities.player.attributes.bonusDamage,
        bonusArmor: state.entities.player.attributes.bonusArmor,
      }
    };
    dispatch({
      type: ADD_ENTITY,
      payload: player
    });
    addToLog("Player spawned");
  }

  // populate the map with health, enemies, and the exit
  function populateMap() {
    // generate 1-4 health entities on the map
    const numHealth = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numHealth; i++) {
      const freeTile = state.map.freeTiles[getFreeTile()];
      const newHealth = {
        x: freeTile.x,
        y: freeTile.y,
        tileClass: 'health',
        entityName: 'health' + i,
        attributes: {
          healValue: 20
        }
      };
      dispatch({
        type: ADD_ENTITY,
        payload: newHealth
      });
    }

    // generate 2-6 enemy entities on the map with health/damage based on floor #
    const numEnemy = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < numEnemy; i++) {
      const freeTileKey = getFreeTile();
      const freeTile = state.map.freeTiles[freeTileKey];
      const baseHealth = calculateStats(60, state.floor) + 10;
      const healthVariance = Math.floor(Math.random() * (baseHealth / 10) - (baseHealth / 20));
      const baseDamage = calculateStats(15, state.floor) + 5;
      const damageVariance = Math.floor(Math.random() * (baseDamage / 10) - (baseDamage / 20));
      const newEnemy = {
        x: freeTile.x,
        y: freeTile.y,
        tileClass: 'enemy',
        entityName: 'enemy' + i,
        attributes: {
          health: baseHealth + healthVariance,
          damage: baseDamage + damageVariance
        }
      };
      dispatch({
        type: ADD_ENTITY,
        payload: newEnemy
      });
    }

    // generate an exit entity
    {
      let freeTile = state.map.freeTiles[getFreeTile()];
      const newExit = {
        x: freeTile.x,
        y: freeTile.y,
        tileClass: 'exit',
        entityName: 'exit',
        attributes: {}
      };
      dispatch({
        type: ADD_ENTITY,
        payload: newExit
      });
    }
    addToLog("Map populated");
  }

  // handle arrow key presses
  const handleKeyPress = _.throttle((e) => {
    let vector;
    switch (e.code) {
      case 'ArrowLeft':
        vector = { x: -1, y: 0 };
        break;
      case 'ArrowUp':
        vector = { x: 0, y: -1 };
        break;
      case 'ArrowRight':
        vector = { x: 1, y: 0 };
        break;
      case 'ArrowDown':
        vector = { x: 0, y: 1 };
        break;
      default:
        break;
    }
    if (vector) {
      e.preventDefault();
      handleMove(vector);
    }
  }, 100);

  // handle swipes
  function handleSwipe(e) {
    let vector;
    switch (e.dir) {
      case 'Left':
        vector = { x: -1, y: 0 };
        break;
      case 'Up':
        vector = { x: 0, y: -1 };
        break;
      case 'Right':
        vector = { x: 1, y: 0 };
        break;
      case 'Down':
        vector = { x: 0, y: 1 };
        break;
      default:
        break;
    }
    if (vector) {
      handleMove(vector);
    }
  }

  // logic for movement and interactions
  function handleMove(vector) {
    const player = state.entities.player;
    const map = state.map;
    // calculate new coords based on vector
    const newCoords = {
      x: player.x + vector.x,
      y: player.y + vector.y
    };

    // check if in the map and the newCoords aren't a wall
    if (_.inRange(newCoords.x, 0, map.width) &&
      _.inRange(newCoords.y, 0, map.height) &&
      map.map[newCoords.x][newCoords.y].tileClass !== 'wall') {
      // check if the new coords are an entity
      let newEntity;
      if (map.map[newCoords.x][newCoords.y] instanceof Entity) {
        newEntity = state.entities[map.map[newCoords.x][newCoords.y].entityName];
      }

      // move if the newCoords aren't an entity or wall
      if (!newEntity) {
        dispatch({
          type: MOVE,
          payload: {
            entity: player,
            vector: vector
          }
        });

        /* THIS IS VERY INEFFICIENT - IT RERENDERS THE WHOLE GAME FOR EVERY MOVE*/
        /* FIX THIS LATER SO IT ONLY REDRAWS THE ELEMENTS THAT CHANGED */
        setMapDisplay(state.map.drawMap());
        return;
      }

      // switch case for different entity types
      switch (newEntity.tileClass) {
        // move player, heal player, and remove health entity
        case 'health':
          dispatch({
            type: MOVE,
            payload: {
              entity: player,
              vector: vector
            }
          });
          dispatch({
            type: HEAL,
            payload: { healValue: newEntity.attributes.healValue }
          });
          dispatch({
            type: REMOVE_ENTITY,
            payload: { entityName: newEntity.entityName }
          });
          addToLog(`Gained ${newEntity.attributes.healValue} health!`);
          break;
        // calculate damage and health values and update player/enemy values
        // gain coins and xp based on floor level
        case 'enemy': {
          const playerHealth = player.attributes.health;
          const playerDamage = player.attributes.damage + player.attributes.bonusDamage;
          const enemyHealth = newEntity.attributes.health;
          let enemyDamage = newEntity.attributes.damage - player.attributes.bonusArmor;
          if (enemyDamage < 0) { enemyDamage = 0; };
          dispatch({
            type: DAMAGE,
            payload: {
              entityName: newEntity.entityName,
              dmgValue: playerDamage
            }
          });
          addToLog(`Dealt ${playerDamage} damage to ${newEntity.entityName} (Current health: ${state.entities[newEntity.entityName].attributes.health})`);
          dispatch({
            type: DAMAGE,
            payload: {
              entityName: 'player',
              dmgValue: enemyDamage
            }
          });
          addToLog(`Recieved ${enemyDamage} damage from ${newEntity.entityName}`);
          // check if enemy lived
          if (enemyHealth > playerDamage) {
            // check if player died
            if (enemyDamage >= playerHealth) {
              toast.error("YOU DIED");
              reset();
              window.location.reload();
              return;
            }
          } else {
            dispatch({
              type: MOVE,
              payload: {
                entity: player,
                vector: vector
              }
            });
            dispatch({
              type: REMOVE_ENTITY,
              payload: { entityName: newEntity.entityName }
            });
            const baseXP = Math.floor((5 * (state.floor) ** 2 + 5));
            const xpVariance = Math.floor(Math.random() * (baseXP / 5) - (baseXP / 10));
            dispatch({
              type: GAIN_XP,
              payload: { value: baseXP + xpVariance }
            });
            addToLog(`Gained ${baseXP + xpVariance} XP`);
            dispatch({
              type: LEVEL_UP,
              payload: {
                stats: calculateStats,
                level: calculateLevel
              }
            });
            const baseCoins = Math.floor((2 * (state.floor) ** 1.5 + 5));
            const coinVariance = Math.floor(Math.random() * (baseCoins / 5) - (baseCoins / 10));
            dispatch({
              type: GAIN_COINS,
              payload: { coins: baseCoins + coinVariance }
            });
            addToLog(`Gained ${baseCoins + coinVariance} coins`);
          }
          break;
        }
        // increase floor and reset map
        case 'exit': {
          dispatch({
            type: INCREASE_FLOOR
          });
          generateMap();
          spawnPlayer();
          populateMap();
          setMapDisplay(state.map.drawMap());
          addToLog(`Enter floor ${state.floor}`);
          break;
        }
        default:
          break;
      }
      setMapDisplay(state.map.drawMap());
      return;
    }
  }

  // handle spend coins buttons
  function handleSpending(e) {
    const action = e.target.id;
    switch (action) {
      case 'heal': {
        if (state.entities.player.attributes.coins < 10) {
          toast.error("Not enough coins");
          return;
        }
        dispatch({
          type: HEAL,
          payload: { healValue: 20 }
        });
        dispatch({
          type: SPEND_COINS,
          payload: { coins: 10 }
        });
        break;
      }
      case 'damage': {
        if (state.entities.player.attributes.coins < 20) {
          toast.error("Not enough coins");
          return;
        }
        dispatch({
          type: GAIN_STATS,
          payload: { stat: 'damage', value: 1 }
        });
        dispatch({
          type: SPEND_COINS,
          payload: { coins: 20 }
        });
        break;
      }
      case 'armor': {
        if (state.entities.player.attributes.coins < 20) {
          toast.error("Not enough coins");
          return;
        }
        dispatch({
          type: GAIN_STATS,
          payload: { stat: 'armor', value: 1 }
        });
        dispatch({
          type: SPEND_COINS,
          payload: { coins: 20 }
        });
        break;
      }
      default:
        break;
    }
    setMapDisplay(state.map.drawMap());
  }

  // handle save button
  async function handleSave() {
    if (!Auth.loggedIn()) {
      toast.error("Please log in to save");
    }
    try {
      const response = await saveState({
        _id: Auth.getProfile().data._id,
        saveState: state
      });
      const data = response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success("Your data is saved!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle loading state
  async function loadState() {
    const response = await getMe(Auth.getToken());
    const data = await response.json();
    if (!data.saveState) {
      return false;
    }
    dispatch({ type: LOAD_STATE, payload: { state: data.saveState } });
    return true;
  }

  // handle load button
  async function handleLoad() {
    if (Auth.loggedIn()) {
      const hasState = await loadState();
      if (!hasState) {
        toast.warn("No save data found");
        return;
      }
      setMapDisplay(state.map.drawMap());
    } else {
      toast.error("Please log in to load data");
    }
  }

  // reset map
  function reset() {
    dispatch({ type: RESET_STATE });
    generateMap();
    spawnPlayer();
    populateMap();
    setMapDisplay(state.map.drawMap());
  }

  // start game when Game component is loaded
  useEffect(() => {
    reset();
  }, []);

  // set up swipe handlers
  const swipeHandlers = useSwipeable({
    onSwiped: handleSwipe,
    preventScrollOnSwipe: true
  });

  // add a new message to the game log
  function addToLog(msg) {
    dispatch({
      type: ADD_TO_LOG,
      payload: { msg }
    });
  }

  // render game log row
  function renderLogRow(props) {
    const { index, style } = props;
    return (<ListItem style={style} key={index} sx={{ border: '1px solid lightgray', borderRadius: '5px', backgroundColor: 'white' }}>{state.history[index]}</ListItem>);
  }

  return (
    <Container maxWidth="md" sx={{}}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center',
        backgroundColor: 'whitesmoke', padding: '20px', margin: '20px auto',
        width: 'fit-content', height: '100%', borderRadius: '5px'
      }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid item sx={{ margin: '0 20px 10px 0' }}>
            <Card>
              <CardContent>
                {Auth.loggedIn() ? (
                  <Typography variant='h6'>{`${Auth.getProfile().data.username}'s Dungeon`}</Typography>
                ) : (
                  <Typography variant='h6'>Not logged in</Typography>
                )}
                <Typography variant='p'>Floor: {state.floor}</Typography>
                <List>
                  <ListItem>Health: {state.entities.player.attributes.health}</ListItem>
                  <ListItem>XP: {state.entities.player.attributes.xp}</ListItem>
                  <ListItem>Level: {state.entities.player.attributes.level}</ListItem>
                  <ListItem>Current Damage: {state.entities.player.attributes.damage}</ListItem>
                  <ListItem>Coins: {state.entities.player.attributes.coins}</ListItem>
                  <ListItem>Bonus Damage: {state.entities.player.attributes.bonusDamage}</ListItem>
                  <ListItem>Bonus Armor: {state.entities.player.attributes.bonusArmor}</ListItem>
                </List>
                <ButtonGroup variant='text' orientation='vertical' size='small'>
                  <Button onClick={handleSpending} id='heal'>Heal 20 (10 Coins)</Button>
                  <Button onClick={handleSpending} id='damage'>+1 Damage (20 Coins)</Button>
                  <Button onClick={handleSpending} id='armor'>+1 Armor (20 Coins)</Button>
                </ButtonGroup>
              </CardContent>
              <CardActions>
                <Button onClick={handleSave}>Save Game</Button>
                <Button onClick={handleLoad}>Load Game</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item tabIndex={0} onKeyDown={handleKeyPress} {...swipeHandlers}>
            {mapDisplay}
          </Grid>
          <Grid item sx={{
            margin: '10px', padding: '5px', border: '1px solid black', borderRadius: '5px',
            height: '200px', width: '400px'
          }}>
            <Typography variant='h6'>Game Log:</Typography>
            <FixedSizeList
              height={150}
              width={385}
              itemSize={40}
              itemCount={state.history.length}
              style={{ backgroundColor: 'whitesmoke', borderRadius: '5px' }}>
              {renderLogRow}
            </FixedSizeList>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Game;