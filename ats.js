async function analyzeResume() {
    const job = document.getElementById("job").value.trim();
    const resumeTextarea = document.getElementById("resume");
    const fileInput = document.getElementById("resumeFile");

    if (!job) { alert("Please enter job description."); return; }

    let resumeText = resumeTextarea.value.trim();

    // File upload extraction
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        if (file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = async function () {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let text = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    text += content.items.map(item => item.str).join(" ");
                }
                sendToServer(job, text);
            };
            reader.readAsArrayBuffer(file);
            return;
        }
        else if (file.name.endsWith(".docx")) {
            const reader = new FileReader();
            reader.onload = async function () {
                const result = await mammoth.extractRawText({ arrayBuffer: this.result });
                sendToServer(job, result.value);
            };
            reader.readAsArrayBuffer(file);
            return;
        }
        else { alert("Only PDF or DOCX allowed"); return; }
    }

    if (!resumeText) { alert("Please paste resume or upload file."); return; }

    sendToServer(job, resumeText);
}

async function sendToServer(job, resumeText) {
    document.getElementById("result").style.display = "block";
    const scoreCircle = document.getElementById("score");
    scoreCircle.textContent = "Analyzing...";
    scoreCircle.className = "score-circle";

    try {
        const response = await fetch("/api/analyze-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ job, resume: resumeText })
        });

        const data = await response.json();

        // Convert ATS score to percentage
        let atsPercent = Math.round((data.atsScore || 0) * 100);
        scoreCircle.textContent = atsPercent + "%";

        // Color circle based on score
        if (atsPercent < 50) scoreCircle.classList.add("red");
        else scoreCircle.classList.add("green");

        // Matched skills
        const matchedList = document.getElementById("matched");
        matchedList.innerHTML = "";
        (data.matchedSkills || []).forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            li.className = "check";
            matchedList.appendChild(li);
        });

        // Missing skills
        const missingList = document.getElementById("missing");
        missingList.innerHTML = "";
        (data.missingSkills || []).forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            li.className = "cross";
            missingList.appendChild(li);
        });

        // Suggestions
        const suggestionsList = document.getElementById("suggestions");
        suggestionsList.innerHTML = "";
        let suggestions = data.suggestions && data.suggestions.length > 0
                          ? data.suggestions
                          : ["Improve relevant skills", "Include industry keywords", "Highlight projects or achievements"];
        suggestions.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            suggestionsList.appendChild(li);
        });

    } catch (error) {
        scoreCircle.textContent = "Error";
        scoreCircle.className = "score-circle red";
        console.error(error);
        alert("Analysis failed.");
    }
}
