import 'phaser';

class SolidTile extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        // ...
        scene.add.existing(this);
    }
    // ...

    // preUpdate(time, delta) {}
}