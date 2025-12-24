export default function handler(req, res) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        return res.status(400).json({ message: "Token not found" });
    }
    res.status(200).json({
        message: "Token exists",
        token_preview: token.slice(0, 5) + "..."
    });
}
