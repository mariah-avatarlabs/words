import { config } from '../../../assets/data/config.js'


export class WordController {
    constructor(word) {
        this.word = word;
        this.string = "";

        this.lettersArr = [];
        
        this.availableWords = {};      
        this.userWordBank = [];

    }

    init(){
        this.generateWordLetterSet(this.word);

    }


    shuffleString(string){
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

        // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
        let shuffledString = string.split('').sort(() => {
            return 0.5-Math.random()
        }).join('') 

        return shuffledString;
    }

    generateWordLetterSet(currWord){
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

        this.letters = finString;
        this.string = this.shuffleString(finString);
        console.log("new set: ", this.string)
        this.lettersArr = this.string.split('');

    }

    update(newWord){
        this.word = newWord;
        this.generateWordLetterSet(this.word);
    }
    

  }