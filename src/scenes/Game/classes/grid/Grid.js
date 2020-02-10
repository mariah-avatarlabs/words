import 'phaser';
import {config} from '../../../../assets/data/config.js'
import { Letter } from './letter/Letter'


export class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, word = '', children) {
        super(scene, x, y, children);
        
        this.config = config.grid;
        this.x = this.config.x;
        this.letters = word;

        this.gridMatrix = this.createMatrix();
        this.gridMatrixObjs = [];
        this.letterObjDict = {};
        
        scene.add.existing(this);
    }

    init(){
        // create bg rectangle
        this.createBgRect(); 

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

    createBgRect(){
        //add graphics to ascene
        let graphicsObj = this.scene.add.rectangle(
            95,
            200,
            275,
            300,
            0x666fff
        )
        // graphicsObj.y = this.y;
        // graphicsObj.x = this.x;
        this.bgRect = graphicsObj;
        this.add(graphicsObj);
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
        // iterate through level matrix for positioning
        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let currMatrixRow = this.gridMatrix[i];
            let currRow = i + 1;

            for(let i = 0; i <= this.config.columns - 1; i++){
                let currLetter = currMatrixRow[i];
                let letterObj = this.createLetterObj(currLetter, currRow, i);
                currMatrixRow[i] = letterObj;

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