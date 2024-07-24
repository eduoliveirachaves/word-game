let row = 0;
let col = 1;
const rows = [".one", ".two", ".three", ".four", ".five"];
const validChars = ['Backspace', 'Enter'];
let correctWord = "";
let end = false;


async function init() {
    await getCorrectWord();

    addEventListener("keydown", function (event) {
        if (!end && validInput(event.key)) {

            if (event.key === "Backspace") {
                backspace();
                return;
            }

            if (event.key === "Enter") {
                if (col > 5) {
                    //check if input is a valid word
                    const word = setWord();

                    isValidWord(word).then(function (valid) {
                        if (valid) {
                            processInput(word);
                        }
                    });
                    return;
                }
            }

            document.querySelector(rows[row])
                .querySelector(`.letter:nth-child(${col})`)
                .innerText = event.key;

            col++;
        }
    });
}

function backspace() {
    if (col > 1) {
        col--;
    }
    document.querySelector(rows[row])
        .querySelector(`.letter:nth-child(${col})`)
        .innerText = null;
}

function processInput(word) {
    answerCheck(word)
    col = 1;
    row++;
}

function answerCheck(input) {
    if (input === correctWord) {
        end = true;
        alert("You win");
    }

    let letterColor = Array(6).fill("wrong");
    
    for (let i = 0; i < 5; i++) {
        if (input.charAt(i) === correctWord.charAt(i)) {
            letterColor[i + 1] = "correct"; // Correct position
        } else if (correctWord.includes(input.charAt(i))) {
            letterColor[i + 1] = "correctletter"; // Correct letter, wrong position
        }
    }
    applyColors(letterColor);
    
    if (row === 5) {
       alert("Game Over");
    }
}

function setWord() {
    let word = "";
    for (let i = 1; i < 6; i++) {
        word += document.querySelector(rows[row])
            .querySelector(`.letter:nth-child(${i})`)
            .innerText;
    }
    return word.toLowerCase();
}

function validInput(input) {
    return input.match(/^[a-zA-Z]$/) || validChars.includes(input);
}

async function isValidWord(word) {
    const url = "https://words.dev-apis.com/validate-word";
    const promise = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "word": word
        })
    });
    const json = await promise.json();
    console.log(json)
    return json.validWord;
    
}

async function getCorrectWord() {
    const url = "https://words.dev-apis.com/word-of-the-day";
    const promise = await fetch(url);
    const json = await promise.json();
    correctWord = json.word;
}

function applyColors(array) {
    const r = document.querySelector(rows[row]);
    
    for (let i = 1; i < 6; i++) {
        let element = r.querySelector(`.letter:nth-child(${i})`);
        element.classList.add(`${array[i]}`);
    }
}

init();
