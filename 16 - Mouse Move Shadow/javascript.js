const hero = document.querySelector('.hero');
const text = document.querySelector('h1');

//the larger this number, the farther the drop shadows move
const walk = 200; //200px

function shadow(event) {
  //this declares the width and height variables in one line
  //offsetWidth and offsetHeight were taken from the hero variable
  //width & height are the measurements of the div
  const { offsetWidth: width, offsetHeight: height } = hero;

  //offsetX & offsetY measures the mouse cursor distance from hero
  let { offsetX: x, offsetY: y } = event;

  //'this' is the hero div
  //event.target changes between the hero div and the h1 inside it
  //when event.target is the h1 element
  //this if statement adds the extra spacing to x and y
  //so that the values are equivalent with the hero div
  if(this !== event.target) {
    x += event.target.offsetLeft;
    y += event.target.offsetTop;
  }

  //this determines how far the shadows should travel
  //e.g. if walk = 100, xWalk range is 50 to -50
  //Math.round makes the decimals into whole numbers
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  //this is the styling for the multiple drop shadows
  //the negative values change the direction of rotation
  text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 red,
  ${-xWalk}px ${yWalk}px 0 blue,
  ${yWalk}px ${-xWalk}px 0 green,
  ${-yWalk}px ${xWalk}px 0 yellow
  `
}

hero.addEventListener('mousemove', shadow);
