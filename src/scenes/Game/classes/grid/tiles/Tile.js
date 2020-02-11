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

        this.init();
    }

    init(){
        //assign game object to data set
        this.data.forEach( (layerConfig, indx) => {
            let gameTile = this.createLayerGameObj(layerConfig, indx);
            layerConfig['tileObj'] = gameTile;
            // this.add(gameTile);
            
        });

    }

    createLayerGameObj(objData, layer){
        switch(objData.type){
            case 'solid':
                let colorTile = this.createColorTile(objData.color);
                return colorTile;

                


                break;

            case 'image':
                break;
        }

    }

    createColorTile(color){
        // let solidTileGameObj = new SolidTile(
        //     this.scene, 
        //     0, 0,
        //     this.width,
        //     this.height,
        //     0x66ffff
        // )
        // return solidTileGameObj;


        let graphicsObj = this.scene.add.rectangle(
            0,
            0,
            this.width / 2,
            this.height / 2,
            color
        )
        graphicsObj.setOrigin(0.5, 0.5);
        // return graphicsObj;
        this.add(graphicsObj);

    }




    // ...

    // preUpdate(time, delta) {}
}