import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN, {
  apiUrl: "https://router.huggingface.co/api"
});

export const runtime = "nodejs";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body ?? {};
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const result = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: prompt }],
      parameters: { max_new_tokens: 200, temperature: 0.7 },
    });

    const answer = result.choices[0].message.content;
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("ask_ai error:", err);
    return res.status(500).json({ error: err.message });
  }
}
