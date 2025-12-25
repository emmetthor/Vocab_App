// api/git_push.js
export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // "emmetthor/Vocab_App"
    const path = "vocab.json";

    if (!token || !repo) {
      return res.status(400).json({ message: "Token or repo missing" });
    }

    const [owner, repoName] = repo.split("/");

    const vocab_list = req.body;

    if (!vocab_list) {
      return res.status(400).json({ message: "No vocab_list provided" });
    }

    // 1️⃣ 取得檔案 SHA（用於更新）
    let sha;
    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/${path}`, {
      headers: { Authorization: `token ${token}` },
    });
    if (getRes.status === 200) {
      const data = await getRes.json();
      sha = data.sha;
    }

    // 2️⃣ 更新檔案
    const content = Buffer.from(JSON.stringify(vocab_list)).toString("base64");
    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "update vocab",
        content,
        sha,
      }),
    });

    const result = await putRes.json();
    res.status(200).json({ message: "Push success", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}