import axios from "axios";

export const fetchNewsByTopics = async (topics = []) => {
  if (!topics.length) return [];

  const apiKey = process.env.NEWS_API_KEY;
  const query = topics.join(" OR ");

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.articles || [];
  } catch (error) {
    console.error("News API error:", error.response?.data || error.message);
    return [];
  }
};
