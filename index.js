let hamb = document.getElementById("hamburger");
let logo = document.getElementById("headerL");

let clicked = false;

hamb.addEventListener("click", () => {
  if (clicked) {
    logo.className = "";
    logo.classList.add("burgerClosed");
    clicked = false;
  } else {
    logo.className = "";
    logo.classList.add("spinnBurger");
    clicked = true;
  }
});
