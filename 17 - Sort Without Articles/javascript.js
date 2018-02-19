const bandsUl = document.querySelector('#bands');
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const newBands = bands.sort(function (a, b) {

  const regex = /^(the |a |an )/i;

  //replace removes the articles and replaces them with ''
  //.trim() removes any extra spacing around the string
  const newA = a.replace(regex, '').trim();
  const newB = b.replace(regex, '').trim();

  return newA < newB ? -1 : 1;
});

//iterate thru the newsBands array and create a li element for each one
//insert each li element into the innerHTML of bandsUl
//.join('') removes extra spacing
bandsUl.innerHTML = newBands.map(band => `<li>${band}</li>`).join('');
