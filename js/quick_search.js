import { D } from "./debug.js";
import { set_display_word } from "./display_word.js";
import { quick_search } from "./search.js";

const quick_search_list = document.querySelector(".quick_search-list");
const quick_search_input = document.querySelector(".quick_search");
const container = document.getElementById("quick_search-list");

let simular_list = [];

const wordMap = new Map();

let hideTimer = null;

function render_suggest_list() {
    container.innerHTML = '';

    simular_list.forEach (v => {
        const div = document.createElement('div');

        div.textContent = v.word;
        div.classList.add('suggest_word');
        
        wordMap.set(div, v);

        container.appendChild(div);
    });

    D.debug(`suggest_list is rendered, in a total of ${simular_list.length} vocabs`);
}

// 改變 quick_search 的 css 樣式
function change_quick_search_style(type) {
    if (type === 'open') {
        quick_search_input.style.borderColor = 'rgb(74, 201, 220)';

        quick_search_list.style.display = 'block';
        quick_search_input.classList.add('open');
    } else if (type === 'close') {
        quick_search_input.style.borderColor = 'rgb(74, 201, 220)';
        
        quick_search_list.style.display = 'none';
        quick_search_input.classList.remove('open');

    } else if (type === 'no_result') {
        quick_search_input.style.borderColor = 'rgb(220, 74, 74)';

        quick_search_input.classList.remove('shake');
        void quick_search_input.offsetWidth;
        quick_search_input.classList.add('shake');
    } else {
        D.error("Invalid command of change_quick_search_style", type);
    }
}

// 偵測輸入顯示推薦單字
quick_search_input.addEventListener("input", e => {
    //D.info("current input", e.target.value);

    simular_list = quick_search(e.target.value);

    //D.info("length of simular_list", simular_list.length);

    if (simular_list.length !== 0) {
        change_quick_search_style('open');
    } else {
        change_quick_search_style('close');

        if (e.target.value)
            change_quick_search_style('no_result');
    }

    render_suggest_list();
});

// 調整 focus css 樣式
quick_search_input.addEventListener("focus", () => {
    //D.info("simular_list.length", simular_list.length);

    if (simular_list.length !== 0) {
        change_quick_search_style('open');
    }

    clearTimeout(hideTimer);
});

quick_search_list.addEventListener("click", e => {
    if (!e.target.classList.contains("suggest_word")) return;

    const wordObj = wordMap.get(e.target);

    D.info("quick_search word:", wordObj.word);

    set_display_word(wordObj);

    change_quick_search_style('close');

    quick_search_input.value = '';

    simular_list = [];
    render_suggest_list();
});

quick_search_input.addEventListener("blur", () => {
    hideTimer = setTimeout(() => {
        change_quick_search_style('close');
    }, 100);
});