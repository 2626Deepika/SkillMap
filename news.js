import axios from "axios";

export default async function handler(req, res) {
  try {
    const topics = [
      "India IT hiring surge 2026",
      "India startup funding jobs",
      "India layoffs corporate sector",
      "India government job recruitment"
    ];

    const results = [];

    for (let topic of topics) {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=en&sortBy=publishedAt&pageSize=1&apiKey=${process.env.NEWS_API_KEY}`
      );
      if (response.data.articles.length > 0) {
        results.push(response.data.articles[0]);
      }
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
