/*import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("public"));

const PORT = 5000;

let cachedNews = [];

const topics = [
  "India IT hiring surge 2026",
  "India startup funding jobs",
  "India layoffs corporate sector",
  "India government job recruitment"
];

async function fetchNews() {
  try {
    let results = [];

    for (let topic of topics) {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=en&sortBy=publishedAt&pageSize=1&apiKey=${process.env.NEWS_API_KEY}`
      );

      if (response.data.articles.length > 0) {
        results.push(response.data.articles[0]);
      }
    }

    cachedNews = results;
    console.log("4 Unique News Slides Loaded");
  } catch (error) {
    console.error("Error fetching news:", error.message);
  }
}

fetchNews();

// Update every 24 hours
setInterval(fetchNews, 24 * 60 * 60 * 1000);

app.get("/api/news", (req, res) => {
  res.json(cachedNews);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/
// server.js

// -------------------- Imports --------------------
import express from "express";  // Express server
import axios from "axios";      // For fetching news
import cors from "cors";        // To allow cross-origin requests
import dotenv from "dotenv";    // To read .env variables
import path from "path";        // Node path utility

dotenv.config(); // Load environment variables from .env

// -------------------- App Initialization --------------------
const app = express();
app.use(cors()); // Allow cross-origin (important for local testing)
app.use(express.json()); // In case we extend APIs later

// -------------------- Serve Static Files --------------------
// Serve all HTML/CSS/JS in "public" folder
app.use(express.static(path.join(process.cwd(), "public")));

// -------------------- News API --------------------
let cachedNews = [];

const topics = [
  "India IT hiring surge 2026",
  "India startup funding jobs",
  "India layoffs corporate sector",
  "India government job recruitment"
];

// Function to fetch news
async function fetchNews() {
  try {
    let results = [];

    for (let topic of topics) {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=en&sortBy=publishedAt&pageSize=1&apiKey=${process.env.NEWS_API_KEY}`
      );

      if (response.data.articles.length > 0) {
        results.push(response.data.articles[0]);
      }
    }

    cachedNews = results;
    console.log("4 Unique News Slides Loaded");
  } catch (error) {
    console.error("Error fetching news:", error.message);
  }
}

fetchNews(); // Fetch news immediately on server start

// Update news every 24 hours
setInterval(fetchNews, 24 * 60 * 60 * 1000);

// -------------------- API Route --------------------
// Serve cached news
app.get("/api/news", (req, res) => {
  res.json(cachedNews);
});

// -------------------- Catch-All Route for SPA Support --------------------
// COMMENT: Added this so any URL like /home.html, /news.html works correctly
// This is especially needed when deploying to Vercel or when a user clicks navbar links
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "home.html"));
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000; // COMMENT: Use dynamic PORT for Vercel deployment
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
