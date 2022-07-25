document.addEventListener("DOMContentLoaded", () => {
  const qwerty = document.getElementById('qwerty');
  const overlay = document.getElementById('overlay');
  const ul = document.querySelector('#phrase ul');
  let missed = 0;

  /*

   // Start the Game
   overlay.addEventListener('click', (e) => {
   if (e.target.tagName === "BUTTON") {
   const button = e.target;
   const action = button.className;

   const nameAction = {
   start: () => {
   overlay.style.display = "none";
   },
   restart: console.log('object'),
   // restart: () => {
   //   // window.location.reload();
   // },
   };
   nameAction[action]();
   }
   });
   */

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
    const lettersArray = document.querySelectorAll('.letter');
    let matched = null;

    for (let i = 0; i < lettersArray.length; i++) {
      if (lettersArray[i].textContent.includes(btn.textContent)) {
        matched = [];
        lettersArray[i].className = 'show';
        matched.push(lettersArray[i]);
      }
    }
    return matched;
  };

// check if the game has been won or lost
  const checkWin = () => {
    const liLetter = document.getElementsByClassName('letter');
    const btnReset = document.querySelector('#btn__reset');
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
