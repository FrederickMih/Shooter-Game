/* eslint-disable no-undef,  class-methods-use-this, no-unused-expressions, func-names */
import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  preload() {
    this.add.image(380, 250, 'backgroundImg');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '30px',
      fill: '#00bfff',
    });
    this.madeByText = this.add.text(0, 0, 'Creator: Mih Frederick', {
      fontSize: '35px',
      fill: '#00bfff',
    });
    this.zone = this.add.zone(
      config.scale.width / 2,
      config.scale.height / 2,
      config.scale.width,
      config.scale.height,
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,

      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,

      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}
