import 'phaser';
import { config } from '../../../../../assets/data/config.js'

// == CHILRED TILE CLASSES == //
import { ImageTile } from './ImageTile';
import { SolidTile } from './SolidTile';


export class Letter extends Phaser.GameObjects.Container {
    constructor(scene, x, y, tileData, children) {
        super(scene, x, y, children);
        
        this.tileData = tileData;

        scene.add.existing(this);

    }


    createTile(){
        
    }


    // ...

    // preUpdate(time, delta) {}
}