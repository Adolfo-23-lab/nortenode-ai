"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, X } from "lucide-react";
import Image from "next/image";
import { saveChatLeadAction } from "@/app/actions/saveChatLead";

export default function FloatingSalesBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return `sales-web-${Math.floor(Math.random() * 1000000)}`;
    const stored = localStorage.getItem("nn_sales_session");
    if (stored) return stored;
    const id = `sales-web-${Math.floor(Math.random() * 1000000)}`;
    localStorage.setItem("nn_sales_session", id);
    return id;
  });

  const { messages, sendMessage, status } = useChat({
    // body is a valid runtime feature; cast needed due to SDK v3 type gap
    ...(({ body: { botType: "sales" } }) as any),
    messages: [
      {
        id: "sales-msg-1",
        role: "assistant",
        content: "Olá! 👋 Sou o assistente da NorteNode AI. Em que posso ajudar a sua clínica hoje?",
      } as any,
    ],
  } as any);

  // Auto-scroll to latest message whenever messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    sendMessage({ text: trimmed });
    // Server Action (uses SERVICE_ROLE_KEY — respects RLS)
    await saveChatLeadAction({ sessionId, userMessage: trimmed, source: "sales" });
  };

  const getMessageText = (msg: any): string => {
    if (Array.isArray(msg.parts)) {
      return msg.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("");
    }
    return msg.content ?? "";
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ height: "480px" }}
          >
            {/* Header */}
            <div className="bg-emerald-500/10 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center overflow-hidden border border-emerald-500/30">
                  <Image
                    src="/nortenode_star_icon.png"
                    alt="NorteNode AI"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">NorteNode AI</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    Em Linha
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-slate-950/60">
              {messages.map((msg: any, i: number) => (
                <motion.div
                  key={msg.id ?? i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-500/20" : "bg-emerald-500/20"}`}>
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-slate-800 text-slate-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {getMessageText(msg)}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 max-w-[85%]"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="px-3 py-2 rounded-xl text-sm bg-slate-800 text-slate-400 rounded-tl-none border border-white/5">
                    <span className="animate-pulse">...</span>
                  </div>
                </motion.div>
              )}
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900/80 border-t border-white/10">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva a sua mensagem..."
                  className="flex-1 bg-slate-950/50 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 disabled:opacity-50 transition-all hover:bg-emerald-400 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Fechar assistente NorteNode AI" : "Abrir assistente NorteNode AI"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center overflow-hidden border-2 border-emerald-400/50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-slate-950" />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <Image
                src="/nortenode_star_icon.png"
                alt="NorteNode AI"
                width={30}
                height={30}
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
