import 'phaser';

import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';

const gameConfig = {
  width: 800,
  height: 600, physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    },
  },
  scene: [LoadScene, MenuScene, GameScene, GameOverScene],
  render: {
    pixelArt: true
  }
};

new Phaser.Game(gameConfig);