import React from 'react'
import { useEffect, useRef } from 'react'
import { Game } from './game'

function GameComponent() {
  const gameRef = useRef<Phaser.Game>()
  useEffect(() => {
    if (!gameRef.current) gameRef.current = new Game()
  }, [])

  return <div className="game-anchor"></div>
}

export default GameComponent
