import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { CREATE_MAP, ADD_ENTITY, MOVE, HEAL, REMOVE_ENTITY, RESET_STATE, DAMAGE, GAIN_XP, LOAD_STATE } from '../utils/actions';
import Entity from './entity';
import Auth from '../utils/auth';
import {getMe, saveState} from '../utils/api';

function Game() {

  const [mapDisplay, setMapDisplay] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  function generateMap() {
    dispatch({
      type: CREATE_MAP
    });
  }

  function getFreeTile() {
    const randNum = Math.floor(Math.random() * Object.keys(state.map.freeTiles).length);
    const key = Object.keys(state.map.freeTiles).splice(randNum, 1)[0];
    return key;
  }

  function spawnPlayer() {
    const key = getFreeTile();
    const freeTile = state.map.freeTiles[key];
    const player = {
      x: freeTile.x,
      y: freeTile.y,
      tileClass: 'player',
      entityName: 'player',
      attributes: {
        health: 100,
        damage: 5,
        xp: 0
      }
    };
    dispatch({
      type: ADD_ENTITY,
      payload: player
    });
  }

  function populateMap() {
    for (let i = 0; i < 3; i++) {
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

    for (let i = 0; i < 3; i++) {
      const freeTileKey = getFreeTile();
      const freeTile = state.map.freeTiles[freeTileKey];
      const newEnemy = {
        x: freeTile.x,
        y: freeTile.y,
        tileClass: 'enemy',
        entityName: 'enemy' + i,
        attributes: {
          health: 20,
          damage: 7
        }
      };
      dispatch({
        type: ADD_ENTITY,
        payload: newEnemy
      });
    }


  }

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
      handleMove(vector);
    }
  }, 100);

  function handleMove(vector) {

    console.log(state);
    
    const player = state.entities.player;
    const map = state.map;
    const newCoords = {
      x: player.x + vector.x,
      y: player.y + vector.y
    };

    console.log(player);
    console.log(map.map[newCoords.x][newCoords.y]);

    if (_.inRange(newCoords.x, 0, map.width) &&
      _.inRange(newCoords.y, 0, map.height) &&
      map.map[newCoords.x][newCoords.y].tileClass !== 'wall') {

      let newEntity;
      if (map.map[newCoords.x][newCoords.y] instanceof Entity) {
        newEntity = map.map[newCoords.x][newCoords.y];
      }

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

      switch (newEntity.tileClass) {
        /* Insert cases for health, weapon, enemy, etc. */
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
          console.log(`Gained ${newEntity.attributes.healValue} health!`);
          break;
        case 'enemy': {
          const playerHealth = player.attributes.health;
          const playerDamage = player.attributes.damage;
          const enemyHealth = newEntity.attributes.health;
          const enemyDamage = newEntity.attributes.damage;
          dispatch({
            type: DAMAGE,
            payload: {
              entityName: newEntity.entityName,
              dmgValue: playerDamage
            }
          });
          console.log(`Dealt ${playerDamage} damage to ${newEntity.entityName} (Current health: ${state.entities[newEntity.entityName].attributes.health})`);
          dispatch({
            type: DAMAGE,
            payload: {
              entityName: 'player',
              dmgValue: enemyDamage
            }
          });
          console.log(`Recieved ${enemyDamage} damage from ${newEntity.entityName}`);
          // check if enemy lived
          if (enemyHealth > playerDamage) {
            // check if player died
            if (enemyDamage >= playerHealth) {
              alert("YOU DIED");
              reset();
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
            dispatch({
              type: GAIN_XP,
              payload: {value: 10}
            })
            console.log(`Gained ${10} XP`);
          }
          break;
        }
        default:
          break;
      }
      setMapDisplay(state.map.drawMap());
      return;
    }
  }

  async function handleSave() {
    if(!Auth.loggedIn()) {
      alert("Please log in to save")
    }
    try {
      const response = await saveState({
        _id: Auth.getProfile().data._id,
        saveState: state
      });
      const data = response.json();
      if(!response.ok) {
        alert(data.message)
      } else {
        alert("Your data is saved!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadState() {
    const response = await getMe(Auth.getToken());
    const data = await response.json();
    console.log(data);
    if(!data.saveState) {
      return false;
    }
    dispatch({type: LOAD_STATE, payload: {state: data.saveState}});
    return true;
  }

  async function handleLoad() {
    let x = {...state}
    console.log(x);
    if(Auth.loggedIn()) {
      const hasState = await loadState();
      if(!hasState) {
        alert("No save data found");
        return;
      }
      setMapDisplay(state.map.drawMap());
    } else {
      alert("Please log in to load data")
    }
    console.log(state);
  }

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

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div>
          {Auth.loggedIn() ? (
            <h3>{`${Auth.getProfile().data.username}'s Dungeon`}</h3>
          ) : (
            <h3>Not logged in</h3>
          )}
          <h4>Floor: </h4>
          {console.log(state)}
          <ul>
            <li>Health: {state.entities.player.attributes.health}</li>
            <li>XP: {state.entities.player.attributes.xp}</li>
            <li>Level: {state.entities.player.attributes.level}</li>
            <li>Current Damage: {state.entities.player.attributes.damage}</li>
          </ul>
          <button onClick={handleSave}>Save Game</button>
          <button onClick={handleLoad}>Load Game</button>
        </div>
        <div tabIndex={0} onKeyDown={handleKeyPress}>
          {mapDisplay}
        </div>
      </div>
    </>
  );
}

export default Game;