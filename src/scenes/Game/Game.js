import 'phaser';
import WordController from './classes/WordController';
import { Timer } from './classes/Timer';
import { WordBank } from './classes/WordBank';
import { Letter } from './classes/Letter';
import { Grid } from './classes/Grid';
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


  submitWord(){
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
    // create grid obj
    this.grid = new Grid(this, 0, 0, this.wordController.lettersArr.join(''));
    this.grid.init();

    window.setTimeout(
      () => { this.grid.updateGrid('wertyuiop') },
      2000
    )

    // create current word display
    this.activeWordDisplay = new ActiveWordDisplay(this, 0, 0);
    this.activeWordDisplay.init();

    // init event emitters
    this.initEventListeners();



  }

  initEventListeners(){
    /// mousedown evnt listener - activate board/word
    // document.addEventListener('mousedown', (e) => {

      // Assign current letter user is starting with
      if(!this.activeWord && this.targetLetterObj){
        this.udpateActiveWord(this.targetLetter)
        this.targetLetterObj.deactivate();
      }

      // User has started creating word
      this.activeWord = true;


    // })

    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        //submit current word in bank
        this.submitWord(this.activeWord);
        this.grid.resetGrid();

      }
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
   
    // create timer
    this.timer = new Timer(this, 270, 150 );
    this.timer.init();

    this.letterLvlArray = this.wordController.lettersArr;



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