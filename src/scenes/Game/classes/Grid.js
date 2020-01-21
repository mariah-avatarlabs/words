import 'phaser';
import { Letter } from '../classes/Letter'

const GRIDCONFIG = {
    fieldCol: 3,
    tileSize: 100,
}

export class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, letters, children) {
        super(scene, x, y, children);

        this.letters = letters;
        this.gridMatrix = this.createMatrix();
        this.gridMatrixObjs = [];
        this.letterObjDict = {};
        
        scene.add.existing(this);
    }

    init(){
        this.createGrid();
    }

    createMatrix(){
        let currRow = [];
        let lvlMatrix = [];
    
        for(let i = 0; i <= this.letters.length; i++ ){
          let rowIndx = i + 1;
          let currLetter = this.letters[i];
          
          // add letter to matrix
          currRow.push(currLetter)

          if ( rowIndx % GRIDCONFIG.fieldCol == 0 ){
            lvlMatrix.push(currRow)
            currRow = [];
          }
    
        }

        return lvlMatrix;

    }

    createLetterObj(letter, rowIndx, rowPosIndx){
        let letterGameObj = new Letter(
            this.scene,
            GRIDCONFIG.tileSize * rowPosIndx,
            GRIDCONFIG.tileSize * rowIndx,
            letter,
            GRIDCONFIG.tileSize,
            GRIDCONFIG.tileSize
        );
        this.add(letterGameObj);
        return letterGameObj;
    }

    createGrid(){
        // iterate through level matrix for positioning
        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let currMatrixRow = this.gridMatrix[i];
            let currRow = i + 1;

            for(let i = 0; i <= GRIDCONFIG.fieldCol - 1; i++){
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