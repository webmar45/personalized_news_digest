import { motion } from "framer-motion";

export default function TopicChip({ topic, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-all ${
        active
          ? "bg-green-500 text-white shadow-lg"
          : "bg-white/10 text-gray-200 hover:bg-white/20"
      }`}
    >
      #{topic}
    </motion.button>
  );
}
