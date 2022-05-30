const hamburgerBtn = document.getElementById("hamburger-btn");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerBtn.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
});
