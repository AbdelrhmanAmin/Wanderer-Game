export class LoadScene extends Phaser.Scene {
  constructor() {
    super('LOAD')
  }
  preload() {
    this.load.image('title_bg', './assets/bg.jpg')
    this.load.image('options_button', './assets/image/options_button.png')
    this.load.image('play_button', './assets/image/play_button.png')
    this.load.image('logo', './assets/logo.png')
    this.load.image('pause', './assets/pause.png')
    this.load.image('play', './assets/play.png')
    this.load.audio('iron', './assets/Ensiferum - Iron.mp3')
    this.load.spritesheet('cat', './assets/image/cat.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.image('warrior', './assets/king.png')
    this.load.atlas('a-warrior', './assets/a-king.png', './assets/a-king_atlas.json');

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    })

    this.load.on('progress', (per) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * per, 50)
    })
  }

  create() {
    this.scene.start('MENU')
  }
}