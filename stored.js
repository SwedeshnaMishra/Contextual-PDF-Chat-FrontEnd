const againBtn = document.getElementById("again")
const chatbot = document.getElementById("chatbot")

againBtn.addEventListener("click", () => {

    localStorage.removeItem('extractedFilename');
    localStorage.removeItem('extractedText');

    window.location.href = "extract.html";
})

chatbot.addEventListener("click", () => {

    localStorage.removeItem('extractedFilename');
    localStorage.removeItem('extractedText');

    window.location.href = "chatbot.html";
})