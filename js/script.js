import getRandomPoem from './poetryApi.js';

const typingText = document.querySelector(".text-box p"),
  inpField = document.querySelector(".main-box .input-field"),
  tryAgainButton = document.getElementById("tryAgain"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  popupContainer = document.getElementById("popupContainer"),
  popupMessage = document.getElementById("popupMessage");


let timer;
const maxTime = 60,
  averageWordLength = 5,
  minimumAcceptedAccuracy = 35;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let userProgressData = [];


async function initializeGame() {
  try {
    let poem = await getRandomPoem();

    poem = modifyText(poem);

    typingText.innerHTML = "";
    typingText.innerHTML = encasePoemWithSpan(poem);

    initialize();
  } catch (error) {
    console.error('An error occurred while loading new paragraph:', error);
  }
}

function modifyText(poem, wordCount = 80) {
  const lines = poem.split(' ').slice(0, wordCount);
  poem = lines.join(' ');
  poem = poem.replace(/[^a-zA-Z\s.,!?-]/g, ''); //only allows eng alphabet and some symbols ',', '!', '.', '?', '-'
  return poem.replace(/\s+/g, ' ');//removes spaces and returns
}

function encasePoemWithSpan(poem) {
  const poemChars = poem.split("");
  const spans = poemChars.map(char => `<span>${char}</span>`);
  return spans.join("");
}

function initialize() {
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(eventKey) {
  // Get all the individual character spans in the paragraph
  let characters = typingText.querySelectorAll("span");

  if(charIndex >=  characters.length-1 || timeLeft <= 0){
    endGame();
    return;
  }

  if(!isTyping){
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (eventKey === "Backspace") {
    handleBackspace(characters);
  } else {
    handleTypedChar(characters, eventKey);
  }

  characters.forEach(span => span.classList.remove("active"));
  if (characters[charIndex]) {
    characters[charIndex].classList.add("active");
  }
}

function handleBackspace(characters) {
  if (charIndex > 0) {
    if (characters[charIndex - 1].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex - 1].classList.remove("correct", "incorrect");
    charIndex--;
  }
}

function handleTypedChar(characters, typedChar) {
  if (characters[charIndex].innerText == typedChar) {
    characters[charIndex].classList.add("correct");
  } else {
    mistakes++;
    characters[charIndex].classList.add("incorrect");
  }
  charIndex++;
}

/*
function checkSpam(typedChar) {
  const inputText = inpField.value;
  const lastFourChars = inputText.slice(-4);
  if (lastFourChars === typedChar.repeat(4)) {
    for (i = 0; i < 5; i++) {
      if (characters[charIndex - 1].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex - 1].classList.remove("correct", "incorrect");
      charIndex--;
    }
    return true;
  }
  else{return false;}
}
*/
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    displayStats();
  } else {
    clearInterval(timer);
    initTyping();
  }
}

function displayStats() {
  timeTag.innerText = timeLeft;
  //https://www.speedtypingonline.com/typing-equations (net wpm) (changed a little bit)
  let wpm = Math.round(((charIndex - mistakes) / averageWordLength ) / ((maxTime - timeLeft) / 60))
  wpmTag.innerText = wpm;
  mistakeTag.innerText = mistakes;
  cpmTag.innerText = charIndex - mistakes;
  return;
}


function endGame() {
  clearInterval(timer);
  inpField.value = "";
  inpField.disabled = true;
  if(checkValidTest()){
    saveUserProgressData();
  }
  else{
    showNotification("Invalid Test Please try again.")
  }
  return;
}

function checkValidTest(){
  const accuracy = parseFloat(((charIndex - mistakes) / charIndex * 100).toFixed(2));
  return (accuracy > minimumAcceptedAccuracy);
}

function saveUserProgressData() {

  const attemptData = {
    date: new Date().toLocaleString(),
    wpm: parseInt(wpmTag.innerText),
    accuracy: parseFloat(((charIndex - mistakes) / charIndex * 100).toFixed(2))
  };


  const savedUserProgressData = localStorage.getItem('userProgressData');
  if (savedUserProgressData) {

    userProgressData = JSON.parse(savedUserProgressData);
    userProgressData.push(attemptData);
  } else {

    userProgressData = [attemptData];
  }

  localStorage.setItem('userProgressData', JSON.stringify(userProgressData));
  const latestWPM = parseInt(wpmTag.innerText);
  compareResults(latestWPM);
}

function compareResults(latestWPM) {
  const savedUserProgressData = localStorage.getItem('userProgressData');
  if (savedUserProgressData) {
    const userProgressData = JSON.parse(savedUserProgressData);
    const previousWPM = userProgressData.length >= 2 ? userProgressData[userProgressData.length - 2].wpm : 0;
    const difference = latestWPM - previousWPM;

    let improvementMessage = '';
    if (difference > 0) {
      improvementMessage = `You improved by ${difference} WPM from the previous test!`;
    } else if (difference < 0) {
      improvementMessage = `You performed ${Math.abs(difference)} WPM worse than the previous test.`;
    } else {
      improvementMessage = "Your performance is the same as the previous test.";
    }
    showNotification(improvementMessage);
  }
}

async function resetGame() {
  await initializeGame();
  clearStats();
}

function restartTest() {
  clearStats();

  const characters = typingText.querySelectorAll("span");
  characters.forEach(span => {
    span.classList.remove("correct", "incorrect", "active");
  });

  characters[0].classList.add("active");
}

function clearStats() {
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
  inpField.disabled = false;
}

function showNotification(message) {
  popupMessage.innerText = message;
  popupContainer.style.display = "block";
  setTimeout(() => {
    popupContainer.style.display = "none";
  }, 5000);
}


initializeGame();

inpField.addEventListener("keydown", (event) =>{
  const validKeys = /^[A-Za-z\s.,!?-]$/;
  if (event.key === "Backspace") {
    initTyping(event.key)
  } else if (validKeys.test(event.key)) {
    initTyping(event.key);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    restartTest();
  }
  if (event.key === "Escape") {
    restartTest();
  }
});
tryAgainButton.addEventListener("click", () => {
  resetGame();
});