import Phaser from 'phaser';
import ScrollingBackground from '../Entities/ScrollingBackground';
import Button from '../Entities/Button';
import config from '../Config/config';

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'red',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on(
      'pointerover',
      function () {
        this.btnRestart.setTexture('sprBtnRestartHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this,
    );

    this.btnRestart.on('pointerout', function () {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on(
      'pointerdown',
      function () {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
      },
      this,
    );

    this.btnRestart.on(
      'pointerup',
      function () {
        this.btnRestart.setTexture('sprBtnRestart');
        this.scene.start('Game');
      },
      this,
    );
    this.gameButton = new Button(this, config.scale.width / 2, config.scale.height / 2 - 100, 'blueButton1', 'blueButton2', 'Scores', 'LeaderBoard');
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['skybox', 'solor'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default GameOver;
