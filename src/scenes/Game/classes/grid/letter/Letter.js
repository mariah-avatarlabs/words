import 'phaser';
import { config } from '../../../../../assets/data/config.js'


export class Letter extends Phaser.GameObjects.Container {
    constructor(scene, x, y, letter, width, height, children) {
        super(scene, x, y, children);

        this.letter = letter;
        this.letterObj = null;
        this.available = true;

        this.config = config.grid.letters;
        this.bgRect;
        this.hitBox;

        this.setSize(width, height);

        this.setInteractive({ draggable: true });
        scene.input.setDraggable(this);     

        scene.add.existing(this);

        this.init();
    }

    submitLetter(){
        if(
            this.scene.activeWord == true &&
            this.available == true
        ){
            this.scene.udpateActiveWord(this.letter);
        }

    }

    createBgRect(){
        //add graphics to ascene
        let graphicsObj = this.scene.add.rectangle(
            0,
            0,
            this.width,
            this.height,
            0x666fff
        )
        this.bgRect = graphicsObj;
        this.add(graphicsObj);


    }

    createHitRect(){
        //add graphics to ascene
        let graphicsObj = this.scene.add.rectangle(
            (this.width - (this.width / 2)) / 2,
            0,
            this.width / 2,
            this.height / 2,
            0x66ffff
        )
        graphicsObj.setOrigin(0.5, 0.5);
        this.hitBox = graphicsObj;

        this.add(graphicsObj);


    }

    deactivate(){
        this.available = false;
        this.alpha = 0.5;
    }

    activate(){
        this.available = true;
        this.alpha = 1.0;
    }

    changeLetter(letter){
        this.letter = letter;
        this.letterObj.text = letter;
    }

    init(){

        // create bg rectangle
        this.createBgRect();

        // create smaller hitbox
        this.createHitRect()
        this.hitBox.setInteractive();

        // Register in current word if user is currently creating a word
        this.hitBox.on('pointerdown', () => {
            console.log('letter hit')
            if(this.available){
                this.scene.udpateActiveWord(this.letter);
                this.submitLetter();
            }
        })  

        // create letter Obj on group
        this.createLetter();  


    }

    createLetter(){
        let config = this.config;
        config.text = this.letter;

        let letterGameObj = this.scene.make.text(config);

        letterGameObj.setOrigin(0.5, 0.5);
        this.letterObj = letterGameObj;
        this.add(letterGameObj);
    }

    // ...

    // preUpdate(time, delta) {}
}