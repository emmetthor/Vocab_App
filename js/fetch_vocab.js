import SETTINGS from "./settings.js";
import { debug_log } from "./debug.js"

const btn = document.getElementById("test_btn");

btn.addEventListener("click", fetch_vocab);

async function fetch_vocab() {
    debug_log.debug("FETCH", "test");
    try {

    } catch (err) {
        
    }
}
