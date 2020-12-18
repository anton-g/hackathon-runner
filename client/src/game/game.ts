import 'phaser'
import { Socket } from 'socket.io-client'
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation'
import { GameScene } from './scenes/game-scene'
import { Snapshot } from '@geckos.io/snapshot-interpolation/lib/types'

const SI = new SnapshotInterpolation(30)

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-anchor',
  width: 48 * 16,
  height: 28 * 16,
  render: {
    pixelArt: true,
  },
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
}

type PlayerUpdate = {
  x: number
  y: number
  id: string
}

type GameUpdate = {
  t: number
  others: PlayerUpdate[]
}
export class Game extends Phaser.Game {
  gameUpdates: GameUpdate[] = []
  gameUpdate: GameUpdate | null = null
  onScore: (score: { time: number; gems: number }) => void
  enabled: boolean
  socket: Socket
  SI: SnapshotInterpolation

  constructor({
    onScore,
    enabled,
    socket,
  }: {
    onScore: (score: { time: number; gems: number }) => void
    enabled: boolean
    socket: Socket
  }) {
    super(config)
    this.onScore = onScore
    this.enabled = enabled
    this.socket = socket

    this.SI = SI

    this.socket.on('update', (snapshot: Snapshot) => {
      SI.snapshot.add(snapshot)
    })
  }
}
