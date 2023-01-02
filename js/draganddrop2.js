
window.addEventListener('load', () => {

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
  
  adding()
  
  
  
  

  
  
  
  })
  
  
  