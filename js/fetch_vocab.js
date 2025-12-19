import SETTINGS from "./settings.js";
import { D } from "./debug.js"

const FETCH_URL = "https://raw.githubusercontent.com/emmetthor/Vocab_App/refs/heads/main/vocab.json";

function dedupe_vocab(vocab_list) {
    const visi = new Set();
    const res = [];

    for (const v of vocab_list) {
        const key = `${v.word}|${v.pos}|${v.example}`;

        if (!visi.has(key)) {
            visi.add(key);
            res.push(v);
        }
    }

    return res;
}

async function fetch_vocab() {
    D.info("start fetching");
    try {
        const response = await fetch(FETCH_URL);
        if (!response.ok) throw new Error('Network response failed');

        const vocab_list = await response.json();

        const dedupe_vocab_list = dedupe_vocab(vocab_list);

        render_vocab(dedupe_vocab_list);
    } catch (err) {
        debug_log.error("Failed to fetch vocab: ", err);
    }
}

async function render_vocab(vocab_list) {
    D.info("start rendering")

    const container = document.getElementById("new_added-list");

    container.innerHTML = '';

    vocab_list.sort((a, b) => a.word.localeCompare(b.word));

    vocab_list.forEach (v => {
        const div = document.createElement('div');
        div.textContent = `${v.word} - ${v.example}`;
        container.appendChild(div);
    });
}

const test_btn = document.getElementById("test_btn");

test_btn.addEventListener("click", () => {
    fetch_vocab()
});
