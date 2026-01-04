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
    
    // Check if verifyToken is getting the header correctly
    const decoded = verifyToken(req); 
    if (!decoded || !decoded.id) {
       return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      email: user.email,
      topics: user.topics,
      subscribed: user.subscribed
    });
  } catch (err) {
    console.error("Profile Error:", err.message); // This shows up in Vercel Logs!
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
}