async function askAI() {
    const prompt = document.getElementById("input").value;
    const res = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    document.getElementById("output").textContent = data.answer;
}

document.getElementById("send").addEventListener("click", askAI);
