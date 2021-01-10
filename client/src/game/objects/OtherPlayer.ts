export class OtherPlayer extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    texture: string,
    public playerId: string,
    x: number,
    y: number,
  ) {
    super(scene, x, y, texture)

    this.alpha = 0.4
    scene.add.existing(this)
  }

  update(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
