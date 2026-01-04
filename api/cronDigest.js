import connectDB from "./config/db.js";
import User from "./models/User.js";
import { getNews } from "./utils/newsService.js";
import { sendEmail } from "./utils/emailService.js";
import { allowCors } from "./utils/cors.js";


export default async function handler(req, res) {
  allowCors(res);

  if (req.method === "OPTIONS") {
  return res.status(200).end();
}

  await connectDB();
  const users = await User.find({ subscribed: true });

  for (const user of users) {
    const news = await getNews(user.topics);
    const html = news.map(n => `<p>${n.title}</p>`).join("");
    await sendEmail(user.email, html);
  }

  res.json({ status: "Cron executed" });
}
