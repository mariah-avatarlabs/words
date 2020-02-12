import 'phaser';
import {config} from '../../../../assets/data/config.js'
import { Letter } from './letter/Letter'

// === AVAILABLE TILE TYPES === //
import { Tile } from './tiles/Tile.js';


export class GridBeta extends Phaser.GameObjects.Container {
    constructor(scene, x, y, layerTitleData, children) {
        super(scene, x, y, children);
        
        this.config = config.grid;
        this.x = this.config.x;

        this.gridMatrix = this.createMatrix();
        this.gridMatrixObjs = [];
        this.letterObjDict = {};
        

        // === DATA FOR MULTILAYER TILES == //
        this.layerTileData = scene.tileData;
        this.tileEvent = null;

        scene.add.existing(this);

    }

    init(){
        this.createGrid();       

    }

    createMatrix(){
        let currRow = [];
        let lvlMatrix = [];
    
        for(let i = 0; i <= this.config.rows * this.config.columns; i++ ){
          let rowIndx = i + 1;
          let currLetter = null;
          
          // init with no letters
          if(currLetter == undefined){
              currLetter = 'o'
          }
          
          // add letter to matrix
          currRow.push(currLetter)

          if ( rowIndx % this.config.columns == 0 ){
            lvlMatrix.push(currRow)
            currRow = [];
          }
    
        }

        return lvlMatrix;

    }

    createTile(tileProperties, rowIndx, rowPosIndx){
        let tileGameObj = new Tile(
            this.scene,
            this.config.tileSize * rowPosIndx,
            this.config.tileSize * rowIndx,
            tileProperties,
            null,
            this.config.tileSize,
            this.config.tileSize            
        )

        this.add(tileGameObj);
        return tileGameObj;

    }


    createGrid(){
        let tileTempData = [...this.layerTileData];

        // iterate through level matrix for positioning
        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let currMatrixRow = this.gridMatrix[i];
            let currRow = i + 1;

            for(let i = 0; i <= this.config.columns - 1; i++){

                // === CALL TO CREATE TILE GAME CONTAINER WITH DATA === //
                // assign tile data for each tile
                let tileData = []
                for (let i = 0; i < tileTempData.length; i++){
                    let currDataLayer = tileTempData[i];
                    tileData[i] = tileTempData[i].pop()
                }

                let tileObj = this.createTile(
                    tileData, 
                    currRow, 
                    i
                );


                // === CALL TO CREATE TILE GAME CONTAINER WITH DATA === //

                //this.letterObjDict[`${currLetter}${i + 1}`] = letterGameObj
            }


        }
        
    }
    
    // reafactor - multiple times same loop
    updateGrid(newString){
        this.letters = newString;
        let charInStringIndx = 0;

        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let targetRow = this.gridMatrix[i];

            for (let i = 0; i <= targetRow.length - 1; i++){
                let currLetterObj = targetRow[i];

                currLetterObj.changeLetter(newString[charInStringIndx]);
                currLetterObj.activate();
                charInStringIndx++;
            }
        }

    }

    // reafactor - multiple times same loop
    reset(){
        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let targetRow = this.gridMatrix[i];

            for (let i = 0; i <= targetRow.length - 1; i++){
                let currLetterObj = targetRow[i];
                console.log('reset inter: ', currLetterObj)
                currLetterObj.activate();

            }
        }
    }


}