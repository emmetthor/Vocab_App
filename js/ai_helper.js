async function askAI() {
    const prompt = document.getElementById("input").value;
    const res = await fetch("/api/ask_ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.text();
    document.getElementById("output").textContent = data.answer;
}

document.getElementById("send").addEventListener("click", askAI);
