import 'phaser';
import Entity from './Entity';

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
}
export default Player;