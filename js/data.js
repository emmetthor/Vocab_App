import { D } from "./debug.js";
import { fetch_vocab } from "./fetch_vocab.js";

export let vocab_list = [];

// 設定全域 vocab_list
export function set_vocab(data) {
    D.debug("Saved to vocab_list in data.js");
    vocab_list = data;

    save_to_local();
}

export function dedupe_vocab(_vocab_list) {
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

    D.debug(`Saved to LocalStorage, in a total of ${get_obj_length(vocab_list)} vocabs`);
}

export function load_from_local() {
    const data = localStorage.getItem("vocab_local");

    if (!data) {
        D.warn("LocalStrorage vocab_list is empty or invalid");
        return [];
    }

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
    D.debug("at merge_vocab_lists");

    const map = new Map();

    try {
        if (!Array.isArray(git_vocab)) throw new Error('git_vocab is not an Array');

        if (git_vocab.length === 0) {
            D.warn('git_vocab is empty');
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

    D.info("Merge successful of git_vocab and local_vocab");

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