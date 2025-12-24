// api/git_push.js
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // "emmetthor/Vocab_App"

    if (!token || !repo) {
      return res.status(400).json({ message: "Token or repo not found" });
    }

    const [owner, repoName] = repo.split("/");
    const octokit = new Octokit({ auth: token });

    // 1️⃣ 取得檔案 SHA（如果要更新檔案必須知道 SHA）
    const path = "vocab.json";
    let sha;
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo: repoName,
        path,
      });
      sha = data.sha;
    } catch (err) {
      // 檔案不存在 → 新增即可
      sha = undefined;
    }

    // 2️⃣ 更新或新增檔案
    const content = Buffer.from(JSON.stringify({ date: new Date().toISOString() })).toString("base64");
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: repoName,
      path,
      message: "update vocab",
      content,
      sha,
    });

    res.status(200).json({ message: "Push success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}