let secondHand = document.querySelector('.second-hand');
let minHand = document.querySelector('.min-hand');
let hourHand = document.querySelector('.hour-hand');

function setDate() {
  let now = new Date();
  let seconds = now.getSeconds();
  let mins = now.getMinutes();
  let hour = now.getHours();

  let sDegrees =  ((seconds / 60) * 360) + 90;
  let mDegrees = ((mins / 60) * 360) + 90;
  let hDegrees = ((hour / 12) * 360) + 90;

  secondHand.style.transform = `rotate(${sDegrees}deg)`;
  minHand.style.transform = `rotate(${mDegrees}deg)`;
  hourHand.style.transform = `rotate(${hDegrees}deg)`;
}

setInterval(setDate, 1000);
