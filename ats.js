async function checkATS() {

    const jobDesc = document.getElementById("jobDesc").value.toLowerCase();
    const fileInput = document.getElementById("resumeFile");
    const resultDiv = document.getElementById("result");

    if (!fileInput.files.length) {
        alert("Please upload resume (.pdf)");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function() {

        const typedarray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let resumeText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            resumeText += strings.join(" ");
        }

        resumeText = resumeText.toLowerCase();

        const skillKeywords = [
            "html","css","javascript","js","python","java",
            "react","node","mysql","sql","flask","django",
            "bootstrap","git","api","aws","c++","mongodb"
        ];

        let matched = [];
        let missing = [];

        skillKeywords.forEach(skill => {
            if (jobDesc.includes(skill)) {
                if (resumeText.includes(skill)) {
                    matched.push(skill);
                } else {
                    missing.push(skill);
                }
            }
        });

        let total = matched.length + missing.length;
        let percentage = total === 0 ? 0 : Math.round((matched.length / total) * 100);

        let color = percentage > 70 ? "#4CAF50" :
                    percentage > 40 ? "#ff9800" : "#f44336";

        let output = `
            <div class="circle" style="background:${color}">
                ${percentage}%
            </div>

            <h3>✔ Matching Skills</h3>
            ${matched.map(skill => `<p class="matched">✔ ${skill}</p>`).join("")}

            <h3>✘ Missing Skills</h3>
            ${missing.map(skill => `<p class="missing">✘ ${skill}</p>`).join("")}

            <h3>Suggestions</h3>
            <p>Include missing skills if you have experience.</p>
            <p>Use exact job keywords.</p>
            <p>Add measurable achievements.</p>
        `;

        resultDiv.innerHTML = output;
    };

    reader.readAsArrayBuffer(file);
}
