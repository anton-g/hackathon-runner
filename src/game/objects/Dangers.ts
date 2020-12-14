export class Dangers extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    const dangers = map.getObjectLayer('Danger')['objects']
    dangers.forEach((dangerObj) => {
      const type = dangerObj.properties.find((x: any) => x.name === 'type')
      switch (type.value) {
        case 'spike':
          this.addSpike(dangerObj.x!, dangerObj.y! - dangerObj!.height!)
          break
        case 'stalactite':
          this.addStalactite(dangerObj.x!, dangerObj.y! - dangerObj!.height!)
          break
      }
    })
  }

  private addSpike(x: number, y: number): void {
    const spike = this.create(x, y, 'spike').setOrigin(0, 0)
    spike.body.setSize(spike.width, spike.height - 12).setOffset(0, 12)
  }

  private addStalactite(x: number, y: number): void {
    const spike = this.create(x, y, 'stalactite').setOrigin(0, 0)
    spike.body.setSize(spike.width, spike.height - 6).setOffset(0, -2)
  }
}
