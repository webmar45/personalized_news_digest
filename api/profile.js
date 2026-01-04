import connectDB from "./config/db.js";
import User from "./models/User.js";
import { verifyToken } from "./utils/auth.js";
import { allowCors } from "./utils/cors.js";


export default async function handler(req, res) {
  allowCors(res);
  if (req.method === "OPTIONS") {
  return res.status(200).end();
}


  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { id } = verifyToken(req);

    const user = await User.findById(id).select("-password");

    res.json({
      email: user.email,
      topics: user.topics,
      subscribed: user.subscribed
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
