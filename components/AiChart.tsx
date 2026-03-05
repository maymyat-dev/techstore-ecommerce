"use client";

import { Send, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import chatbotIcon from "@/public/images/chatbot-icon.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: chatInput,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.text || "Sorry, something went wrong.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Server error. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 text-white transition bg-black rounded-full shadow-lg hover:scale-105"
        >
          <Image src={chatbotIcon} alt="Chatbot Icon" width={32} height={32} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden">

          <div className="flex items-center justify-between p-3 font-bold text-white bg-primary">
            <span>TechStore AI Assistant</span>
            <X
              className="w-5 h-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50 text-black">

            {messages.length === 0 && (
              <div className="mt-10 text-xs text-center text-gray-400">
                Hello! How can I help you?
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[85%] text-sm ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="p-2 text-xs text-gray-400 bg-white border rounded-lg animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 bg-white border-t"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask questions..."
              className="flex-1 p-2 text-sm text-black border border-gray-200 rounded-md focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading || !chatInput.trim()}
              className="py-2 px-3 text-white rounded-md bg-primary disabled:bg-gray-300"
            >
              <Send className="text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}