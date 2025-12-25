import { D } from "./debug.js";

import { vocab_list } from "./data.js"
import { check_sync } from "./sync.js";

async function pushVocab() {
    //D.debug("vocab_list:", vocab_list);

    try {
        const res = await fetch("/api/git_push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vocab_list)
        });

        const ret = await res.json();

        D.info("Push successful");
        
    } catch (err) {
        D.error(err);
    }

    D.info("SYNCED");
    // TODO
}

document.getElementById("sync_push").addEventListener("click", async () => {
    D.info("test_btn clicked");
    pushVocab();
});
