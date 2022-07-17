// document.addEventListener("DOMContentLoaded", () => {

const qwerty = document.getElementById('qwerty');
// const phrase = document.getElementById('phrase');
const start = document.querySelector('.start');
const ul = document.querySelector('#phrase ul');

let missed = 0;

// Start the Game
start.addEventListener('click', (e) => {
  const overlay = document.getElementById('overlay');

  if (e.target.tagName === "BUTTON") {
    overlay.style.display = "none";
  }
});


// Return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  // Generates a random value taking the length of the given array as max value
  const i = Math.floor(Math.random() * arr.length);
  // Stores array in a constant taking random number as the array index value
  const array = arr[i];

  // Returns a new created array of characters
  return array.split("");
};

// Add an array of strings to the display
const addPhraseToDisplay = (array) => {
// Loop through the array for each character in the array
  for (let i = 0; i < array.length; i++) {
    // Create a LI element
    const li = document.createElement('li');
    // Pass array current index value as li text content
    li.textContent = array[i];

    //if LI text content is strictly equal to a space
    if (li.textContent === ' ') {
      // LI class equal to "space"
      li.className = 'space';
    }
    else {
      // LI class equal to "letter"
      li.className = 'letter';
    }
    // Appends LI element to UL node
    ul.appendChild(li);
  }
};
// Stores generated array in a new constant
const phraseArray = getRandomPhraseAsArray(test);
// Calls addPhraseToDisplay function and takes phraseArray as parameter
addPhraseToDisplay(phraseArray);
console.log(phraseArray);

// Check if the letter is in the phrase
const checkLetter = (btn) => {
  // const lettersArray = document.getElementsByClassName('letter');
  const lettersArray = document.querySelectorAll('.letter');
  let matched = [];

  for (let i = 0; i < lettersArray.length; i++) {

    if (lettersArray[i].textContent.includes(btn.textContent)) {
      lettersArray[i].className = 'show';

      matched.push(lettersArray[i]);
    }
    else {
      matched = null;
    }

  }

  console.log(`matched value is ${matched}`);
  return matched;
};
// checkLetter(test);

// check if the game has been won or lost
//   const checkWin = () => {
//
//   };

// Listen for the start game button to be pressed


// Listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {

  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const letterFound = checkLetter(button);

    button.className = "chosen";
    button.disabled = true;

    if (letterFound === null){
      missed ++;
      console.log(`you have missed ${missed} times`)
    }
  }

});

// });