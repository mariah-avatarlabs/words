export var shuffleString = function(string){
    let alphabank = "abcdefghijklmnopqrstuvwxyz";

    var updateString = function(){
        let letterIndx = Math.floor(Math.random() * (alphabank.length - 0 + 1) + 0);  

        if(!string.includes(alphabank[letterIndx])){
            string+=alphabank[letterIndx];              
        }

        if(string.length < (config.grid.columns * config.grid.rows) ){
            updateString();
        }
    }

    if(string.length < 9){
        updateString();
    }

    let shuffledString = string.split('').sort(() => {
        return 0.5-Math.random()
    }).join('') 

    return shuffledString;
}


export var generateWordLetterSet = function(currWord){
    let letterTrack = {};
    let finString = "";

    for (let i = 0; i <= currWord.length - 1; i++){
        let currLetter = currWord[i];

        // skip additional of duplicate letters
        if(letterTrack[`${currLetter}`] == undefined){
            letterTrack[currLetter] = '';
            finString += currLetter;
        }
    }

    return finString;

}