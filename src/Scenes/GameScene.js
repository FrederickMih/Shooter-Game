import 'phaser';

export default class GameScene extends Phaser.Scene {// eslint-disable-line
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('sprBg0', './assets/sprBg0.png');
    this.load.image('sprBg1', './assets/sprBg1.png');
    this.load.image('sun', './assets/solar.png');
    this.load.image('sunny', './assets/skybox.png');
    this.load.image('sprPlayer', './assets/sprPlayer.png');
  }

  create() {
    // this.add.image(400, 300, 'logo');
    this.add.image(400, 300, 'sprPlayer');
  }
}