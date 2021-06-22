import 'phaser';

export default class GameScene extends Phaser.Scene {// eslint-disable-line
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', './assets/logo.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
