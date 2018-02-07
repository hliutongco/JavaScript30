const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

// Array.prototype.filter()
let fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));

// Array.prototype.map()
let namesArray = inventors.map(inventor => `${inventor.first} ${inventor.last}`);

// Array.prototype.sort()
let sortByBirth = inventors.sort((a,b) => a.year > b.year ? 1 : -1);

// Array.prototype.reduce()
let totalLivedYears = inventors.reduce((total,inventor) => total + (inventor.passed - inventor.year), 0);

// 5. Sort the inventors by years lived
let sortByYearsLived = inventors.sort((a,b) => (a.passed - a.year) > (b.passed - b.year) ? 1 : -1);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// let category = document.querySelector('.mw-category');
// let links = [...category.querySelectorAll('a')];
// let de = links
//   .map(link => link.textContent);
//   .filter(streetName => streetName.includes('de'));

// 7. sort Exercise
let sortPeople = people.sort((a,b) => {
  let aLastName = a.split(", ")[0];
  let bLastName = b.split(", ")[0];
  aLastName > bLastName ? 1 : -1;
});

// 8. Reduce Exercise
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
let countInstances = data.reduce((object,item) => {
  if(!object[item]) {
    object[item] = 0;
  };
  object[item]++;
}, {});