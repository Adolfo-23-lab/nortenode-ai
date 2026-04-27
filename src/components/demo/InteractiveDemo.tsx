"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
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
          "Hola, soy el operador de Barbería Norte. Disponible 24/7 para agendar tu cita o resolver dudas. ¿En qué te ayudo?",
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized || messages.length <= 1) return;
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isInitialized, status]);

  const handleSendWrapper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    sendMessage({ text: trimmed });
    await saveChatLeadAction({ sessionId, userMessage: trimmed, source: "demo" });
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
    <div className="flex h-full min-h-0 flex-col">
      <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4">
        <div className="flex flex-col justify-end gap-4 min-h-full">
          <AnimatePresence>
            {(messages as unknown as ChatMessage[]).map((msg: ChatMessage, i: number) => (
              <motion.div
                key={msg.id ?? i}
                initial={mInit({ opacity: 0, y: 10 })}
                animate={{ opacity: 1, y: 0 }}
                className={
                  msg.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    msg.role === "user"
                      ? "max-w-[75%] rounded-[var(--radius-lg-v2)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-[var(--color-text-primary-v2)]"
                      : "max-w-[75%] rounded-[var(--radius-lg-v2)] border border-[rgba(0,212,255,0.30)] px-4 py-3 text-[var(--color-text-primary-v2)]"
                  }
                  style={{ fontSize: "var(--text-body-v2)", lineHeight: 1.5 }}
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
                className="flex justify-start"
              >
                <div
                  className="rounded-[var(--radius-lg-v2)] border border-[rgba(0,212,255,0.30)] px-4 py-3 text-[var(--color-text-muted-v2)]"
                  style={{ fontSize: "var(--text-body-v2)" }}
                >
                  <span className="animate-pulse">· · ·</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-[var(--color-border-v2)] px-4 py-3">
        <form onSubmit={handleSendWrapper} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            data-nn-demo-input
            className="flex-1 bg-transparent text-[var(--color-text-primary-v2)] placeholder:italic placeholder:text-[var(--color-text-muted-v2)] focus:outline-none"
            style={{ fontSize: "var(--text-body-v2)" }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-v2)] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowUp size={16} strokeWidth={2.25} />
          </button>
        </form>
      </div>
    </div>
  );
}
