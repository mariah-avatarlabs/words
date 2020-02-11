import 'phaser';
import data from '../../assets/data/data.json';
import * as util from '../../utilities/Utilities'

import { Grid } from './classes/grid/Grid';
import { Question } from './classes/question/Question' 
import { HUD } from './classes/hud/HUD.js'
 

export default class Game extends Phaser.Scene {
  constructor () {
    super('Game');

    this.gameData = data;
    this.dataIndx = 0;
    this.word = '';
    this.question = '';

  }

  nextLvl(){
    if(this.dataIndx + 1 < this.gameData.length){
      this.dataIndx++;

      this.initLvl(this.dataIndx);
      this.hud.updateLevel();

    }

  }

  initLvl(dataIndx){
    let lvlData = this.gameData[dataIndx];

    this.word = lvlData.word;
    this.question = lvlData.question;

    let lvlWordLetters = util.generateWordLetterSet(this.word);
    this.grid.updateGrid(util.shuffleString(lvlWordLetters));

  }

  submitWord(){
      if(this.hud.currentWord() === this.word){
        this.nextLvl();

      } else {
        this.grid.reset();
        this.hud.clearWordDisplay();
      }    

  }
 
  create () {

    // create HUD
    this.hud = new HUD(this, 0, 0);
    this.hud.init();

    // create grid obj
    // refactor - expense calculation .getBounds??
    this.grid = new Grid(this, 0, this.hud.getBounds().height);
    this.grid.init(); 

    // hydrate with current level data
    this.initLvl(this.dataIndx);

    // assign eventListeners
    this.initEventListeners();



  }


  initEventListeners(){
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        //submit current word in bank
        this.submitWord(this.hud.currentWord());

      }
    })

  }

  preload () {
    this.word = this.gameData[this.dataIndx].word;
    this.question = this.gameData[this.dataIndx].question;

  }

  udpateActiveWord(letter){
    this.hud.updateWordDisplay(letter);
  }



};