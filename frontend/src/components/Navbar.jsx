import { motion } from "framer-motion";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-linear-to-r from-pink-600 to-blue-900">
      <div className="flex justify-between items-center px-10 py-5 max-w-7xl mx-auto">
        
        {/* Logo / Title */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-extrabold text-white bg-linear-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent tracking-wide"
        >
          Personalized News Digest
        </motion.h1>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-pink-800 shadow-lg hover:shadow-red-500/30 transition-all font-semibold text-white"
        >
          Logout
        </motion.button>

      </div>
    </nav>
  );
}
