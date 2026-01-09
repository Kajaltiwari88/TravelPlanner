import { useEffect, useState } from "react";
import { SendOutlined } from "@ant-design/icons";

const AIAssistant = ({ context, autoGenerate, onItineraryGenerated }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!context?.destination) return;

    if (autoGenerate) {
      setMessages([
        {
          role: "user",
          text: `I want ${context?.days}-days ${context?.budget} budget trip to ${context?.destination} based on my preferences .`,
        },
        {
          role: "ai",
          text: `✨ I’ve created a trip based on your preferences.Let me know if you want to refine it!`,
        },
      ]);
      onItineraryGenerated?.();
    } else {
      setMessages([
        {
          role: "ai",
          text: `Nice choice! ${context?.destination} is a great place to visit 🌄 What would you like to know?`,
        },
      ]);
    }
  }, [context, autoGenerate]);

  const handleSend = () => {
    if (!input?.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      {
        role: "ai",
        text: "Got it! Let me help with that ✨",
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
        <p className="text-sm text-(--text-secondary)">
          Chat freely or refine your trip plan.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl bg-(--bg-soft) p-4 space-y-3">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-3 text-sm rounded-2xl ${
              msg.role === "user"
                ? "ml-auto bg-(--primary) text-(--btn-primary-text)"
                : "mr-auto bg-(--card) text-(--text-primary) border border-(--input-border)"
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
          placeholder="Ask me anything..."
          className="
            flex-1 rounded-xl px-4 py-3 text-sm
            bg-(--input-bg)
            border border-(--input-border)
            focus:outline-none
            focus:border-(--primary)
            text-(--text-primary)
          "
        />

        <button
          onClick={handleSend}
          className="
            rounded-xl px-4 py-3
            bg-(--primary)
            text-(--btn-primary-text)
          "
        >
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
