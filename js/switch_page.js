const pageItems = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav_item");

function show_page(name) {
    pageItems.forEach(page => {
        page.classList.toggle("active", page.id === "page-" + name);
    });

    navItems.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.pageTarget === name);
    });
}



navItems.forEach(item => {
    item.addEventListener("click", () => {

        // 切換 active 樣式
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        // 切換頁面
        const target = item.dataset.pageTarget;
        show_page(target);
    });
});