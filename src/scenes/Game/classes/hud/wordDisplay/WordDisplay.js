import 'phaser';


export class WordDisplay extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config, children) {
        super(scene, x, y, children);

        this.word;
        this.bgRect;
        this.config = config;

        this.currentWord = "";

        scene.add.existing(this);

    }

    init(){
        this.create();
    }

    create(){
        // create word game obj
        this.bgRect = this.createBgRectObj();
        this.add(this.bgRect);  

        // create word game obj
        this.word = this.createWordObj();
        this.add(this.word);           

    }

    createBgRectObj(){
        let graphicsObj = this.scene.add.rectangle(
            0,
            0,
            this.config.bgRect.width,
            this.config.bgRect.height,
            0x6666ff
        );

        return graphicsObj;
    }

    createWordObj(){
        let wordTextObj = this.scene.make.text(this.config.copyConfig);
        wordTextObj.y = this.bgRect.y - this.bgRect.height/2;
        wordTextObj.x = this.bgRect.x - ((this.bgRect.width - wordTextObj.width) / 2);

        return wordTextObj;

    }

    clear(){
        this.currentWord = "";
        this.word.text = this.currentWord;
    }


    update(newLetter){
        this.currentWord = this.currentWord + newLetter;
        this.word.text = this.currentWord;

    }   


}