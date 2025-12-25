import { API_URL } from "./config.js";
import { vocab_list } from "./data.js";
import { D } from "./debug.js";
import { set_sync_panel_icon } from "./sync_panel.js";

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
    D.debug("remote:", remote_vocab, "local:", vocab_list);
    if (JSON.stringify(vocab_list) !== JSON.stringify(remote_vocab)) {
        D.warn("NOT SYNCED");
        set_sync_panel_icon("not_synced");
    } else {
        D.info("SYNCED");
        set_sync_panel_icon("synced");
    }
}