/* onload = adding; */
window.addEventListener('load', () => {
//==> Define the Variables <== 
const body = document.body;
const dragme = document.getElementById('dragme');
const body_t = document.body;
const dragme_t = document.getElementById('dragme');
const cs = dragme.style ;
const height = dragme.offsetHeight;
const width = dragme.offsetWidth;
const text = document.getElementById('y');


//==> Add Some Event Listener for Mouse & Touch <==
function adding()
{
dragme.addEventListener('mousedown',hold,false);
body.addEventListener('mouseup',release,false);
	
dragme_t.addEventListener('touchstart',hold,false);
body_t.addEventListener('touchend',release,false);
}

//==> On Hold Function <==
function hold()
{
	dragme.addEventListener('mousemove',move,true);
	body.addEventListener('mousemove',move,true);
	
	dragme_t.addEventListener('touchmove',tmove,true);
	body_t.addEventListener('touchmove',tmove,true);
}
//==> On Realease Function <==
function release()
{
	dragme.removeEventListener('mousemove',move,true);
	body.removeEventListener('mousemove',move,true);
	
	dragme_t.removeEventListener('touchmove',tmove,true);
	body_t.removeEventListener('touchmove',tmove,true);
	
	text.innerHTML = "Drag ME";
	text.style.top = "";
}

//==> On  Mousemove Function <==
function move(event){
	const epY = event.clientY;
	const epX = event.clientX;
	
	cs.position = "absolute";
	cs.top = epY + "px";
	cs.left = epX + "px";
	text.style.top = "30px";
	cs.transform = "translateX(" + -width/2 + "px ) translateY("+ -height/2 +"px)";
	text.innerHTML = "x : " + epX + "px "+" y : " + epY + "px";	
}

// ==> On Touchmove Function <==
function tmove(event){
	const epY = event.touches[0].clientY;
	const epX = event.touches[0].clientX;
	
	
	cs.position = "absolute";
	cs.top = epY + "px";
	cs.left = epX +  "px";
	text.style.top = "30px";
	cs.transform = "translateX(" + -width/2 + "px ) translateY("+ -height/2 +"px)";
	text.innerHTML = "x : " + epX + "px "+" y : " + epY + "px";	
}

cs.position = "";


// ==> Feel free fork it and Improve it.
// ==> If you add some new feature or find a better algorithm to do it then plz tell me , I loved to see it :) ........ 
// ==> This may not work on some browser and touch devices beacause i only checked it on Chrome. 


adding()
















// Get the elements to attach listeners, 
// to get info and to update positions:
var container = document.querySelector('.container');
var circle = document.querySelector('.circle');

// "distX", "distY" will help us to know the distance
// between the last position and the new, 
// to keep the space between the click and the element, 
// and of course, to move the element smooth
var state = { distX: 0, distY: 0 };

// These functions are declared outside of the elements
// because they are going to be reused in two different
// kind of events device: touch/mouse
function onDown(e) {
  // Stop bubbling, this is important to avoid 
  // unexpected behaviours on mobile browsers:
  e.preventDefault();
  
  // Get the correct event source regardless the device:
  // Btw, "e.changedTouches[0]" in this case for simplicity 
  // sake we'll use only the first touch event
  // because we won't move more elements.
  var evt = e.type === 'touchstart' ? e.changedTouches[0] : e;
  
  // "Get the distance of the x/y", formula:
  // A: Get current position x/y of the circle. 
  // Example: circle.offsetLeft
  // B: Get the new position x/y. 
  // Example: evt.clientX
  // That's all.
  state.distX = Math.abs(circle.offsetLeft - evt.clientX);
  state.distY = Math.abs(circle.offsetTop - evt.clientY);
  
  // Disable pointer events in the circle to avoid
  // a bug whenever it's moving.
  circle.style.pointerEvents = 'none';
};
function onUp(e) {
  // Re-enable the "pointerEvents" in the circle element.
  // If this is not enabled, then the element won't move.
  circle.style.pointerEvents = 'initial';
};
function onMove(e) {
  // Update the position x/y of the circle element
  // only if the "pointerEvents" are disabled, 
  // (check the "onDown" function for more details.)
  if (circle.style.pointerEvents === 'none') {
    
    // Get the correct event source regardless the device:
    // Btw, "e.changedTouches[0]" in this case for simplicity 
    // sake we'll use only the first touch event
    // because we won't move more elements.
    var evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
    
    // Update top/left directly in the dom element:
    circle.style.left = `${evt.clientX - state.distX}px`;
    circle.style.top = `${evt.clientY - state.distY}px`;
  };
};

// FOR MOUSE DEVICES:
circle.addEventListener('mousedown', onDown);
container.addEventListener('mousemove', onMove);
container.addEventListener('mouseup', onUp);

// FOR TOUCH DEVICES:
circle.addEventListener('touchstart', onDown);
container.addEventListener('touchmove', onMove);
container.addEventListener('touchend', onUp);











})


