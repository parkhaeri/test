window.addEventListener('load', () => {
  const $monster = document.querySelector('.monster')
  const $eyes = document.querySelector('.eyes')
  const $shadow = document.querySelector('.shadow')
  
  const scaleY = {
    start: 1.5,
    end: 1,
    stiffness: 500,
    damping: 10,
  }
  
  let abortSpring = () => {}
  let initX = null
  let initY = null
  
  document.addEventListener('mousemove', followMouse)
  document.addEventListener('touchmove', followMouse)
  $monster.addEventListener('mousedown', startDragging)
  $monster.addEventListener('touchstart', startDragging)
  document.addEventListener('mouseup', stopDragging)
  document.addEventListener('touchend', stopDragging)
  document.addEventListener('blur', stopDragging)
  
  function followMouse (e) {
    const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
    const x = (evt.clientX * 2 / window.innerWidth - 1) * 2
    const y = (evt.clientY * 2 / window.innerHeight - 1) * 2
    $eyes.style.transform = `translate(${x}px, ${y}px)`
  }
  
  function startDragging (e) {
    e.preventDefault()
    e.stopPropagation()
    initY = e.changedTouches && e.changedTouches[0]
      ? e.changedTouches[0].clientY
      : e.clientY
    abortSpring()
    document.addEventListener('mousemove', drag)
    document.addEventListener('touchmove', drag)
  }
  
  function stopDragging (e) {
    e.preventDefault()
    e.stopPropagation()
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('touchmove', drag)
    if (Math.abs(scaleY.end - scaleY.start) < 0.1) {
      scaleY.start = 1.1
    }
    abortSpring = spring(springMonster, scaleY)
  }
  
  function drag (e) {
   // e.preventDefault()
    e.stopPropagation()
    const y = e.changedTouches && e.changedTouches[0]
      ? e.changedTouches[0].clientY
      : e.clientY
    scaleY.start = 1 - (y - initY) / window.innerHeight
    springMonster(scaleY)
  }
  
  function springMonster (scaleY) {
    $monster.style.transform = `scaleY(${scaleY.start})`
    $shadow.style.transform = `scale(${1 / scaleY.start})`
  }
  
  function springingEnd () {
    isSpringing = false
  }
  
  function spring (action, ...values) {
    let isAbort = false
    action(...values)
    
    let preTimestamp = Date.now()
    requestAnimationFrame(looper)
  
    return () => isAbort = true
  
    function looper (timestamp) {
      let frames = Math.floor((timestamp - preTimestamp) / 1000 * 60) + 1
      preTimestamp = timestamp
      while (frames-- > 0) {
        values.forEach(stepper)
      }
      action(...values)
      if (!isAbort && values.some(v => v.start !== v.end)) {
        requestAnimationFrame(looper)
      }
    }
  }
  
  // based on https://github.com/chenglou/react-motion/blob/master/src/stepper.js
  function stepper (value) {
    const {
      start = 0,
      end = 0,
      velocity = 0,
      stiffness = 180,
      damping = 12,
    } = value
    
    const Fspring = -stiffness * (start - end)
    const Fdamper = -damping * velocity
    const a = Fspring + Fdamper
    const newVelocity = velocity + a / 60
    const newStart = start + newVelocity / 60
    
    if (Math.abs(newVelocity - 0) < 0.01 &&
        Math.abs(newStart - end) < 0.01) {
      value.start = end
      value.velocity = 0
    } else {
      value.start = newStart
      value.velocity = newVelocity
    }
  }
  

})