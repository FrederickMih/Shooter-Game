import 'phaser';
import config from '../Config/config';
import Button from '../Entities/Button';

export default class TitleScene extends Phaser.Scene {//eslint-disable-line
  constructor() {
    super('Title');
  }

  preload() {
    this.add.image(380, 250, 'backgroundImg');
  }

  create() {
    this.titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 7,
      'Ship Shooter',
      { fontSize: '64px', fill: '#fff' },
    );
    this.titleText.setOrigin(0.5);

    // Game
    this.gameButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
    );

    this.leaderboardButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2,
      'blueButton1',
      'blueButton2',
      'Scores',
      'Leaderboard',
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.scale.width / 2,
        config.scale.height / 2 - offset * 100,
        config.scale.width,
        config.scale.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) { // eslint-disable-line
    Phaser.Display.Align.In.Center( // eslint-disable-line
      gameText,
      gameButton,
    );
  }
}
