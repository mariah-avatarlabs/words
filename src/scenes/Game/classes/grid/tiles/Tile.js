import 'phaser';
import { config } from '../../../../../assets/data/config.js'

// == CHILRED TILE CLASSES == //
import { ImageTile } from './ImageTile';
import { SolidTile } from './SolidTile';



export class Tile extends Phaser.GameObjects.Container {
    constructor(scene, x, y, tileData, width, height, children) {
        super(scene, x, y, children);

        this.data = tileData;

        // ...
        this.setSize(width, height);
        scene.add.existing(this);
    }
    // ...

    // preUpdate(time, delta) {}
}