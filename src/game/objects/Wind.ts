import { Player } from './Player'

export class Wind extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    const wind = map.getObjectLayer('UpwardsWind')['objects']
    wind.forEach((windObj) => this.addWind(windObj.x!, windObj.y! - 16))
  }

  apply(player: Player) {
    player.setVelocityY(player.body.velocity.y - 10)
  }

  private addWind(x: number, y: number): void {
    const wind = this.create(x, y, 'heart').setOrigin(0, 0).setAlpha(0)
    wind.body.setSize(wind.width, wind.height)
  }
}
