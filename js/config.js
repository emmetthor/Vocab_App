import { D } from "./debug.js";

export const FETCH_URL = "https://raw.githubusercontent.com/emmetthor/Vocab_App/refs/heads/main/vocab.json";
export const API_URL = "https://api.github.com/repos/Emmetthor/Vocab_App/commits?per_page=1";

export default async function test_token() {
    const TOKEN = process.env.GITHUB_TOKEN;

    if (!TOKEN) {
        D.error("can't get GITHUB_TOKEN");
    } else {
        D.info("token:", TOKEN.slice(0, 5) + "...");
    }
}