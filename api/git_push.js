// api/push.js
import { execSync } from "child_process";

export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;

    if (!token || !repo) {
      return res.status(400).json({ message: "Token or repo not found" });
    }

    // 1️⃣ clone repo 到 tmp 資料夾
    execSync(`rm -rf tmp_repo`); // 清理舊資料夾
    execSync(`git clone https://${token}@github.com/${repo}.git tmp_repo`);

    // 2️⃣ 在 tmp_repo 做修改
    // 例如更新 vocab.json
    execSync(`echo '{"date":"${new Date().toISOString()}"}' > tmp_repo/version.json`);

    // 3️⃣ commit & push
    execSync(`cd tmp_repo && git add . && git commit -m "update vocab" && git push`);

    res.status(200).json({ message: "Push success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
