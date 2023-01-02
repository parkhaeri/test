
window.addEventListener('load', () => {
  // section 1
/*   ScrollTrigger.create({
    trigger: '.section--1',
    start: () => 'top top',
    pin: true,
    markers: true,
  }) */


  let tl = gsap.timeline(); 
  tl.to(".section__box-1", {opacity: 1, y: -50, duration: 1, delay:1})
  .to(".section__box-2", {opacity: 1, y: -50, duration: 1},'-=.5')
  .to(".section__box-3", {opacity: 1, y: -50, duration: 1},'-=.5')
  .to(".section__box-4", {opacity: 1, y: -50, duration: 1},'-=.5') 



  const body = document.body;
  const box1 = document.querySelector('.box1');
  const box2 = document.querySelector('.box2');
  let currentDroppable = null;


  Draggable.create(".box1", {
    type:"x,y", 
    edgeResistance:.15, 
    bounds:"#container", 
    inertia: true,
  });
  Draggable.create(".box2", {
    type:"x,y", 
    edgeResistance:.15, 
    bounds:"#container", 
    inertia: true,
  });


gsap.registerPlugin(InertiaPlugin);





})

window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
  ScrollTrigger.update()
})