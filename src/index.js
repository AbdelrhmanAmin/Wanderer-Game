import 'phaser';

import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

const gameConfig = {
  width: 800,
  height: 600, physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [LoadScene, MenuScene, GameScene],
  render: {
    pixelArt: true
  }
};

new Phaser.Game(gameConfig);