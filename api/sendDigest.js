import connectDB from "./config/db.js";
import User from "./models/User.js";
import { fetchNewsByTopics } from "./utils/newsService.js";
import { sendEmail } from "./utils/emailService.js";
import { verifyToken } from "./utils/auth.js";
import { allowCors } from "./utils/cors.js";

export default async function handler(req, res) {
  // 1. Handle CORS Preflight
  allowCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // 2. Connect to Database
    await connectDB();
    
    // 3. Verify User Token
    let userId;
    try {
      const decoded = verifyToken(req);
      userId = decoded.id;
    } catch (authErr) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 4. Fetch News based on user's saved topics
    const articles = await fetchNewsByTopics(user.topics);
    if (!articles || articles.length === 0) {
       return res.status(200).json({ 
         success: true, 
         message: "No headlines found for your topics today." 
       });
    }

    // 5. Generate Email Template
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const userName = user.name || "Subscriber";
    
    const articlesHtml = articles.map(article => `
      <div style="margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
        <h3 style="margin: 0;"><a href="${article.url}" style="color: #1a73e8; text-decoration: none;">${article.title}</a></h3>
        <p style="color: #555; font-size: 14px; margin: 5px 0;">${article.description || "View full article for details."}</p>
        <small style="color: #888;">Source: ${article.source?.name || 'News API'}</small>
      </div>
    `).join('');

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #333;">📰 Your News Digest</h2>
        <p>Hi ${userName},</p>
        <p>Here are the latest updates for: <strong>${user.topics.join(', ')}</strong></p>
        <p style="color: #666; font-size: 12px;">Date: ${today}</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        ${articlesHtml}
        <p style="font-size: 11px; color: #999; margin-top: 30px;">
          You are receiving this because you subscribed to Personalized News Digest.
        </p>
      </div>
    `;

    // 6. Send via Nodemailer
    // Verify environment variable before attempting
    if (!process.env.EMAIL_PASS) {
       throw new Error("Server configuration error: EMAIL_PASS is missing.");
    }

    // Match your emailService.js parameters: sendEmail(to, html)
    await sendEmail(user.email, emailBody);

    return res.status(200).json({ success: true, message: "Digest sent to " + user.email });

  } catch (err) {
    console.error("sendDigest Error:", err.message);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to process digest: " + err.message 
    });
  }
}