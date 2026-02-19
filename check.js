let missingSkillsGlobal = [];
let generatedPlan = [];
let generatedResources = [];

/* =========================
   ROLE DATABASE
========================= */

const roleDatabase = [
    {
        keywords: ["production"],
        skills: [
            "Lean Manufacturing",
            "Six Sigma",
            "Quality Control",
            "Industrial Safety",
            "Process Optimization",
            "Manufacturing Processes",
            "Engineering Drawing"
        ]
    },
    {
        keywords: ["civil"],
        skills: [
            "AutoCAD",
            "Structural Analysis",
            "Construction Planning",
            "Site Management",
            "STAAD Pro"
        ]
    }
];

/* =========================
   DOMAIN RESOURCES
========================= */

const domainResources = {
    engineering: [
        "NPTEL Courses - https://nptel.ac.in/",
        "MIT OpenCourseWare - https://ocw.mit.edu/",
        "Engineering Notes - https://www.engineeringenotes.com/"
    ],
    general: [
        "YouTube Learning - https://www.youtube.com/",
        "Coursera (Free Audit) - https://www.coursera.org/"
    ]
};

/* =========================
   HELPERS
========================= */

function normalize(text) {
    return text.toLowerCase().replace(/[^\w\s]/gi, "");
}

function detectDomain(jobRole) {
    if (jobRole.toLowerCase().includes("engineer"))
        return "engineering";
    return "general";
}

function detectRequiredSkills(jobRole) {
    const roleLower = jobRole.toLowerCase();

    for (let role of roleDatabase) {
        for (let keyword of role.keywords) {
            if (roleLower.includes(keyword)) {
                return role.skills;
            }
        }
    }

    return ["Communication", "Problem Solving", "Time Management"];
}

/* =========================
   ANALYZE SKILLS
========================= */

function analyzeSkills() {

    const jobRole = document.getElementById("jobRole").value;
    const currentSkillsInput = document.getElementById("currentSkills").value;

    if (!jobRole.trim() || !currentSkillsInput.trim()) {
        alert("Please enter job role and skills.");
        return;
    }

    const currentSkills = currentSkillsInput
        .split(",")
        .map(skill => normalize(skill.trim()));

    const requiredSkills = detectRequiredSkills(jobRole);

    const missingSkills = requiredSkills.filter(skill => {
        const normalizedRequired = normalize(skill);
        return !currentSkills.some(userSkill =>
            userSkill.includes(normalizedRequired) ||
            normalizedRequired.includes(userSkill)
        );
    });

    missingSkillsGlobal = missingSkills;

    const resultSection = document.getElementById("resultSection");
    resultSection.classList.remove("hidden");

    if (missingSkills.length === 0) {
        resultSection.innerHTML = "<h2>🎉 You match this role!</h2>";
        return;
    }

    let html = "<h2>Missing Skills:</h2>";
    missingSkills.forEach(skill => {
        html += `<div class="skill-box">${skill}</div>`;
    });

    resultSection.innerHTML = html;
    document.getElementById("timetableSection").classList.remove("hidden");
}

/* =========================
   GENERATE TIMETABLE
========================= */

function generateTimetable() {

    const days = parseInt(document.getElementById("daysInput").value);

    if (!days || days <= 0) {
        alert("Enter valid number of days.");
        return;
    }

    const finalOutput = document.getElementById("finalOutput");
    finalOutput.innerHTML = "<h2>📅 Study Plan</h2>";

    const skills = missingSkillsGlobal;
    const totalSkills = skills.length;

    generatedPlan = [];

    for (let i = 0; i < days; i++) {
        const skill = skills[i % totalSkills];
        generatedPlan.push(`Day ${i + 1}: ${skill}`);
        finalOutput.innerHTML += `<div class="day-item">Day ${i + 1}: ${skill}</div>`;
    }

    // Add resources once
    const domain = detectDomain(document.getElementById("jobRole").value);
    generatedResources = domainResources[domain] || domainResources["general"];

    finalOutput.innerHTML += "<h3>📚 Recommended Resources:</h3>";

    generatedResources.forEach(res => {
        finalOutput.innerHTML += `<div >${res}</div>`;
    });

    document.getElementById("downloadBtn").classList.remove("hidden");
}

/* =========================
   DOWNLOAD PDF
========================= */

function downloadPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text("Skill Gap Study Plan", 10, y);
    y += 10;

    doc.setFontSize(12);

    generatedPlan.forEach(line => {
        doc.text(line, 10, y);
        y += 8;
    });

    y += 5;
    doc.text("Recommended Resources:", 10, y);
    y += 8;

    generatedResources.forEach(res => {
        doc.text(res, 10, y);
        y += 8;
    });

    doc.save("Study_Plan.pdf");
}
