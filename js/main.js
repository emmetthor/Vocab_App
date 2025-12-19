import "./debug.js";
import "./fetch_vocab.js";
import "./switch_page.js";
import "./data.js";
import "./search.js"
import { fetch_vocab } from "./fetch_vocab.js";
import { set_vocab } from "./data.js";
import { quick_search } from "./search.js";
import { D } from "./debug.js";

async function init() {
    const vocab_list = await fetch_vocab();
    set_vocab(vocab_list);
} init();

const quick_search_list = document.querySelector(".quick_search-list");
const quick_search_input = document.querySelector(".quick_search");

document.getElementById("quick_search")
.addEventListener("input", e => {
    //D.info("current input", e.target.value);

    const simular_list = quick_search(e.target.value);

    //D.info("length of simular_list", simular_list.length);

    if (simular_list.length !== 0) {
        quick_search_list.style.display = 'block';
    } else {
        quick_search_list.style.display = 'none';
    }


    const container = document.getElementById("quick_search-list");

    container.innerHTML = '';

    simular_list.forEach (v => {
        const div = document.createElement('div');
        div.textContent = v.word;
        container.appendChild(div);
    });
});