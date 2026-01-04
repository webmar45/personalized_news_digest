import connectDB from "./config/db.js";
import User from "./models/User.js";
import { verifyToken } from "./utils/auth.js";
import { allowCors } from "./utils/cors.js";


// api/updateTopic.js
export default async function handler(req, res) {
  allowCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  // Allow POST, PUT, or PATCH
  if (!["POST", "PUT", "PATCH"].includes(req.method)) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    
    // Verify user
    const decoded = verifyToken(req);
    const userId = decoded.id;

    // Destructure data safely
    const { topics, subscribed } = req.body;

    // Use { new: true } to get the updated document back if you need it
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { topics, subscribed },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err.message);
    // If it's a JWT error, return 401. Otherwise, return 500.
    const status = err.name === "JsonWebTokenError" ? 401 : 500;
    res.status(status).json({ message: err.message || "Update failed" });
  }
}