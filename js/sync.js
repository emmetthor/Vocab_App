import { API_URL } from "./config.js";
import { vocab_list } from "./data.js";
import { D } from "./debug.js";

async function get_latest_commit() {
    const res = await fetch(API_URL);

    const data = await res.json();
    return data[0].sha;
}

async function get_local_commit() {
    const res = await fetch("./version.json");

    const data = await res.json();
    return data.commit;
}

export async function check_sync(remote_vocab) {
    if (JSON.stringify(vocab_list) !== JSON.stringify(remote_vocab)) {
        D.warn("NOT SYNCED");
    } else {
        D.info("SYNCED");
    }
}

check_sync();