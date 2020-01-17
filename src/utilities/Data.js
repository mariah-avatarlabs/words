import axios from 'axios';

const ANA_EP = "http://www.anagramica.com";
const PROXY = "/proxy_api"
// const app = express();

export const getWordSet = (lvlStringSet) => {
    return new Promise(
        (resolve, reject) => {
            axios.get(
                `${PROXY}/all/:${lvlStringSet}`, {
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
                resolve(response.data);
                // return response;
            })
            .catch( er => {
                console.log('fail: ', er)
                reject(er);
            })
        }
    )
}


let DATA = [
    {
        q: "what symbols do dionne see at the top of the map?",
        a: "letters"
    },
    {
        q: "what is tai's last name?",
        a: "fraiser"
    },
]

export const getWordSetB = () => {
    return DATA;

    //scramble word

}