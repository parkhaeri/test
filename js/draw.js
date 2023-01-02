// Thanks, Wes Bos and javascript30!

window.addEventListener('load', () => {
// set up basic canvas and drawing options
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext('2d');
  // ctx.globalCompositeOperation = 'overlay';
  var background = new Image();
background.src = "http://www.samskirrow.com/background.png";
// let lineWidth = strokeWidthControl.value;

function makeCanvas() {
  cta.classList.remove("hide");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = '#ff00ff';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  console.log("canvassed");
  
}

//window.addEventListener('load', makeCanvas);

window.addEventListener('resize', makeCanvas);

const reset = document.querySelector("#reset");
reset.addEventListener("click", makeCanvas);

const hueRotateToggle = document.querySelector("#rainbow input");

background.onload = function(){
  ctx.drawImage(background,0,0);   
}

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 180;
let lightness = 50;
let direction = true;
let strokeWidth = 40;
let hueIncrement = false;

function draw(e) {
  
  if (!isDrawing) return;
  
  ctx.lineWidth = `${strokeWidth}`;
  ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
  ctx.beginPath();
  //start from
  ctx.moveTo(lastX,lastY);
  //go to
  ctx.lineTo(e.offsetX,e.offsetY);
  ctx.stroke();
  
  [lastX,lastY] = [e.offsetX, e.offsetY];
  
  if (hue > 360){
    hue = 0;
  }
  if (hueIncrement) {
    hue++
  };
  setHueRange();
}

//turn on drawing when mousedown

let canDraw = false;

function turnOnDrawing(e) {
  canDraw = true;
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", turnOnDrawing);

canvas.addEventListener("mouseenter", (e) => {
  if(canDraw){isDrawing = true;}
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

// trigger draw function when mouse moving
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("drag", draw);

// turn off drawing when mouse up or out of window
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  canDraw = false;
});
                        
canvas.addEventListener("mouseout", () => isDrawing = false);
canvas.addEventListener("dragend", () => isDrawing = false);


///////////////////////
// change stroke width
///////////////////////

const strokeWidthLabelSpec = document.querySelector("#stroke-width-label span");

function setWidth() {
  strokeWidth = this.value;
  if (strokeWidth < 10){
    strokeWidthLabelSpec.innerHTML = "00" + `${strokeWidth}`;
  } else if (strokeWidth < 100) {
    strokeWidthLabelSpec.innerHTML = "0" + `${strokeWidth}`;
  } else {
    strokeWidthLabelSpec.innerHTML = `${strokeWidth}`;
  }
  
}


const strokeWidthControl = document.querySelector("#stroke-width");

strokeWidthControl.addEventListener("input", setWidth);

///////////////////////
// change hue
///////////////////////

document.querySelector("#hue-label span").style.background = `hsl(${hue}, 100%, 50%)`;

const CTAcontainer = document.querySelector(".full-container");

CTAcontainer.style.color = `hsl(${hue}, 100%, 50%)`;

const hueLabelSpec = document.querySelector("#hue-label span");

function setHue() {
  hue = this.value;
  hueLabelSpec.style.background = `hsl(${hue}, 100%, 50%)`;
  CTAcontainer.style.color = `hsl(${hue}, 100%, 50%)`;
  if (hueRotateToggle.checked = true){
    hueRotateToggle.checked = false;
  }
  if (hueIncrement) {
    hueIncrement = false;
  }
}

const hueControl = document.querySelector("#hue");

hueControl.addEventListener("input", setHue);

///////////////////////
// rotate hue
///////////////////////


hueRotateToggle.addEventListener("change", () => !hueIncrement ? hueIncrement = true : hueIncrement = false);

hueRotateToggle.addEventListener("change", setHueRange);

function setHueRange() {
  hueControl.value = hue;
  console.log(hue);
  hueLabelSpec.style.background = `hsl(${hue}, 100%, 50%)`;
  CTAcontainer.style.color = `hsl(${hue}, 100%, 50%)`;
  console.log(hueRotateToggle.value);
}

// hue increment added to if statement in draw function

///////////////////////
// eraser
///////////////////////

const eraserToggleControl = document.querySelector("#eraser-toggle");


 
//toggle stroke lightness 0%


                                     
function toggleLightness() {
  if(lightness > 1) {
    lightness = 0; 
    console.log("lightness is " + lightness);
  } else {
    lightness = 50; 
    console.log("lightness is " + lightness);
  }
};
  
eraserToggleControl.addEventListener('change', toggleLightness);

///////////////////////
// hide call-to-action
///////////////////////

const cta = document.querySelector(".full-container");

function hideCTA() {
  cta.classList.add("hide");
  console.log("CTA");
}

cta.addEventListener('mouseover', hideCTA);




makeCanvas()
})