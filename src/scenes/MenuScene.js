export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MENU')
  }
  create() {
    this.add.image(-80, -20, "title_bg").setOrigin(0.1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logo')
    let play;

    let play_button = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button')
    let pause = this.add.image(10, 10, 'pause').setOrigin(0);
    pause.setScale(0.5)
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'options_button')
    let hoverSprite = this.add.sprite(100, 100, "cat");
    hoverSprite.setScale(2);
    hoverSprite.setVisible(false)
    let music = this.sound.add('iron');
    // music.play({ volume: 0.1 })
    this.anims.create({
      key: 'walk',
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('cat', {
        frames: [2, 3, 4, 5, , 12, 13, 8, 9]
      })
    })
    play_button.setInteractive();
    pause.setInteractive();

    play_button.on('pointerover', () => {
      hoverSprite.setVisible(true);
      hoverSprite.play('walk')
      hoverSprite.x = play_button.x - play_button.width;
      hoverSprite.y = play_button.y;
    })
    play_button.on('pointerout', () => {
      hoverSprite.setVisible(false)
    })
    play_button.on('pointerdown', () => {
      this.scene.start('GAME')
      music.pause()
    })
    pause.on('pointerdown', () => {
      music.pause()
      play = this.add.image(10, 10, 'play').setOrigin(0);
      play.setScale(0.5)
      play.setInteractive();
      pause.setVisible(false)
      play.on('pointerdown', () => {
        music.resume();
        play.setVisible(false)
        pause.setVisible(true)
      })
    })


  }
}