import React, { useState } from "react";
import Navbar from "../components/Navbar";

function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setReply("Server error ❌");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-4">
          AI Travel Assistant 🤖
        </h2>

        <input
          className="border p-2 w-full"
          placeholder="Ask: cheapest flights to Nairobi?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 mt-2"
        >
          Ask AI
        </button>

        {reply && (
          <div className="bg-gray-100 p-3 mt-4 rounded">
            {reply}
          </div>
        )}

      </div>
    </div>
  );
}

export default AIChat;