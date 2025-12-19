import SETTINGS from "./settings.js";
import { debug_log } from "./debug.js"

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

    return v;
}

async function fetch_vocab() {
    debug_log.debug("FETCH", "test");
    try {
        const response = await fetch(FETCH_URL);
        if (!response.ok) throw new Error('Network response failed');

        const vocab_list = await response.json();

        const dedepe_vocab_list = dedupe_vocab(vocab_list);
    } catch (err) {
        debug_log.debug("FETCH", "Failed to fetch vocab: ", err);
    }
}

document.addEventListener("click")
