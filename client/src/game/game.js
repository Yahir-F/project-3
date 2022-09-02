import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_MAP, ADD_ENTITY } from '../utils/actions';
import _ from 'lodash'

function Game() {

  const [mapDisplay, setMapDisplay] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  function getFreeTile() {
    const randNum = Math.floor(Math.random() * state.map.freeTiles.length);
    console.log(randNum);
    console.log(state.map.freeTiles);
    return state.map.freeTiles[randNum];
  }

  function generateMap() {
    dispatch({
      type: CREATE_MAP
    })
  }

  function spawnPlayer() {
    const freeTile = getFreeTile();
    console.log(freeTile);
    const player = {
      x: freeTile.x,
      y: freeTile.y,
      tileClass: 'player',
      entityName: 'player',
      attributes: {}
    };
    dispatch({
      type: ADD_ENTITY,
      payload: player
    });
  }

  function handleKeyPress(e) {
    let vector;
    switch(e.code) {
      case 'ArrowLeft':
        vector = {x: -1, y: 0}
        break;
      case 'ArrowUp':
        vector = {x: 0, y: -1}
        break;
      case 'ArrowRight':
        vector = {x: 1, y: 0}
        break;
      case 'ArrowDown':
        vector = {x: 0, y: 1}
        break;
      default:
        break;
    }
    if(vector) {
      handleMove(vector);
    }
  }

  function handleMove(vector) {
    const player = state.entities.player;
    const map = state.map;
    const newCoords = {
      x: player.x + vector.x,
      y: player.y + vector.y
    }
    console.log(player);
    console.log(map.map[newCoords.x][newCoords.y]);
    if(_.inRange(newCoords.x, 0, map.width) && 
      _.inRange(newCoords.y, 0, map.height) &&
      map.map[newCoords.x][newCoords.y].tileClass !== 'wall') {
        console.log(newCoords);
    }

  }
  
  // start game when Game component is loaded
  useEffect(() =>{
    generateMap()
    spawnPlayer()
    setMapDisplay(state.map.drawMap());
    window.addEventListener('keydown', handleKeyPress)
  }, [])

  // remove event listener when Game component is unmounted
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])



  return (
    <div onKeyDown={handleKeyPress}>
      {mapDisplay}
    </div>
  );
}

export default Game;