
window.addEventListener('load', () => {
/* JavaScript */
document.querySelectorAll(".decor-container .sticker").forEach((element) => {
  /* .decor-container 안에 존재하는 모든 .sticker에 dragstart 이벤트 핸들러 등록 */
  /* 이렇게 해야 드래그가 허용되지 않는 엘리먼트도 드래그가 가능해져요. */
 /*  element.addEventListener("dragstart", (event) => {
  // 스티커를 드래그하기 시작하면 DataTransfer에 드래그하고 있는 스티커의 ID를 저장합니다.
    event.dataTransfer.setData("text/plain", event.target.dataset["sticker"]);
  }); */

  /* ".decor-container .sticker" forEach문 블럭 */

    
  element.addEventListener("dragstart",(event) => {
    // 스티커 ID
    const id = event.target.dataset["sticker"];
    // 스티커를 드래그할 때 마우스 포인터 오프셋(위치)
    const posX = event.offsetX;
    const posY = event.offsetY;

    // DataTransfer.setData()에서 데이터를 수정하여 마우스 포인터 오프셋까지 같이 저장하도록 합니다.
    // 각 데이터(스티커 ID, 포인터 X축 오프셋, 포인터 Y축 오프셋)를 콤마로 분리(comma-separated)하여 쉽게
    event.dataTransfer.setData("text/plain", `${event.target.dataset["sticker"]},${posX},${posY}`);

  });


});
  document.querySelector(".letter-container").addEventListener("dragover", (event) => {
  /* 편지지(드롭존) 컨테이너에 dragover 이벤트 핸들러 등록 */
  /* 마찬가지로 빈 핸들러라도 등록을 해야 이 영역에 드롭이 가능해져요. */
  event.preventDefault();
  event.stopPropagation();
  });


  document.querySelector(".letter-container").addEventListener("drop", (event) => {
  /* 편지 컨테이너(드롭존)에 drop 이벤트 핸들러 등록 */
  event.preventDefault();
  event.stopPropagation();
  console.log('drop' ,event)

/*   // 편지지(드롭존) 컨테이너
  const letterContainer = document.querySelector(".letter-container");
  // X축 상대 좌표 계산
  const relativeX = event.pageX - letterContainer.offsetLeft;
  // Y축 상대 좌표 계산
  const relativeY = event.pageY - letterContainer.offsetTop; */

   /* ".letter-container" drop 이벤트 핸들러 블럭 */
  // 편지지(드롭존) 컨테이너
  const letterContainer = document.querySelector(".letter-container");
  // 드래그 시 마우스 포인터 좌표, getData()를 하여 얻은 데이터를 콤마를 기준으로 분리합니다.
  const [id, posX, posY] = event.dataTransfer.getData("text/plain").split(",");
  // X축/Y축 상대 좌표 계산, getData()에서 얻은 마우스 포인터 위치는 string 형식이므로 parseInt()를 하여 numl
  const relativeX = event.pageX - letterContainer.offsetLeft - parseInt(posX);
  const relativeY = event.pageY - letterContainer.offsetTop - parseInt(posY);

  
  /* 스티커 배치하기! */
  // 스티커를 "붙이려면(= 배치하려면)" .letter-decor-container 안에 엘리먼트를 생성 또는 복사해주면 됩니ㄷ
  // 스티커 dragstart 이벤트에서 저장했던 스티커 ID를 이용해 원 스티커 엘리먼트를 알아냅시다.
  const stickerId = event.dataTransfer.getData("text/plain");
  const stickerElement = document.querySelector(`.decor-container .sticker[data-sticker=${stickerId}]`);
  const clonedStickerElement = stickerElement.cloneNode(); // 스티커 엘리먼트 복사
  // 복사한 스티커 엘리먼트에 계산한 좌표 적용
  clonedStickerElement.style.left = relativeX;
  clonedStickerElement.style.top = relativeY;
  // .letter-decor-container에 집어넣기!
  document.querySelector(".letter-container .letter-decor-container").appendChild(clonedStickerElement);

});
});






 