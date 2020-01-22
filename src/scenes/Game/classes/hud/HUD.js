import 'phaser';
import { Timer } from './timer/Timer.js'
import { Score } from './score/Score.js'

export class HUD extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        this.wordDisplay = null;
        this.timer = null;
        this.score = null;

        scene.add.existing(this);
    }

    init(){

    }

    createQuestionDisplay(){

    }


    start(){
        // this.timeEv.start
    }

}