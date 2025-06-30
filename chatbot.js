function appendMessage(sender, text, type) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

API_ENDPOINT = `http://localhost:5000`


async function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById("user-input");
  const question = input.value.trim();
  if (!question) return;

  appendMessage("You", question, "user");
  input.value = "";
  toggleTyping(true);

  try {
    const res = await fetch(`${API_ENDPOINT}/ask`, {
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

