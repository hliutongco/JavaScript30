window.addEventListener('keydown', function(event) {
  let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play()
    key.classList.add('playing');
  };
})

let keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', function(event) {
  if (event.propertyName == 'transform') {
    this.classList.remove('playing');
  }
}));
