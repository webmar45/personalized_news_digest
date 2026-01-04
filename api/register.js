import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { allowCors } from "./utils/cors.js";

export default async function handler(req, res) {
  allowCors(res);

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, topics: [] });

  res.json({ success: true });
}
