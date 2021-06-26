import Phaser from 'phaser';
import Player from '../Entities/Player';
import GunShip from '../Entities/GunShip';
import CarrierShip from '../Entities/CarrierShip';
import ChaserShip from '../Entities/ChaserShip';
import ScrollingBackground from '../Entities/ScrollingBackground';
import Form from '../Entities/PlayerForm';
import leaderboard from '../Entities/LeaderBoard';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.score = 0;
    this.value = 0;
  }

  preload() {
    // load images
    this.load.image('sprBg0', './assets/sprBg0.png');
    this.load.image('sprBg1', './assets/sprBg1.png');
    this.load.image('solar', './assets/solar.png');
    this.load.image('skybox', './assets/skybox.png');
    this.load.image('sprBg2', './assets/sprBg2.png');
    this.load.image('sprBg3', './assets/sprBg3.png');
    this.load.image('sprPlayer', './assets/sprPlayer.png');
    this.load.spritesheet('sprExplosion', './assets/sprExplosion.png', {
      frameWidth: 36,
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
    this.load.image('sprLaserEnemy0', './assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', './assets/sprLaserPlayer.png');
    this.load.spritesheet('ship', './assets/ship.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    // sound
    this.load.audio('sndExplode0', './assets/sndExplode0.wav');
    this.load.audio('sndExplode1', './assets/sndExplode1.wav');
    this.load.audio('sndLaser', './assets/sndLaser.wav');
  }

  create() {
    // Create out animation
    Form.removeForm(this);

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['skybox', 'solar'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'ship',
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    let score = 0;
    const scoreText = this.add.text(18, 18, `Score: ${score}`,
      { fontSize: '40px', fill: 'white' });

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      (playerLaser, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);
          playerLaser.destroy();
          score += 10;
          const scores = score;
          scoreText.setText(`Score: ${scores}`);
        }
      },
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      (player, enemy) => {
        if (!player.getData('isDead') && !enemy.getData('isDead')) {
          player.explode(false);
          player.onDestroy();
          const scores = score;
          const { playerName } = this.sys.game.globals;
          leaderboard.savedScore(playerName, scores);
          enemy.explode(true);
        }
      },
    );

    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      (player, laser) => {
        if (!player.getData('isDead') && !laser.getData('isDead')) {
          player.explode(false);
          player.onDestroy();
          const scores = score;
          const { playerName } = this.sys.game.globals;
          leaderboard.savedScore(playerName, scores);
          laser.destroy();
        }
      },
    );
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }

      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShooting', false);
      }
    }
 for (let i = 0; i < this.enemies.getChildren().length; i++) { // eslint-disable-line 
      const enemy = this.enemies.getChildren()[i]; // eslint-disable-line 

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.backgrounds.length; i += 1) { // eslint-disable-line 
      this.backgrounds[i].update(); // eslint-disable-line 
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) { // eslint-disable-line 
        arr.push(enemy);
      }
    }
    return arr;
  }
}