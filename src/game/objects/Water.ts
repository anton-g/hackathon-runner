import { Player } from './Player'

export class Water extends Phaser.Physics.Arcade.Group {
  private touching: boolean = false
  private player: Player

  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap,
    player: Player
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    this.player = player

    const water = map.getObjectLayer('Water').objects
    water.forEach((waterObj) => this.addWater(waterObj.x!, waterObj.y! - 16))
  }

  update(): void {
    const touching = this.children.entries.some(
      (c) => !(c.body as Phaser.Physics.Arcade.Body).touching.none
    )

    if (this.touching !== touching) {
      this.scene.physics.world.gravity.set(
        this.scene.physics.world.gravity.x,
        touching ? 200 : 1000
      )
      this.player.setSwimming(touching)

      this.touching = touching
    }
  }

  private addWater(x: number, y: number): void {
    const water = this.create(x, y, 'coin').setOrigin(0, 0).setAlpha(0)
    water.body.setSize(water.width, water.height)
  }
}
