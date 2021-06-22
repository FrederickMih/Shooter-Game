import 'phaser';

export default {
  type: Phaser.AUTO, // eslint-disable-line
  parent: 'phaser-example',
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH, // eslint-disable-line

    width: 480,
    height: 640,
    backgroundColor: 'black',
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
};
