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
    dangers.forEach((spikeObj) => {
      console.log(spikeObj)
      this.addSpike(spikeObj.x!, spikeObj.y! - spikeObj!.height!)
    })
  }

  private addSpike(x: number, y: number): void {
    const spike = this.create(x, y, 'spike').setOrigin(0, 0)
    spike.body.setSize(spike.width, spike.height - 12).setOffset(0, 12)
  }
}
