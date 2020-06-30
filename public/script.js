const cards = document.querySelectorAll(".card");
const ingredients = document.querySelector(".ingredients");
const preparation = document.querySelector(".preparation");
const information = document.querySelector(".information");
const buttons = document.querySelectorAll("button");

for (let card of cards) {
  const imageId = card.getAttribute("id");
  card.addEventListener("click", () => {
    location.href = `/recipe/${imageId}`;
  });
}

document.querySelector(".button").addEventListener("click", () => {
  ingredients.classList.toggle("show-remove");
});

document.querySelector(".button1").addEventListener("click", () => {
  preparation.classList.toggle("show-remove");
});

document.querySelector(".button2").addEventListener("click", () => {
  information.classList.toggle("show-remove");
});

for (let button of buttons) {
  button.addEventListener("click", () => {
    if (button.innerHTML == "ESCONDER") {
      button.innerHTML = "MOSTRAR";
    } else {
      button.innerHTML = "ESCONDER";
    }
  });
}
