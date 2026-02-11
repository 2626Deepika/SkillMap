// ---------------- COURSE DATA ----------------

const courseData = {
    beginner: [
        "HTML", "CSS", "JavaScript", "Python",
        "Java", "C Programming", "Git",
        "Bootstrap", "TypeScript"
    ],

    intermediate: [
        "React", "NodeJS", "MongoDB",
        "SQL", "REST APIs", "Data Structures",
        "OOP Concepts", "Firebase"
    ],

    advanced: [
        "System Design", "Microservices",
        "DevOps", "AWS", "Docker",
        "Kubernetes", "Cyber Security",
        "CI/CD", "Cloud Architecture"
    ]
};

// ---------------- SHOW LEVEL ----------------

function showLevel(level) {

    let html = `<div class="course-grid">`;

    courseData[level].forEach(course => {
        html += `
        <div class="course-card">
            <img src="https://picsum.photos/400/200?random=${course}">
            <h3>${course}</h3>
            <button onclick="watchCrashCourse('${course}')">
                Watch Crash Course
            </button>
        </div>
        `;
    });

    html += `</div>`;

    document.getElementById("courses").innerHTML = html;
    document.getElementById("content").innerHTML = "";
}

// ---------------- WATCH VIDEO ----------------

function watchCrashCourse(course) {

    document.getElementById("content").innerHTML = `
        <h2>${course} Crash Course</h2>

        <iframe width="800" height="450"
            src="https://www.youtube.com/embed/UB1O30fR-EE"
            frameborder="0"
            allowfullscreen>
        </iframe>

        <br><br>
        <button onclick="startQuiz('${course}')">
            Complete Video & Start Quiz
        </button>
    `;
}

// ---------------- GENERATE 30 UNIQUE QUESTIONS ----------------

function generateQuestions(course) {

    const templates = [
        `What is the main purpose of ${course}?`,
        `Which tool is commonly used with ${course}?`,
        `Which statement about ${course} is correct?`,
        `Which concept is fundamental in ${course}?`,
        `Which problem does ${course} solve?`,
        `Which environment supports ${course}?`,
        `Which industry widely uses ${course}?`,
        `Which feature is important in ${course}?`,
        `Which best practice applies to ${course}?`,
        `Which architecture is used in ${course}?`,
        `Which syntax is valid in ${course}?`,
        `Which framework extends ${course}?`,
        `Which command is related to ${course}?`,
        `Which platform integrates with ${course}?`,
        `Which advantage does ${course} provide?`,
        `Which limitation exists in ${course}?`,
        `Which security aspect is relevant to ${course}?`,
        `Which performance factor affects ${course}?`,
        `Which deployment strategy suits ${course}?`,
        `Which API style works with ${course}?`,
        `Which data format is common in ${course}?`,
        `Which version control supports ${course}?`,
        `Which cloud service supports ${course}?`,
        `Which debugging method applies to ${course}?`,
        `Which testing type is used in ${course}?`,
        `Which scaling strategy fits ${course}?`,
        `Which design pattern applies to ${course}?`,
        `Which dependency tool is used in ${course}?`,
        `Which update improves ${course}?`,
        `Which future trend relates to ${course}?`
    ];

    const genericOptions = [
        "High performance and scalability",
        "Structured development approach",
        "Manual hardware control",
        "Cloud-based deployment"
    ];

    const alternativeOptions = [
        "Client-server architecture",
        "Object-oriented design",
        "Containerized deployment",
        "Static file rendering"
    ];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    let questions = [];

    for (let i = 0; i < 30; i++) {

        let correct = genericOptions[Math.floor(Math.random() * genericOptions.length)];

        let wrongOptions = shuffle([...alternativeOptions])
            .filter(opt => opt !== correct)
            .slice(0, 3);

        let allOptions = shuffle([correct, ...wrongOptions]);

        questions.push({
            question: templates[i],
            options: allOptions,
            answer: correct
        });
    }

    return questions;
}

// ---------------- START QUIZ ----------------

function startQuiz(course) {

    const questions = generateQuestions(course);

    let html = `<h2>${course} Quiz (30 Questions)</h2>`;

    questions.forEach((q, index) => {
        html += `
        <div style="text-align:left; width:700px; margin:auto;">
            <p><b>Q${index+1}:</b> ${q.question}</p>
            ${q.options.map(opt =>
                `<input type="radio" name="q${index}" value="${opt}"> ${opt}<br>`
            ).join("")}
        </div><br>
        `;
    });

    html += `
        <button onclick='submitQuiz(${JSON.stringify(questions)})'>
            Submit Quiz
        </button>
    `;

    document.getElementById("content").innerHTML = html;
}

// ---------------- SUBMIT QUIZ ----------------

function submitQuiz(questions) {

    let score = 0;

    questions.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    let passMark = 18;

    if (score >= passMark) {
        document.getElementById("content").innerHTML = `
            <h2>🎉 Passed!</h2>
            <p>Your Score: ${score}/30</p>
            <p>Crash Course Completed Successfully</p>
        `;
    } else {
        document.getElementById("content").innerHTML = `
            <h2>❌ Failed</h2>
            <p>Your Score: ${score}/30</p>
            <p>Minimum required: 18</p>
            <button onclick="location.reload()">Retry</button>
        `;
    }
}
