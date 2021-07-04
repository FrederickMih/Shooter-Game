import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        // fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`); // eslint-disable-line
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load ../../dist/dist/assets/ueeded in our game
    this.load.image('blueButton1', '../../dist/assets/screen/blue_button02.png');
    this.load.image('blueButton2', '../../dist/assets/screen/blue_button03.png');
    this.load.image('phaserLogo', '../../dist/assets/logo.png');
    this.load.image('box', '../../dist/assets/screen/grey_box.png');
    this.load.image('checkedBox', '../../dist/assets/screen/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['../../dist/assets/techno.mp3']);
    this.load.image('ship', '../../dist/assets/ship.png');

    this.load.image('sprBtnPlay', '../../dist/assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', '../../dist/assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', '../../dist/assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', '../../dist/assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', '../../dist/assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', '../../dist/assets/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', '../../dist/assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', '../../dist/assets/sndBtnDown.wav');
  }

  ready() {
    this.scene.start('Title');
    // eslint-disable-next-line no-plusplus
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
