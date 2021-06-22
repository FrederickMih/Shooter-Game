import Phaser from 'phaser';
import config from './Config/config';// eslint-disable-line

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

window.game = new Game();
