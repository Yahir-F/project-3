import React from 'react'
import * as ROT from 'rot-js'

function Game() {

  let map = new Array(50);
  for(let i = 0; i < map.length; i++) {
    map[i] = new Array(50).fill("#")
  }

  const createMap = () => {
    const digger = new ROT.Map.Digger(50,50)
    const coords = {}
    const diggerCallback = (x,y,value) => {
      if (value) { return; } /* do not store walls */
        var key = x+","+y;
        coords[key] = ".";
    }
    digger.create(diggerCallback);
    return coords;
  }

  const drawMap = (coords) => {
    for (var key in coords) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      map[x][y] = ".";
    }
  }

  drawMap(createMap(map));

  return (
    <div style={{"textAlign":"center"}}>
      {map.map((row, i) => {
        return (
          <div className='row' key={i}>
            {row.map((tile, j) => {
              if(tile === '.'){
                return (<span className='tile floor' key={j}></span>)
              } else {
                return (<span className='tile wall' key={j}></span>)
              }
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Game