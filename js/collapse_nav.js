const collapseBtn = document.getElementById("collapse_icon");
const appContainer = document.getElementById("app_container");
const sideBar = document.getElementById("side_bar");

collapseBtn.addEventListener("click", () => {
    sideBar.classList.toggle("collapse");
    appContainer.classList.toggle("collapse");
});

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
    sideBar.classList.toggle("collapse");
    appContainer.classList.toggle("collapse");
}