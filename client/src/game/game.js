import React from 'react'
import Map from './map'

function Game() {


    const worldmap = new Map(50,50,10);
    worldmap.createMap();
    const map = worldmap.map


  return (
    <>
        {map.map((row, i) => {
        return (
          <div className='row' key={i}>
            {row.map((tile, j) => {
              if(tile === 1){
                return (<span className='tile floor' key={j}></span>)
              } else {
                return (<span className='tile wall' key={j}></span>)
              }
            })}
          </div>
        )
      })}
        
    </>
  )
}

export default Game