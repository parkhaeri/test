const body = document.body;
let currentDroppable = null;







window.addEventListener('load', () => {
  const faceInfo = {
    imgUrl : 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2021/12/urbanbrush-20211210165324768415.jpg',
    faceLoc : [{
                  x : 85, 
                  y : 30, 
                  w : 80, 
                  h : 80,
                  color : 'yellow',
                  personNm : '인물 A'
                },
                {
                  x : 220, 
                  y : 45, 
                  w : 60, 
                  h : 70,
                  color : 'yellow',
                  personNm : '인물 B'
                },
                {
                  x : 160, 
                  y : 110, 
                  w : 58, 
                  h : 60,
                  color : 'yellow',
                  personNm : '인물 C'
            }]                         
  }
  
  // set Canvas

  
  /**
  * Canvas 설정 
  */
  const setCanvas = function(faceInfo){
  const canvas = document.getElementById('canvas');
  
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const imageObj = new Image();
      imageObj.onload = function() {
        /* canvas.width=360;
        canvas.height=203; */
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
        
        // multi boxing 처리
        $.each(faceInfo.faceLoc, function(key, item){
            ctx.strokeStyle = item.color;
            ctx.lineWidth = 3;
            ctx.strokeRect(item.x, item.y, item.w, item.h);
            
            // Text 처리 
            ctx.textBaseline = 'top';
            ctx.font="13px Verdana";
            ctx.fillStyle = "white";
            ctx.fillText(item.personNm, item.x, item.y + item.h + 5);
            ctx.fill();
        });
      };
      imageObj.src = faceInfo.imgUrl;
    } 
  };
  
  setCanvas(faceInfo); 
/* 
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
      if (currentDroppable) { // null when we were not over a droppable before this event
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
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

 */


})


