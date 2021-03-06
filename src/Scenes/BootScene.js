import Phaser from 'phaser';
import { setName } from '../util/PlayerNameUtil';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('blueButton1', 'assets/screen/blue_button02.png');
    this.load.image('blueButton2', 'assets/screen/blue_button03.png');
    this.load.html('input', 'assets/form/username_input.html');
    this.load.image('backgroundImg', 'assets/2.jpg');
    this.load.image('backgroundImg', 'assets/1.jpg');
  }

  create() {
    this.add.image(380, 250, 'backgroundImg');
    this.nameInput = this.add
      .dom(400, 300)
      .createFromCache('input')
      .setOrigin(0.5);

    this.message = this.add
      .text(400, 250, 'Please Enter Your Name \n', {
        color: '#FFFFFF',
        fontSize: 30,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.message = this.add
      .text(400, 250, ' \n\n\n\n\n\n\n\n\n\n\n\n\n\n Press Enter', {
        color: '#FFFFFF',
        fontSize: 30,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
    this.enter.on('down', () => {
      const name = this.nameInput.getChildByName('username').value;
      setName(name);
      this.scene.start('Preloader');
    });
  }
}
