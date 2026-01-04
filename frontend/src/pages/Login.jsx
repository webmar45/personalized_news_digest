import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-indigo-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Welcome Back
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
          onClick={login}
          className="w-full py-3 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-300">
          Do not have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
