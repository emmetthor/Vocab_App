import { vocab_list } from "./data.js";
import { D } from "./debug.js";

function normalize(s) {
    if (typeof s !== "string") D.error("normalize failed", typeof s);
    
    return s.trim().toLowerCase();
}

export function quick_search(keyword) {
    //D.info("is vocab_list a array", Array.isArray(vocab_list));

    if (!keyword) return [];

    const key = normalize(keyword);

    if (!key) return [];

    const res = vocab_list.filter(v =>
        normalize(v.word).startsWith(key)
    );

    return res;
}

export function exact_search(keyword) {
    //D.info("is vocab_list a array", Array.isArray(vocab_list));

    if (!keyword) return [];

    const key = normalize(keyword);

    if (!key) return [];

    const res = vocab_list.filter(v =>
        normalize(v.word) === key
    );

    return res;
}