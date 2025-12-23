import { vocab_list } from "./data.js";
import { D } from "./debug.js"
const word = document.getElementById('add-vocab');
const pos = document.getElementById('add-pos');
const definition = document.getElementById('add-definition');
const example = document.getElementById('add-example');
const confirm = document.getElementById('confirm_vocab');
const add_btn = document.getElementById('confirm-send');

function safe_trim(v) {
    if (v) return v.trim();
    else return v;
}

function get_new_vocab() {
    let _w = word.value;
    let _p = pos.value;
    let _d = definition.value;
    let _e = example.value;
    let _c = confirm.value;

    _w = safe_trim(_w);
    _p = safe_trim(_p);
    _d = safe_trim(_d);
    _e = safe_trim(_e);
    _c = safe_trim(_c);

    return {word: _w, pos: _p, definition: _d, example: _e, confirm: _c};
}

function isValid(vocab) {
    if (!vocab.word) {
        D.error("invalid word", vocab.word);
        return 'invalid';
    }

    if (!vocab.definition) {
        D.error("invalid definition", vocab.definition);
        return 'invalid';
    }

    if (vocab.word !== vocab.confirm) {
        D.warn("word != confirm");
        return 'word != confirm';
    }
    
    return 'valid';
}

add_btn.addEventListener('click', () => {
    D.info("add_btn clicked");

    const vocab = get_new_vocab();

    const ret = isValid(vocab);

    if (ret == 'invalid') {
        alert("Word or definition is invalid.");
        return;
    }

    if (ret == 'word != confirm') {
        alert("The word and the confirm word isn't match.");
        return;
    }

    if (ret != 'valid') {
        D.error("invalid return value of isValid", ret);
        return;
    }

    vocab_list.push(vocab);

    alert('Added successfully!');
});