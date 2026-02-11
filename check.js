function checkSkills() {

    let userSkills = document.getElementById("userSkills").value
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim());

    let jobDesc = document.getElementById("jobDesc").value.toLowerCase();

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Predefined skill keywords (expand this anytime)
    const skillKeywords = [
        "html", "css", "javascript", "js",
        "python", "java", "react", "node",
        "mysql", "sql", "flask", "django",
        "bootstrap", "git", "api"
    ];

    let matched = [];
    let missing = [];

    skillKeywords.forEach(skill => {
        if (jobDesc.includes(skill)) {
            if (userSkills.includes(skill)) {
                matched.push(skill);
            } else {
                missing.push(skill);
            }
        }
    });

    let output = "<h3>Your Current Skills</h3>";

    if (matched.length === 0) {
        output += "<p>No matching skills found</p>";
    } else {
        matched.forEach(skill => {
            output += `<p class="matched">✔ ${skill}</p>`;
        });
    }

    output += "<h3>Missing Skills</h3>";

    if (missing.length === 0) {
        output += "<p>No missing skills 🎉</p>";
    } else {
        missing.forEach(skill => {
            output += `<p class="missing">✘ ${skill}</p>`;
        });
    }

    resultDiv.innerHTML = output;
}
