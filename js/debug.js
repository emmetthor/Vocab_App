const panel = document.getElementById("debug-panel");
const header = document.getElementById("debug-header");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    panel.style.left = e.clientX - offsetX + "px";
    panel.style.top = e.clientY - offsetY + "px";
    panel.style.right = "auto";   // 防止 fixed right 干擾
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

function write_log(level, ...messages) {
  const log = document.getElementById("debug-log");

  const line = document.createElement("div");

  line.classList.add("debug_line", `debug-${level}`);
  line.textContent = `[${level}] ${messages.join(" ")}`;

  log.appendChild(line);

  // 滾到底
  log.scrollTop = log.scrollHeight;
}

export const D = {
    info(...messages) {
        write_log("INFO", ...messages);
    },
    warn(...messages) {
        write_log("WARN", ...messages);
    },
    error(...messages) {
        write_log("ERROR", ...messages);
    }
}