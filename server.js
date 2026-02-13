// -------------------- Imports --------------------
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// -------------------- App Initialization --------------------
const app = express();
app.use(cors());
app.use(express.json());

// -------------------- File Storage Setup --------------------
const USERS_FILE = "./users.json";

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// -------------------- Serve Static Files --------------------
app.use(express.static(path.join(process.cwd(), "public")));

// ================== AUTH SYSTEM ==================

// -------- Signup API --------
app.post("/api/signup", (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const existingUser = users.find(u => u.email === user.email);

  if (existingUser) {
    return res.json({ message: "Already registered" });
  }

  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ message: "Registration successful" });
});

// -------- Login API --------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

// ================== NEWS SYSTEM ==================

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
setInterval(fetchNews, 24 * 60 * 60 * 1000);

// -------- News API --------
app.get("/api/news", (req, res) => {
  res.json(cachedNews);
});

// -------------------- Catch-All Route --------------------
// IMPORTANT: Must be LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "log.html"));
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

