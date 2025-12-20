import { D } from "./debug.js";
import { quick_search } from "./search.js";

const quick_search_list = document.querySelector(".quick_search-list");
const quick_search_input = document.querySelector(".quick_search");

let simular_list = [];

quick_search_input.addEventListener("input", e => {
    //D.info("current input", e.target.value);

    simular_list = quick_search(e.target.value);

    //D.info("length of simular_list", simular_list.length);

    if (simular_list.length !== 0) {
        quick_search_list.style.display = 'block';
        quick_search_input.classList.add('open');
    } else {
        quick_search_list.style.display = 'none';
        quick_search_input.classList.remove('open');
        //quick_search_input.style.borderColor = 'red';
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
        quick_search_list.style.display = 'block';
        quick_search_input.classList.add('open');
    }
});

quick_search_input.addEventListener("blur", () => {
    //setTimeOut?

    quick_search_list.style.display = 'none';
    quick_search_input.classList.remove('open');
});