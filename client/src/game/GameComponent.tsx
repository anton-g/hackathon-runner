import { useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'
import { Game } from './game'

function GameComponent({
  onScore,
  enabled,
  socket,
}: {
  onScore: ({ time, gems }: { time: number; gems: number }) => void
  enabled: boolean
  socket: Socket
}) {
  const gameRef = useRef<Game>()
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.enabled = true
    } else {
      gameRef.current = new Game({
        onScore,
        enabled,
        socket,
      })
    }
  }, [onScore, enabled, socket])

  return <div id="game-anchor"></div>
}

export default GameComponent
