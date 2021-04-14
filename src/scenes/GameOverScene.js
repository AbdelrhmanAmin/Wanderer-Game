export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GAMEOVER')
  }
  create() {
    this.add.image(0, 200, 'bg2').setScale(10).setDepth(1);
    this.video = this.add.video(400, 300, 'died').setDepth(3.5);
    this.video.loop = false
    this.video.play(true);
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.start('MENU')
      },
      callbackScope: this,
      loop: false
    })

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        this.input.keyboard.on('keydown', () => {
          this.scene.start('MENU')
        })
      },
      callbackScope: this,
      loop: false
    })

  }
}