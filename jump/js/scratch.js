
function scracth(_id, option = {}){
  const body = document.body;
  const canvas = document.getElementById(_id)
  const scraperItem = document.querySelector(".scraper")
  let ctx = canvas.getContext('2d')
  let width = canvas.width
  let height = canvas.height
  let size = option.size || 20

  let row = height / size / 1.65
  let column = width / size / 1.65
  let maxSize = row * column

  let inSideArray = []
  let dataArray = []


  // //갯수 구한게 맞는지 확인식
  // for(let i=0;i < column;i++){
  //     for(let j=0;j < row;j++){
  //         drawding(size + column * column * i , size + row * row * j)
  //     }
  // }

//검은색으로 덮어둡니다.
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle='#ddd'
  ctx.rect(0,0,width,height)
  ctx.fill()
  ctx.closePath()
  ctx.restore()      

  let stopDrawing = false
  let inter = null
  function isInside(x1, y1){

    if(inSideArray.length >= maxSize){  //총 크기에 원이 다다른 경우
        stopDrawing = true  //그만그려

        let i = 1
        inter = setInterval(() => {  //페이드 인 아웃 효과 입니다
            ctx.save()
            ctx.beginPath()
            ctx.clearRect(0,0,width,height)
            ctx.rect(0,0,width,height)
            ctx.fillStyle = `rgba(0,0,0,${i})`
            ctx.fill()
            ctx.closePath()
            ctx.restore()                 
            
            if(i <= 0) {
                clearInterval(inter)
                inter = null
            }

            dataArray.forEach(item => {
              ctx.save()
              ctx.beginPath()
              ctx.globalCompositeOperation= 'destination-out'
              ctx.arc(item.x, item.y, size, (Math.PI/180)*0, (Math.PI/180)* 360 , false)
              ctx.fill()
              ctx.closePath()
              ctx.restore()                      
            })
            i -= 0.1
        }, 50)

        body.classList.add('end')
    }


    if(stopDrawing) return

    let check = inSideArray.filter(arg =>{  //조사합니다 대상원이 포함되는지
        let x = arg.x - x1
        let y = arg.y - y1
        let my_len = Math.sqrt(Math.abs(x * x) + Math.abs(y * y))
        return my_len < size
    })

    let json = {x : x1, y : y1, target: false}
    if(!check || check.length ==0){
        json.target = true
        inSideArray.push(json)  //대상원을 추가 합니다
    }
    dataArray.push(json)  //다시 그리기용(페이드인 아웃용) 배열에 넣습니다
  }

  //그리는 함수 입니다
  function drawding(x, y){
    ctx.save()
    ctx.beginPath()
    ctx.globalCompositeOperation= 'destination-out'
    ctx.arc(x, y, size, (Math.PI/180)*0, (Math.PI/180)* 360 , false)
    ctx.fill()
    ctx.closePath()
    ctx.restore()  
  }    

  function onDown(e) {
    e.preventDefault();
    const evt = e.type === 'touchstart' ? e.changedTouches[0] : e;
    isPress = true;
    old = {x: evt.pageX - this.offsetLeft , y: evt.pageY - this.offsetTop};
  }

  
    function onMove(e) {
      if (isPress) {
      const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
      if(!ctx || stopDrawing) return
      let x1 = evt.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft
      let y1 = evt.clientY - canvas.parentElement.offsetTop || canvas.offsetTop
      isInside(x1, y1)
      drawding(x1, y1)

      scraperItem.classList.add('move')
    }
  }

  function onUp(e) {
    isPress = false;
    scraperItem.classList.remove('move')
  }




  function scraper(e){
    const evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
    const x = evt.pageX - this.offsetLeft - 25;
    const y = evt.pageY - this.offsetTop -25;
    scraperItem.style.left = x+"px"
    scraperItem.style.top = y+"px"
  }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mousemove', scraper);
  canvas.addEventListener('mouseup', onUp);
  
  canvas.addEventListener('touchstart', onDown);
  canvas.addEventListener('touchmove', scraper); 
  canvas.addEventListener('touchmove', onMove);
  canvas.addEventListener('touchend', onUp);



  
  return {
      reDraw : (arg)=>{
          if(!inter){
              //초기화를 합니다 && 그리기 입니다.
              ctx.save()
              ctx.beginPath()
              ctx.clearRect(0,0,width,height)
              ctx.rect(0,0,width,height)
              ctx.fillStyle = `rgba(0,0,0,1)`
              ctx.fill()
              ctx.closePath()
              ctx.restore()               
              stopDrawing = false
              inter = null
              inSideArray = inSideArray.filter( (arg)=> false)
              dataArray = dataArray.filter( (arg)=> false)
          }

          if(arg && arg instanceof Function){
              arg(stopDrawing)
              console.log(inter)
          }
      }
  }
}




let sct = scracth('canvas')


let btn = document.getElementById('btn')
btn.addEventListener('click', (event) =>{
  sct.reDraw( result=>{
      console.log(result)
  })
})