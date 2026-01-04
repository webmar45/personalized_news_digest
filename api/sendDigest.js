import connectDB from "./config/db.js";
import User from "./models/User.js";
import { fetchNewsByTopics } from "./utils/newsService.js";
import { sendEmail } from "./utils/emailService.js";
import { verifyToken } from "./utils/auth.js";
import { allowCors } from "./utils/cors.js";

export default async function handler(req, res) {
  // 1. Always handle CORS first
  allowCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // 2. Connect and Verify
    await connectDB();
    
    let userId;
    try {
      const decoded = verifyToken(req);
      userId = decoded.id;
    } catch (authErr) {
      return res.status(401).json({ message: "Auth failed: " + authErr.message });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3. Fetch News (Limit topics/results to save time on Vercel)
    const articles = await fetchNewsByTopics(user.topics);
    if (!articles || articles.length === 0) {
       return res.status(200).json({ success: true, message: "No news found for these topics" });
    }

    // 4. Build Email HTML
    const today = new Date().toDateString();
    const userName = user.name || "Subscriber";
    const html = `...your HTML code...`; // Keep your HTML logic here

    // 5. Send Email
    // Using a timeout race or ensuring BREVO_API_KEY is present
    if (!process.env.BREVO_API_KEY) {
       throw new Error("BREVO_API_KEY is missing in Vercel settings");
    }

    await sendEmail(user.email, html);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Vercel Function Error:", err);
    return res.status(500).json({ 
      success: false, 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  }
}