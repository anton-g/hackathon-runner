import Phaser from 'phaser'
import { Coins } from '../objects/Coins'
import { Goals } from '../objects/Goals'
import { Player } from '../objects/Player'
import { Spikes } from '../objects/Spikes'
const level = require('../assets/tilemaps/level1.json')
const playerAtlasJson = require('../assets/images/player_atlas.json')

export class GameScene extends Phaser.Scene {
  private player!: Player
  private spikes!: Phaser.Physics.Arcade.Group
  private coins!: Coins
  private goals!: Goals

  constructor() {
    super({
      key: 'GameScene',
    })
  }

  preload(): void {
    this.load.image('tiles', '/images/extruded-tileset.png')
    this.load.atlas('player', '/images/player.png', playerAtlasJson)
    this.load.image('spike', '/images/spike.png')
    this.load.image('coin', '/images/coin.png')
    this.load.image('heart', '/images/heart.png')
    this.load.image('coin', '/images/coin.png')
    this.load.tilemapTiledJSON('map', level)
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('platformer', 'tiles', 16, 16, 1, 3)
    map.createStaticLayer('Cosmetics', tileset)

    this.player = new Player(this, 'player')

    const platforms = map.createStaticLayer('Platforms', tileset)
    platforms.setCollisionByExclusion([-1], true)
    this.physics.add.collider(this.player, platforms)

    this.cameras.main.setBounds(0, 0, platforms.width, platforms.height)
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15)

    this.coins = new Coins(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.coins, this.coins.handleHit)

    this.spikes = new Spikes(this.physics.world, this, map)
    this.physics.add.collider(this.player, this.spikes, () => {
      this.player.handleHit()
      this.coins.reset()
    })

    this.goals = new Goals(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.goals, () => console.log('win'))

    this.setupAnimations()
  }

  setupAnimations(): void {
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'idle' }],
      frameRate: 10,
    })

    this.anims.create({
      key: 'jump_straight',
      frames: [{ key: 'player', frame: 'jump_straight' }],
      frameRate: 10,
    })

    this.anims.create({
      key: 'jump_direction',
      frames: [{ key: 'player', frame: 'jump_right' }],
      frameRate: 10,
    })

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'right_',
        start: 1,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update(): void {
    this.player?.update()
  }
}
