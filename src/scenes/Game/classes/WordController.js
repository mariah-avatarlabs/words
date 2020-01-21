let lvlConfig = {
    consonants: 0,
    vowels: 0,
    length: 9
}


export class WordController {
    constructor(wordbankObj, word) {
        this.word = word;
        this.string = "";

        this.wordbankObj = wordbankObj;
        // this.lettersArr = this.generateLvlLetterSet();
        this.lettersArr = [];
        
        this.availableWords = {};      
        this.userWordBank = [];

    }

    init(){
        console.log('wordctrlword: ', this.word)
        this.generateWordLetterSet(this.word);

    }

    selectRand(quantity, string){
        let randString = ""
        for( let i = 0; i < quantity; i++){
            let letterInx = Math.floor(Math.random() * string.length);
            let letter = string[letterInx];

            // ensure letter selected does not already exist in string
            if(!randString.includes(letter)){
                randString = randString += letter;
            } else {
                i--;
            }

        }

        return randString;

    }

    shuffleString(string){
        let alphabank = "abcdefghijklmnopqrstuvwxyz";

        // add letter to string that does not exist 
        do {
            let letterIndx = Math.floor(Math.random() * (alphabank.length - 0 + 1) + 0);  
            if(!string.includes(alphabank[letterIndx])){
                string+=alphabank[letterIndx];
                console.log('add: ', alphabank[letterIndx])
            }

        } while (string.length < lvlConfig.length)

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