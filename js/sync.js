import { API_URL } from "./config.js";
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

async function check_sync() {
    const remote_commit = await get_latest_commit();
    const local_commit = await get_local_commit();

    if (remote_commit == local_commit) {
        D.info("SYNCED");
    } else {
        D.warn("NOT SYNCED");
    }
}


check_sync();