import { D } from "./debug.js";
import { quick_search } from "./search.js";

const quick_search_list = document.querySelector(".quick_search-list");
const quick_search_input = document.querySelector(".quick_search");

let simular_list = [];

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
        D.error("invalid command of change_quick_search_style", type);
    }
}

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


    const container = document.getElementById("quick_search-list");

    container.innerHTML = '';

    simular_list.forEach (v => {
        const div = document.createElement('div');
        div.textContent = v.word;
        container.appendChild(div);
    });
});

quick_search_input.addEventListener("focus", () => {
    D.info("simular_list.length", simular_list.length);

    if (simular_list.length !== 0) {
        change_quick_search_style('open');
    }
});

quick_search_input.addEventListener("blur", () => {
    //setTimeOut?

    change_quick_search_style('close');
});