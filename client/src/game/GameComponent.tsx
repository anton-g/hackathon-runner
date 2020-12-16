import React from 'react'
import { useEffect, useRef } from 'react'
import { Game } from './game'

function GameComponent({
  onScore,
  enabled,
}: {
  onScore: ({ time, gems }: { time: number; gems: number }) => void
  enabled: boolean
}) {
  const gameRef = useRef<Game>()
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.enabled = true
    } else {
      gameRef.current = new Game({
        onScore,
        enabled,
      })
    }
  }, [onScore, enabled])

  return <div id="game-anchor"></div>
}

export default GameComponent
