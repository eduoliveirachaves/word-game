const url = "https://words.dev-apis.com/word-of-the-day"
let row = 0;
let col = 1;
const rows = [".one", ".two", ".three", ".four", ".five"];
const validChars = ['Backspace', 'Enter'];

function init() {

    //letter function
    addEventListener("keydown", function (event) {

        if (gameEnd() || !validInput(event.key)) {
            return;
        }
        
        if (event.key === "Backspace") {
            backspace();
            return;
        }

        if (col > 5) {
            if (event.key === "Enter") {
                //check if valid word
                if (true) {
                    //process and evaluate answer
                    col = 1;
                    row++;
                    //check answer
                    answerCheck()
                }

            }
            
            return;
        }

        document.querySelector(rows[row])
            .querySelector(`.letter:nth-child(${col})`)
            .innerText = event.key;

        col++;
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

function gameEnd() {
    return row === 5;
}

function answerCheck () {
    let correctWord = "";
    let word = "";
    for (let i = 1; i < 5; i++) {
        word = document.querySelector(rows[row])
            .querySelector(`.letter:nth-child(${i})`)
            .innerText;
    }
}

function validInput(input) {
    return input.match(/^[a-zA-Z]$/) && validChars.includes(input);
}




init();
