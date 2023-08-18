const backgroundColorInput = document.getElementById("backgroundColor");
const textColorInput = document.getElementById("textColor");
const applyColorsButton = document.getElementById("applyColorsButton");
const wordDisplay = document.getElementById("wordDisplay");
const startButton = document.getElementById("startButton");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");

const wordList = [
    "apple ", "banana ", "cherry ", "date ", "elderberry ", "fig ", "grape ", "honeydew ", "kiwi ", "lemon ",
    "mango ", "orange ", "pear ", "quince ", "raspberry ", "strawberry ", "tangerine ", "ugli ", "watermelon ", "xylophone ",
    "zebra ", "aardvark ", "ant ", "baboon ", "bear ", "beetle ", "butterfly ", "cat ", "chimpanzee ", "crocodile ",
    "dog ", "dolphin ", "eagle ", "elephant ", "flamingo ", "gazelle ", "giraffe ", "gorilla ", "hippopotamus ", "iguana ",
    "jaguar ", "jellyfish ", "kangaroo ", "koala ", "lemur ", "lion ", "lobster ", "macaw ", "manatee ", "mongoose ",
    "narwhal ", "octopus ", "opossum ", "otter ", "panda ", "panther ", "parrot ", "penguin ", "platypus ", "quokka ",
    "raccoon ", "rhinoceros ", "salamander ", "scorpion ", "seagull ", "seahorse ", "sloth ", "snail ", "tarantula ", "toucan ",
    "turtle ", "unicorn ", "vulture ", "walrus ", "warthog ", "wombat ", "x-ray fish ", "yak ", "zebra ", "almond ",
    "blueberry ", "cantaloupe ", "coconut ", "dragonfruit ", "elderberry ", "fig ", "grapefruit ", "honeydew ", "kiwi ", "lemon ",
    "mango ", "orange ", "peach ", "pineapple ", "raspberry ", "strawberry ", "tangerine ", "watermelon ", "artichoke ", "broccoli ",
    "carrot ", "cauliflower ", "cucumber ", "eggplant ", "garlic ", "lettuce ", "mushroom ", "onion ", "pepper ", "potato ",
    "pumpkin ", "radish ", "spinach ", "squash ", "tomato ", "zucchini ", "bicycle ", "bus ", "car ", "motorcycle ",
    "scooter ", "subway ", "taxi ", "train ", "tram ", "truck ", "van ", "airplane ", "balloon ", "boat ",
    "cruise ship ", "helicopter ", "hot air balloon ", "kayak ", "rocket ", "sailboat ", "submarine ", "tractor ", "spaceship ", "unicorn "
    // ... Add more words here ...
  ];
  

let currentWordIndex = 0;
let currentLetterIndex = 0;
let typingStarted = false;
let typingStartTime;
let typingEndTime;

applyColorsButton.addEventListener("click", applyCustomColors);
startButton.addEventListener("click", startTyping);
document.addEventListener("keydown", checkTyping);

wordDisplay.innerHTML = "";
wordList.forEach(word => {
  const wordSpan = document.createElement("span");
  for (const letter of word) {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    wordSpan.appendChild(letterSpan);
  }
  wordDisplay.appendChild(wordSpan);
});

function applyCustomColors() {
  const newBackgroundColor = backgroundColorInput.value;
  const newTextColor = textColorInput.value;
  document.body.style.backgroundColor = newBackgroundColor;
  document.body.style.color = newTextColor;
}

function startTyping() {
  if (!typingStarted) {
    typingStarted = true;
    startButton.disabled = true;
    resetLetterColors();
    startTimer();
  }
}

function startTimer() {
  let remainingSeconds = 60;
  timerElement.textContent = `Time remaining: ${remainingSeconds} seconds`;

  const timerInterval = setInterval(() => {
    remainingSeconds--;
    timerElement.textContent = `Time remaining: ${remainingSeconds} seconds`;

    if (remainingSeconds === 0) {
      clearInterval(timerInterval);
      finishTyping();
    }
  }, 1000);
}

function finishTyping() {
  typingEndTime = new Date().getTime();
  const totalTimeInMinutes = 1;
  const typedWords = currentWordIndex;
  const typingSpeed = Math.round(typedWords / totalTimeInMinutes);

  resultElement.textContent = `Your typing speed: ${typingSpeed} WPM`;
  typingStarted = false;
  currentWordIndex = 0;
  startButton.disabled = false;
}

function checkTyping(event) {
  if (!typingStarted) return;

  const typedCharacter = event.key;
  const currentWord = wordList[currentWordIndex];
  const currentLetter = currentWord[currentLetterIndex];

  if (typedCharacter === currentLetter) {
    if (currentLetterIndex === 0) {
      typingStartTime = new Date().getTime();
    }

    const currentWordSpan = wordDisplay.children[currentWordIndex];
    currentWordSpan.children[currentLetterIndex].classList.add("correct-letter");
    currentLetterIndex++;

    if (currentLetterIndex === currentWord.length) {
      currentWordIndex++;
      currentLetterIndex = 0;

      if (currentWordIndex === wordList.length) {
        finishTyping();
      }
    }
  }
}

function resetLetterColors() {
  wordList.forEach((word, wordIndex) => {
    const wordSpan = wordDisplay.children[wordIndex];
    Array.from(wordSpan.children).forEach(letterSpan => {
      letterSpan.classList.remove("correct-letter");
    });
  });
}
