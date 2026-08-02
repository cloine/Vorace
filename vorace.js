"use strict";


if (!sessionStorage.getItem('alertDisplayed')) {

    alert("Veuillez activer l'audio dans les paramètres de votre navigateur s'il vous plaît. ⚠ Ce site est fait pour être visualisé sur un écran d'ordinateur ou de tablette.");

    sessionStorage.setItem('alertDisplayed', 'true');

}


let audioPlayer;
let symmetry = 3;
let angle = 360 / symmetry;


function setup() {

// KALEIDOSCOPE
  describe(
    `Black canvas that reflects the lines drawn within it in ${symmetry} sections.`
  );
  createCanvas(windowWidth, windowHeight);

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  };
  angleMode(DEGREES);
  background("black");

// AUDIOPLAYER
  audioPlayer = createAudio('./assets/Vorace_Cloine.mp3');
  audioPlayer.pause();
  audioPlayer.attribute(
    'aria-description',
    'The playback speed of this audio player is controlled by the position of the mouse when pressed. The further to the right the mouse is, the faster the audio will play.'
  );
  //audioPlayer.autoplay();
  audioPlayer.loop();
  audioPlayer.attribute('style', 'display:none');

  let body = document.getElementById("main-container");
  
  body.addEventListener("touchstart", () => {
  audioPlayer.play();
  });

  body.addEventListener("mousedown", () => {
  audioPlayer.play();
  });

  
    
  }

function draw() {

  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

    let lineStartX = mouseX - width / 2;
    let lineStartY = mouseY - height / 2;
    let lineEndX = pmouseX - width / 2;
    let lineEndY = pmouseY - height / 2;

      if (mouseIsPressed === true) {

        for (let i = 0; i < symmetry; i++) {
          rotate(angle);
          stroke(255);
          strokeWeight(4);
          line(lineStartX, lineStartY, lineEndX, lineEndY);
          push();
          scale(1, -1);
          line(lineStartX, lineStartY, lineEndX, lineEndY);
          pop();
          audioPlayer.speed(1 + mouseX / windowWidth);
        }

      }
    }
  }

