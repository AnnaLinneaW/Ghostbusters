let buttonStart = document.getElementById("btnStart");
let buttonStop = document.getElementById("btnStop");
let ghost = document.getElementById("ghostId");
let ghostRadar;
// Genererar en array med random X och Y vektorer
function randomXYdirection() {
  let directionX = 0;
  let directionY = 0;
  let randomX = Math.floor(Math.random() * 20) + 5;
  let randomY = Math.floor(Math.random() * 20) + 5;
  let random1 = Math.random();
  let random2 = Math.random();
  if (random1 > 0.5) {
    directionX = 1;
  } else {
    directionX = -1;
  }
  if (random2 > 0.5) {
    directionY = 1;
  } else {
    directionY = -1;
  }
  return [randomX * directionX, randomY * directionY];
}
function animation() {
  let newX;
  let newY;
  let directions = randomXYdirection(); // [x,y]
  console.log("random (animation körs) :" + directions);
  let currentX = parseInt(getComputedStyle(ghost).left.replace(/[^\d.-]/g, ""));
  let currentY = parseInt(getComputedStyle(ghost).top.replace(/[^\d.-]/g, ""));
  //Lite IF vilkor så spöket håller sig inom ramen, är den påväg ut så förflyttningen * -1 så den byter håll
  if (currentX + directions[0] < 400) {
    newX = directions[0];
  } else {
    newX = -1 * directions[0];
  }
  if (currentY + directions[1] < 300) {
    newY = directions[1];
  } else {
    newY = -1 * directions[1];
  }
  let degAngle = Math.atan(newX / newY) / (Math.PI / 180); // Räknar ut vinkeln förflyttning sker åt
  console.log(degAngle);
  if (newX > 0) {
    ghost.style.transform = `rotateY(180deg) rotate(${degAngle}deg)`;
    console.log("Kollar åt höger");
  } else if (newX < 0) {
    ghost.style.transform = `rotateY(0deg) rotate(${degAngle}deg)`;
    console.log("Kollar åt vänster");
  }
  // Gör förflyttningara
  ghost.style.left = `${currentX + newX}px`;
  ghost.style.top = `${currentY + newY}px`;
}
function intervalAnimation() {
  ghost.style.opacity = "80%";
  if (!ghostRadar) {
    ghostRadar = setInterval(() => {
      animation();
    }, 2000);
  }
  console.log("intervalanimation körs");
}
function stopRadar() {
  ghost.style.opacity = "0%";

  clearInterval(ghostRadar);
  ghostRadar = null;
}
//Eventlisteners
buttonStart.addEventListener("click", intervalAnimation);
buttonStop.addEventListener("click", stopRadar);
