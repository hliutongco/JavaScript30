let countdown;

//grab the h1 element that displays the time
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  //first clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  //initial time display, before the time starts counting down
  displayTimeLeft(seconds);

  //displays the end time, which is contained in the variable 'then'
  displayEndTime(then);

  //setInterval() runs every second
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)

    //check if timer should stop
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft)
  }, 1000);
}

//displays countdown timer
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  //ternary operator adds a 0 before single digit numbers in seconds
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

//display the endtime when timer reaches 0
function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  //first ternary operator converts military time to regular time
  //second ternary operator adds another 0 in front of single digit numbers in minutes
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
  //the seconds variable accesses the time using the dataset attribute
  //parseInt converts the string into a number
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

//add an event listener to the custom form at the top right corner
document.customForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //'minutes' refers to the input element of the text form which has the name 'minutes'
  const mins = this.minutes.value;
  timer(mins * 60);

  //reset form after submission
  this.reset();
});
