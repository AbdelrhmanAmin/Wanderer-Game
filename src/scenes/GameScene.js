export class GameScene extends Phaser.Scene {
  constructor() {
    super('GAME')
  }
  preload() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('a-warrior', {
        prefix: 'run-',
        end: 7,
      }),
      frameRate: 8,
    });
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('a-warrior', {
        prefix: 'attack-',
        end: 2,
      }),
      frameRate: 8
    });
  }
  create() {
    this.player = this.physics.add.sprite(400, 300, 'warrior');
    this.keyW = this.input.keyboard.addKey('W');
    this.keyD = this.input.keyboard.addKey('D');
    this.keyS = this.input.keyboard.addKey('S');
    this.keyA = this.input.keyboard.addKey('A');
    this.keyA = this.input.keyboard.addKey('A');
    this.key_Space = this.input.keyboard.addKey('SPACE');
  }
  update() {
    this.player.setVelocity(0);
    if (this.keyW.isDown) {
      this.player.setVelocityY(-110);
      this.player.flipY = false;
      this.player.anims.play('run', true)
    }
    if (this.keyS.isDown) {
      this.player.setVelocityY(110);
      this.player.anims.play('run', true)
    }
    if (this.keyD.isDown) {
      this.player.setVelocityX(110);
      this.player.flipX = false;
      this.player.anims.play('run', true)
    }

    if (this.keyA.isDown) {
      this.player.setVelocityX(-110);
      this.player.flipX = true;
      this.player.anims.play('run', true)
    }
    if (this.key_Space.isDown) {
      this.player.anims.play('attack', true)
    }
  }
}