export class Bouncers extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    const bouncers = map.getObjectLayer('Bouncers')['objects']
    bouncers.forEach((bouncerObj) =>
      this.addBouncer(bouncerObj.x!, bouncerObj.y! - bouncerObj!.height!)
    )
  }

  handleHit(
    obj1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    obj2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    const bouncer = obj2 as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    bouncer.setOrigin(0, 0)
    bouncer.setOffset(0, bouncer.height / 2)
    bouncer.play('bouncer', true)
  }

  private addBouncer(x: number, y: number): void {
    const bouncer = this.create(x, y, 'bouncer').setOrigin(0, 0)
    bouncer.body
      .setSize(bouncer.width, bouncer.height - bouncer.height / 2)
      .setOffset(0, bouncer.height / 2)
  }
}
