import Phaser from "phaser";

// Import all game scenes
import Game from './scenes/Game/Game'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 700,
  height: 700,
  // scene: {
  //   preload: preload,
  //   create: create
  // }
  scene: [Game]

};

const game = new Phaser.Game(config);

