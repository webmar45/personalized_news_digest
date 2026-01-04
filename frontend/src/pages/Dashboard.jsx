import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TopicChip from "../components/TopicChip";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const TOPICS = ["technology", "sports", "health", "business", "ai"];

function ToggleSwitch({ enabled, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition ${
        enabled ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
}

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setEmail(res.data.email);
        setTopics(res.data.topics || []);
        setSubscribed(res.data.subscribed);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const toggleTopic = async (topic) => {
    const updated = topics.includes(topic)
      ? topics.filter((t) => t !== topic)
      : [...topics, topic];

    setTopics(updated);

    try {
      await API.post("/updateTopics", {
        topics: updated,
        subscribed,
      });
    } catch {
      toast.error("Failed to update topics");
    }
  };

  const toggleSubscription = async () => {
    const next = !subscribed;
    setSubscribed(next);

    try {
      await API.post("/updateTopics", {
        topics,
        subscribed: next,
      });
      toast.success(next ? "Subscription Enabled" : "Subscription Disabled");
    } catch {
      setSubscribed(!next);
      toast.error("Update failed");
    }
  };

  const sendDigest = async () => {
    try {
      await API.post("/sendDigest");
      toast.success("News digest sent 📩");
    } catch {
      toast.error("Failed to send digest");
    }
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-black p-10 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-10"
        >
          Welcome 👋
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          
          {/* Profile Card */}
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-300">{email}</p>
            <p className="mt-3">
              Status:{" "}
              <span
                className={`font-bold ${
                  subscribed ? "text-green-400" : "text-red-400"
                }`}
              >
                {subscribed ? "Active" : "Inactive"}
              </span>
            </p>
          </div>

          {/* Subscription Card */}
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Email Subscription
            </h2>
            <div className="flex items-center gap-4">
              <ToggleSwitch
                enabled={subscribed}
                onToggle={toggleSubscription}
              />
              <span className="font-semibold">
                {subscribed ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Topics Card */}
          <div className="md:col-span-2 backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Select Your Favorite Topics
            </h2>
            <div className="flex gap-3 flex-wrap">
              {TOPICS.map((t) => (
                <TopicChip
                  key={t}
                  topic={t}
                  active={topics.includes(t)}
                  onClick={() => toggleTopic(t)}
                />
              ))}
            </div>
          </div>

          {/* Action Card */}
          <div className="md:col-span-2 flex justify-center">
            <motion.button
              whileHover={{ scale: subscribed ? 1.05 : 1 }}
              whileTap={{ scale: subscribed ? 0.95 : 1 }}
              disabled={!subscribed}
              onClick={sendDigest}
              className={`px-10 py-4 rounded-xl font-bold shadow-xl transition ${
                subscribed
                  ? "bg-linear-to-r from-pink-500 to-indigo-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Send News Digest Now
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
