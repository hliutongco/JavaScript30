const canvas = document.querySelector('#draw');

//this is where we do the drawing for the canvas
const ctx = canvas.getContext('2d');

//scales the canvas to be the same size as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//makes the end of the linestrokes round and smooth
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

//increases line width
ctx.lineWidth = 100;

//below code allows colors to overlap and blend
//ctx.globalCompositeOperation = 'multiply';

//default is false; only changes when event listener detects a mousedown
let isDrawing = false;

//x, y coordinates for where the line starts and stops
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if(isDrawing) {

    //uses hsl to set the initial color of the linestroke
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();

    //start from these x, y coordinates
    ctx.moveTo(lastX, lastY);

    //move to these x, y coordinates
    //offsetX and offsetY are keys in the mousemove event
    ctx.lineTo(e.offsetX, e.offsetY);

    //this makes the line visible
    ctx.stroke();

    //this updates the start of the line to the new coordinates
    //so that it doesn't create a new line each time the mouse moves
    [lastX, lastY] = [e.offsetX, e.offsetY];

    //changes the color of the linestrokes
    hue++;

    //this flips the increment/decrement of the lineWidth values
    //when lineWidth >= 100, the lineWidth decrements
    //when lineWidth <= 1, the lineWidth increments
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }

    if(direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;

  //this updates the x, y coordinates so that the line
  //begins at the coordinates of the click rather than at 0, 0
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);

//when you click out of the window
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('mousemove', draw);
