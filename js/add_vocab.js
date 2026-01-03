import { reset_class } from "./css_helper.js";
import { save_to_local, set_vocab_info, vocab_list } from "./data.js";
import { D } from "./debug.js";
import { exact_search } from "./search.js";
import { getFromInput } from "./utils/get.js";
import { isStringEmpty, safeTrim } from "./utils/string.js";

// 讀入 html 物件 
const wordInput         = document.getElementById('addVocabInput');
const posInput          = document.getElementById('addPosInput');
const definitionInput   = document.getElementById('addDefinitionInput');
const exampleInput      = document.getElementById('addExampleInput');
const confirmVocabInput = document.getElementById('confirmVocabInput');
const addVocabBtn       = document.getElementById('addVocabBtn');

//console.log(wordInput, posInput, definitionInput, exampleInput, confirmVocabInput, addVocabBtn);

// 取得使用者輸入的資料
function getNewVocab() {
    return {
        word:       getFromInput(wordInput, "trim"),
        pos:        getFromInput(posInput, "trim"),
        definition: getFromInput(definitionInput, "trim"),
        example:    getFromInput(exampleInput, "trim"),
        confirm:    getFromInput(confirmVocabInput, "trim")
    };
}

// 確認使用者輸入資料正確
function isValid(vocabObj) {
    if (isStringEmpty(vocabObj.word)) {
        D.warn("isValid: empty word");
        return "invalid";
    }

    if (isStringEmpty(vocabObj.definition)) {
        D.warn("isValid: empty definition");
        return "invalid";
    }

    if (vocabObj.word !== vocabObj.confirm) {
        D.warn(`isValid: word is different from confirm word [${vocabObj.word}], [${vocabObj.confirm}]`);
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

addVocabBtn.addEventListener("click", () => {
    const vocabObj = getNewVocab();

    const isValidRet = isValid(vocabObj);

    if (isValidRet === 'invalid' || isValidRet === 'word_unequal_confirm') {
        show_tooltip(ret, 'active');
        return;
    }

    if (isValidRet != 'valid') {
        D.error(`addVocabBtn: invalid value of isValidRet [${isValidRet}]`);
        return;
    }

    vocab_list.push(vocabObj);

    show_tooltip('success', 'active');

    save_to_local();

    set_vocab_info();

    clearInputs();
});

function clearInputs() {
    wordInput.value = "";
    posInput.value = "";
    definitionInput.value = "";
    exampleInput.value = "";
    confirmVocabInput.value = "";
}

wordInput.addEventListener("input", () => {
    const inputValue = getFromInput(wordInput, "trim");
    const exactVocabList = exact_search(inputValue);

    D.debug("exactVocabList:", exact_list);

    if (exactVocabList.length >= 1) {
        show_tooltip('same_vocab', 'active')
    }
});