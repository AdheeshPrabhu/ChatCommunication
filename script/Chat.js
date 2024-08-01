const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  chatBox.innerHTML = messages
    .map((msg) => {
      const timestamp = formatDate(msg.timestamp);
      return `<p><span>[${timestamp}]</span> ${msg.user} : ${msg.text} </p>`;
    })
    .join("");
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const user = loggedInUser.fullName;
    const timestamp = new Date().toISOString();

    messages.push({ user, text, timestamp });

    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messageInput.value = "";
    loadMessages();
  }
}

loadMessages();

setInterval(loadMessages, 1000);
