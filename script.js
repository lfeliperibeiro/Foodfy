const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");


for (let card of cards) {
  const imageId = card.getAttribute("id");
    card.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    modalOverlay.querySelector("img").src = `./assets/${imageId}.png`;
    modalOverlay.querySelector('h1').textContent = document.querySelector('h1').innerHTML
    modalOverlay.querySelector('p').textContent = document.querySelector('h1').innerHTML
  });
}

document.querySelector(".modal-close").addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});
