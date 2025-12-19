import { vocab_list } from "./data.js";
import { D } from "./debug.js";

export function quick_search(keyword) {
    //D.info("is vocab_list a array", Array.isArray(vocab_list));

    const key = keyword.toLowerCase();

    if (!key) return;

    const res = vocab_list.filter(v =>
        v.word.toLowerCase().includes(key)
    );

    return res;
}