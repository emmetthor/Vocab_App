import { D } from "./debug.js";
import { show_page } from "./switch_page.js";

let display_word = null;

export function set_display_word(wordObj) {
    if (!wordObj) {
        D.error("N o word to set", wordObj);
        return;
    }

    display_word = wordObj;

    render_word();
}

function render_word() {
    if (!display_word) {
        D.error("No word to render", show_word);
        return;
    }

    document.getElementById("display-word").textContent = display_word.word;

    document.getElementById("display-definition").textContent = display_word.definition ?? "";

    document.getElementById("display-example").textContent = display_word.example ?? "";

    show_page("display");

    D.debug(`Render vocab [${display_word.word}] complete`)
}