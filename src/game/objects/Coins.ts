export class Coins extends Phaser.Physics.Arcade.Group {
  private initialCoinObjs: Phaser.Types.Tilemaps.TiledObject[] = []

  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    this.initialCoinObjs = map.getObjectLayer('Coins')['objects']
    this.initialCoinObjs.forEach((coinObj) =>
      this.addCoin(coinObj.x!, coinObj.y!)
    )

    this.handleHit = this.handleHit.bind(this)
  }

  private addCoin(x: number, y: number): void {
    const coin = this.create(x, y, 'coin')
    coin.body.setSize(coin.width - 4, coin.height - 4)
  }

  reset(): void {
    this.children.each((c) => c.destroy())
    this.initialCoinObjs.forEach((coinObj) =>
      this.addCoin(coinObj.x!, coinObj.y!)
    )
  }

  handleHit(
    obj1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    obj2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    obj2.destroy()
  }

  update(): void {
    // this.handleInput()
  }
}
