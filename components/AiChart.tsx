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

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm TechStore AI 🤖. Ask me about products, prices, or recommendations.",
        },
      ]);
    }
  }, [open]);

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
        body: JSON.stringify({ messages: updatedMessages }),
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
          className="fixed bottom-6 right-6 group z-50"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-primary-400 to-blue-500 blur-xl opacity-60 group-hover:opacity-90 transition"></span>

          <span className="absolute inset-0 rounded-full bg-primary-400 opacity-40 animate-ping"></span>

          <div className="relative flex items-center justify-center rounded-full bg-white p-2 shadow-2xl hover:scale-110 transition-transform">
            <Image
              src={chatbotIcon}
              alt="Chatbot Icon"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>

          <span className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
            Chat with AI
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          
          <div className="flex items-center justify-between p-3 bg-primary text-white">
            <div className="flex items-center gap-2">
              <Image
                src={chatbotIcon}
                alt="AI"
                width={32}
                height={32}
                className="rounded-full"
              />

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">
                  TechStore AI
                </span>
                <span className="text-[10px] opacity-80">
                  Online
                </span>
              </div>
            </div>

            <X
              className="w-5 h-5 cursor-pointer hover:scale-110 transition"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="h-82 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800 text-black">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div>
                  {message.role === "assistant" && (
                  <Image
                    src={chatbotIcon}
                    alt="AI"
                    width={24}
                    height={24}
                    className="rounded-full mt-1"
                  />
                )}

                </div>
                <div
                  className={`p-2 rounded-lg max-w-[70%] text-sm ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <Image
                  src={chatbotIcon}
                  alt="AI"
                  width={22}
                  height={22}
                  className="rounded-full"
                />

                <div className="flex gap-1 p-2 bg-white border rounded-lg">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 border-t"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about products..."
              className="flex-1 p-2 text-sm text-black dark:text-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={loading || !chatInput.trim()}
              className="flex items-center justify-center px-3 py-2 text-white rounded-md bg-primary hover:bg-primary/90 disabled:bg-gray-300"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}