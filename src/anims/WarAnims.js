import Phaser from 'phaser'

const createWarAnims = (anims = Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'run',
    frames: anims.generateFrameNames('a-warrior', {
      prefix: 'run-',
      end: 7,
    }),
    frameRate: 8,
  });
  anims.create({
    key: 'attack',
    frames: anims.generateFrameNames('a-warrior', {
      prefix: 'attack-',
      end: 2,
    }),
    frameRate: 8
  });
}
export { createWarAnims }