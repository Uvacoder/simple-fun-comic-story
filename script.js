var scrollContainer = document.querySelector(".scroll-container");

var scenes = document.querySelectorAll(".scene");

let currentCueIndex = 0;

let scrollPos = 0;

let interval = 600;

function reportWindowSize() {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let gutters = 120;
  if (window.innerWidth < 600) {
    gutters = 0;
  }
  if (window.innerWidth < 1440 + gutters) {
    let scale = window.innerWidth / (1440 + gutters);
    let sceneContainer = document.getElementById("scene-container");
    let transform = window.getComputedStyle(sceneContainer).transform;
    sceneContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  if (window.innerHeight < 900) {
    let scale = window.innerHeight / 900;
    let sceneContainer = document.getElementById("scene-container");
    let transform = window.getComputedStyle(sceneContainer).transform;
    sceneContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  if (window.innerHeight < 900 && window.innerWidth < 1440 + gutters) {
    let scaleX = window.innerWidth / (1440 + gutters);
    let scaleY = window.innerHeight / 900;
    let ratio = window.innerWidth / window.innerHeight;
    let sceneContainer = document.getElementById("scene-container");
    let transform = window.getComputedStyle(sceneContainer).transform;
    if (ratio > 1440 / 900) {
      sceneContainer.style.transform = `translate(-50%, -50%) scale(${scaleY})`;
    } else {
      sceneContainer.style.transform = `translate(-50%, -50%) scale(${scaleX})`;
    }
  }
}

window.onresize = reportWindowSize;

reportWindowSize();

//Create a map of cue numbers to images that should be visible on each number

var sceneEls = document.querySelectorAll(".scene-el");

// Keys: the cue number
// Values: an array of scene Els
let cuesToEls = {};

//Initialize list
for (let i = 0; i < 200; i++) {
  cuesToEls[i] = [];
}

sceneEls.forEach(function (sceneEl) {
  let cues = JSON.parse(sceneEl.dataset.cues);
  cues.forEach(function (cue) {
    cuesToEls[cue].push(sceneEl);
    // sceneEl.style.display = "none";
  });
});

let currentSceneEls = [];
let prevSceneEls = [];

let sceneBg = "white";

function changeBgColor(index) {
  if (index >= 0) {
    sceneBg = "white";
  }
  if (index >= 50) {
    sceneBg = "#27263C";
  }
  if (index >= 75) {
    sceneBg = "#DCF3F5";
  }
  if (index >= 114) {
    sceneBg = "white";
  }
  document.body.style.backgroundColor = sceneBg;
}

function changeScene(scrollPos) {
  let cueChanged = currentCueIndex !== Math.floor(scrollPos / interval);
  currentCueIndex = Math.floor(scrollPos / interval);
  changeBgColor(currentCueIndex);

  //Make visible sceneEls that correspond to this index

  prevSceneEls = currentSceneEls;
  currentSceneEls = cuesToEls[currentCueIndex];

  prevSceneEls.forEach(function (sceneEl) {
    //if this prev scene El is not in this current one, remove it
    if (currentSceneEls.indexOf(sceneEl) == -1) {
      sceneEl.classList.remove("visible");
      window.setTimeout(function () {
        sceneEl.style.display = "none";
      }, 300);
    }
  });

  //Show all the current ones
  currentSceneEls.forEach(function (sceneEl) {
    sceneEl.style.display = "block";
    window.setTimeout(function () {
      sceneEl.classList.add("visible");
    }, 5);
  });
}

changeScene(window.scrollY);

window.onscroll = function (e) {
  scrollPos = window.scrollY;
  changeScene(window.scrollY);
};

console.log("Hi! if you're here.. buy me an iced latte sometime 🥺👉👈");
