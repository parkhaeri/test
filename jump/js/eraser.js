window.addEventListener('load', () => {
  //const url = 'https://cloud.githubusercontent.com/assets/4652816/12771961/5341c3c4-ca68-11e5-844c-f659831d9c00.jpg';
  const url = '../img/cloud.png';
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const body = document.body;
  const img = new Image();
  img.src = url;
  img.onload = function () {
/*     const width = Math.min(500, img.width);
    const height = img.height * (width / img.width); */

/*    width = window.innerWidth;
   height = window.innerHeight; */

   ctx.canvas.width  = window.innerWidth;
   ctx.canvas.height = window.innerHeight;
  
    const width = ctx.canvas.width;
    const height = img.height * (width / img.width);
    ctx.drawImage(img, 0, 0, width, height);
  };
  
  let isPress = false;
  let old = null;

  function onDown(e) {
     // e.preventDefault();
      const evt = e.type === 'touchstart' ? e.changedTouches[0] : e;
      isPress = true;
      old = {x: evt.pageX - this.offsetLeft , y: evt.pageY - this.offsetTop};
    };
  function onMove(e) {
    if (isPress) {

      const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
      const x = evt.pageX - this.offsetLeft;
      const y = evt.pageY - this.offsetTop;
      ctx.globalCompositeOperation = 'destination-out';
  
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
  
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(old.x, old.y);
      ctx.lineTo(x, y);
      ctx.stroke();
  
      old = {x: x, y: y};
      
    }
  };
  function onUp(e) {
    isPress = false;
  };

  var scraperItem = document.querySelector(".scraper")

  function scraper(e){
    const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
   const x = evt.pageX - this.offsetLeft - 15;
    const y = evt.pageY - this.offsetTop;
    scraperItem.style.left = x+"px"
    scraperItem.style.top = y+"px"
  }


  body.addEventListener('mousedown', onDown);
  body.addEventListener('mousemove', onMove);
  body.addEventListener('mousemove', scraper);
  body.addEventListener('mouseup', onUp);

  body.addEventListener('touchstart', onDown);
  body.addEventListener('touchmove', onMove);
  body.addEventListener('touchmove', scraper);
  body.addEventListener('touchend', onUp);




  setTimeout(() => {
    document.body.classList.add('loaded')
  }, 500)
})