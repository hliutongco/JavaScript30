const slider = document.querySelector('.items');
let startX;
let scrollLeft;
//flag for whether mouse is clicked down
let isDown = false;

slider.addEventListener('mousedown', (event) => {
  isDown = true;
  slider.classList.add('active');
  // this finds the point where the user clicked on the image
  startX = event.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (event) => {
  if(isDown) {
    //prevent default highlight behavior
    event.preventDefault();
    const x = event.pageX - slider.offsetLeft;

    //multiply by three to make scroll animation smoother
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  };
});
