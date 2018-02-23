const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed.value');

//watchPosition() will constantly update the user position
//changes speed number on speed tracker
//changes direction of arrow on compass
//add error message
navigator.geolocation.watchPosition((data) => {
  speed.textContent = data.coords.speed;
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  console.log(err);
  alert('There was an error.');
});
