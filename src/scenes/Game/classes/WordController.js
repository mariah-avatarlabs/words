import demoData from '../../../assets/data/data.json'
import {getWordSet} from '../../../utilities/Data';

let lvlConfig = {
    consonants: 0,
    vowels: 0,
    length: 9
}


export default class WordController {
    constructor(wordbankObj, level) {

        this.wordbankObj = wordbankObj;
        this.level = level;
        this.lettersArr = this.generateLvlLetterSet();

        this.availableWords = {};      
        this.userWordBank = [];

    }

    init(){
        // refactor - need control jic too many in response
        this.getAvailableWords()
            .then(
                words => { this.availableWords = this.sortWords(words.all); console.log(this) } 
            ).catch(
                err => console.log(err)
            );
        
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
        // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
        let shuffledString = string.split('').sort(() => {
            return 0.5-Math.random()
        }).join('')

        return shuffledString;
    }

    generateLvlLetterSet(){
        var possibleC = "bcdfghjklmnpqrstvwxz";
        var possibleV = "aeiouy";
        var wordLength = lvlConfig.length;
        var lettersArr = new Array(wordLength);
        let numVowels;
        let numConsonants;
        let vowels;
        let consonants;

        // refactor - vowel to consonant for levels
        switch (this.level) {
            case 1:
                numVowels = lvlConfig.length - Math.abs(lvlConfig.length / 2);
                break;

            case 2:
                numVowels = lvlConfig.length - Math.abs(lvlConfig.length / 3);
                break;   
            
            case 3:
                numVowels = lvlConfig.length - Math.abs(lvlConfig.length / 4);
                break;   
                
        }

        if(numVowels < 1){ numVowels = 1 };
        numVowels = Math.floor(numVowels);
        numConsonants = lvlConfig.length - numVowels;

        vowels = this.selectRand(numVowels, possibleV);
        consonants = this.selectRand(numConsonants, possibleC);
        
        // shuffle letters and assign to array
        lettersArr = this.shuffleString(vowels + consonants).split('');
        return lettersArr;

    }

    sortWords(data){
        let sortedWordsObj = {}

        for (let i = 0; i <= data.length - 1; i++ ){
            let currWord = data[i];

            if(sortedWordsObj[currWord[0]]){
                // Add current word to that portion
                sortedWordsObj[currWord[0]].push(currWord);

                // refactor - Sorting Algorithm


            } else {
                // Create object key for letter
                sortedWordsObj[currWord[0]] = [currWord];

            }

        }

        return sortedWordsObj;

    }

    isValidWord(newWord){
        let wordIndx = newWord[0];
        if(this.availableWords[wordIndx]){
            return this.availableWords[wordIndx].includes(newWord);
        } else {
            return false;
        }
    }

    submitNewWord(word){
        if(
            !this.doesExistInBank(word) &
            this.isValidWord(word)
        ){
            this.userWordBank.push(word);
            
            // refactor - two source truth
            this.wordbankObj.updateDisplay(word);
        }

    }
    
    doesExistInBank(word){
        // check that word does not exist in current wordbank
        return this.userWordBank.includes(word);
    }
    
    getAvailableWords(){
        let lettersString = this.lettersArr.join('');
        return getWordSet(lettersString);
    }


  }