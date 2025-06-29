function appendMessage(sender, text, type) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById("user-input");
  const question = input.value.trim();
  if (!question) return;

  appendMessage("You", question, "user");
  input.value = "";
  toggleTyping(true);

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    toggleTyping(false);
    if (data.success) {
      appendMessage("Bot", data.answer, "bot");
    } else {
      appendMessage("Bot", data.message, "bot");
    }
  } catch (e) {
    toggleTyping(false);
    appendMessage("Bot", "Error connecting to server.", "bot");
  }
}

function toggleTyping(show) {
  const indicator = document.getElementById("typing-indicator");
  indicator.style.display = show ? "inline" : "none";
}

async function uploadPDF() {
  const fileInput = document.getElementById("file-upload");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      alert("PDF uploaded and processed successfully.");
    } else {
      alert("Upload failed: " + data.message);
    }
  } catch (err) {
    alert("Failed to upload file.");
  }
}
