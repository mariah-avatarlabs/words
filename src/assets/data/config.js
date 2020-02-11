export const config = {

    hud: {
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

    question: {
        x: 0,
        y: 60,
        point: 10,
        bonus: 20,
        style: {
            fontSize: '22.5px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }    
    },      

    grid: {
        tileSize: 100,
        columns: 4,
        rows: 4,
        layers: 2,
        //back to front
        layerTypes: ['solid', 'image'],
        x: 65,
        y: 0,
        letters: {
            x: 0,
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

    tilePresets: [
        {
            type: 'solid',
            atlasKey: 'blue',
            layer: [0],
            color: ''
        },
        {
            type: 'solid',
            atlasKey: 'green',
            layer: [0],
            color: ''
        },
        {
            type: 'solid',
            atlasKey: 'yellow',
            layer: [0],
            color: ''
        },                
        {
            type: 'image',
            atlasKey: 'letter',
            layer: [1]
        },        
        {
            type: 'image',
            atlasKey: 'cake',
            layer: [1]
        },  
        {
            type: 'image',
            atlasKey: 'dress',
            layer: [1]
        }, 
        {
            type: 'image',
            atlasKey: 'ring',
            layer: [1]
        },                  
    ]



}