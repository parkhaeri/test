const box = document.getElementById("testBox");

function handleOrientation(event) {
    const alpha = event.alpha,
        beta = event.beta,
        gamma = event.gamma;

    if (!beta) {
        addMouseEvent()
    }

    document.getElementById("alpha").innerText = alpha,
    document.getElementById("beta").innerText = beta,
    document.getElementById("gamma").innerText = gamma,

    box.style.transform = `rotateX(${-beta}deg) rotateY(${gamma}deg)`
}

function handleMouseMove(event) {
    const x = event.clientX,
        y = event.clientY,
        w = window.outerWidth / 2,
        h = window.outerHeight / 2;

    document.getElementById("x").innerText = x,
    document.getElementById("y").innerText = y,

    box.style.transform = `rotateX(${y - h}deg) rotateY(${x - w}deg)`
}

function addMouseEvent() {
    window.addEventListener("mousemove", handleMouseMove);
}

window.addEventListener("deviceorientation", handleOrientation);