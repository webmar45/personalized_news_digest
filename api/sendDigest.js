import connectDB from "./config/db.js";
import User from "./models/User.js";
import { fetchNewsByTopics } from "./utils/newsService.js";
import { sendEmail } from "./utils/emailService.js";
import { verifyToken } from "./utils/auth.js";
import { allowCors } from "./utils/cors.js";

export default async function handler(req, res) {
  allowCors(res);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectDB();
  const { id } = verifyToken(req);

  const user = await User.findById(id);
  const articles = await fetchNewsByTopics(user.topics);

  const today = new Date().toDateString();
  const userName = user.name || "Subscriber";

  const html = `
    <h2>📰 Your Personalized News Digest</h2>

    <p>Hi <strong>${userName}</strong>,</p>

    <p>
      Here are the latest headlines based on your selected topics:
      <strong>${user.topics.join(", ")}</strong>
    </p>

    <p><strong>Date:</strong> ${today}</p>
    <hr />

    <ul>
      ${articles
        .map(
          (n) => `
            <li style="margin-bottom: 16px;">
              <a 
                href="${n.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                style="text-decoration: none; color: #1a0dab;"
              >
                <strong>${n.title}</strong>
              </a>
              <p style="margin: 4px 0 0; color: #555;">
                ${n.description || "Click to read the full article."}
              </p>
            </li>
          `
        )
        .join("")}
    </ul>

    <hr />
    <p style="font-size: 13px; color: #666;">
      You are receiving this email because you subscribed to personalized news updates.
    </p>

    <p>
      Regards,<br/>
      <strong>Personalized News Digest Team</strong>
    </p>
  `;

  await sendEmail(user.email, html);

  res.json({ success: true });
}
