import 'phaser';

let config = {
    height: 150,
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
    constructor(scene, x, y, letter, width, height, children) {
        super(scene, x, y, children);

        this.wordObj;

        this.currentWord = "";

        scene.add.existing(this);
        this.createBgRect();
        this.createTextObj();
    }

    createBgRect(){
        //add graphics to ascene
        let graphicsObj = this.scene.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            0x6666ff
        )

        this.add(graphicsObj);


    }

    createTextObj(){
        let wordTextObj = this.scene.make.text(config.copyConfig);
        this.wordObj = wordTextObj;
        this.add(wordTextObj);

    }

    clear(){
        this.currentWord = "";
        this.wordObj.text = this.currentWord;
    }

    update(newLetter){
        console.log('run update: ', newLetter)
        this.currentWord = this.currentWord + newLetter;
        this.wordObj.text = this.currentWord;

    }   

    init(){

    }


}