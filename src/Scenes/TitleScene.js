import 'phaser';
import config from '../Config/config';
import Button from '../Entities/PlayButton';
// import form from '../Entities/PlayerForm';
import '../../dist/assets/css/style.css';

export default class TitleScene extends Phaser.Scene {// eslint-disable-line
  constructor() {
    super('Title');
  }

  create() {
    // form.showForm();

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

    // Credits
    this.creditsButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.leaderboardButton = new Button(
      this,
      config.scale.width / 2,
      config.scale.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Board',
      'Leaderboard',
    );
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center( // eslint-disable-line
      gameObject, // eslint-disable-line
      this.add.zone(
        config.scale.width / 2,
        config.scale.height / 2 - offset * 100,
        config.scale.width,
        config.scale.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {// eslint-disable-line
    Phaser.Display.Align.In.Center(// eslint-disable-line
      gameText,
      gameButton,
    );
  }
}
