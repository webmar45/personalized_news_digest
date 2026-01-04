// api/utils/auth.js
import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  // 1. Check for both 'authorization' and 'Authorization' (standard practice)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided or invalid format");
  }

  const token = authHeader.split(" ")[1];
  
  // 2. Ensure JWT_SECRET is actually loaded
  if (!process.env.JWT_SECRET) {
    throw new Error("Server configuration error: Missing JWT_SECRET");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};