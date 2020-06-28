const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");
const modalInfo = document.querySelector(".modalInfo");

for (let card of cards) {
  const imageId = card.getAttribute("id");
  card.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    modalOverlay.querySelector("img").src = `./assets/${imageId}.png`;
  });
}



document.querySelector(".modal-close").addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});
