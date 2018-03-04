const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let timeUp;
let lastHole;
let score = 0;

function randomTime(min, max) {
  return Math.random() * (max - min) + min;
}

//grab 'holes' nodelist containing the divs where moles appear
function randomHole(holes) {
  //holes.length is the number of hole divs, which is 6
  //idx will always be a number between 0 and 5
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  //check if this hole is the same as the previous one
  //use recursion until a different hole is selected
  if(hole === lastHole) {
    return randomHole(holes);
  }

  //save the current hole
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);

  //the CSS class 'up' makes the mole image pop up
  hole.classList.add('up');

  //after a random time, remove the class 'up'
  //recursion so the game runs while timeUp is false
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp){
      peep();
    }
  }, time);
}

function startGame() {
  //reset scoreBoard and timeUp
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();

  //this sets the game length to ten seconds
  setTimeout(() => {
    timeUp = true;
  }, 10000)
}

function bonk(event) {
  //isTrusted condition prevents edge cases where people cheat using code
  if(event.isTrusted) {
    score++;
    //make the mole go down upon click
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }
}

moles.forEach(mole => mole.addEventListener('click', bonk));

//for future: levels? local storage?
