import React from 'react'
import GameComponent from './game/GameComponent'

function App() {
  return (
    <div className="App">
      <h1
        style={{ color: 'red', fontFamily: 'Press Start 2P', fontSize: '14px' }}
      >
        A GAME?
      </h1>
      <GameComponent></GameComponent>
    </div>
  )
}

export default App
