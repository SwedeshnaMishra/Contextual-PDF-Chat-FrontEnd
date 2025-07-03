API_ENDPOINT = `http://localhost:5000`

const upload = document.getElementById("upload")

upload.addEventListener("click", () => {
  window.location.href = "extract.html";
})

function appendMessage(sender, text, type) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.innerHTML = `${text}`;

  if (type === "user") {
    message.className = "message user bg-zinc-700 text-white rounded-lg py-2 px-4 m-2 w-fit ml-auto text-right max-w-[80%] whitespace-pre-wrap break-words shadow";
  } else {
    message.className = "message bot bg-zinc-800 text-white rounded-lg py-2 px-5 m-2 w-fit mr-auto text-left max-w-[80%] whitespace-pre-wrap break-words shadow";
  }

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