import { useState } from "react";
import "./App.css";
import ReceiverMessageBubble from "./components/ReceiverMessageBubble";
import SenderMessageBubble from "./components/SenderMessageBubble";

function App() {
  // Step 1: Set up state to store messages
  const [messages, setMessages] = useState([
    { sender: "receiver", text: "Hello! How can I assist today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Step 2: Handle message input change
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Step 3: Handle sending the message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "sender", text: newMessage }]);
      setNewMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div className="flex w-screen h-screen bg-slate-100 justify-center items-center">
      <div className="flex flex-col w-1/3 h-[99%] bg-white rounded-3xl my-5">
        {/* Profile Section (Fixed) */}
        <div className="bg-blue-400 rounded-t-3xl w-full h-[10%] flex items-center pl-8">
          <img src="/bot.png" className="rounded-full w-[8%] bg-white" />
          <h3 className="text-2xl ml-3 text-white font-bold font-Inter">Deepseek</h3>
        </div>

        {/* Chat Section (Scrollable & Takes Remaining Space) */}
        <div className="flex flex-col gap-2 p-4 bg-white flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            message.sender === "receiver" ? (
              <ReceiverMessageBubble key={index} message={message.text} />
            ) : (
              <SenderMessageBubble key={index} message={message.text} />
            )
          ))}
        </div>

        {/* Message Type Section (Fixed at Bottom) */}
        <div className="bg-white flex items-center gap-2 p-3 rounded-b-3xl border-t border-gray-300">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;