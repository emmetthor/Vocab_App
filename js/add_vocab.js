import { reset_class } from "./css_helper.js";
import { save_to_local, set_vocab_info, vocab_list } from "./data.js";
import { D } from "./debug.js";
import { exact_search } from "./search.js";
import { getFromInput } from "./utils/get.js";
import { isStringEmpty, safeTrim } from "./utils/string.js";
import { TOOLTIP } from "./utils/tooltip.js";

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
        word:       getFromInput(wordInput,         "trim"),
        pos:        getFromInput(posInput,          "trim"),
        definition: getFromInput(definitionInput,   "trim"),
        example:    getFromInput(exampleInput,      "trim"),
        confirm:    getFromInput(confirmVocabInput, "trim")
    };
}

// 確認使用者輸入資料正確
function isValid(vocabObj) {
    if (isStringEmpty(vocabObj.word)) {
        D.warn("isValid: empty word");
        return "invalid_word";
    }

    if (isStringEmpty(vocabObj.posInput)) {
        D.warn("isValid: empty pos");
        return "invalid_pos";
    }

    if (isStringEmpty(vocabObj.definition)) {
        D.warn("isValid: empty definition");
        return "invalid_definition";
    }

    if (vocabObj.word !== vocabObj.confirm) {
        D.warn(`isValid: word is different from confirm word [${vocabObj.word}], [${vocabObj.confirm}]`);
        return 'word_unequal_confirm';
    }
    
    return 'valid';
}

// 建立 tooltip
const tooltip = new TOOLTIP(
    document.getElementById("add_inputs"),
    "center-top"
)

// 點擊按鈕事件
addVocabBtn.addEventListener("click", () => {
    const vocabObj = getNewVocab();

    const isValidRet = isValid(vocabObj);

    switch (isValidRet) {
        case "invalid_word":
            tooltip.show("必須存在單字才能新增");
            return;
        case "invalid_pos":
            tooltip.show("必須存在詞性才能新增");
            return;
        case "invalid_definition":
            tooltip.show("必須存在定義才能新增");
            return;
        case "word_unequal_confirm":
            tooltip.show("單字與確認單字不符，請檢查輸入");
            return;
        case "valid":
            break;
        default:
            D.error(`addVocabBtn: invalid value of isValidRet [${isValidRet}]`);
    }

    vocab_list.push(vocabObj);

    tooltip.show(`成功新增單字 ${vocabObj.word}`);

    save_to_local();

    set_vocab_info();

    clearInputs();
});

// 清空網頁上殘存的資訊
function clearInputs() {
    wordInput.value         = "";
    posInput.value          = "";
    definitionInput.value   = "";
    exampleInput.value      = "";
    confirmVocabInput.value = "";
}

// 判斷單字是否曾經輸入過
wordInput.addEventListener("input", () => {
    const inputValue = getFromInput(wordInput, "trim");
    const exactVocabList = exact_search(inputValue);

    D.debug("exactVocabList:", exactVocabList);

    if (exactVocabList.length >= 1) {
        tooltip.show("已存在相同詞彙，請確認是否新增");
    }
});