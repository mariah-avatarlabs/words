import 'phaser';

let config = {
    height: 80,
    width: 600,
    copyConfig: {
        x: 0,
        y: 0,
        width: 600,
        height: 150,
        text: "---------",
        style: {
            fontSize: '37.5px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',  // 'left'|'center'|'right'|'justify'
        }           
    }
}

export class ActiveWordDisplay extends Phaser.GameObjects.Container {
    constructor(scene, x, y, question, width, height, children) {
        super(scene, x, y, children);

        this.wordObj;
        this.quesObj;
        this.bgRectObj;

        this.currentWord = "";
        this.currQuestion = question;

        scene.add.existing(this);

        this.createQuestionTextObj();
        this.createBgRect();
        this.createTextObj();

    }

    createQuestionTextObj(){
        let questionTextObj = this.scene.make.text(config.copyConfig);
        questionTextObj.text = this.currQuestion;
        this.add(questionTextObj);

        this.quesObj = questionTextObj;
    }

    createBgRect(){
        console.log('rectPos: ', this.quesObj.height)
        //add graphics to ascene
        let graphicsObj = this.scene.add.rectangle(
            0,
            config.height / 2 + this.quesObj.height,
            config.width,
            config.height,
            0x6666ff
        )

        this.add(graphicsObj);

        this.bgRectObj = graphicsObj;


    }

    createTextObj(){
        let wordTextObj = this.scene.make.text(config.copyConfig);
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