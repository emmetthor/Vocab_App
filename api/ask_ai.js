export const runtime = "nodejs";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body ?? {};
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const result = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [{ role: "user", content: prompt }],
    });

    return res.status(200).json({
      answer: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("ask_ai error:", err);
    return res.status(500).json({
      error: err.message ?? "Internal Server Error",
    });
  }
}
