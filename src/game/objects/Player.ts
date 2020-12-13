const initialPlayerPosition = {
  x: 55,
  y: 380,
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  private enableInput: boolean = true
  private swimming: boolean = false
  body!: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene, texture: string) {
    super(scene, initialPlayerPosition.x, initialPlayerPosition.y, texture)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(false)

    this.body.setSize(this.width - 4, this.height - 4).setOffset(2, 4)
    this.initInput()
    this.setBounce(0.1)

    this.handleHit = this.handleHit.bind(this)
    this.bounce = this.bounce.bind(this)
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys()
  }

  update(): void {
    if (this.swimming && this.body.velocity.y > 40) {
      this.setVelocityY(40)
    }

    this.handleInput()
  }

  handleHit(): void {
    this.setVelocity(0, 0)
    this.setX(initialPlayerPosition.x)
    this.setY(initialPlayerPosition.y)
    this.play('idle', true)
    this.setAlpha(0)
    this.enableInput = false
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
      onComplete: () => {
        this.enableInput = true
      },
    })
  }

  bounce() {
    this.setVelocityY(-500)
  }

  setSwimming(swimming: boolean) {
    this.swimming = swimming
  }

  private handleInput(): void {
    if (!this.enableInput) return
    // Control the player with left or right keys
    if (this.cursors!.left!.isDown) {
      this!.setVelocityX(-200)
      if (this!.body.onFloor()) {
        this!.play('walk', true)
      }
    } else if (this.cursors!.right!.isDown) {
      this.setVelocityX(200)
      if (this.body.onFloor()) {
        this.play('walk', true)
      }
    } else {
      // If no keys are pressed, the player keeps still
      this.setVelocityX(0)
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.body.onFloor()) {
        this.play('idle', true)
      }
    }

    // Player can jump while walking any direction by pressing the space bar
    // or the 'UP' arrow
    if (this.cursors!.up!.isDown && (this.body.onFloor() || this.swimming)) {
      this.setVelocityY(this.swimming ? -90 : -350)
      if (this.cursors!.right!.isDown || this.cursors!.left!.isDown) {
        this.play('jump_direction', true)
      } else {
        this.play('jump_straight', true)
      }
    }

    if (this.body.velocity.x > 0) {
      this.setFlipX(false)
    } else if (this.body.velocity.x < 0) {
      // otherwise, make them face the other side
      this.setFlipX(true)
    }
  }
}
