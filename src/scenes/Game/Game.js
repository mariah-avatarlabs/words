import 'phaser';
import WordController from './classes/WordController';
import { WordBank } from './classes/WordBank';
import { Letter } from './classes/Letter';
import { ActiveWordDisplay } from './classes/ActiveWordDisplay';
 
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
    this.wordBank = null;

  }


  submitWord(userString){
    console.log('submit')
      // User can select a target letter to begin word
      this.targetLetterObj = null;
      this.targetLetter = "";

      // submit new word to wordset
      this.wordController.submitNewWord(this.activeWordDisplay.currentWord);

      // clear wordbank; reset grid
      this.resetGrid();
      this.activeWordDisplay.clear();

      // User is not currently creating a word
      this.activeWord = false;

  }
 
  create () {
    // create letter grid
    this.createGrid();

    // create current word display
    this.activeWordDisplay = new ActiveWordDisplay(this, 0, 0);
    this.activeWordDisplay.init();

    // init event emitters
    this.initEventListeners();



  }

  initEventListeners(){
    /// mousedown evnt listener - activate board/word
    document.addEventListener('mousedown', (e) => {

      // Assign current letter user is starting with
      if(!this.activeWord && this.targetLetterObj){
        this.udpateActiveWord(this.targetLetter)
        this.targetLetterObj.deactivate();
      }

      // User has started creating word
      this.activeWord = true;


    })

    // mouseup evnt listner - deactivate board/word
    /// evnt listeners
    document.addEventListener('mouseup', (e) => {
      //submit current word in bank
      this.submitWord(this.activeWord);

    })

  }

  preload () {

    // create Wordbank for level
    this.wordBank = new WordBank(this, 0, 400);
    this.wordBank.init();

    // config wordController - famecon
    this.wordController = new WordController(this.wordBank, 1);
    this.wordController.init();
    console.log(this.wordController);

    this.letterLvlArray = this.wordController.lettersArr;
   



  }

  createGridMatrix(){
    let currRow = [];
    let lvlMatrix = [];

    for(let i = 0; i <= this.letterLvlArray.length; i++ ){
      let rowIndx = i + 1;
      let currLetter = this.letterLvlArray[i];

      currRow.push(currLetter)

      if ( rowIndx % LEVELCONFIG.fieldSize == 0 ){
        lvlMatrix.push(currRow)
        currRow = [];
      }

    }

    return lvlMatrix

  }


  createGrid(lvlLetterArray){
    // this.gameArray = [];
    this.letterObjs = [];
    this.letterObjDict = {};
    let gridMatrix = this.createGridMatrix();

    // REFACTOR - recursive
    // iterate through level matrix for positioning
    for( let i = 0; i <= gridMatrix.length - 1; i++){
      let currMatrixRow = gridMatrix[i];
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



};