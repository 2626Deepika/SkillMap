let currentIndex = 0;
let slides = [];

async function loadNews() {
  try {
    const response = await fetch("/api/news");
    const articles = await response.json();

    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    articles.forEach(article => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      slide.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/1200x800'}">
        <div class="content">
          <h2>${article.title}</h2>
          <p>${article.description || ""}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      `;

      carousel.appendChild(slide);
    });

    slides = document.querySelectorAll(".slide");

  } catch (error) {
    console.error("Frontend fetch error:", error);
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
}

function updateSlide() {
  const carousel = document.getElementById("carousel");
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

loadNews();
