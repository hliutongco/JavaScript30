const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

//the menus have an opacity of 0 by default
//handleEnter adds CSS classes to the li elements
//so that the menus have display: block & opacity: 1
function handleEnter() {
  this.classList.add('trigger-enter');

  //use () => arrow function so that the value of 'this' will remain unchanged
  //otherwise 'this' refers to the window object
  //if statement covers the edge case where the cursor leaves the menu very quickly
  //so that the menu will no longer appear if the cursor is already gone
  setTimeout(() => {
    if(this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active');
    }
  }, 150);

  //this makes a white background appear behind the menu
  background.classList.add('open');

  //grab the ul element containing the current menu
  //get its top & bottom & left & right coordinates + height & width
  //grab the nav coordinates in order to remove offset spacing
  //NOTE: navCoords & dropdownCoords contain the absolute position
  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  //give the white background the same size & coordinates as the current menu
  background.style.setProperty('width', `${dropdownCoords.width}px`);
  background.style.setProperty('height', `${dropdownCoords.height}px`);

  //subtract the navCoords since the nav offsets/adds extra spacing
  background.style.setProperty('transform', `translate(${dropdownCoords.left - navCoords.left}px, ${dropdownCoords.top - navCoords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
