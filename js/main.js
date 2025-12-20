import "./debug.js";
import "./fetch_vocab.js";
import "./switch_page.js";
import "./data.js";
import "./search.js"
import "./quick_search.js"
import { fetch_vocab } from "./fetch_vocab.js";
import { set_vocab } from "./data.js";
import { quick_search } from "./search.js";
import { D } from "./debug.js";

async function init() {
    const vocab_list = await fetch_vocab();
    set_vocab(vocab_list);
} init();