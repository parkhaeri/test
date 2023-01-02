const character = document.querySelector(".character");
const block = document.querySelector(".block")
function jump () {
    if (character.classList != "animate") {
        character.classList.add("animate")
    }
    setTimeout(function(){
        character.classList.remove("animate")
    },500) 
}

const check = setInterval(function(){
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft<20 && blockLeft>0 && characterTop>=130) {
        block.style.animation = "none"
        block.style.animation = "display"
        alert("You Lose")
    }

},10);

