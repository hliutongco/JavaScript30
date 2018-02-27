let voices = [];

//SpeechSynthesisUtterance in a web speech API
const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

//assign textbox text as the text for the audio
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  //voices variable is an array containing all available voices
  voices = this.getVoices();

  //change values displayed in the dropdown menu
  //first filter for english voices
  //then add HTML for each voice option
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}"> ${voice.name} (${voice.lang}) </option>`)
    .join('');
}

//set the voice from the dropdown menu
function setVoice() {
  //use .find to iterate thru all voices
  //until this.value is equal to the voice name
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

//toggles audio play on and off
function toggle(startOver = true){
  //this cancels any current voice that is speaking
  speechSynthesis.cancel();

  //startOver is assigned a value of true by default
  //startOver is assigned the value of false when stopButton is triggered
  if(startOver) {
    speechSynthesis.speak(msg);
  }
}

//set the rate and pitch using the slider
function setOption(){
  //set msg rate & pitch to slider rate & pitch
  msg[this.name] = this.value;
  toggle();
}

//speechSynthesis is a global variable created by SpeechSynthesisUtterance()
speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
