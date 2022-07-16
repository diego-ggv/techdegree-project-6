// document.addEventListener("DOMContentLoaded", () => {

// const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.querySelector('.start');
const ul = phrase.children;

// let missed = 0;

// Start the Game
start.addEventListener('click', (e) => {
  const overlay = document.getElementById('overlay');

  if (e.target.tagName === "BUTTON") {
    overlay.style.display = "none";
  }
});


// Return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  const i = Math.floor(Math.random() * arr.length);
  const array = arr[i];

  return array.split("");
};

// getRandomPhraseAsArray(phrases);
getRandomPhraseAsArray(phrases);
console.log(getRandomPhraseAsArray(phrases));

// Add an array of strings to the display
// Takes andy array as an argument


const addPhraseToDisplay = (array) => {
//
//     // Loop through the array for each character in the array
  for (let i = 0; i < array.length; i++) {
//       // Create a LI element
    const li = document.createElement('li');
//       // Pass array current index value as li text content
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
  ul.append(li);
  }
  // console.log();
    return ul;
};
//
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
console.log(phraseArray);

// Check if the letter is in the phrase
//   const checkLetter = () => {
//
//   };

// check if the game has been won or lost
//   const checkWin = () => {
//
//   };

// Listen for the start game button to be pressed


// Listen for the onscreen keyboard to be clicked


// });