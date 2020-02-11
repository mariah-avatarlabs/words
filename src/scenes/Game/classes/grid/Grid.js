import 'phaser';
import {config} from '../../../../assets/data/config.js'
import { Letter } from './letter/Letter'

// === AVAILABLE TILE TYPES === //
import { Tile } from './tiles/Tile.js';


export class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, word = '', layerTitleData, children) {
        super(scene, x, y, children);
        
        this.config = config.grid;
        this.x = this.config.x;
        this.letters = word;

        this.gridMatrix = this.createMatrix();
        this.gridMatrixObjs = [];
        this.letterObjDict = {};
        

        // === DATA FOR MULTILAYER TILES == //
        this.layerTileData = scene.tileData;

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
          let currLetter = this.letters[i];
          
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
            this.config.tileSize,
            this.config.tileSize            
        )

        // this.add(tileGameObj);
        // return tileGameObj;

    }

    createLetterObj(letter, rowIndx, rowPosIndx){

        console.log('letter: ', letter);
        console.log('rowInd: ', rowIndx);
        console.log('rowPosIndx: ', rowPosIndx);

        let letterGameObj = new Letter(
            this.scene,
            this.config.tileSize * rowPosIndx,
            this.config.tileSize * rowIndx,
            letter,
            this.config.tileSize,
            this.config.tileSize
        );
        this.add(letterGameObj);
        return letterGameObj;
    }

    createGrid(){
        console.log('begingrid: ', this.layerTileData);
        let tileTempData = [...this.layerTileData];


        // iterate through level matrix for positioning
        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let currMatrixRow = this.gridMatrix[i];
            let currRow = i + 1;

            for(let i = 0; i <= this.config.columns - 1; i++){
                let currLetter = currMatrixRow[i];

                let letterObj = this.createLetterObj(currLetter, currRow, i);
                currMatrixRow[i] = letterObj;

                // === CALL TO CREATE TILE GAME CONTAINER WITH DATA === //
                // assign tile data for each tile
                let tileData = []
                for (let i = 0; i <= this.layerTileData.length - 1; i++){
                    tileData[i] = tileTempData[i].pop()
                }
                let tileObj = this.createTile(
                    [], 
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