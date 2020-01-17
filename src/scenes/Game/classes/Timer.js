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

export class Timer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        this.intervalTime = 10;
        this.gameTime = this.intervalTime * 3;
        this.currTime = this.gameTime;
        
        this.timeEv = null;
        this.timeText = null;

        scene.add.existing(this);
    }

    init(){
        // create timer text
        this.createTimerDisplay();

        // create time event
        this.timeEv = this.scene.time.addEvent({
            delay: 1000,
            callback: () => { 
                console.log('hit')
                this.decTime() 
            },
            timeScale: 1.0,
            loop: true,
        })
    }

    decTime(){
        if(this.currTime > 0){
            this.currTime--;
            this.timeText.text = this.currTime.toString();
        }
    }

    createTimerDisplay(){
        let timeTextObj = this.scene.make.text(fontConfig);
        timeTextObj.text = this.gameTime;

        this.timeText = timeTextObj;
        this.add(timeTextObj);
    }

    start(){
        // this.timeEv.start
    }

}