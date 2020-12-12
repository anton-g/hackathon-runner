export class Goals extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap
  ) {
    super(world, scene, {
      allowGravity: false,
      immovable: true,
    })

    const goals = map.getObjectLayer('Goal')['objects']
    goals.forEach((goalObj) => this.addGoal(goalObj.x!, goalObj.y!))
  }

  private addGoal(x: number, y: number): void {
    const goal = this.create(x, y, 'heart')
    goal.body.setSize(goal.width, goal.height)

    this.scene.tweens.add({
      targets: goal,
      y: goal.y - 4,
      duration: 700,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }
}
