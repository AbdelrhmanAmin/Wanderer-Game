export class Goblin extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this);
    this.setScale(3).setOrigin(0)
    scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.syncBounds = true;
    this.anims.play('goblin-idle', true)
  }
}