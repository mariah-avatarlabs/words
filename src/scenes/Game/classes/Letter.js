import 'phaser';

let styleConfig = {
    x: 25,
    y: 0,
    style: {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',  // 'left'|'center'|'right'|'justify'
        backgroundColor: '#ff00ff'
    }    
}

export class Letter extends Phaser.GameObjects.Container {
    constructor(scene, x, y, letter, width, height, children) {
        super(scene, x, y, children);

        this.letter = letter;
        this.available = true;

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
            this.available = false;
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
    }

    activate(){
        this.available = true;
    }

    init(){

        // create bg rectangle
        this.createBgRect();

        // create smaller hitbox
        this.createHitRect()
        this.hitBox.setInteractive();
        // Register in current word if user is currently creating a word
        this.hitBox.on('pointerover', () => {
            this.scene.updateTargetLetter(this);
            this.submitLetter();
        })  

        // create letter Obj on group
        this.createLetter();



    


    }

    createLetter(){
        let config = styleConfig;
        config.text = this.letter;

        let letterGameObj = this.scene.make.text(config);
        letterGameObj.setOrigin(0.5, 0.5);
        this.add(letterGameObj);
    }

    // ...

    // preUpdate(time, delta) {}
}