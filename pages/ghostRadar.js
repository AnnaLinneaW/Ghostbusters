let buttonStart = document.getElementById("btnStart");
let buttonStop = document.getElementById("btnStop");
let ghost = document.getElementById("ghostId");
let ghostRadar;
let directionX = 1;
// Genererar en array med random X och Y vektorer
function randomXYvectors() {
  let directionY = 0;
  let randomX = Math.floor(Math.random() * 15) + 15;
  let randomY = Math.floor(Math.random() * 25) + 5;
  let random2 = Math.random();
  
  if (random2 > 0.5) {
    directionY = 1;
  } else {
    directionY = -1;
  }
  return [randomX, randomY * directionY];
}
function animation() {
  let newX;
  let newY;
  let vectors = randomXYvectors(); // [x,y] random
  console.log("random (animation körs) :" + vectors);
  let currentX = parseInt(getComputedStyle(ghost).left.replace(/[^\d.-]/g, ""));
  let currentY = parseInt(getComputedStyle(ghost).top.replace(/[^\d.-]/g, ""));
  //Lite IF vilkor så spöket håller sig inom ramen, är den påväg ut så förflyttningen * -1 så den byter håll
  if (18 < vectors[0] && vectors[0]< 21) {
    directionX = -1 * directionX
    console.log("SUPRISE!");
  }

  if (currentX + vectors[0] * directionX < 50 || currentX + vectors[0] * directionX > 400) {
    console.log("< 50 eller >400");
    directionX = directionX * (-1);
    newX = vectors[0] * directionX;
  } else { 
    newX = vectors[0] * directionX;
  }

  if (currentY + vectors[1] < 300 && currentY + vectors[1] > 50) {
    newY = vectors[1];
  } else {
    newY = -1 * vectors[1];
  }
  let degAngle = Math.abs(Math.atan(newX / newY) / (Math.PI / 180)); // Räknar ut vinkeln förflyttning sker åt
  console.log(degAngle);
  if (newX > 0) {
    ghost.style.transform = `rotateY(180deg) rotate(${degAngle-30}deg)`;
    console.log("Kollar åt höger");
  } else if (newX < 0) {
    ghost.style.transform = `rotateY(0deg) rotate(${degAngle-30}deg)`;
    console.log("Kollar åt vänster");
  }
  // Gör förflyttningara
  setTimeout(() => {
      ghost.style.left = `${currentX + newX}px`;
      ghost.style.top = `${currentY + newY}px`;
  }, 550);

}
function intervalAnimation() {
  ghost.style.opacity = "80%";
  if (!ghostRadar) {
    ghostRadar = setInterval(() => {
      animation();
    }, 1700);
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
