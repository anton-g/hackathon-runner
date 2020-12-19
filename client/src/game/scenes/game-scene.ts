import Phaser from 'phaser'
import AnimatedTiles from 'phaser-animated-tiles'
import WebFontFile from '../helpers/WebFontFile'
import { Bouncers } from '../objects/Bouncers'
import { Coins } from '../objects/Coins'
import { Goals } from '../objects/Goals'
import { Player } from '../objects/Player'
import { Dangers } from '../objects/Dangers'
import { Water } from '../objects/Water'
import { Wind } from '../objects/Wind'
import { Keys } from '../objects/Keys'
import { Doors } from '../objects/Doors'
import { SpecialPlatforms } from '../objects/SpecialPlatforms'
import { msToTime } from '../../utils'
import { Game } from '../game'
import { OtherPlayer } from '../objects/OtherPlayer'
const level = require('../assets/tilemaps/level1.json')
const playerAtlasJson = require('../assets/images/player_atlas.json')
const bouncerAtlasJson = require('../assets/images/bouncer_atlas.json')
const doorAtlasJson = require('../assets/images/door_atlas.json')

export class GameScene extends Phaser.Scene {
  private state: 'Start' | 'Playing' | 'Dead' | 'Won' = 'Start'
  private otherPlayer!: OtherPlayer
  private player!: Player
  private dangers!: Phaser.Physics.Arcade.Group
  private coins!: Coins
  private keys!: Keys
  private doors!: Doors
  private goals!: Goals
  private bouncers!: Bouncers
  private wind!: Wind
  private water!: Water
  private specialPlatforms!: SpecialPlatforms
  private scoreText!: Phaser.GameObjects.Text
  private timeText!: Phaser.GameObjects.Text
  private instructionText!: Phaser.GameObjects.Text
  private timer!: Phaser.Time.TimerEvent
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
      'animatedTiles',
    )
    this.load.image('tiles', '/images/extruded-tileset.png')
    this.load.atlas('player', '/images/player.png', playerAtlasJson)
    this.load.atlas('bouncer', '/images/bouncer.png', bouncerAtlasJson)
    this.load.atlas('door', '/images/door.png', doorAtlasJson)
    this.load.image('spike', '/images/spike.png')
    this.load.image('stalactite', '/images/stalactite.png')
    this.load.image('coin', '/images/coin.png')
    this.load.image('black-gem', '/images/black-gem.png')
    this.load.image('key', '/images/key.png')
    this.load.image('heart', '/images/heart.png')
    this.load.tilemapTiledJSON('map', level)
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' })
    this.player = new Player(this, 'player', (update) =>
      (this.game as Game).socket.volatile.emit('input', update),
    )

    this.otherPlayer = new OtherPlayer(this, 'player', 35, 300)

    const tileset = map.addTilesetImage('platformer', 'tiles', 16, 16, 1, 3)
    map.createLayer('Cosmetics', tileset)
    const c2 = map.createLayer('Cosmetics2', tileset)
    c2.setAlpha(0.3)
    const platforms = map.createLayer('Platforms', tileset)
    platforms.setCollisionByExclusion([-1], true)

    this.animatedTiles.init(map)

    this.physics.add.collider(this.player, platforms)

    this.cameras.main.setBounds(0, 0, platforms.width, platforms.height)
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15)

    this.coins = new Coins(this.physics.world, this, map)
    this.coins.onScoreUpdate = (score) => {
      // this.scoreText.setText(`Coins: ${score}`)
    }
    this.physics.add.overlap(this.player, this.coins, this.coins.handleHit)

    this.keys = new Keys(this.physics.world, this, map)
    this.keys.onKeyUpdate = (count) => {
      this.player.keys = count
    }
    this.physics.add.overlap(this.player, this.keys, this.keys.handleHit)

    this.doors = new Doors(this.physics.world, this, map)
    this.physics.add.collider(this.player, this.doors, this.doors.handleHit)

    this.specialPlatforms = new SpecialPlatforms(this.physics.world, this, map)
    this.physics.add.collider(this.player, this.specialPlatforms)

    this.dangers = new Dangers(this.physics.world, this, map)
    this.physics.add.collider(
      this.player,
      this.dangers,
      this.handleFail.bind(this),
    )

    this.goals = new Goals(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.goals, this.handleWin.bind(this))

    this.bouncers = new Bouncers(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.bouncers, (obj1, obj2) => {
      this.bouncers.handleHit(obj1, obj2)
      this.player.bounce()
    })

    this.wind = new Wind(this.physics.world, this, map)
    this.physics.add.overlap(this.player, this.wind, () =>
      this.wind.apply(this.player),
    )

    this.water = new Water(this.physics.world, this, map, this.player)
    this.physics.add.overlap(this.player, this.water)

    this.input.keyboard.on('keydown', (e: KeyboardEvent) => {
      if (!(this.game as Game).enabled) return

      if (e.key === 'r') this.handleReset()

      if (this.state === 'Playing') return

      if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp'
      )
        this.handleStart()
    })
    this.setupUI()
    this.setupAnimations()
  }

  setupUI(): void {
    this.scoreText = this.add.text(24, 16, `Gems:`, {
      fontSize: '10px',
      color: 'black',
      fontFamily: '"Press Start 2P"',
    })
    this.scoreText.setScrollFactor(0)

    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2
    this.timeText = this.add
      .text(screenCenterX, 30, `00:00:00`, {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
        color: 'black',
      })
      .setOrigin(0.5, 0)
    this.timeText.setScrollFactor(0)
    this.timer = this.time.addEvent({
      loop: true,
      paused: true,
    })

    this.instructionText = this.add
      .text(screenCenterX, 10, 'Move to start', {
        fontSize: '12px',
        fontFamily: '"Press Start 2P"',
        color: 'black',
      })
      .setOrigin(0.5, 0)
    this.instructionText.setScrollFactor(0)
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

    this.anims.create({
      key: 'door_closed',
      frames: [{ key: 'door', frame: 'door_open' }],
      frameRate: 10,
    })
  }

  handleStart() {
    this.player.setEnableInput(true)
    this.instructionText.setText('')
    this.timer.reset({
      loop: true,
    })
    setTimeout(() => {
      this.state = 'Playing'
    }, 250)
  }

  handleFail() {
    this.timer.paused = true
    this.coins.reset()
    this.keys.reset()
    this.doors.reset()
    this.player.setEnableInput(false)
    this.player.handleHit()
    this.instructionText.setText('You lost :(')
    setTimeout(() => {
      this.state = 'Dead'
    }, 250)
  }

  handleReset() {
    this.timer.reset({
      loop: true,
      paused: true,
    })
    this.coins.reset()
    this.keys.reset()
    this.doors.reset()
    this.player.setEnableInput(false)
    this.player.handleHit()
    this.instructionText.setText('Move to start')
    setTimeout(() => {
      this.state = 'Start'
    }, 250)
  }

  handleWin() {
    ;(this.game as Game).onScore({
      gems: this.coins.score,
      time: this.timer.elapsed,
    })
    this.timer.paused = true
    this.state = 'Won'
    this.instructionText.setText('You won!')
    this.coins.reset()
    this.keys.reset()
    this.doors.reset()
    this.player.setEnableInput(false)
    this.player.handleWin()
  }

  update(): void {
    if ((this.game as Game).enabled) {
      this.player.update()
    }
    this.water.update()
    this.animatedTiles.updateAnimatedTiles()
    this.timeText.setText(msToTime(this.timer.getElapsed()))

    const snapshot = (this.game as Game).SI.calcInterpolation('x y')
    if (snapshot?.state) {
      snapshot.state.forEach((s) => {
        if (s.id === (this.game as Game).socket.id) return

        this.otherPlayer.update(s.x as number, s.y as number)
      })
    }
  }
}
