
window.addEventListener('load', () => {
  gsap.registerPlugin(Draggable, InertiaPlugin);

  const boxes =  document.querySelectorAll(".box")
  const stage =  document.querySelector(".stage")
  const $nav =  document.querySelector("#nav")
  const $prev =  document.querySelector(".prev")
  const $next =  document.querySelector(".next")
  const angle = 360 / 13;

TweenLite.set(stage, {
  css: {
    perspective: 1100,
    transformStyle: "preserve-3d"
  }
});
boxes.forEach((index, element) => {
//boxes.each(function(index, element) {
  TweenLite.set(element, {
    css: {
      rotationY: index * angle,
      //transformOrigin: "50% 50% -420"
      transformOrigin: "50% 50% " + -420 + "px"
    }
  });
  
  element.dataset.rotationY = index * angle;  
});


$nav.addEventListener('click', $prev ,() => {
//$nav.on("click", "#prev", function(){
      
  TweenMax.staggerTo(boxes, 1, {
    cycle: { rotationY: function(index) {      
      var y1 = +this.dataset.rotationY;
      var y2 = y1 - angle;
      this.dataset.rotationY = y2;
      return y2;
    }},
    // ease: Linear.easeNone
  }, 0);  
});
$nav.addEventListener('click', $next ,() => {
//$nav.on("click", "#next", function(){
  
  TweenMax.staggerTo(boxes, 1, {
    cycle: { rotationY: function(index) {      
      var y1 = +this.dataset.rotationY;
      var y2 = y1 + angle;
      this.dataset.rotationY = y2;
      return y2;
    }},
    // ease: Linear.easeNone
  }, 0);
});

})

window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
  ScrollTrigger.update()
})