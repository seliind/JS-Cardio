const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer= setInterval(() => {
      if(maxTime > 0) {
        maxTime--;
        return timeText.innerText = maxTime;
      }
      clearInterval(timer);
    alert(`Time up! ${correctWord.toUpperCase()} was the correct answer! Sorry :((`);
    initGame();
    }, 1000);
};

const initGame = () => {
    initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for( let i = wordArray.length - 1; i>0; i--){
    let j = Math.floor(Math.random() * (i+1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText=randomObj.hint;
  correctWord = randomObj.word.toLocaleLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length)
  console.log(randomObj)
};

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert(`Please enter a word honey!`);
    if(userWord !== correctWord) return alert(`OOps! ${userWord} is not a correct word :(`);
    alert(`Congrats! ${userWord} is a correct word! Wowza :)`)
    initGame();
}

initGame()
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
