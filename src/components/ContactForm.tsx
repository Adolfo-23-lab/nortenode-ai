"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/submitLead";
import { useMotionInitial } from "@/lib/motion-safe";

export default function ContactForm() {
  const mInit = useMotionInitial();
  const [formData, setFormData] = useState({
    nomeClinica: "",
    email: "",
    whatsapp: "",
    tratamento: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setErrorMessage("Configuração de BD em falta.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const result = await submitLeadAction({
        name: formData.nomeClinica,
        email: formData.email,
        whatsapp: formData.whatsapp,
        treatment: formData.tratamento,
      });

      if (!result.success) {
        setErrorMessage(result.error ?? "Ocorreu um erro ao enviar o pedido.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ nomeClinica: "", email: "", whatsapp: "", tratamento: "" });
    } catch (error: unknown) {
      console.error("Error saving lead:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Ocorreu um erro ao enviar o pedido."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={mInit({ opacity: 0, scale: 0.97 })}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-900 rounded-2xl border border-signal-500/20 min-h-[400px]"
      >
        <div className="w-14 h-14 bg-signal-500/10 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 className="w-7 h-7 text-signal-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Pedido Recebido!</h3>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
          A nossa equipa entrará em contacto muito brevemente para configurar a sua Demo IA
          personalizada.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-8">
      <div className="mb-7">
        <h3 className="text-xl font-bold text-white mb-1.5">Solicite a sua Demo</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Ajudamos clínicas no Porto e Gaia a captar e fechar mais pacientes com IA.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clinica" className="block text-xs font-medium text-zinc-400 mb-1.5">
            Nome da Clínica
          </label>
          <input
            id="clinica"
            type="text"
            required
            placeholder="Ex: Prime Estética Porto"
            value={formData.nomeClinica}
            onChange={(e) => setFormData((prev) => ({ ...prev, nomeClinica: e.target.value }))}
            className="w-full bg-[var(--background)] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-signal-500/50 transition-colors placeholder:text-zinc-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="geral@clinica.pt"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full bg-[var(--background)] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-signal-500/50 transition-colors placeholder:text-zinc-700"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-xs font-medium text-zinc-400 mb-1.5">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              required
              placeholder="+351 900 000 000"
              value={formData.whatsapp}
              onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
              className="w-full bg-[var(--background)] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-signal-500/50 transition-colors placeholder:text-zinc-700"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tratamento" className="block text-xs font-medium text-zinc-400 mb-1.5">
            Tratamento Principal
          </label>
          <input
            id="tratamento"
            type="text"
            required
            placeholder="Ex: Harmonização Facial, Preenchimento..."
            value={formData.tratamento}
            onChange={(e) => setFormData((prev) => ({ ...prev, tratamento: e.target.value }))}
            className="w-full bg-[var(--background)] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-signal-500/50 transition-colors placeholder:text-zinc-700"
          />
        </div>

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-400">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-12 rounded-xl bg-signal-500 flex items-center justify-center text-white font-semibold disabled:opacity-60 transition-all hover:bg-signal-400 mt-1"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              A processar...
            </>
          ) : (
            "Solicitar Demonstração"
          )}
        </button>
      </form>
    </div>
  );
}
