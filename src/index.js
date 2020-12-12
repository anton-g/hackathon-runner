import Phaser from 'phaser'
import tiles from './assets/tilesets/extruded-tileset.png'
import level from './assets/tilemaps/level1.json'
import spike from './assets/images/spike.png'
import playerAtlas from './assets/images/player.png'
import playerAtlasJson from './assets/images/player_atlas.json'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 48 * 16,
  height: 28 * 16,
  render: {
    pixelArt: true,
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
}

const game = new Phaser.Game(config)

function preload() {
  this.load.image('tiles', tiles)
  this.load.atlas('player', playerAtlas, playerAtlasJson)
  this.load.image('spike', spike)
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', level)
}

function playerHit(player, spike) {
  player.setVelocity(0, 0)
  player.setX(40)
  player.setY(380)
  player.play('idle', true)
  player.setAlpha(0)
  let tw = this.tweens.add({
    targets: player,
    alpha: 1,
    duration: 100,
    ease: 'Linear',
    repeat: 5,
  })
}

function create() {
  const map = this.make.tilemap({ key: 'map' })
  const tileset = map.addTilesetImage('platformer', 'tiles', 16, 16, 1, 3)
  const platforms = map.createStaticLayer('Platforms', tileset)
  const cosmetics = map.createStaticLayer('Cosmetics', tileset)
  this.cameras.main.setBounds(0, 0, platforms, 28 * 16)

  platforms.setCollisionByExclusion(-1, true)

  this.player = this.physics.add.sprite(40, 380, 'player')
  this.player.setBounce(0.1)
  this.player.setCollideWorldBounds(true)
  this.physics.add.collider(this.player, platforms)
  this.cameras.main.startFollow(this.player, true, 0.15, 0.15)
  // const logo = this.add.image(400, 150, 'logo')

  this.spikes = this.physics.add.group({
    allowGravity: false,
    immovable: true,
  })
  const spikeObjects = map.getObjectLayer('Danger')['objects']
  spikeObjects.forEach((spikeObject) => {
    // Add new spikes to our sprite group, change the start y position to meet the platform
    const spike = this.spikes
      .create(spikeObject.x, spikeObject.y - spikeObject.height, 'spike')
      .setOrigin(0, 0)
    spike.body.setSize(spike.width, spike.height - 12).setOffset(0, 12)
  })
  this.physics.add.collider(this.player, this.spikes, playerHit, null, this)

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

  this.cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  // Control the player with left or right keys
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200)
    if (this.player.body.onFloor()) {
      this.player.play('walk', true)
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200)
    if (this.player.body.onFloor()) {
      this.player.play('walk', true)
    }
  } else {
    // If no keys are pressed, the player keeps still
    this.player.setVelocityX(0)
    // Only show the idle animation if the player is footed
    // If this is not included, the player would look idle while jumping
    if (this.player.body.onFloor()) {
      this.player.play('idle', true)
    }
  }

  // Player can jump while walking any direction by pressing the space bar
  // or the 'UP' arrow
  if (
    (this.cursors.space.isDown || this.cursors.up.isDown) &&
    this.player.body.onFloor()
  ) {
    this.player.setVelocityY(-350)
    if (this.cursors.right.isDown || this.cursors.left.isDown) {
      this.player.play('jump_direction', true)
    } else {
      this.player.play('jump_straight', true)
    }
  }

  if (this.player.body.velocity.x > 0) {
    this.player.setFlipX(false)
  } else if (this.player.body.velocity.x < 0) {
    // otherwise, make them face the other side
    this.player.setFlipX(true)
  }
}
