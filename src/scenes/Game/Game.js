import 'phaser';
import data from '../../assets/data/data.json';
import * as util from '../../utilities/Utilities'
import { config } from '../../assets/data/config'

import { Grid } from './classes/grid/Grid';
import { GridBeta } from './classes/grid/GridBeta'
import { Question } from './classes/question/Question' 
import { HUD } from './classes/hud/HUD.js'
import '../../assets/icon_spritesheet.png'
 

export default class Game extends Phaser.Scene {
  constructor () {
    super('Game');

    this.gameData = data;
    this.dataIndx = 0;
    this.word = '';
    this.question = '';
    this.config = config;

    // === DATA FOR MULTILAYER TILES == //
    this.tileData = [];

  }

  nextLvl(){
    if(this.dataIndx + 1 < this.gameData.length){
      this.dataIndx++;

      this.initLvl(this.dataIndx);
      this.hud.updateLevel();

    }

  }

  getLayerTileData(numberTiles, layerIndx){
    let availableTileData = this.config.tilePresets;
    let levelTiles = [];

    availableTileData = availableTileData.filter( dataObj => {
      // is available to be used for selected layer
      if (dataObj.layer.includes(layerIndx))
        return dataObj;

    })
    
    // === GENERATE BASE TILE DATA PER LAYER === //

    //select random tiles for layer
    let maxIndx = (availableTileData.length - 1);

    // get number of tiles per 0 based indx
    for (let i = 0; i <= numberTiles - 1; i++ ){
      let randIndex = Math.random() * (maxIndx - 0) + 0;
      randIndex = Math.floor(randIndex);

      levelTiles.push(availableTileData[randIndex]);

    }

    //duplicate data for pairs
    return levelTiles.concat(levelTiles);

    // === GENERATE BASE TILE DATA PER LAYER === //

  }


  initLvl(dataIndx){
    let lvlData = this.gameData[dataIndx];

    this.word = lvlData.word;
    this.question = lvlData.question;

    let lvlWordLetters = util.generateWordLetterSet(this.word);

    

    // === GENERATE DATA FOR MULILAYER TILES === //

    // calculate data
    let lvlTileData = this.config.grid;
    let numberOfTiles = lvlTileData.columns * lvlTileData.rows;
    
    if(numberOfTiles % 2 !== 0 ){
      throw 'CONFIG ERROR: grid not even number of tiles'
    } else {
      numberOfTiles = numberOfTiles / 2;
    }

    let layer1TileData = this.getLayerTileData(numberOfTiles, 0);
    this.tileData[0] = util.shuffleArray(layer1TileData);
    
    let layer2TileData = this.getLayerTileData(numberOfTiles, 1);
    this.tileData[1] = util.shuffleArray(layer2TileData);

    // === GENERATE DATA FOR MULILAYER TILES === //

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
    // this.grid = new Grid(this, 0, this.hud.getBounds().height, '', this.tileData);
    // this.grid.init(); 

    // hydrate with current level data
    this.initLvl(this.dataIndx);
    this.gridB = new GridBeta(this, 0, this.hud.getBounds().height, [...this.tileData]);
    this.gridB.init(); 

    // refactor - make grid after initLvl
    // this.grid.layerTileData = this.tileData;
    // console.log('grid create: ', this.grid)

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
    // move to preload
    let ss = this.load.atlas(
      'atlas', 
      'assets/icon_spritesheet.png', 
      'assets/icon_spritesheet.json'
      );
    
      console.log("Ss: ", ss)

    this.word = this.gameData[this.dataIndx].word;
    this.question = this.gameData[this.dataIndx].question;

  }

  udpateActiveWord(letter){
    this.hud.updateWordDisplay(letter);
  }



};