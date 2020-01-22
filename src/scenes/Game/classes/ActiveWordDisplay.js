import 'phaser';
import { config } from '../../../assets/data/config.js'


export class ActiveWordDisplay extends Phaser.GameObjects.Container {
    constructor(scene, x, y, question, width, height, children) {
        super(scene, x, y, children);

        this.wordObj;
        this.quesObj;
        this.bgRectObj;
        this.config = config.activeWordDisplay;

        this.currentWord = "";
        this.currQuestion = question;

        scene.add.existing(this);

        this.createQuestionTextObj();
        this.createBgRect();
        this.createTextObj();

    }

    createQuestionTextObj(){
        let questionTextObj = this.scene.make.text(this.config.copyConfig);
        questionTextObj.text = this.currQuestion;
        this.add(questionTextObj);

        this.quesObj = questionTextObj;
    }

    createBgRect(){
        console.log('rectPos: ', this.quesObj.height)
        //add graphics to ascene
        let graphicsObj = this.scene.add.rectangle(
            0,
            this.config.height / 2 + this.quesObj.height,
            this.config.width,
            this.config.height,
            0x6666ff
        )

        this.add(graphicsObj);

        this.bgRectObj = graphicsObj;


    }

    createTextObj(){
        let wordTextObj = this.scene.make.text(this.config.copyConfig);
        wordTextObj.y = this.bgRectObj.y - this.bgRectObj.height/2;
        this.wordObj = wordTextObj;
        this.add(wordTextObj);

    }

    clear(){
        this.currentWord = "";
        this.wordObj.text = this.currentWord;
    }

    updateQuestion(newquestion){
        this.quesObj.text = newquestion;
    }

    update(newLetter){
        console.log('run update: ', newLetter)
        this.currentWord = this.currentWord + newLetter;
        this.wordObj.text = this.currentWord;

    }   

    init(){

    }


}