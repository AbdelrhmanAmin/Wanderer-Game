import Phaser from 'phaser'

const createGoblinAnims = (anims = Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'goblin-idle',
    frames: anims.generateFrameNames('goblin', {
      start: 0,
      end: 3,
      prefix: 'imp_idle_anim_f',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 8
  })
  anims.create({
    key: 'goblin-run',
    frames: anims.generateFrameNames('goblin', {
      start: 0,
      end: 3,
      prefix: 'imp_run_anim_f',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 8
  })
}
export { createGoblinAnims }