import 'phaser';
import { config } from '../../../../../assets/data/config.js'


export class Score extends Phaser.GameObjects.Text {
    constructor(scene, x, y, score = '0') {
        super(scene, x, y, score, config.hud.score.style);

        this.config = config.hud.score;
        this.val = 0;

        // ...
        scene.add.existing(this);
    }

    increase(isBonus = false){
        if(isBonus){
            this.val = (parseInt(this.val) + this.config.bonus).toString()

        } else {
            this.val = (parseInt(this.val) + this.config.point).toString()
        }
        
    }

    reset(){
        this.val = '0';
    }

    // ...

    // preUpdate(time, delta) {}
}