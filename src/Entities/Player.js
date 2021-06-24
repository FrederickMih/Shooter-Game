import 'phaser';
import Entity from './Entity';
import PlayerLaser from './PlayerLaser';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'player');
    this.setData('speed', 200);
    this.play('sprPlayer.png');
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    this.setData('score', 0);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width); // eslint-disable-line 
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height); // eslint-disable-line 

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:
        const laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }
  }
}
export default Player;