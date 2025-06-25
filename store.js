const filename = document.getElementById("filename")
const display = document.getElementById("display")
const storeBtn = document.getElementById("store")
const againBtn = document.getElementById("again")

API_ENDPOINT = `http://localhost:5000`

const extractedText = localStorage.getItem('extractedText');

if (extractedText) {
    filename.innerText = "PDF Contnt below";
    display.innerText = extractedText;
}
else {
    filename.innerText = "NO DATA FOUND :("
}

againBtn.addEventListener("click", () => {

    localStorage.removeItem('extractedText');

    window.location.href = "extract.html";
})

storeBtn.addEventListener("click", async () => {

    const formData = new FormData();
    formData.append('text', extractedText);

    try {
        const response = await fetch(`${API_ENDPOINT}/store`, {
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

        window.location.href = "stored.html"
    }
    catch (error) {
        console.error(error);
    }
})