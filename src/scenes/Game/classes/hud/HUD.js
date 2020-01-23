import 'phaser';
import { config } from '../../../../assets/data/config'
import { Timer } from './timer/Timer.js'
import { Score } from './score/Score.js'
import { WordDisplay } from './wordDisplay/WordDisplay.js'


export class HUD extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        
        this.config = config.hud;

        this.wordDisplay = null;
        this.timer = null;
        this.score = null;

        scene.add.existing(this);
    }

    init(){
        this.create();

    }

    create(){
        // create score game obj
        this.score = this.createScoreDisplay();
        this.add(this.score);
        
        // create wordDisplay game obj
        this.wordDisplay = this.createWordDisplay();
        this.wordDisplay.init();
        this.add(this.wordDisplay);

        // create timer game obj
        this.timer = this.createTimerDisplay();
        this.timer.init();
        this.add(this.timer);

    }

    createWordDisplay(){
        let wordDisplayObj = 
            new WordDisplay(this.scene, this.config.wordDisplay.x, this.config.wordDisplay.y, this.config.wordDisplay );
        return wordDisplayObj;
    }

    createTimerDisplay(){
        let timerGameObj = 
            new Timer(this.scene, this.config.timer.x, this.config.timer.y);
        return timerGameObj;
    }

    createScoreDisplay(){
        let scoreTextObj = 
            new Score(this.scene, this.config.score.x, this.config.score.y);
        return scoreTextObj;

    }

    updateLevel(bonusWord = false) {
        this.clearWordDisplay();
        this.score.increase(bonusWord);

    }

    // word display controls - move?
    currentWord(){ return this.wordDisplay.currentWord }

    updateWordDisplay(letter){
        this.wordDisplay.update(letter);

    }

    clearWordDisplay(){
        this.wordDisplay.clear();
    }    



    start(){
        // this.timeEv.start
    }

}