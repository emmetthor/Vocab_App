import { D } from "./debug.js";


const ICONS = {
    synced: "M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z",
    not_synced: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"
}

const COLORS = {
    synced: "#1fff8bff",
    not_synced: "#ffcb1fff"
}

const BACKGROUND = {
    synced: "#1fff8b20",
    not_synced: "#ffcb1f20"
}

const INDICATOR = {
    synced: "synced",
    not_synced: "not synced"
}

const VISIBLE = {
    synced: "none",
    not_synced: "block"
}

const sync_panel = document.getElementById("sync_panel");
const svg = sync_panel.querySelector("svg");
const path = sync_panel.querySelector("path");
const indicator = document.getElementById("sync_indicate");
const btn = document.getElementById("sync_push");

export function set_sync_panel_icon(type) {
    if (ICONS[type]) {
        path.setAttribute("d", ICONS[type]);
        svg.setAttribute("fill", COLORS[type]);
        indicator.textContent = INDICATOR[type];
        indicator.style.color = COLORS[type];
        btn.style.display = VISIBLE[type];
        sync_panel.style.backgroundColor = BACKGROUND[type];
    } else {
        D.warn(`No suittable icon for this type: ${type}`)
    }
}