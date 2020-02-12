import 'phaser';
import { config } from '../../../../../assets/data/config.js'

// == CHILRED TILE CLASSES == //
import { ImageTile } from './ImageTile';
import { SolidTile } from './SolidTile';


export class Tile extends Phaser.GameObjects.Container {
    constructor(scene, x, y, tileData, clickEvent, width, height, children) {
        super(scene, x, y, children);

        this.data = tileData;
        this.gridEvent = clickEvent;

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

        // create click event [gridcontrller]
        this.createTileEvent()

        // initilize onClick
        this.setInteractive().on('pointerdown', () => {
            console.log('doc: ', document)
            document.dispatchEvent(this.gridEvent, this);
        })


    }

    createTileEvent(tileObj){
        // REFACTOR - IE COMPATIBILITY
        var event = new CustomEvent('tileSelect', {
            detail: { 
                tile: this.data 
            }
        });
        this.gridEvent = event;
        return event;
    }

    createLayerGameObj(objData, layer){
        switch(objData.type){
            case 'solid':
                let colorTile = this.createColorTile(objData.color);
                return colorTile;
                break;

            case 'image':
                let imageTile = this.scene.add.image(
                    0, 
                    0, 
                    'atlas', 
                    objData.key
                );
                console.log('new image: ', imageTile);
                imageTile.scale = 0.15;
                // imageTile.width = this.width / 50;

                this.add(imageTile);
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

        // REFACTOR - why cannot pass to parent to add to container?
        let graphicsObj = this.scene.add.rectangle(
            0,
            0,
            this.width/1.15,
            this.height/1.15,
            color
        )
        graphicsObj.setOrigin(0.5, 0.5);
        // return graphicsObj;
        this.add(graphicsObj);

    }




    // ...

    // preUpdate(time, delta) {}
}