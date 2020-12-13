import Phaser from 'phaser'
import AnimatedTiles from 'phaser-animated-tiles'
import { Bouncers } from '../objects/Bouncers'
import { Coins } from '../objects/Coins'
import { Goals } from '../objects/Goals'
import { Player } from '../objects/Player'
import { Spikes } from '../objects/Spikes'
import { Water } from '../objects/Water'
import { Wind } from '../objects/Wind'
const level = require('../assets/tilemaps/level1.json')
const playerAtlasJson = require('../assets/images/player_atlas.json')
const bouncerAtlasJson = require('../assets/images/bouncer_atlas.json')

export class GameScene extends Phaser.Scene {
  private player!: Player
  private spikes!: Phaser.Physics.Arcade.Group
  private coins!: Coins
  private goals!: Goals
  private bouncers!: Bouncers
  private wind!: Wind
  private water!: Water
  private scoreText!: Phaser.GameObjects.Text
  private animatedTiles: any

  constructor() {
    super({
      key: 'GameScene',
    })
  }

  preload(): void {
    this.load.scenePlugin(
      'AnimatedTiles',
      AnimatedTiles,
      'animatedTiles',
      'animatedTiles'
    )
    this.load.image('tiles', '/images/extruded-tileset.png')
    this.load.atlas('player', '/images/player.png', playerAtlasJson)
    this.load.atlas('bouncer', '/images/bouncer.png', bouncerAtlasJson)
    this.load.image('spike', '/images/spike.png')
    this.load.image('coin', '/images/coin.png')
    this.load.image('heart', '/images/heart.png')
    this.load.image('coin', '/images/coin.png')
    this.load.tilemapTiledJSON('map', level)
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' })
    this.player = new Player(this, 'player')

    const tileset = map.addTilesetImage('platformer', 'tiles', 16, 16, 1, 3)
    map.createDynamicLayer('Cosmetics', tileset)
    const c2 = map.createDynamicLayer('Cosmetics2', tileset)
    c2.setAlpha(0.3)
    const platforms = map.createDynamicLayer('Platforms', tileset)
    platforms.setCollisionByExclusion([-1], true)

    this.animatedTiles.init(map)

    this.physics.add.collider(this.player, platforms)

    this.cameras.main.setBounds(0, 0, platforms.width, platforms.height)
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15)

    this.coins = new Coins(this.physics.world, this, map)
    this.coins.onScoreUpdate = (score) => {
      this.scoreText.setText(`Coins: ${score}`)
    }
    this.physics.add.overlap(this.player, this.coins, this.coins.handleHit)

    this.spikes = new Spikes(this.physics.world, this, map)
    this.physics.add.collider(this.player, this.spikes, () => {
      this.player.handleHit()
      this.coins.reset()
    })

    this.goals = new Goals(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.goals, () => console.log('win'))

    this.bouncers = new Bouncers(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.bouncers, (obj1, obj2) => {
      this.bouncers.handleHit(obj1, obj2)
      this.player.bounce()
    })

    this.wind = new Wind(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.wind, () =>
      this.wind.apply(this.player)
    )

    this.water = new Water(this.physics.world, this, map, this.player)
    this.physics.add.overlap(this.player, this.water)

    this.scoreText = this.add.text(20, 30, `Coins: 0`, {
      fontSize: '14px',
      fill: 'black',
    })
    this.scoreText.setScrollFactor(0)

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

    this.anims.create({
      key: 'bouncer',
      frames: [
        { key: 'bouncer', frame: 'down' },
        { key: 'bouncer', frame: 'middle' },
        { key: 'bouncer', frame: 'up' },
        { key: 'bouncer', frame: 'middle' },
        { key: 'bouncer', frame: 'down' },
      ],
      frameRate: 30,
    })
  }

  update(): void {
    this.player.update()
    this.water.update()
    this.animatedTiles.updateAnimatedTiles()
  }
}
