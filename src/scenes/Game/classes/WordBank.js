import 'phaser';

let fontConfig = {
    x: 0,
    y: 0,
    style: {
        fontSize: '22.5px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',  // 'left'|'center'|'right'|'justify'
    }    
}

export class WordBank extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        this.words = [];

        this.width = 200;
        this.height = 300;
        this.rows = 1;

        scene.add.existing(this);
    }

    init(){
        this.createBgRect();
    }

    createBgRect(){
        let graphicsObj = this.scene.add.graphics({ 
            lineStyle: { width: 2, color: 0x00ff00 }, 
            fillStyle: { color: 0xff0000 }
        });
        var rect = new Phaser.Geom.Rectangle(0, 0, this.height, this.width);

        graphicsObj.strokeRectShape(rect);


        this.add(graphicsObj);


    }

    createWord(newWord){

    }

    needNewRow(){

    }

    updateDisplay(newWord){
        let padding = 2.5;
        let verifiedWordObj = this.scene.make.text(fontConfig);
        
        // check to see if need to create a new row

        verifiedWordObj.x = this.rows * (verifiedWordObj.width + padding);
        verifiedWordObj.y = (this.words.length - 1) * (verifiedWordObj.height + padding);

        verifiedWordObj.text = newWord;

        this.add(verifiedWordObj);

    }

    submitNewWord(word){
        if(!this.doesExist(word)){
            this.words.push(word);
            this.updateDisplay(word);
        }
    }

    doesExist(word){
        // check that word does not exist in current wordbank
        return this.words.includes(word);
    }



}