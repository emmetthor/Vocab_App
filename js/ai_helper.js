import { D } from "./debug.js";
import { isStringEmpty, TOOLTIP, getFromInput} from "./utils/index.js";

const wordInput         = document.getElementById('addVocabInput');
const posInput          = document.getElementById('addPosInput');
const definitionInput   = document.getElementById('addDefinitionInput');
const exampleInput      = document.getElementById('addExampleInput');
const confirmVocabInput = document.getElementById('confirmVocabInput');
const addVocabBtn       = document.getElementById('addVocabBtn');

const tooltip = new TOOLTIP(
    document.getElementById("add_inputs"),
    "center-top"
);

async function askAI() {
    const word          = getFromInput(wordInput,         "trim");
    const pos           = getFromInput(posInput,          "trim");
    const definition    = getFromInput(definitionInput,   "trim");
    const example       = getFromInput(exampleInput,      "trim");

    if (isStringEmpty(word)) {
        D.warn("askAI: empty word");
        tooltip.show("必須存在單字才能 AI 造句");
        return;
    }

    if (isStringEmpty(pos)) {
        D.warn("askAI: empty pos");
        tooltip.show("必須存在詞性才能 AI 造句");
        return;
    }

    if (isStringEmpty(definition)) {
        D.warn("askAI: empty definition");
        tooltip.show("必須存在定義才能 AI 造句");
        return;
    }

    const prompt = `你是一個英文母語教師，現在想提升一位高中生的英文。有一個單字 [${word}]，它的詞性 [${pos}] 與它其中一個意思 [${definition}]，請產生一個 [1.語法正確 2.自然 3.符合該意思的用法 4.不使用複雜文法 5.簡短 6.多用不改變單字原意的片語 7.原單字完整出現在句子裡 8.使用英文] 的英語例句。請只輸出句子本身並不要在前後加上括號。謝謝。`

    const aiResult = await fetch("/api/ask_ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" }
    });
    const jsonData = await aiResult.json();

    //console.log(data);

    //console.log(example);
    
    exampleInput.value = jsonData.answer;
}

document.getElementById("ai_example_btn").addEventListener("click", askAI);
