import { D } from "./debug.js";
import { fetch_vocab } from "./fetch_vocab.js";

export let vocab_list = [];

export function set_vocab(data) {
    vocab_list = data;
}

export function dedupe_vocab(_vocab_list) {
    const visi = new Set();
    const res = [];

    for (const v of _vocab_list) {
        const key = `${v.word}|${v.pos}|${v.example}`;

        if (!visi.has(key)) {
            visi.add(key);
            res.push(v);
        }
    }

    return res;
}

export function save_to_local() {
    localStorage.setItem("vocab_local", JSON.stringify(vocab_list));
}

export function load_from_local() {
    const data = localStorage.getItem("vocab_local");

    if (!data) {
        D.warn("localStrorage vocab is empty or invalid");
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
    const map = new Map();

    if (!git_vocab) {
        D.warn("git_vocab is empty or invalid");
    } else {
        git_vocab.forEach(v => {
            map.set(make_key(v), {
                ...v,
                source: "github"
            });
        });

        D.info("added git_vovab");
    }

    if (!local_vocab) {
        D.warn("local_vocab is empty or invalid");
    } else {
        local_vocab.forEach(v => {
            map.set(make_key(v), {
                ...v,
                source: "local"
            });
        });

        D.info("added local_vocab");
    }

    return Array.from(map.values());
}

async function init_vocab() {
    const git_vocab_list = await fetch_vocab();
    const local_vocab_list = load_from_local();

    set_vocab(merge_vocab_lists(git_vocab_list, local_vocab_list));

} init_vocab();