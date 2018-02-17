const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

//JSON.parse takes the items string and reverts it to an object
//if localStorage is blank, it will return a blank array
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(event) {
  //needs this to prevent page from reloading upon submit
  event.preventDefault();

  //this grabs the user's submitted text
  //'this' refers to the form itself
  //[name=item] refers to the input box
  const text = (this.querySelector('[name=item]')).value;

  const item = {
    //shorthand for the input text
    text,
    done: false
  }

  items.push(item);
  populateList(items, itemsList);

  //localStorage is storage that the browser sets aside for the website domain
  //it can only take strings as arguments
  localStorage.setItem('items', JSON.stringify(items));

  //this clears the form
  this.reset();
}

function toggleDone(event) {
  //this only runs if event is on an input
  if(event.target.matches('input')) {
    const el = event.target;

    //index of toggled item in items array
    const index = el.dataset.index;

    //switches the status of 'done' btwn true/false
    items[index].done = !items[index].done;

    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }
}

//we pass the items array and itemsList variable to this function
//NOTE: this function re-renders the whole form
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, index) => {
    //ternary operator added to the end of input code
    //this adds the 'checked' attribute to the input if plate.done is true
    return `
    <li>
    <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''} />
    <label for="item${index}">${plate.text}</label>
    </li>`
  }).join('');
  //.join('') removes extraneous spacing between <li>'s'
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

//in the event the user refresehes, this populates list upon page load
populateList(items, itemsList);
