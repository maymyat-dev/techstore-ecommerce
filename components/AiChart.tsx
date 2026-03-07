"use client";

import { Maximize2, Minimize2, Send, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import chatbotIcon from "@/public/images/chatbot-icon.png";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: any[];
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Hello! I'm TechStore AI 🤖. Ask me about products, prices, or recommendations.",
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = chatInput.trim();
    if (!input || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: updatedMessages }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data.text ||
          (data.products && data.products?.length > 0
            ? "Here are some products I found:"
            : "I'm sorry, I couldn't find any products matching your search.🥺 "),
        products: data.products || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "⚠️ Server error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-primary blur-xl opacity-60 group-hover:opacity-90 transition"></span>

            <Image
              src={chatbotIcon}
              alt="chatbot"
              width={70}
              height={70}
              className="relative rounded-full shadow-xl hover:scale-110 transition"
            />
          </div>
        </button>
      )}

      {open && (
        <Draggable
          handle=".chat-header"
          nodeRef={nodeRef}
          bounds="body"
          disabled={isMobile}
        >
          <div
            ref={nodeRef}
            className={`fixed z-50 flex flex-col bg-white shadow-2xl overflow-hidden
      ${
        isMobile
          ? "bottom-0 right-0 w-full h-[85vh] rounded-t-2xl"
          : isMaximized
            ? "bottom-6 right-6 w-[520px] h-[90vh] rounded-2xl"
            : "bottom-6 right-6 w-[360px] h-[75vh] rounded-2xl"
      }`}
          >
            <div className="chat-header flex items-center justify-between px-4 py-3 bg-primary text-white cursor-move">
              <div className="flex items-center gap-2">
                <Image
                  src={chatbotIcon}
                  alt="AI"
                  width={32}
                  height={32}
                  className="rounded-full"
                />

                <div>
                  <p className="text-sm font-semibold">TechStore AI</p>
                  <p className="text-[11px] opacity-80">Online</p>
                </div>
              </div>

              <div className="flex gap-3">
                {isMaximized ? (
                  <Minimize2
                    size={18}
                    className="cursor-pointer"
                    onClick={toggleMaximize}
                  />
                ) : (
                  <Maximize2
                    size={18}
                    className="cursor-pointer"
                    onClick={toggleMaximize}
                  />
                )}

                <X
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 relative shrink-0">
                      {message.role === "assistant" && (
                        <Image
                          src={chatbotIcon}
                          alt="AI"
                          className="rounded-full object-cove"
                        />
                      )}
                    </div>

                    <div
                      className={`px-3 py-2 rounded-xl text-sm shadow-sm text-black
                ${
                  message.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
                    >
                      {message.content}

                      {message.products && message.products.length > 0 && (
                        <div className="mt-3 space-y-2 border-t pt-2">
                          {message.products.map((product) => (
                            <div
                              key={product.id}
                              className="p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 text-xs"
                            >
                              <p className="font-semibold text-primary">
                                {product.title}
                              </p>

                              <p
                                className="text-gray-600 line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: product.description,
                                }}
                              />

                              <div className="flex justify-between mt-1">
                                <span className="text-orange-600 font-semibold">
                                  ${product.price}
                                </span>

                                <span className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px]">
                                  {product.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8">
                    <Image
                    src={chatbotIcon}
                    alt="AI"
                    className="rounded-full object-cover"
                  />
                  </div>


                  <div className="flex gap-1 bg-white border rounded-lg px-2 py-1">
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
              className="flex items-center gap-2 p-3 border-t dark:bg-gray-800"
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about products..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />

              <button
                disabled={!chatInput.trim() || loading}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:bg-gray-300"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </Draggable>
      )}
    </>
  );
}
