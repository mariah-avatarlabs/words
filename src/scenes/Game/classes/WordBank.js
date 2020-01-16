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
        this.rows = [1];
        this.padding = 2.5;

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

    getXPos(wordObj){
        let xPos;
        let currRowIndx = this.rows.length;
        let wordWidth = wordObj.width + (this.padding * 2);

        // check/update row width with longest word
        if(wordWidth > this.rows[currRowIndx]){
            this.rows[currRowIndx] = wordWidth;
        }

        // add all max row widths to get xpos
        for(let i = 0; i <= currRowIndx; i++){
            xPos = xPos + this.rows[i];
        }

        return xPos;

    }

    updateDisplay(newWord){
        let padding = 2.5;
        let verifiedWordObj = this.scene.make.text(fontConfig);
        let currWordCount = this.words.length - 1;

        
        // check to see if need to create a new row
        let currRowHeight = 
            this.words.length * (verifiedWordObj.height + (padding * this.words.length));

        if((verifiedWordObj.height + currRowHeight + padding) >= this.height){
            this.rows++;
        }

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