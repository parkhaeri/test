const body = document.body;
let currentDroppable = null;







window.addEventListener('load', () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function draw() {
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
      ctx.moveTo(110, 75);
      ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
      ctx.moveTo(65, 65);
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
      ctx.moveTo(95, 65);
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(50, 50, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    

      var rectangle = new Path2D();
      rectangle.rect(10, 10, 50, 50);
      ctx.stroke(rectangle);

      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "green"; // Green path
      ctx.moveTo(0, 75);
      ctx.lineTo(250, 75);
      ctx.stroke(); // Draw it

  }

  draw()

  const container = document.querySelector('.container');
  const circle = document.querySelector('.circle');
  const state = { distX: 0, distY: 0 };

function onDown(e) {
  e.preventDefault();
  const evt = e.type === 'touchstart' ? e.changedTouches[0] : e;
  state.distX = Math.abs(circle.offsetLeft - evt.clientX);
  state.distY = Math.abs(circle.offsetTop - evt.clientY);
  circle.style.pointerEvents = 'none';
};

function onUp(e) {
  circle.style.pointerEvents = 'initial';
};

function onMove(e) {
  if (circle.style.pointerEvents === 'none') {
    
    const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
    circle.style.left = `${evt.clientX - state.distX}px`;
    circle.style.top = `${evt.clientY - state.distY}px`;

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


  };
};

function enterDroppable(elem) {
  elem.style.background = 'pink';
  console.log('영역 진입')
}

function leaveDroppable(elem) {
  elem.style.background = '';
  console.log('영역 나가기')
}

// FOR MOUSE DEVICES:
circle.addEventListener('mousedown', onDown);
container.addEventListener('mousemove', onMove);
container.addEventListener('mouseup', onUp);
// body.addEventListener('mousemove', onMove);
// body.addEventListener('mouseup', onUp);

// FOR TOUCH DEVICES:
circle.addEventListener('touchstart', onDown);
container.addEventListener('touchmove', onMove);
container.addEventListener('touchend', onUp);
// body.addEventListener('touchmove', onMove);
// body.addEventListener('touchend', onUp);




})


