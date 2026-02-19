import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import OpenAI from "openai";


dotenv.config();



// -------------------- App Initialization --------------------
const app = express();
app.use(cors());
app.use(express.json());

// -------------------- Groq AI Setup --------------------
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// -------------------- File Upload Setup --------------------


// -------------------- File Storage Setup --------------------
const USERS_FILE = "./users.json";

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// -------------------- Serve Static Files --------------------
app.use(express.static(path.join(process.cwd(), "public")));

// ================== AUTH SYSTEM ==================

app.post("/api/signup", (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  if (users.find(u => u.email === user.email)) {
    return res.json({ message: "Already registered" });
  }

  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ message: "Registration successful" });
});

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
/*
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
    console.log("News Updated");
  } catch (error) {
    console.error("News fetch error:", error.message);
  }
}

fetchNews();
setInterval(fetchNews, 24 * 60 * 60 * 1000);

app.get("/api/news", (req, res) => {
  res.json(cachedNews);
});
*/
const topics = [
  "India IT hiring surge 2026",
  "India startup funding jobs",
  "India layoffs corporate sector",
  "India government job recruitment"
];

app.get("/api/news", async (req, res) => {
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

    res.json(results);

  } catch (error) {
    console.error("News fetch error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ================== AI RESUME ANALYZER ==================

app.post("/api/analyze-resume", async (req, res) => {
  try {
    const { job, resume } = req.body;

    if (!job || !resume) {
      return res.status(400).json({
        message: "Job and resume are required"
      });
    }

    const prompt = `
You are an advanced ATS resume analyzer.

Job Role or Description:
"${job}"

Candidate Resume:
"${resume}"

Return ONLY valid JSON:

{
  "requiredSkills": [],
  "matchedSkills": [],
  "missingSkills": [],
  "atsScore": number,
  "suggestions": []
}
`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    const resultText = response.choices[0].message.content;

    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch[0]);

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resume analysis failed" });
  }
});

// -------------------- Catch-All Route --------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "log.html"));
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
