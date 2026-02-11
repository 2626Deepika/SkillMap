const tools = [
  {
    name: "ChatGPT",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    url: "https://chat.openai.com",
    desc: "Advanced conversational AI for coding, writing, research, brainstorming and problem solving across domains."
  },
  {
    name: "Gemini",
    image: "https://images.unsplash.com/photo-1673187735850-6f4e2c8dbf8f",
    url: "https://gemini.google.com",
    desc: "Google’s multimodal AI capable of text, image and reasoning tasks with deep search integration."
  },
  {
    name: "GitHub Copilot",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    url: "https://github.com/features/copilot",
    desc: "AI coding assistant that suggests full functions and accelerates software development."
  },
  {
    name: "Claude AI",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    url: "https://claude.ai",
    desc: "AI assistant optimized for long-form reasoning, document analysis and structured writing."
  },
  {
    name: "Perplexity AI",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    url: "https://www.perplexity.ai",
    desc: "AI-powered search engine delivering cited answers with real-time web intelligence."
  },
  {
    name: "Canva AI",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    url: "https://www.canva.com",
    desc: "AI design platform for social posts, presentations, branding and marketing visuals."
  },
  {
    name: "Midjourney",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    url: "https://www.midjourney.com",
    desc: "AI image generator creating artistic and high-quality visual content from text prompts."
  },
  {
    name: "Notion AI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    url: "https://www.notion.so/product/ai",
    desc: "Smart writing and productivity assistant integrated inside Notion workspace."
  },
  {
    name: "Grammarly AI",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    url: "https://www.grammarly.com",
    desc: "AI writing enhancer that improves clarity, tone, grammar and professionalism."
  },
  {
    name: "Jasper AI",
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
    url: "https://www.jasper.ai",
    desc: "AI marketing assistant for generating blogs, ads, and high-converting content."
  },
  {
    name: "Runway ML",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    url: "https://runwayml.com",
    desc: "AI-powered video editing and generative media platform for creators."
  },
  {
    name: "HuggingFace",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    url: "https://huggingface.co",
    desc: "Open AI model hub with thousands of machine learning models and datasets."
  },
  {
    name: "Synthesia",
    image: "https://images.unsplash.com/photo-1581091870627-3c7a3d4b1b7e",
    url: "https://www.synthesia.io",
    desc: "Create AI-generated professional videos using virtual avatars."
  },
  {
    name: "Copy.ai",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    url: "https://www.copy.ai",
    desc: "AI tool for automated marketing copy, emails and social media content."
  },
  {
    name: "DeepL AI",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    url: "https://www.deepl.com",
    desc: "AI translation platform known for high-quality contextual translations."
  },
  {
    name: "Otter AI",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    url: "https://otter.ai",
    desc: "AI meeting assistant for real-time transcription and note generation."
  },
  {
    name: "Leonardo AI",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    url: "https://leonardo.ai",
    desc: "AI art generation platform focused on gaming and digital creatives."
  },
  {
    name: "Pictory",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    url: "https://pictory.ai",
    desc: "Convert long-form text into short engaging AI-generated videos."
  }
];

const container = document.getElementById("toolsContainer");

tools.forEach(tool => {
  const card = document.createElement("div");
  card.className = "tool-card";

  card.innerHTML = `
    <img src="${tool.image}">
    <div class="tool-content">
      <h3>${tool.name}</h3>
      <p>${tool.desc}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    window.open(tool.url, "_blank");
  });

  container.appendChild(card);
});
