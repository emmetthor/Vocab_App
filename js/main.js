import "./debug.js";
import "./fetch_vocab.js";
import "./switch_page.js";
import "./data.js";
import "./search.js"
import { fetch_vocab } from "./fetch_vocab.js";
import { set_vocab } from "./data.js";
import { quick_search } from "./search.js";

async function init() {
    const vocab_list = await fetch_vocab();
    set_vocab(vocab_list);
} init();

document.getElementById("quick_search")
.addEventListener("input", e => {
    const simular_list = quick_search(e.target.value);

    const container = document.getElementById("quick_search-list");

    container.innerHTML = '';

    simular_list.forEach (v => {
        const div = document.createElement('div');
        div.textContent = v.word;
        container.appendChild(div);
    });
});