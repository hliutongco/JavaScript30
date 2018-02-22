const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      //use localMediaStream to create webcam URL
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    //in case of errors:
    .catch(err => {
      console.error(`There was an error`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  //match video dimensions to canvas dimensions
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    //attaches video to canvas
    //0, 0 is the coordinates of top left corner
    ctx.drawImage(video, 0, 0, width, height);

    //pixels is an array
    //first take pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    //change pixel color values & other attributes
    pixels = greenScreen(pixels);

    //put pixels back
    ctx.putImageData(pixels, 0, 0);

  }, 16 /* runs every 16 milliseconds */);
}

//pixels is an object
//pixels.data is an array within the object
function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] += 100 //red
    pixels[i + 1] -= 50 //green
    pixels[i + 2] *= 0.5 //blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] -= 150 //red
    pixels[i + 1] += 100 //green
    pixels[i + 2] -= 150 //blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for(let i = 0; i < pixels.data.length; i+=4){
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if(red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        //make alpha transparent if all colors are within min & max values
        pixels.data[i + 3] = 0;
      }
  }
  return pixels;
}

function takePhoto() {
  //play camera snap sound effect
  snap.currentTime = 0;
  snap.play();

  //take data out of canvas
  //data is text-based representation of webcam images
  const data = canvas.toDataURL('image/jpeg');

  //use data to create a link to the webcam images
  //the 'handsome' attribute allows image downloads
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;

  //put link into the 'strip' div
  strip.insertBefore(link, strip.firstChild);
}

//event listener for when video plays
video.addEventListener('canplay', paintToCanvas);

getVideo();
