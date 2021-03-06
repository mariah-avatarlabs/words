import Phaser from "phaser";
import logoImg from "./assets/logo.png";

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

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
