import { useState } from "react";
import ollama from "ollama/browser"; // Assuming this is the correct import for Ollama API
import "./App.css";
import ReceiverMessageBubble from "./components/ReceiverMessageBubble";
import SenderMessageBubble from "./components/SenderMessageBubble";

function App() {
  const [messages, setMessages] = useState([
    { sender: "receiver", text: "Hello! How can I assist today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "sender", text: newMessage }]);
      setNewMessage("");

      try {
        const response = await ollama.chat({
          model: "deepseek-r1:1.5b",
          messages: [
            {
              role: "user",
              content: newMessage,
            },
          ],
          stream: false,
        });

        const botMessage = response?.message?.content || "Sorry, I couldn't understand that.";
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "receiver", text: botMessage },
        ]);
      } catch (error) {
        console.error("Error communicating with Ollama:", error);
      }
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