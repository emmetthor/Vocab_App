// 記得 Vercel Node runtime
export const runtime = "nodejs";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN, {
  apiUrl: "https://router.huggingface.co/api"
});

const model_name = "meta-llama/Meta-Llama-3.1-8B-Instruct";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body ?? {};
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const result = await hf.textGeneration({
      model: model_name,
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
      },
    });

    // result 是一個陣列，每個 item 包含 text
    const answer = Array.isArray(result) ? result[0].generated_text : result.generated_text;

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("ask_ai error:", err);
    return res.status(500).json({ error: err.message ?? "Internal Server Error" });
  }
}
