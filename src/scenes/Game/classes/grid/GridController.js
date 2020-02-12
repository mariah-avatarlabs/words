
export class GridController {
    constructor(gridContainerObj) {
        this.gridListener = null;
        this.activeTiles = {
            1: null,
            2: null
        }
        this.activeStreak = false;
        this.gridObj = gridContainerObj;
    }

    init(){
        this.createGridListener();
    }

    createGridListener(){
        console.log('created')

        document.addEventListener('tileSelect', (e) => {
            if(e.detail.tile)
                this.assignTargetTiles(e.detail.tile);
            else    
                throw('ERROR: NO TILE IN EVENT')

            console.log('gridClicked: ', e)
            // e.target matches elem
        });
    }

    assignTargetTiles(tileObj){
        if (this.activeTiles[1] == null){
            this.activeTiles[1] = tileObj;
            // tileObj.activate()
        } else if (this.activeTiles[2] == null) {
            this.activeTiles[2] = tileObj;
            // tileObj.activate()
            this.evalTiles()

        }
    }

    evalTiles(){
        console.log('EVALTILES: ', this.activeTiles);
    }

}