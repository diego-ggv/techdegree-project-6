document.addEventListener("DOMContentLoaded", () => {
  const qwerty = document.getElementById('qwerty');
  const overlay = document.getElementById('overlay');
  const ul = document.querySelector('#phrase ul');
  let missed = 0;

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
  const phraseArray = getRandomPhraseAsArray(phrases);
// Calls addPhraseToDisplay function and passes phraseArray as parameter
  addPhraseToDisplay(phraseArray);
  console.log(phraseArray);

// Checks if the selected letter is in the phrase array
  const checkLetter = (btn) => {
    // Stores all LI elements with a letter class name
    const lettersArray = document.querySelectorAll('.letter');
    // Creates an empty variable to store all matching letters
    let matched = null;
    // Loops through all letters
    for (let i = 0; i < lettersArray.length; i++) {
      // if the letter text content includes the button text content
      if (lettersArray[i].textContent.includes(btn.textContent)) {
        // makes matched an empty array
        matched = [];
        // current letter class name is set equal to 'show'
        lettersArray[i].className = 'show';
        // adds current letter to matched array
        matched.push(lettersArray[i]);
      }
    }
    // returns array with all matching letters
    return matched;
  };

  // check if the game has been won or lost
  const checkWin = () => {
    // stores all LI elements with the class name 'letter'
    const liLetter = document.getElementsByClassName('letter');
    // stores the button with the ID btn_reset
    const btnReset = document.querySelector('#btn__reset');
    // stores 
    const banner = document.querySelector('.title');

    const wonLost = (result, text) => {
      ul.style.display = 'none';
      banner.textContent = text;
      overlay.className = result;
      overlay.style.display = 'flex';
      btnReset.textContent = 'Restart Game';
      btnReset.className = 'restart';
    };

    if (liLetter.length === 0) {
      wonLost('win', 'YOU WON!');
    }
    if (missed >= 5) {
      wonLost('lose', 'GAME OVER!');
    }
  };

// Listen for the onscreen keyboard to be clicked
  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const letterFound = checkLetter(button);


      button.disabled = true;

      if (letterFound === null) {
        const hearts = document.querySelectorAll('.tries img');
        button.className = 'incorrect';
        hearts[missed].src = 'images/lostHeart.png';
        missed++;
      }
      else {
        button.className = "correct";
      }
      checkWin();
    }
  });

  // Start the Game
  overlay.addEventListener('click', (e) => {

    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const action = button.className;

      const nameAction = {
        start: () => {
          overlay.style.display = "none";
        },
        restart: () => {
          const keystrokes = document.querySelectorAll('#qwerty .key-row button');
          const hearts = document.querySelectorAll('.tries img');
          const phraseArray = getRandomPhraseAsArray(phrases);

          const removeAllChildNodes = (parent) => {
            while (parent.firstChild) {
              parent.removeChild(parent.firstChild);
            }
          };

          removeAllChildNodes(ul);
          addPhraseToDisplay(phraseArray);

          ul.style.removeProperty("display");
          overlay.style.display = "none";

          for (let i = 0; i < keystrokes.length; i++) {
            keystrokes[i].className = '';
            keystrokes[i].disabled = false;
          }
          for (let i = 0; i < hearts.length; i++) {
            hearts[i].src = 'images/liveHeart.png';
          }

          missed = 0;
          console.log(phraseArray);
        },
      };
      nameAction[action]();
    }
  });
});


/*
 TODO: 
 - comment document
 */
