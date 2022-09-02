import React from 'react'
import Game from '../../game/game'
import GameProvider from '../../utils/GameContext'

function Gamepage() {

  return (
    <div style={{"textAlign":"center"}}>
      <GameProvider>
        <Game/>
      </GameProvider>
    </div>
  )
}

export default Gamepage