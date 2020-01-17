import 'phaser';

export class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this);
    }

}