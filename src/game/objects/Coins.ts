export class Coins extends Phaser.Physics.Arcade.Group {
  private initialCoinObjs: Phaser.Types.Tilemaps.TiledObject[] = []
  private score: number = 0
  onScoreUpdate: ((score: number) => void) | undefined

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

    this.reset = this.reset.bind(this)
    this.setScore = this.setScore.bind(this)
    this.addCoin = this.addCoin.bind(this)
    this.handleHit = this.handleHit.bind(this)
  }

  reset(): void {
    this.children.each((c) => c.destroy())
    this.initialCoinObjs.forEach((coinObj) =>
      this.addCoin(coinObj.x!, coinObj.y!)
    )
    this.setScore(0)
  }

  handleHit(
    obj1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    obj2: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    obj2.destroy()
    this.setScore(this.score + 1)
  }

  private addCoin(x: number, y: number): void {
    const coin = this.create(x, y, 'coin').setOrigin(0, 1)
    coin.body.setSize(coin.width - 4, coin.height - 4)

    this.scene.tweens.add({
      targets: coin,
      x: coin.x + 1,
      duration: 300,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  private setScore(score: number) {
    this.score = score
    this.onScoreUpdate?.(this.score)

    if (score === 0) return

    const x = 74 + 12 * (score - 1)
    this.create(x, 29, 'black-gem').setOrigin(0, 1).setScrollFactor(0)
  }
}
