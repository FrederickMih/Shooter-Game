import 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import GameScene from './Scenes/GameScene';
import CreditsScene from './Scenes/CreditsScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import LeaderboardScene from './Scenes/LeaboardScene';

import Model from './class/Model';
import GameOver from './Scenes/GameOver';

class Game extends Phaser.Game {//eslint-disable-line
  constructor() {
    super(config);
    const playerName = 'User';
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('LeaderBoard', LeaderboardScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
    const model = new Model();
    this.globals = { model, playerName, bgMusic: null };
  }
}

window.game = new Game();