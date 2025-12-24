import { D } from "./debug.js";

export const FETCH_URL = "https://raw.githubusercontent.com/emmetthor/Vocab_App/refs/heads/main/vocab.json";
export const API_URL = "https://api.github.com/repos/Emmetthor/Vocab_App/commits?per_page=1";

async function testToken() {
  const res = await fetch("/api/test_token"); // 呼叫 Serverless Function
  const data = await res.json();
  console.log(data);
}

//testToken();