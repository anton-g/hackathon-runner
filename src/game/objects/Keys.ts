export class Keys extends Phaser.Physics.Arcade.Group {
  private initialKeyObjs: Phaser.Types.Tilemaps.TiledObject[] = []
  private collectedKeys: number = 0
  onKeyUpdate: ((count: number) => void) | undefined

  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    this.initialKeyObjs = map.getObjectLayer('Keys')['objects']
    this.initialKeyObjs.forEach((keyObj) => this.addKey(keyObj.x!, keyObj.y!))

    this.reset = this.reset.bind(this)
    this.setKeys = this.setKeys.bind(this)
    this.addKey = this.addKey.bind(this)
    this.handleHit = this.handleHit.bind(this)
  }

  reset(): void {
    this.children.each((c) => c.destroy())
    this.initialKeyObjs.forEach((keyObj) => this.addKey(keyObj.x!, keyObj.y!))
    this.setKeys(0)
  }

  handleHit(
    obj1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    obj2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    obj2.destroy()
    this.setKeys(this.collectedKeys + 1)
  }

  private addKey(x: number, y: number): void {
    const key = this.create(x, y, 'key').setOrigin(0, 1)
    key.body.setSize(key.width - 4, key.height - 4)

    this.scene.tweens.add({
      targets: key,
      x: key.x + 1,
      duration: 300,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  private setKeys(score: number) {
    this.collectedKeys = score
    this.onKeyUpdate?.(this.collectedKeys)
  }
}
