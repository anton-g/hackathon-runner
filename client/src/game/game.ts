import 'phaser'
import { GameScene } from './scenes/game-scene'

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

export class Game extends Phaser.Game {
  onScore: (score: { time: number; gems: number }) => void
  enabled: boolean

  constructor({
    onScore,
    enabled,
  }: {
    onScore: (score: { time: number; gems: number }) => void
    enabled: boolean
  }) {
    super(config)
    this.onScore = onScore
    this.enabled = enabled
  }
}
