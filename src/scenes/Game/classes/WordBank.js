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

        this.width = 300;
        this.height = 200;
        this.cols = [];
        this.currColH = 0;
        this.padding = 2.5;

        scene.add.existing(this);
    }

    init(){
        this.createBgRect();
        this.createNewCol();
    }

    createBgRect(){
        let graphicsObj = this.scene.add.graphics({ 
            lineStyle: { width: 2, color: 0x00ff00 }, 
            fillStyle: { color: 0xff0000 }
        });
        var rect = new Phaser.Geom.Rectangle(0, 0, this.width, this.height);

        graphicsObj.strokeRectShape(rect);


        this.add(graphicsObj);


    }

    needsNewCol(verifiedWordObj){
        // check if needed to create new column
        let wordHeight = 
            (this.padding * 2) + verifiedWordObj.displayHeight;

        if( this.currColH + wordHeight >= this.height ){
            this.currColH = 0;
            return true;
        } else {
            this.currColH += wordHeight;
            return false;
        }
    }

    updateWordBank(word){
        this.words.push(word);
    }

    createNewCol(){
        let colConfig = {
            w: 0,
            h: 0
        }

        this.cols.push(colConfig)
    }

    updateDisplay(newWord){
        this.updateWordBank(newWord);
        
        let currColIndx = this.cols.length - 1;
        let currCol = this.cols[currColIndx];
        
        let padding = 2.5;
        console.log('currcol: ', currCol)

        let newWordObj = this.scene.make.text(fontConfig);
        newWordObj.text = newWord;

        let newWordObjW = newWordObj.displayWidth + padding;
        let newWordObjH = newWordObj.displayHeight + padding;
        console.log('newWordObjH: ', newWordObjH)


        // HEIGHT
        if(currCol.h + newWordObjH > this.height){
            // do i need to call again?
            this.createNewCol();
            currColIndx = this.cols.length - 1;
            currCol = this.cols[currColIndx];            
        }

        newWordObj.y = currCol.h;
        currCol.h += newWordObjH;
        console.log('yPos: ', currCol.h)


        // update col width
        if(currCol.w < newWordObjW){
            currCol.w = newWordObjW;
        }

        let xPos = 0;
        if( this.cols.length == 1){
            xPos = 0;
        } else {
            for (let i = 0; i < this.cols.length - 1; i++ ){
                console.log('tagetcolwidth: ', this.cols[i])
                xPos = xPos + this.cols[i].w + padding;
            }
        }
        newWordObj.x = xPos;



        // add to group
        this.add(newWordObj);

    }






}