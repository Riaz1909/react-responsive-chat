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
