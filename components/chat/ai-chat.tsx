"use client";

import { BotIcon, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { ProductCard } from "../products/product-card";
import ReactMarkdown from "react-markdown";
import SuggestionGrid from "./suggestion-grid";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: any[];
};

export default function AiChat() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sendAudioRef = useRef<HTMLAudioElement | null>(null);
  const receiveAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    sendAudioRef.current = new Audio("/sounds/send.mp3");
    receiveAudioRef.current = new Audio("/sounds/receive.mp3");
  }, []);

  const playSound = (type: "send" | "receive") => {
    const audio =
      type === "send" ? sendAudioRef.current : receiveAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const scrollToBottom = (force = false) => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      120;

    if (force || isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (loading) scrollToBottom(true);
  }, [loading]);

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Hello! I'm TechStore AI 🤖. Ask me about products, prices, color, or description.",
      },
    ]);
  }, []);

  const sendMessage = async (input: string) => {
    if (!input || loading) return;

    playSound("send");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    const historyWithContext = messages.map((msg) => {
      if (msg.role === "assistant" && msg.products?.length) {
        return {
          ...msg,
          content:
            msg.content +
            `\n\n[SYSTEM_CONTEXT: ${JSON.stringify(msg.products)}]`,
        };
      }
      return msg;
    });

    const finalMessages = [...historyWithContext, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: finalMessages }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data.text ||
          (data.products?.length
            ? "Here are some products I found:"
            : "Sorry, I couldn't find anything that matches your request 😢"),
        products: data.products || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
      playSound("receive");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "⚠️ Now limit reached, please try again later. Thank you for your patience.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(chatInput.trim());
  };

  const handleSuggestionClick = (value: string) => {
    setChatInput(value);
    sendMessage(value);
  };

  return (
    <div className="max-w-7xl px-5 mx-auto md:h-[76vh] h-96 flex flex-col">
      <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar">
        <div
          className="space-y-6 
          pb-[calc(env(safe-area-inset-bottom)+16px)]"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 w-full max-w-[90%] md:max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : "items-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="shrink-0 bg-[#E0E7FF] rounded-full md:p-3 p-2 mt-1">
                    <BotIcon size={20} className="text-primary" />
                  </div>
                )}

                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm border w-fit ${
                      message.role === "user"
                        ? "bg-primary text-white border-primary rounded-br-none ml-auto"
                        : "bg-white dark:bg-card border-gray-100 dark:border-neutral-800 rounded-tl-none"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        img: ({ node, ...props }) => (
                          <img
                            {...props}
                            className="max-w-60 md:max-w-100 h-auto rounded-xl my-3 shadow-md border border-neutral-100 dark:border-neutral-800"
                            alt={props.alt || "Product Image"}
                          />
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 leading-relaxed text-sm md:text-base">
                            {children}
                          </p>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>

                  {message.products && message.products.length > 0 && (
                    <div className="w-full overflow-hidden">
                      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                        {message.products.map((product) => (
                          <div
                            key={product.id}
                            className="w-50 md:w-60 shrink-0 transition-transform active:scale-95"
                          >
                            <ProductCard product={product} isChat />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {messages.length === 1 && !loading && (
            <SuggestionGrid onSelect={handleSuggestionClick} />
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="shrink-0 bg-[#E0E7FF] rounded-full md:p-3 p-2 mt-1">
                  <BotIcon size={20} className="text-primary" />
                </div>

                <div className="px-4 py-3 bg-white dark:bg-card border rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div
        className="fixed md:bottom-0 bottom-18 left-0 w-full z-40 backdrop-blur-md border-t"
      >
        <div
          className="max-w-4xl mx-auto px-4 pt-3 
          pb-[calc(env(safe-area-inset-bottom)+16px)]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-gray-100 dark:bg-card border rounded-full px-2 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/50"
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about products..."
              className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
            />

            <button
              disabled={!chatInput.trim() || loading}
              className="bg-primary text-white p-2.5 rounded-full disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
