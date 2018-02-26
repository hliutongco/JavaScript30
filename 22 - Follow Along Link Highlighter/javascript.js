const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');

//add the highlight CSS class to the highlight span element
highlight.classList.add('highlight');
document.body.append(highlight);

//the highlight span element inherits the height & width of the hovered link
//then transform the highlight's position to the position of the link
function highlightLink() {
  //'this' refers to the link that the mouse is hovering on
  //get the link's bottom, top, left & right coordinates on the webpage
  //ClientRect also includes the link's height & width
  const linkCoords = this.getBoundingClientRect();
  highlight.style.width = `${linkCoords.width}px`;
  highlight.style.height = `${linkCoords.height}px`;
  highlight.style.transform = `translate(${linkCoords.left}px, ${linkCoords.top}px)`;
}

//add an even listener to each link on the nav
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
