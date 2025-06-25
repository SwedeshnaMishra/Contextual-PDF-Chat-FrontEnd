const input = document.getElementById("file");
const label = document.getElementById("label");
const extractBtn = document.getElementById("extract-btn")

API_ENDPOINT = `http://localhost:5000`

input.addEventListener("change", function () {
    label.innerHTML = input.files.length ? `<img src="https://img.icons8.com/?size=100&id=11651&format=png&color=EBEBEB" alt="Upload" width="50"/><p>${input.files[0].name}</p>` : `<img src="https://img.icons8.com/?size=100&id=367&format=png&color=EBEBEB" alt="Upload" width="50"/><p>Choose PDF</p>`;
});

extractBtn.addEventListener("click", async (e) => {

    e.preventDefault()

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (!file || file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_ENDPOINT}/extract`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            return;
        }

        const result = await response.json();
        console.log(result)

        localStorage.setItem('extractedText', result.text);

        window.location.href = "store.html";
    }
    catch (error) {
        console.error(error);
    }
})