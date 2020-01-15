import 'phaser';
import WordSet from './classes/WordSet';
import {Letter} from './classes/Letter';
import {ActiveWordDisplay} from './classes/ActiveWordDisplay';
 
const LEVELCONFIG = {
  fieldSize: 3,
  tileSize: 100,
}

export default class Game extends Phaser.Scene {
  constructor () {
    super('Game');

    this.activeWord = false;
    this.targetLetter = "";
    this.targetLetterObj = null;
    this.activeWordDisplay = null;
    this.letterGridArr = [];

  }
 
  preload () {
    this.lvlWordSet = new WordSet("acdfsrtyi");
    this.letterLvlArray = this.lvlWordSet.letters.split('');
    
    let currRow = [];
    this.lvlMatrix = [];

    for(let i = 0; i <= this.letterLvlArray.length; i++ ){
      let rowIndx = i + 1;
      let currLetter = this.letterLvlArray[i];

      currRow.push(currLetter)

      if ( rowIndx % LEVELCONFIG.fieldSize == 0 ){
        this.lvlMatrix.push(currRow)
        currRow = [];
      }

    }

    /// mousedown evnt listener - activate board/word
    document.addEventListener('mousedown', (e) => {

      // Assign current letter user is starting with
      if(!this.activeWord && this.targetLetterObj){
        this.udpateActiveWord(this.targetLetter)
      }

      // User has started creating word
      this.activeWord = true;


    })

    // mouseup evnt listner - deactivate board/word
    /// evnt listeners
    document.addEventListener('mouseup', (e) => {

      // User can select a target letter to begin word
      this.targetLetterObj = null;
      this.targetLetter = "";
      
      // clear wordbank; reset grid
      this.resetGrid()
;      this.activeWordDisplay.clear();

      // User is not currently creating a word
      this.activeWord = false;

    })

  }
 
  create () {
    this.createGrid();

    // create wordbank
    this.activeWordDisplay = new ActiveWordDisplay(this, 0, 0);
    this.activeWordDisplay.init();

  }

  udpateActiveWord(letter){
    this.activeWordDisplay.update(letter);
  }

  updateTargetLetter(letterOBj){
    this.targetLetterObj = letterOBj;
    this.targetLetter = letterOBj.letter;
  }

  resetGrid(){
    for(let letterIndx in this.letterGridArr) {
      let currLetterObj = this.letterGridArr[letterIndx];
      currLetterObj.activate();
    }
  }

  createGrid(){
    // this.gameArray = [];
    this.letterObjs = [];
    this.letterObjDict = {};


    let objRow = 0;

    // REFACTOR - recursive
    // iterate through level matrix for positioning
    for( let i = 0; i <= this.lvlMatrix.length - 1; i++){
      let currMatrixRow = this.lvlMatrix[i];
      let currRow = i + 1;
      
      for(let i = 0; i <= currMatrixRow.length - 1; i++){
        let currLetter = currMatrixRow[i];
        console.log(currLetter)

        let letterGameObj = new Letter(
          this,
          LEVELCONFIG.tileSize * i,
          LEVELCONFIG.tileSize * currRow,
          currLetter,
          LEVELCONFIG.tileSize,
          LEVELCONFIG.tileSize
        );

        this.letterObjDict[`${currLetter}${i + 1}`] = letterGameObj
        this.letterGridArr.push(letterGameObj);

      }

    }


  }

};