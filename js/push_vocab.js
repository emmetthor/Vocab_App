import { D } from "./debug.js";

import { vocab_list } from "./data.js"

async function pushVocab() {
    try {
        const res = await fetch("/api/git_push", {
            method: "POST",
            body: JSON.stringify({ vocab_list:  vocab_list})
        });
        const ret = await res.json();
    } catch (err) {
        D.error(err);
    }
}

document.getElementById("test_btn").addEventListener("click", async () => {
    D.info("test_btn clicked");
    pushVocab();
});
