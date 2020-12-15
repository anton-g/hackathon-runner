export class SpecialPlatforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene)

    map
      .getObjectLayer('ThinBlockers')
      .objects.forEach((platformObj) =>
        this.addPlatform(
          platformObj.x!,
          platformObj.y!,
          platformObj.properties[0].value
        )
      )

    this.addPlatform = this.addPlatform.bind(this)
  }

  private addPlatform(x: number, y: number, direction: 'up' | 'right'): void {
    const platform = this.create(x, y, 'door').setAlpha(0)
    if (direction === 'up')
      platform.body
        .setSize(platform.width - 2, platform.height - 14)
        .setOffset(1, 0)
    else
      platform.body
        .setSize(platform.width - 12, platform.height0)
        .setOffset(14, 0)
  }
}
