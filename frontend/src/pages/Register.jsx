import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Email format validation
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Strong password validation
  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const register = async () => {
    // Email validation
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!isStrongPassword(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    try {
      await API.post("/register", { email, password });
      toast.success("Account created");
      navigate("/");
    } catch {
      toast.error("User already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-indigo-900 to-black p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full py-3 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Register
        </button>
      </div>
    </div>
  );
}
