"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, X } from "lucide-react";
import Image from "next/image";
import { saveChatLeadAction } from "@/app/actions/saveChatLead";
import { useMotionInitial } from "@/lib/motion-safe";

type ChatMessage = {
  id: string;
  role: "system" | "user" | "assistant" | "data";
  content: string;
  parts?: Array<{ type: string; text?: string }>;
};

const INITIAL_GREETING: UIMessage[] = [
  {
    id: "sales-msg-1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "¡Hola! 👋 Soy el asistente de NorteNode. Cuéntame del negocio y te explico cómo te ahorramos tiempo.",
      },
    ],
  },
];

export default function FloatingSalesBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mInit = useMotionInitial();

  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return `sales-web-${Math.floor(Math.random() * 1000000)}`;
    const stored = localStorage.getItem("nn_sales_session");
    if (stored) return stored;
    const id = `sales-web-${Math.floor(Math.random() * 1000000)}`;
    localStorage.setItem("nn_sales_session", id);
    return id;
  });

  // AI SDK v6: `body` and `initialMessages` live on the transport, not on
  // useChat() directly.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { botType: "sales", sessionId },
      }),
    [sessionId],
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: INITIAL_GREETING,
  });

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

  const getMessageText = (msg: ChatMessage): string => {
    if ("parts" in msg && Array.isArray((msg as ChatMessage).parts)) {
      return (msg as ChatMessage).parts!
        .filter((p) => p.type === "text")
        .map((p) => p.text)
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
            initial={mInit({ opacity: 0, y: 20, scale: 0.95 })}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-[380px] flex flex-col glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ height: "480px" }}
          >
            {/* Header */}
            <div className="bg-signal-500/10 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-signal-500/20 flex items-center justify-center overflow-hidden border border-signal-500/30">
                  <Image
                    src="/nortenode_star_icon.png"
                    alt="NorteNode"
                    width={24}
                    height={24}
                    className="object-contain w-auto h-auto"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">NorteNode</p>
                  <p className="text-xs text-signal-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-400 animate-pulse inline-block" />
                    Em Linha
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-700/50 transition-colors text-zinc-400 hover:text-white"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-[var(--background)]">
              {(messages as unknown as ChatMessage[]).map((msg: ChatMessage, i: number) => (
                <motion.div
                  key={msg.id ?? i}
                  initial={mInit({ opacity: 0, y: 8 })}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-500/20" : "bg-signal-500/20"}`}>
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-signal-400" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700/50"
                      }`}
                  >
                    {getMessageText(msg)}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={mInit({ opacity: 0 })}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 max-w-[85%]"
                >
                  <div className="w-7 h-7 rounded-full bg-signal-500/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-signal-400" />
                  </div>
                  <div className="px-3 py-2 rounded-xl text-sm bg-zinc-800 text-zinc-500 rounded-tl-none border border-zinc-700/50">
                    <span className="animate-pulse">...</span>
                  </div>
                </motion.div>
              )}
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva a sua mensagem..."
                  className="flex-1 bg-[var(--background)] border border-zinc-800 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-signal-500 placeholder:text-zinc-700"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-signal-500 flex items-center justify-center text-white disabled:opacity-50 transition-all hover:bg-signal-400 shrink-0"
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
        aria-label={isOpen ? "Fechar assistente NorteNode" : "Abrir assistente NorteNode"}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[color:var(--color-signal-600)] to-[color:var(--color-ink-0)] hover:from-[color:var(--color-signal-500)] hover:to-black shadow-lg shadow-[color:var(--color-signal-600)]/40 flex items-center justify-center overflow-hidden border-2 border-[color:var(--color-signal-600)]/50 transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={mInit({ opacity: 0, rotate: -90 })}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={mInit({ opacity: 0, rotate: 90 })}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <Image
                src="/nortenode_star_icon.png"
                alt="NorteNode"
                width={30}
                height={30}
                className="object-contain w-auto h-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}