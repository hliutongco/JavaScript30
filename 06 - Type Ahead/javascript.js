//link to JSON file
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

//fetch returns a Promise
//the data needs to first be converted to JSON before we can act upon it
fetch(endpoint)
  .then(fetchedData => fetchedData.json())
  .then(jsonData => cities.push(...jsonData));
  //jsonData (below) is an array containing the JSON data
  //use spread operator to directly push the elements of the jsonData array into the cities array

//findMatches() returns an array of matching cities/states
function findMatches(wordToMatch, cities) {
  return cities.filter(location => {
    //compares user input (wordToMatch) to the city & state keys in the location object
    //uses RegExp to put the wordToMatch variable into regex
    //'g' is a global flag, 'i' is case insensitive
    const regex = new RegExp(wordToMatch, 'gi');
    return location.city.match(regex) || location.state.match(regex);
  });
}

//numberWithCommas() uses regex to insert commas into the population number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    //the below variables use regex to highlight the matched text in the suggestions
    //it uses .replace to replace the regular text with styled text (using the h1 css class)
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="h1">${this.value}</span>`);
    return `
    <li>
    <span class="name">${place.city}, ${place.state}</span>
    <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `;
    //.join will turn the returned array (from matchArray.map) into a string
    //without .join there is extra unnecessary spacing
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
