import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 I’m your SmartTravel AI assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      {
        role: "ai",
        text: "Got it! I’ll help you plan this ✨",
      },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto h-[calc(100vh-160px)] px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-(--text-primary)">
          AI Travel Assistant
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Ask anything about trips, destinations, or planning.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl bg-(--bg-soft) p-4 space-y-3">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-3 text-sm rounded-2xl ${
              msg?.role === "user"
                ? "ml-auto bg-(--primary) text-(--btn-primary-text)"
                : "mr-auto bg-(--card) text-(--text-primary) shadow-sm border border-(--input-border)"
            }`}
          >
            {msg?.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e?.target?.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything about your trip..."
          className="
            flex-1 rounded-xl px-4 py-3 text-sm
            bg-(--input-bg)
            text-(--text-primary)
            placeholder-(--input-placeholder)
            border border-(--input-border)
            focus:outline-none
            focus:border-(--primary)
          "
        />

        <button
          onClick={handleSend}
          className="
            flex items-center justify-center
            rounded-xl px-4 py-3
            bg-(--primary)
            text-(--btn-primary-text)
            hover:bg-(--primary-hover)
            transition cursor-pointer
          "
        >
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
