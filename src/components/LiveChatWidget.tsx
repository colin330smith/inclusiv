"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ChevronDown, Clock, User } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "agent" | "bot";
  content: string;
  timestamp: Date;
}

const WIDGET_MINIMIZED_KEY = "inclusiv_chat_minimized";

const quickReplies = [
  "I need help with EAA compliance",
  "How much does it cost?",
  "I want a demo",
  "How long to get compliant?",
];

const botResponses: Record<string, string> = {
  "I need help with EAA compliance":
    "Great question! The EAA deadline was June 28, 2025. To check your current compliance status, use our free scanner. For full compliance support, our Professional plan includes automated fixes and a compliance certificate. Would you like me to connect you with our team?",
  "How much does it cost?":
    "Our plans start at EUR 49/month for the Starter plan (100 pages, weekly scans). The Professional plan is EUR 149/month for unlimited pages and AI-powered fixes. We also offer a free single-page scan with no signup required!",
  "I want a demo":
    "I'd be happy to arrange a demo! You can book directly at inclusiv.dev/demo, or leave your email and our team will reach out within 24 hours. Would you prefer a video call or a recorded walkthrough?",
  "How long to get compliant?":
    "Most websites achieve full WCAG 2.1 AA compliance within 2-4 weeks using our platform. The timeline depends on your site's current state and complexity. Start with a free scan to see your current score and estimated fix time!",
};

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hi! I'm here to help with accessibility compliance. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification after 30 seconds if widget not opened
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content: string, type: "user" | "agent" | "bot") => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const handleSend = (content: string = inputValue) => {
    if (!content.trim()) return;

    // Add user message
    addMessage(content, "user");
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[content] ||
        "Thanks for your message! For personalized help, please email hello@tryinclusiv.com or start a free scan to check your site's accessibility. Our team typically responds within a few hours during business hours.";
      addMessage(response, "bot");
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        {/* Notification bubble */}
        {showNotification && (
          <div className="absolute bottom-16 right-0 w-64 p-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white text-xs"
            >
              &times;
            </button>
            <p className="text-sm text-zinc-300">
              Need help with EAA compliance? Chat with us!
            </p>
          </div>
        )}

        {/* Chat button */}
        <button
          onClick={toggleOpen}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {showNotification && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">1</span>
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-indigo-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Inclusiv Support</h3>
                <p className="text-indigo-200 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online - Reply in minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Minimize"
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${isMinimized ? "rotate-180" : ""}`} />
              </button>
              <button
                onClick={toggleOpen}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.type === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === "user" ? "text-indigo-200" : "text-zinc-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-zinc-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
