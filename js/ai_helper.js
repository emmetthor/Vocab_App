async function askAI() {
    const vocab = document.getElementById("add-vocab").value;
    const pos = document.getElementById("add-pos").value;
    const meaning = document.getElementById("add-definition").value;
    const example = document.getElementById("add-example");
    
    if (!vocab) {
        console.error("empty vocab");
        return;
    }

    if (!pos) {
        console.error("empty pos");
        return;
    }

    if (!meaning) {
        console.error("empty meaning");
        return;
    }

    const prompt = `你是一個英文母語教師，現在想提升一位高中生的英文。有一個單字 [${vocab}]，它的詞性 [${pos}] 與它其中一個意思 [${meaning}]，請產生一個 [1.語法正確 2.自然 3.符合該意思的用法 4.不使用複雜文法 5.簡短 6.多用不改變單字原意的片語] 的英語例句。請只輸出句子本身。謝謝。`

    const res = await fetch("/api/ask_ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();

    console.log(data);
    
    example.textContent = data['answer'];
}

document.getElementById("ai_example_btn").addEventListener("click", askAI);
