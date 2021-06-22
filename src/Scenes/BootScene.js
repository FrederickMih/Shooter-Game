import 'phaser';

export default class BootScene extends Phaser.Scene {// eslint-disable-line 
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/zenva_logo.png');
  }

  // create() {}
}
