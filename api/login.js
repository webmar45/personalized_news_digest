import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { allowCors } from "./utils/cors.js";


export default async function handler(req, res) {
  allowCors(res);
  if (req.method === "OPTIONS") {
  return res.status(200).end();
}


  await connectDB();
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
  
}
