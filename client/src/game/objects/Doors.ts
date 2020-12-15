import { Player } from './Player'

export class Doors extends Phaser.Physics.Arcade.Group {
  private initialDoorObjs: Phaser.Types.Tilemaps.TiledObject[] = []

  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    this.initialDoorObjs = map.getObjectLayer('Doors').objects
    this.initialDoorObjs.forEach((doorObj) =>
      this.addDoor(doorObj.x!, doorObj.y!)
    )

    this.reset = this.reset.bind(this)
    this.addDoor = this.addDoor.bind(this)
    this.handleHit = this.handleHit.bind(this)
  }

  reset(): void {
    this.children.each((c) => c.destroy())
    this.initialDoorObjs.forEach((keyObj) => this.addDoor(keyObj.x!, keyObj.y!))
  }

  handleHit(
    obj1: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody,
    obj2: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
  ): void {
    const player = obj1 as Player
    if (player.hasKey()) {
      const door = obj2 as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      door.body.enable = false
      door.play('door_closed')
    }
  }

  private addDoor(x: number, y: number): void {
    this.create(x, y, 'door').setOrigin(0, 1)
  }
}
