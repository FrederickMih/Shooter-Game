import 'phaser';

export default {
  type: Phaser.AUTO, // eslint-disable-line
  parent: 'phaser-example',
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH, // eslint-disable-line

    width: 800,
    height: 445,
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
