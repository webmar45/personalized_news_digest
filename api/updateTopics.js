import connectDB from "./config/db.js";
import User from "./models/User.js";
import { verifyToken } from "./utils/auth.js";
import { allowCors } from "./utils/cors.js";


export default async function handler(req, res) {
  allowCors(res);
  if (req.method === "OPTIONS") {
  return res.status(200).end();
}


  if (!["POST", "PUT"].includes(req.method)) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { id } = verifyToken(req);

    const { topics, subscribed } = req.body;

    await User.findByIdAndUpdate(id, {
      topics,
      subscribed
    });

    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
