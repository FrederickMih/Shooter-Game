import Phaser from 'phaser';
import Form from '../Entities/PlayerForm';
import Leaderboard from '../Entities/LeaderBoard';
import Button from '../Entities/Button';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    Form.removeForm(this);
    Leaderboard.displayedScore(this);
    this.add
      .text(640, 25, 'Leaderboard', {
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fontSize: 35,
        color: '#000',
        fontStyle: 'bold',
        padding: 5,
      })
      .setOrigin(0.5);

    this.backButton = new Button(
      this,
      350,
      540,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title',
    );
  }
}