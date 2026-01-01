import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);

  const result = await client.chatCompletion({
    model: "meta-llama/Llama-3.1-8B-Instruct:novita",
    messages: [{ role: "user", content: prompt }],
  });

  res.json({
    answer: result.choices[0].message.content,
  });
}
