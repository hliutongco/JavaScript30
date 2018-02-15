const player = document.querySelector('.player');
const video =  player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚❚';
}

function skipSeconds() {
  //first convert timestamp to a float before adding to the video time
  //HTML elements with a data-skip attribute of -10
  //will actually delete 10secs from the current time
  video.currentTime += parseFloat(this.dataset.skip);
}

function videoRangeUpdate() {
  //'this' can apply to either playback rate or volume
  video[this.name] = this.value;
}

function changeProgressBar() {
  //percentage of current playthru out of total video length
  const percent = (video.currentTime / video.duration) * 100;

  //flex-basis is a progress bar attribute that shows the percentage filled
  progressBar.style.flexBasis = `${percent}%`;
}

function skip(event) {
  //use offsetX to see how far user skipped into the video
  //divide by overall width of the progress bar
  const skipTime = (event.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = skipTime;
}

//adds an event listener to update progress bar as the video plays
video.addEventListener('timeupdate', changeProgressBar);
//adds an event listener to the progress bar when user clicks/skips thru video
progress.addEventListener('click', skip);

let mousedown = false;
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);

//checks if mousedown is true before running skip
progress.addEventListener('mousemove', (event) => mousedown && skip(event));

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

//adds an event listener to any HTML element with the data-skip attribute
skipButtons.forEach(button => button.addEventListener('click', skipSeconds));

//this adds event listeners to the volume and playback rate sliders
ranges.forEach(range => range.addEventListener('change', videoRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', videoRangeUpdate));
