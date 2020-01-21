import 'phaser';
import data from '../../assets/data/data.json';

import { WordController } from './classes/WordController';
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

    this.targetLetter = "";
    this.targetLetterObj = null;
    this.activeWordDisplay = null;
    this.letterGridArr = [];
    this.wordBank = null;

    this.gameData = data;
    this.dataIndx = 0;
    this.word = '';
    this.question = '';

  }

  nextLvl(){
    if(this.dataIndx + 1 < this.gameData.length){
      this.dataIndx++;
      this.word = this.gameData[this.dataIndx].word;
      this.question = this.gameData[this.dataIndx].question;
      
      this.wordController.update(this.word);
      let newString = this.wordController.string;
      this.grid.updateGrid(newString);
      this.activeWordDisplay.updateQuestion(this.question);
    }

  }

  submitWord(){
      // User can select a target letter to begin word
      this.targetLetterObj = null;
      this.targetLetter = "";

      // submit new word to wordset
      // this.wordController.submitNewWord(this.activeWordDisplay.currentWord);
      console.log('word display: ', this.activeWordDisplay.currentWord)
      console.log('targetWord: ', this.word);
  
      if(this.activeWordDisplay.currentWord === this.word){
        this.nextLvl();

      }      

      this.grid.reset();
      this.activeWordDisplay.clear();


  }
 
  create () {

    // create current word display
    this.activeWordDisplay = new ActiveWordDisplay(this, 0, 0, this.question);
    this.activeWordDisplay.init();

    // create grid obj
    // refactor - expense calculation .getBounds??
    this.grid = new Grid(this, 0, this.activeWordDisplay.getBounds().height, this.wordController.lettersArr.join(''));
    this.grid.init(); 

    // init event emitters
    this.initEventListeners();



  }

  initEventListeners(){
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        //submit current word in bank
        this.submitWord(this.activeWord);

      }
    })

  }

  preload () {
    this.word = this.gameData[this.dataIndx].word;
    this.question = this.gameData[this.dataIndx].question;

    // create Wordbank for level
    this.wordBank = new WordBank(this, 0, 400);
    // this.wordBank.init();

    // config wordController - famecon
    this.wordController = new WordController(this.wordBank, this.word);
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



};