let row = 0;
let col = 1;
const rows = [".row-1", ".row-2", ".row-3", ".row-4", ".row-5"];
const validChars = ["Backspace", "Enter"];
let correctWord = "";
let end = false;

addEventListener("DOMContentLoaded", () => {
  console.log("3");
  const gameDiv = document.querySelector(".game");

  for (let i = 1; i <= 5; i++) {
    const wordRow = document.createElement("div");
    wordRow.classList.add("word-row", `row-${i}`);

    for (let j = 0; j < 5; j++) {
      const letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      wordRow.appendChild(letterDiv);
    }

    gameDiv.appendChild(wordRow);
  }
});

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

      document
        .querySelector(rows[row])
        .querySelector(`.letter:nth-child(${col})`).innerText = event.key;

      col++;
      console.log("key");
    }
  });
}

function backspace() {
  if (col > 1) {
    col--;
  }
  document
    .querySelector(rows[row])
    .querySelector(`.letter:nth-child(${col})`).innerText = null;
}

function processInput(word) {
  answerCheck(word);
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
    word += document
      .querySelector(rows[row])
      .querySelector(`.letter:nth-child(${i})`).innerText;
  }
  return word.toLowerCase();
}

function validInput(input) {
  return input.match(/^[a-zA-Z]$/) || validChars.includes(input);
}

async function isValidWord(word) {
  const url = "https://words.dev-apis.com/validate-word";
  const promise = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      word,
    }),
  });
  const json = await promise.json();
  return json.validWord;
}

async function getCorrectWord() {
  const url = "https://words.dev-apis.com/word-of-the-day";
  const getWord = await fetch(url, {
    method: "GET",
  });
  const json = await getWord.json();
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
