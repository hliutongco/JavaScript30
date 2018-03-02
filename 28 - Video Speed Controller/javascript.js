const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

speed.addEventListener('mousemove', function(event) {
  //get y coordinate of cursor's current placement on the speed bar
  //subtract offsetY to remove any extra padding on top of the speed bar
  //find the percentage that 'y' takes up on the speed bar
  const y = event.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;

  //minimum and maximum values of the speed bar
  const min = 0.4;
  const max = 4;

  //'percent' is currently a decimal
  //turn the decimal into a rounded percentage
  const height = Math.round(percent * 100) + '%';

  //playbackRate number should reflect the max and min variables
  //i.e. 0.4 to 4.0
  //subtract min to get percentage of the remaining area
  //add min to the total - this is the number that appears on the speed bar
  const playbackRate = percent * (max - min) + min;

  //set bar height and playback speed text
  bar.style.height = height;

  //.toFixed(2) turns playback rate into a decimal
  //with two digits after the decimal
  bar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
});
