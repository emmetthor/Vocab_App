import { D } from "./debug.js";
import { fetch_vocab } from "./fetch_vocab.js";
import { check_sync } from "./sync.js";

export let vocab_list = [];
export let remote_vocab_list = [];

// 設定全域 vocab_list
export function set_vocab(data) {
    vocab_list = data;
    D.info(`Saved to vocab_list in data.js, in a total of ${get_obj_length(data)} vocabs`);

    save_to_local();
}

export function set_remote_vocab(data) {
    remote_vocab_list = data;

    D.info(`Saved to remote_vocab_list in data.js, in a total of ${get_obj_length(data)} vocabs`);
}

export function dedupe_vocab(_vocab_list) {
    D.debug("Started deduping _vocab_list...");
    if (!Array.isArray(_vocab_list)) {
        D.error("Invalid _vocab_list. Returned empty []");
        return [];
    }
    
    const visi = new Set();
    const res = [];

    for (const v of _vocab_list) {
        const key = `${v.word}|${v.pos}|${v.example}`;

        if (!visi.has(key)) {
            visi.add(key);
            res.push(v);
        }
    }

    D.debug(`Dedupe complete, in a total of ${get_obj_length(res)} vocabs`);

    return res;
}

export function save_to_local() {
    localStorage.setItem("vocab_local", JSON.stringify(vocab_list));
    D.info (`Saved to LocalStorage, in a total of ${get_obj_length(vocab_list)} vocabs`);

    check_sync(remote_vocab_list);
}

export function load_from_local() {
    D.debug("Started loading from LocalStorage...");
    const data = localStorage.getItem("vocab_local");

    if (!data) {
        D.warn("LocalStrorage vocab_list is empty or invalid");
        return [];
    }

    D.debug("Loading from LocalStorage successful");

    return JSON.parse(data);
}

function make_key(vocab) {
    return [
        vocab.word.trim().toLowerCase(),
        vocab.pos.trim().toLowerCase(),
        vocab.definition.trim().toLowerCase()
    ].join('|');
}

function merge_vocab_lists(git_vocab, local_vocab) {
    D.info("Started merging git_vocab and local_vocab");

    const map = new Map();
    let warning_cnt = 0;

    try {
        if (!Array.isArray(git_vocab)) throw new Error('git_vocab is not an Array');

        if (git_vocab.length === 0) {
            D.warn('git_vocab is empty');
            warning_cnt++;
        } else {
            git_vocab.forEach(v => {
                map.set(make_key(v), {
                    ...v,
                    source: "github"
                });
            });

            D.debug("git_vocab is merged");
        }

        if (!Array.isArray(local_vocab)) throw new Error('local_vocab is not an Array');

        if (local_vocab.length === 0) {
            D.warn("local_vocab is empty");
            warning_cnt++;
        } else {
            local_vocab.forEach(v => {
                map.set(make_key(v), {
                    ...v,
                    source: "local"
                });
            });

            D.debug("local_vocab is merged");
        }
    } catch (err) {
        D.error("Failed to merge:", err);
    }

    if (warning_cnt !== 0) {
        D.info(`Merge ended with ${warning_cnt} warnings`);
    } else {
        D.info("Merge successful of git_vocab and local_vocab");
    }

    return Array.from(map.values());
}

async function init_vocab() {
    const git_vocab_list = await fetch_vocab();

    const local_vocab_list = load_from_local();

    const merged_vocab_list = merge_vocab_lists(git_vocab_list, local_vocab_list);

    set_vocab(merged_vocab_list);
} init_vocab();

export function get_obj_length(obj) {
    return Object.keys(obj).length;
}