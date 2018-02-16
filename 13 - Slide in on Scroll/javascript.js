const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(event) {
  sliderImages.forEach(sliderImage => {
    //first add the height of the window to window.scrollY
    //this gives us the Y coordinate of the bottom of the screen as it scrolls
    //we subtract 'sliderImage.height / 2' because the image should slide in
    //when the window's bottom edge is scrolled halfway down the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;

    //this finds the image's bottom edge in relation to the top of the page
    //this is used when scrolling from bottom to top
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    //this checks if slideInAt has scrolled past the top of the image
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    //this checks if the window has scrolled past the bottom of the image
    const isNotScrolledPast = window.scrollY < imageBottom;

    //adds the .active class which contains the slide effect
    if(isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener('scroll', debounce(checkSlide));
