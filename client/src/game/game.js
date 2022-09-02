import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_MAP, ADD_ENTITY } from '../utils/actions';

function Game() {

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
      attributes: {}
    }
    dispatch({
      type: ADD_ENTITY,
      payload: player
    })
  }

  useEffect(() =>{
    generateMap()
    spawnPlayer()
  }, [])

  /* const worldmap = new Map(50,50);
  worldmap.createMap();
  const map = worldmap.map */


  return (
    <>
      {state.map.map.map((row, i) => {
        return (
          <div className='row' key={i}>
            {row.map((tile, j) => {
              return (<span className={`tile ${tile.tileClass}`} key={j}></span>);
            })}
          </div>
        );
      })}
    </>
  );
}

export default Game;