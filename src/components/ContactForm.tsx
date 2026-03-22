"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/submitLead";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nomeClinica: "",
    email: "",
    whatsapp: "",
    tratamento: ""
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
      // Usar Server Action con Service Role Key en lugar del cliente público.
      await submitLeadAction({
        name: formData.nomeClinica,
        email: formData.email,
        whatsapp: formData.whatsapp,
        treatment: formData.tratamento
      });

      setStatus("success");
      setFormData({ nomeClinica: "", email: "", whatsapp: "", tratamento: "" });
    } catch (error: unknown) {
      console.error("Error saving lead:", error);
      setErrorMessage(error instanceof Error ? error.message : "Ocorreu um erro ao enviar o pedido.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex flex-col items-center justify-center p-8 text-center glass rounded-3xl border border-emerald-500/30 bg-emerald-500/5 shadow-2xl min-h-[400px]"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Pedido Recebido!</h3>
        <p className="text-slate-300">
          A nossa equipa entrará em contacto muito brevemente para configurar a sua Demo IA personalizada.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Solicite a sua Demo Personalizada</h3>
        <p className="text-slate-400 text-sm">
          Ajudamos clínicas no Porto e Gaia a captar e fechar mais pacientes com Inteligência Artificial.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clinica" className="block text-sm font-medium text-slate-300 mb-1">Nome da Clínica</label>
          <input
            id="clinica"
            type="text"
            required
            placeholder="Ex: Prime Estética Porto"
            value={formData.nomeClinica}
            onChange={(e) => setFormData(prev => ({ ...prev, nomeClinica: e.target.value }))}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="geral@clinica.pt"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-600"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-300 mb-1">WhatsApp</label>
            <input
              id="whatsapp"
              type="tel"
              required
              placeholder="+351 900 000 000"
              value={formData.whatsapp}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tratamento" className="block text-sm font-medium text-slate-300 mb-1">Tratamento Principal (Mais Rentável)</label>
          <input
            id="tratamento"
            type="text"
            required
            placeholder="Ex: Harmonização Facial, Preenchimento..."
            value={formData.tratamento}
            onChange={(e) => setFormData(prev => ({ ...prev, tratamento: e.target.value }))}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-600"
          />
        </div>

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-semibold disabled:opacity-70 transition-all hover:bg-emerald-400 mt-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
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
