async function pushVocab() {
  try {
    const res = await fetch("/api/git_push", { method: "POST" });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("test_btn").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/push", { method: "POST" });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});
