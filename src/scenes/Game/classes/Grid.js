import 'phaser';

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
        console.log('grid: ', this);

        scene.add.existing(this);
    }


    createMatrix(){
        let currRow = [];
        let lvlMatrix = [];
    
        for(let i = 0; i <= this.letters.length; i++ ){
          let rowIndx = i + 1;
          let currLetter = this.letters[i];
    
          if ( rowIndx % GRIDCONFIG.fieldCol == 0 ){
            lvlMatrix.push(currRow)
            currRow = [];
          }
    
        }

        return lvlMatrix;

    }

    createLetterObj(letter){
        let letterGameObj = new Letter(
            this,
            LEVELCONFIG.tileSize * i,
            LEVELCONFIG.tileSize * currRow,
            letter,
            LEVELCONFIG.tileSize,
            LEVELCONFIG.tileSize
        );
        this.add(letterGameObj);
        return letterGameObj;
    }

    createGrid(){
        // iterate through level matrix for positioning
        for( let i = 0; i <= this.gridMatrix.length - 1; i++){
            let currMatrixRow = gridMatrix[i];
            let currRow = i + 1;
        }
        
    }


}