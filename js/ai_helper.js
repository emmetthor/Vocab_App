async function askAI() {
    const prompt = document.getElementById("input").value;
    const res = await fetch("/api/ask_ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    console.log(data);
}

document.getElementById("send").addEventListener("click", askAI);
