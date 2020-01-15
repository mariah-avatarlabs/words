import demoData from '../../../assets/data/data.json'
import {getWordSet} from '../../../utilities/Data';


export default class WordSet {
    constructor(letters) {
      this.letters = letters;
      this.availableWords = {};      
      this.userWordBank = [];

      this.sortWords(demoData.all);
    }

    sortWords(data){

        for (let i = 0; i <= data.length - 1; i++ ){
            let currWord = data[i];

            if(this.availableWords[currWord[0]]){
                // Add current word to that portion
                this.availableWords[currWord[0]].push(currWord);

                // Sorting Algorithm
                

            } else {
                // Create object key for letter
                this.availableWords[currWord[0]] = [currWord];

            }

        }

        console.log('currwords: ', this.availableWords);



    }

    initAvailableWords(){
        console.log('words: ', this.letters)

        this.availableWords = getWordSet(this.letters);
    }


  }