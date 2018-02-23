window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');

const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  //turn e.results into an array and then iterate over the array
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    //this joins the above results into one line
    //so that the words don't appear one by one
    .join('')

    p.textContent = transcript;

    //this creates new p element for new speech
    //instead of overwriting the same p element each time
    if(e.results[0].isFinal) {
      p = document.createElement('p');
      words.appencdChild(p);
    }
});

//so the event listeners will be continuous
recognition.addEventListener('end', recognition.start);

recognition.start();
