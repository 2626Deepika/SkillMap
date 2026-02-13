document.getElementById("signupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    rollno: document.getElementById("rollno").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value,
    batch: document.getElementById("batch").value,
    branch: document.getElementById("branch").value,
    email: document.getElementById("email").value,
    tenth: document.getElementById("tenth").value,
    inter: document.getElementById("inter").value
  };

  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await response.json();

  document.getElementById("message").innerText = data.message;

  if (data.message === "Registration successful") {
    setTimeout(() => {
      window.location.href = "log.html";
    }, 1500);
  }
});
