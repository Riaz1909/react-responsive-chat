# 💬 Responsive React Chat App (WebSocket)

A beginner-friendly, fully responsive chat app built with **React**, **CSS**, and **WebSockets**. Type a message and see it bounce back using a public echo server!

---

## 🚀 Features

- 📱 Fully responsive design (mobile & desktop)
- ⚡ Real-time message sending using WebSockets
- ✨ Beautiful and clean UI
- 🧠 Beginner-friendly code with comments

---

## 📂 Folder Structure

react-responsive-chat/
├── public/
│ └── index.html
├── src/
│ ├── App.js
│ ├── App.css
│ └── index.js
└── package.json



---

## 🛠️ Setup Instructions

Follow these simple steps to get the chat app running in your local environment:

### 1️⃣ Create a React App

Open your terminal or VS Code terminal and run:

```bash
npx create-react-app react-responsive-chat
cd react-responsive-chat

2️⃣ Replace Files
📁 Inside the src/ folder, replace the contents of the following files:

📄 src/App.js

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://ws.postman-echo.com/raw");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { type: "received", text: event.data }]);
    };

    return () => ws.current && ws.current.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    ws.current.send(input);
    setMessages((prev) => [...prev, { type: "sent", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-wrapper">
      <h2>📱 Responsive Chat App</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
🎨 src/App.css

* {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background-color: #f0f2f5;
}

.chat-wrapper {
  max-width: 600px;
  margin: 40px auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.chat-box {
  height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #fafafa;
}

.message {
  padding: 10px 14px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.sent {
  background-color: #d1f7d6;
  align-self: flex-end;
}

.message.received {
  background-color: #e1e1f9;
  align-self: flex-start;
}

.input-area {
  display: flex;
  gap: 10px;
}

.input-area input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.input-area button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .chat-wrapper {
    margin: 10px;
    padding: 10px;
  }

  .input-area button {
    padding: 10px;
  }
}
3️⃣ Start the App
Run the app locally with:

bash
npm start
It should open the app in your browser at:

📍 http://localhost:3000

🧪 Test It
Type any message in the input box.

Hit Enter or click Send.


