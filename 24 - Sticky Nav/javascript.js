const nav = document.querySelector('#main');

//grab the default position of the top of the nav bar
const topOfNav  = nav.offsetTop;

//when scrolling below the default nav position, add the .fixed-nav CSS class
//remove the .fixed-nav class when above the default nav position
//.fixed-nav includes fixed position & fixed logo
function fixNav() {
  if(window.scrollY >= topOfNav) {
    //nav.offsetHeight removes the default jerky movement
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
