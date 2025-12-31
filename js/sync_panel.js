import { D } from "./debug.js";


const ICONS = {
    synced: "M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z",
    not_synced: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z",
    loading: "M441-82q-76-8-141.5-41.5t-114.5-87Q136-264 108-333T80-480q0-157 104.5-270T441-878v81q-119 15-200 104.5T160-480q0 123 81 212.5T441-163v81Zm0-198v-247L337-423l-56-57 200-200 200 200-57 56-103-103v247h-80Zm80 198v-81q44-5 83.5-22t72.5-43l57 58q-45 36-99 59T521-82Zm155-650q-33-26-72-43t-83-22v-81q60 6 114 29t99 59l-58 58Zm114 505-57-57q26-33 43-72.5t22-83.5h81q-6 60-29.5 114T790-227Zm8-293q-5-44-22-83.5T733-676l57-57q36 45 59.5 99T879-520h-81Z",
    waiting: "M120-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T360-790v84q-72 26-116 88.5T200-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H120Zm360-120q-17 0-28.5-11.5T440-320q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320q0 17-11.5 28.5T480-280Zm-40-160v-240h80v240h-80Zm160 270v-84q72-26 116-88.5T760-482q0-45-17-87.5T690-648l-10-10v98h-80v-240h240v80H730l16 14q49 49 71.5 106.5T840-482q0 111-66.5 197.5T600-170Z"
}

const COLORS = {
    synced: "#1fff8bff",
    not_synced: "#ffcb1fff",
    loading: "#c8c8c8ff",
    waiting: "#fff01fff"
}

const BACKGROUND = {
    synced: "#1fff8b20",
    not_synced: "#ffcb1f20",
    loading: "#000000ff",
    waiting: "#fff81f20",
}

const INDICATOR = {
    synced: "synced",
    not_synced: "not synced",
    loading: "loading",
    waiting: "waiting"
}

const VISIBLE = {
    synced: "none",
    not_synced: "block",
    loading: "none",
    waiting: "block"
}

const TOOLTIP = {
    synced: "已經與 github 上的單字同步",
    not_synced: "未與 github 上的單字同步",
    loading: "正在上傳現有單字",
    waiting: "由於延遲問題，因此上傳後大約有五分鐘的空窗期，請耐心等待"
}

const sync_panel = document.getElementById("sync_panel");
const svg = sync_panel.querySelector("svg");
const path = sync_panel.querySelector("path");
const indicator = document.getElementById("sync_indicate");
const btn = document.getElementById("sync_push");
const tooltip = document.getElementById("head_bar_tooltip");

export function set_sync_panel_icon(type) {
    if (ICONS[type]) {
        path.setAttribute("d", ICONS[type]);
        svg.setAttribute("fill", COLORS[type]);
        indicator.textContent = INDICATOR[type];
        indicator.style.color = COLORS[type];
        btn.style.display = VISIBLE[type];
        sync_panel.style.backgroundColor = BACKGROUND[type];
        tooltip.textContent = TOOLTIP[type];
    } else {
        D.warn(`No suittable icon for this type: ${type}`)
    }
}