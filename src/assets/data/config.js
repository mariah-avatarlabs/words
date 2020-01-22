export const config = {

    hud: {
        score: {
            x: 0,
            y: 0,
            point: 10,
            bonus: 20,
            style: {
                fontSize: '22.5px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center'
            }    
        },

        wordDisplay: {
            x: 160,
            y: 25,
            bgRect: {
                height: 50,
                width: 250
            },
            copyConfig: {
                x: 0,
                y: 0,
                width: 50,
                height: 150,
                text: "---------",
                style: {
                    fontSize: '37.5px',
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    align: 'center',
                }           
            }
        },

                
        timer: {
            x: 310,
            y: 0,
            style: {
                fontSize: '22.5px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
            }  
        },


    },

    grid: {
        tileSize: 100,
        columns: 3,
        rows: 3,
        letters: {
            x: 25,
            y: 0,
            style: {
                fontSize: '64px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
                backgroundColor: '#ff00ff'
            }    
        }
    },

    activeWordDisplay: {
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
                align: 'center',
            }           
        }
    },

    wordBank: {
        style: {
            fontSize: '22.5px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'          
        }
    },

    score: {
        point: 10,
        bonus: 20,
        style: {
            fontSize: '22.5px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }    
    },

    timer: {
        x: 0,
        y: 0,
        style: {
            fontSize: '22.5px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
        }  
    }

}