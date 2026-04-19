"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
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
    id: "demo-msg-1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text:
          "Olá, muito gosto. Sou a assistente IA da clínica em Gaia/Porto. " +
          "Em que tratamento tem interesse para o seu rosto ou corpo?",
      },
    ],
  },
];

export default function InteractiveDemo() {
  const mInit = useMotionInitial();
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return `demo-web-${Math.floor(Math.random() * 1000000)}`;
    const stored = localStorage.getItem("nn_demo_session");
    if (stored) return stored;
    const id = `demo-web-${Math.floor(Math.random() * 1000000)}`;
    localStorage.setItem("nn_demo_session", id);
    return id;
  });

  const [input, setInput] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AI SDK v6: `body` and `initialMessages` live on the transport, not on
  // useChat() directly.  Passing them as top-level options (v5-style) is
  // silently ignored, which was causing /api/chat to reject requests for
  // lack of botType/sessionId.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { botType: "demo", sessionId },
      }),
    [sessionId],
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: INITIAL_GREETING,
  });

  // Auto-scroll to latest message (only after component initializes)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Only scroll if component has been initialized and there are user messages
    if (isInitialized && messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isInitialized]);

  const handleSendWrapper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    sendMessage({ text: trimmed });
    // Server Action (uses SERVICE_ROLE_KEY — respects RLS)
    await saveChatLeadAction({ sessionId, userMessage: trimmed, source: "demo" });
  };

  // Helper to extract plain text from a UIMessage
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
    <div className="w-full glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[500px]">
      {/* Chat Header */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-signal-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-signal-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">NorteNode Rececionista IA</h3>
            <p className="text-xs text-signal-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-signal-400 animate-pulse" />
              Em Linha
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        <AnimatePresence>
          {(messages as unknown as ChatMessage[]).map((msg: ChatMessage, i: number) => (
            <motion.div
              key={msg.id ?? i}
              initial={mInit({ opacity: 0, y: 10 })}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-500/20" : "bg-signal-500/20"}`}>
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-blue-400" />
                ) : (
                  <Bot className="w-4 h-4 text-signal-400" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
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
              key="typing"
              initial={mInit({ opacity: 0, y: 10 })}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[80%]"
            >
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-signal-500/20">
                <Bot className="w-4 h-4 text-signal-400" />
              </div>
              <div className="p-3 rounded-2xl text-sm bg-zinc-800 text-zinc-500 rounded-tl-none border border-zinc-700/50">
                <span className="animate-pulse">...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSendWrapper} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Perguntar por preços, tratamentos..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-signal-500 placeholder:text-zinc-700"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-full bg-signal-500 flex items-center justify-center text-white disabled:opacity-50 transition-all hover:bg-signal-400"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
