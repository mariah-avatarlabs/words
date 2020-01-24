import 'phaser';
import { config } from '../../../../assets/data/config.js'


export class Question extends Phaser.GameObjects.Text {
    constructor(scene, x, y, currQuestion = '') {
        super(
            scene, 
            config.question.x, 
            config.question.y, 
            currQuestion, 
            config.question.style
        );

        this.config = config.question;
        this.text = currQuestion;
        this.val = 0;

        // ...
        scene.add.existing(this);
    }

    update(newQuestion){
        this.text = newQuestion;

    }


}