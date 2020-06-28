const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");


for (let card of cards) {
  const imageId = card.getAttribute("id");
    card.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    modalOverlay.querySelector("img").src = `./assets/${imageId}.png`;
    const modalTitle = card.children[1].textContent
    modalOverlay.querySelector('h1').innerHTML = modalTitle
    const modalAuthor = card.children[2].textContent
    modalOverlay.querySelector('p').innerHTML = modalAuthor
  });
}

document.querySelector(".modal-close").addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});
