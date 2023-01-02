
window.addEventListener('load', () => {
  gsap.registerPlugin(Draggable, InertiaPlugin);

   var cards = gsap.utils.toArray(".creative-pro"),
      dragDistancePerRotation = 3000,
      radius = 520,
      proxy = document.createElement("div"), 
      progressWrap = gsap.utils.wrap(0, 1),
      spin = gsap.fromTo(cards, {
        rotationY: i => i * 360 / cards.length
      }, {
        rotationY: "-=360",
        duration: 200,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50% " + -radius + "px"
      }),
      startProgress;
  
  Draggable.create(proxy, {
    trigger: ".demoWrapper", // activate the dragging when the user presses on the .demoWrapper
    type: "x", // we only care about movement on the x-axis.
    inertia: true,
    allowNativeTouchScrolling: true,
    onPress() {
      gsap.killTweensOf(spin); // if it's in the middle of animating the spin back to timeScale: 1, kill that.
      spin.timeScale(0); // stop the spin.
      startProgress = spin.progress(); // remember the current progress value because we'll make the drag relative to that.
      //현재 진행률 값을 기억하십시오. 왜냐하면 우리는 그것과 관련된 드래그를 만들 것이기 때문입니다.
    },
    onDrag: updateRotation,
    onThrowUpdate: updateRotation,
    onRelease() {
      if (!this.tween || !this.tween.isActive()) { // if the user clicked and released (no inertia flick), resume the spin
        //사용자가 클릭했다가 놓으면(관성 플릭 없음) 회전을 다시 시작합니다.
        gsap.to(spin, {timeScale: 1, duration: 1});
      }
    },
    onThrowComplete() { // resume the spin after the inertia tween finishes 
      //관성이 끝난 후에 회전을 다시 시작한다.
      gsap.to(spin, {timeScale: 1, duration: 1});
    }
  });
  
  function updateRotation() {
    let p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
    spin.progress(progressWrap(p));
  }
 

  /* ////////////////////////////////////// */
/* 
   console.clear()

gsap.defaults({
  ease: 'none'
})

const dial = document.querySelector('.dial')
const cells = document.querySelectorAll('.cell')
const proxy = document.createElement('div') // do not undertand reason for this

const cellHeight = 30
const rotationX = 70

const numCells = cells.length;
const cellStep = 1 / numCells;
const wrapHeight = cellHeight * numCells;

const wrap = gsap.utils.wrap(0, 1)

const baseTl = gsap.timeline({ paused: true })
gsap.set(dial, {perspective: 900, height: cellHeight * 3})
// gsap.set(dial, {perspective: 1100, height: wrapHeight - cellHeight})

cells.forEach((cell, index) => {
  initCell(cell, index)
})

const animation = gsap.timeline({ repeat: -1, paused: true, id: 'animation'})
  .add(baseTl.tweenFromTo(1, 2))
  .progress(1)
  .progress(0)

const draggable = new Draggable(proxy, {
  trigger: dial,
  throwProps: true,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: { 
    y: snapY 
  }
});

function snapY(y) {
  return Math.round(y / cellHeight) * cellHeight;
}

function updateProgress() {
  animation.progress(wrap(this.y / wrapHeight));
}

function initCell(element, index) {
  gsap.set(element, {
    height: cellHeight,
    scale: 0.9,
    translateZ: 1,
    rotationX: rotationX,
    y: -cellHeight
  });
  
  const tl = gsap.timeline({ repeat: 1, id: `cellAnimation${index}` })
  .to(element, { y: `+=${wrapHeight}`, duration: 1 }, 0)
  .to(element, {rotationX: -rotationX, duration: 3 * cellStep}, cellStep / 2)
  .to(element, { color: "#878787", scale: 1, translateZ: 100, repeat: 1, yoyo: true, duration: 2 * cellStep }, 0)
    // .to(element, { color: "#009688", scale: 1, translateZ: 500, repeat: 1, yoyo: true, duration: cellStep }, 0.5 - cellStep)
  
  baseTl.add(tl, index * -cellStep);
}  */

// GSDevTools.create({globalSync: false})



/* //////////////////// */



gsap.registerPlugin(Draggable, InertiaPlugin);

/* let rotationDrag = new Draggable(".item", {
  type: "rotation",
  throwProps: true,
   
  onPress: setDraggable  
}).disable();

let translateDrag = new Draggable(".item", {
  bounds: window,
  throwProps: true,

  onPress: setDraggable  
});

function setDraggable(event) {

  let isRotation = this.vars.type === "rotation";
  let isCorner   = event.target.dataset.corner; 

  if (isCorner || event.ctrlKey) {
    
    if (!isRotation) {
      translateDrag.disable();
      rotationDrag.enable().startDrag(event);
    }
    
  } else if (isRotation) {
    
    rotationDrag.disable();
    translateDrag.enable().startDrag(event);
  }
} */











})

window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
  ScrollTrigger.update()
})