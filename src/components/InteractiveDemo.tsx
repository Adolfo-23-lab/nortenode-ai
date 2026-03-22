"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function InteractiveDemo() {
  const [messages, setMessages] = useState([
    { role: "agent", text: "Olá, muito gosto. Sou a assistente IA da clínica em Gaia/Porto. Em que tratamento tem interesse para o seu rosto ou corpo?" }
  ]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => `demo-web-${Math.floor(Math.random() * 100000)}`);
  useEffect(() => {
    // Check if env variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Aviso: Falta configurar as chaves do Supabase no ficheiro .env.local para gravar as mensagens.");
    }
  }, []);

  const saveToSupabase = async (userMsg: string) => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return; // Prevent error if not configured

    try {
      await supabase.from("leads").upsert(
        { 
          whatsapp: sessionId, 
          name: "Demo User",
          treatment: userMsg, // Guardamos el último mensaje de interés
          status_ia: "pending" 
        },
        { onConflict: "whatsapp" }
      );
    } catch (error) {
      console.error("Error saving lead to Supabase:", error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Save user message to Supabase
    await saveToSupabase(userMsg);

    // Simulate AI response logic (PT-PT y ES)
    setTimeout(() => {
      let reply = "Percebido. Tem preferência por algum dia ou horário para fazer uma avaliação inicial nas nossas instalações em Gaia?";
      const lower = userMsg.toLowerCase();

      if (lower.includes("botox") || lower.includes("preenchimento")) {
        reply = "Excelente escolha. Somos uma clínica de referência no Porto e em Gaia para Harmonização Facial (Botox e Preenchimento). Trabalhamos com produtos premium para um resultado natural e duradouro. Tenho disponibilidade para uma avaliação gratuita esta semana, na quarta-feira à tarde ou sexta de manhã. Qual prefere?";
      } else if (lower.includes("preço") || lower.includes("precio")) {
        reply = "O valor dos nossos tratamentos premium varia de acordo com a fisionomia e o objetivo de cada paciente. Gostaríamos de lhe oferecer uma avaliação gratuita e sem compromisso na nossa clínica no Porto/Gaia para lhe dar um orçamento exato. Prefere agendar para amanhã ou depois?";
      }

      setMessages((prev) => [...prev, { role: "agent", text: reply }]);
    }, 1500);
  };

  return (
    <div className="w-full glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[500px]">
      {/* Chat Header */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">NorteNode Rececionista IA</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Em Linha
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-500/20" : "bg-emerald-500/20"}`}>
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-blue-400" />
                ) : (
                  <Bot className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-slate-800 text-slate-200 rounded-tl-none border border-white/5"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Perguntar por preços, tratamentos..."
            className="flex-1 bg-slate-950/50 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 disabled:opacity-50 transition-all hover:bg-emerald-400"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
