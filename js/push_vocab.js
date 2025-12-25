import { D } from "./debug.js";

import { vocab_list } from "./data.js"

async function pushVocab() {
    D.debug("vocab_list:", vocab_list);
    try {
        const res = await fetch("/api/git_push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vocab_list)
        });
        const ret = await res.json();
        D.info(ret);
    } catch (err) {
        D.error(err);
    }
}

document.getElementById("test_btn").addEventListener("click", async () => {
    D.info("test_btn clicked");
    pushVocab();
});
