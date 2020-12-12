export class Spikes extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    const spikes = map.getObjectLayer('Danger')['objects']
    spikes.forEach((spikeObj) =>
      this.addSpike(spikeObj.x!, spikeObj.y! - spikeObj!.height!)
    )
  }

  private addSpike(x: number, y: number): void {
    const spike = this.create(x, y, 'spike').setOrigin(0, 0)
    spike.body.setSize(spike.width, spike.height - 12).setOffset(0, 12)
  }
}
