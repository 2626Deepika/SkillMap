document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  document.getElementById("message").innerText = data.message;

  if (data.message === "Login successful") {
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }
});
