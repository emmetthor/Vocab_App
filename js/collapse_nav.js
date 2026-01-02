const collapse_btn = document.getElementById("collapse_icon");
const app_container = document.getElementById("app_container");
const side_bar = document.getElementById("side_bar");

collapse_btn.addEventListener("click", () => {
    side_bar.classList.toggle("collapse");
    app_container.classList.toggle("collapse");
});

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
    side_bar.classList.toggle("collapse");
    app_container.classList.toggle("collapse");
}