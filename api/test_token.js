export default async function test_token() {
    const TOKEN = process.env.GITHUB_TOKEN;

    if (!TOKEN) {
        D.error("can't get GITHUB_TOKEN");
    } else {
        D.info("token:", TOKEN.slice(0, 5) + "...");
    }
} test_token();