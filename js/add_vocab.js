import { reset_class } from "./css_helper.js";
import { save_to_local, set_vocab_info, vocab_list } from "./data.js";
import { D } from "./debug.js"
import { exact_search } from "./search.js"
const word = document.getElementById('add-vocab');
const pos = document.getElementById('add-pos');
const definition = document.getElementById('add-definition');
const example = document.getElementById('add-example');
const confirm = document.getElementById('confirm_vocab');
const add_btn = document.getElementById('confirm-send');

function safe_trim(v) {
    if (v) return v.trim();
    
    D.debug("Empty v");
    return v;
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
        D.error("Invalid word");
        return 'invalid';
    }

    if (!vocab.definition) {
        D.error("Invalid definition");
        return 'invalid';
    }

    if (vocab.word !== vocab.confirm) {
        D.warn("The confirm word isn't same to the original word");
        return 'word_unequal_confirm';
    }
    
    return 'valid';
}

const tooltip = document.getElementById("word_tooltip");
const TOOLTIP = {
    same_vocab: "已存在相同詞彙，請確認是否新增",
    none: "",
    invalid: "單字或定義為空，請檢查輸入",
    word_unequal_confirm: "單字與確認單字不符，請檢查輸入",
    success: "成功新增單字",
}

let hideTimer = null;

function show_tooltip(id, class_name) {
    if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
    }

    tooltip.textContent = TOOLTIP[id];
    reset_class(tooltip, class_name);

    hideTimer = setTimeout(() => {
        tooltip.classList.remove(class_name);
    }, 3000);
}

add_btn.addEventListener('click', () => {
    const vocab = get_new_vocab();

    const ret = isValid(vocab);

    if (ret === 'invalid' || ret === 'word_unequal_confirm') {
        show_tooltip(ret, 'active');
        return;
    }

    if (ret != 'valid') {
        D.error("Invalid return value of isValid", ret);
        return;
    }

    vocab_list.push(vocab);

    show_tooltip('success', 'active');

    save_to_local();

    set_vocab_info();

    clear_input();
});

function clear_input() {
    word.value = '';
    pos.value = '';
    definition.value = '';
    example.value = '';
    confirm.value = '';
}

word.addEventListener("input", w => {
    const exact_list = exact_search(w.target.value);
    D.debug("exact_list:", exact_list);

    if (exact_list.length >= 1) {
        show_tooltip('same_vocab', 'active')
    }
});