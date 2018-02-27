const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this);

  //this stops bubbling
  e.stopPropagation();
}

//by default, this event will bubble up
//e.g. if you click on the innermost div, it will log all
//the other divs it is embedded in

//NOTE: capture: true reverses the flow so that the event "bubbles down"
//capture is set to false by default
//capture: true with e.stopPropagation only logs the outermost div

//NOTE: once: true makes the event listener run only once per element

divs.forEach(div => div.addEventListener('click', logText, {
  //capture: true,
  //once: true
}));
