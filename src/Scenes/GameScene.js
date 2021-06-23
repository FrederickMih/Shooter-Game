import 'phaser';

export default class GameScene extends Phaser.Scene {// eslint-disable-line
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('sprBg0', './assets/sprBg0.png');
    this.load.image('sprBg1', './assets/sprBg1.png');
    this.load.image('solar', './assets/solar.png');
    this.load.image('skybox', './assets/skybox.png');
    this.load.image('sprPlayer', './assets/sprPlayer.png');
    this.load.spritesheet('sprExplosion', './assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', './assets/sprEnemy0.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', './assets/sprEnemy1.png');
    this.load.spritesheet('sprEnemy2', './assets/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('ship', './assets/ship.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    // this.add.image(400, 300, 'logo');
    this.add.image(400, 300, 'sprPlayer');
  }
}