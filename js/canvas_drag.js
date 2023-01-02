let canvas;
let ctx;

let screenRect;

let rectX, rectY;
let prevMouseX, prevMouseY;
let isMouseDown = false;
let isRectSelected = false;
const itemW = 50, itemH = 50;
let currentDroppable = null;

const body = document.body;

window.addEventListener('load', () => { 
  function init() { 
    console.log("init()");
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    const imageObj = new Image();

    imageObj.onload = function() {
      ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
    };
    imageObj.src = 'https://en.js.cx/clipart/soccer-gate.svg';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    screenRect = canvas.getBoundingClientRect();

    rectX = canvas.width / 2;
    rectY = canvas.height / 2;

    addKeyEventListener();

    animate();
 }
function addKeyEventListener() {

    //canvas.onmousedown = function(e) {
    function onDown(e) {
      e.preventDefault();
      const evt = e.type === 'touchstart' ? e.changedTouches[0] : e;
      const x = evt.clientX - screenRect.left;
      const y = evt.clientY - screenRect.top;

      console.log("MouseDown : (" + x + ", " + y + ")");

      prevMouseX = x;
      prevMouseY = y;

      isMouseDown = true;

      if(isRectClicked(x, y)) {
          isRectSelected = true;
      }
      else {
          isRectSelected = false;
      }
    }

    //canvas.onmousemove = function(e) {
    function onMove(e) {
      if(isMouseDown && isRectSelected) {
        const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
        const x = evt.clientX - screenRect.left;
        const y = evt.clientY - screenRect.top;

        const dx = x - prevMouseX;
        const dy = y - prevMouseY;

        rectX += dx;
        rectY += dy;

        prevMouseX = x;
        prevMouseY = y;

        //circle.hidden = true;
        let elemBelow = document.elementFromPoint(evt.clientX, evt.clientY);
        console.log(elemBelow)
        // circle.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { 
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            enterDroppable(currentDroppable);
          }
        }


      }     
    }

    function enterDroppable(elem) {
      elem.style.background = 'pink';
      console.log('영역 진입')
    }
    
    function leaveDroppable(elem) {
      elem.style.background = '';
      console.log('영역 나가기')
    }
    

    //canvas.onmouseup = function(e) {
    function onUp(e) {      
      const evt = e.type === 'touchend' ? e.changedTouches[0] : e;
      const x = evt.clientX - screenRect.left;
      const y = evt.clientY - screenRect.top;
      
      console.log("MouseUp : (" + x + ", " + y + ")");
      
      isMouseDown = false;
      isRectSelected = false;
    }
    
    //canvas.onmouseout = function(e) {
    function onOver(e) {      
      isMouseDown = false;
    }

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseover', onOver);

    canvas.addEventListener('touchstart', onDown);
    canvas.addEventListener('touchmove', onMove);
    canvas.addEventListener('touchend', onUp);
}

function animate() {
  drawCanvasBackground();
  drawRect();

  requestAnimationFrame(function() {
      animate();
  });
}

function drawCanvasBackground() {
  ctx.fillStyle = '#ff0';
  ctx.strokeStyle = 'black';

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}

function drawRect() {
  ctx.strokeStyle = 'green';
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.rect(rectX - itemW / 2, rectY - itemH / 2, itemW, itemH);
  ctx.stroke();
  ctx.fill();
  
}


function isRectClicked(x, y) {
  if ((x >= (rectX - itemW / 2)) && 
      (x <= (rectX + itemW / 2)) && 
      (y >= (rectY - itemH / 2)) && 
      (y <= (rectY + itemH / 2))) {
        return true;
      }
  return false;
}



init()
addKeyEventListener()
animate()
drawCanvasBackground()
drawRect()
}) 

