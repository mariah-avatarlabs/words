import axios from 'axios';


const ANA_EP = "http://www.anagramica.com";


export const getWordSet =(lvlStringSet) => {
    axios.get(
        `${ANA_EP}/all/:${lvlStringSet}`, {
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"                
            }
        }
    )
    .then( response => {
        console.log('success: ', response)
        return response;
    })
    .catch( er => {
        console.log('fail: ', er)

    })
}

