/*
抓取在 github 上的單字

- dedupe_vocab 去重
- fetch_vocab 抓取主程式
- render_vocab 刷新頁面 [TODO]

*/


import { FETCH_URL } from "./config.js";
import { dedupe_vocab } from "./data.js";
import { D } from "./debug.js";

export async function fetch_vocab() {
    D.info("start fetching");
    try {
        const response = await fetch(FETCH_URL);
        if (!response.ok) throw new Error('Network response failed');

        const vocab_list = await response.json();

        const dedupe_vocab_list = dedupe_vocab(vocab_list);

        //D.info("is dedupe_vocab_list a array?", Array.isArray(dedupe_vocab_list));

        //render_vocab(dedupe_vocab_list);

        D.info("fetch successful")

        return dedupe_vocab_list;
    } catch (err) {
        D.error("Failed to fetch vocab: ", err);
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

// const test_btn = document.getElementById("test_btn");

// test_btn.addEventListener("click", () => {
//     fetch_vocab()
// });