async function pushVocab() {
  try {
    const res = await fetch("/api/git_push", { method: "POST" });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// 例如按鈕觸發
document.getElementById("test_btn").addEventListener("click", pushVocab);