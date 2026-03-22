import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
                NorteNode AI
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Engenharia de conversão para clínicas na Área Metropolitana do Porto. Automação inteligente de agendamentos.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>geral@nortenode.ai</li>
              <li>+351 912 345 678</li>
              <li>Vila Nova de Gaia, Portugal</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Termos & Condições</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NorteNode AI. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Feito com precisão no Porto & Gaia.</p>
        </div>
      </div>
    </footer>
  );
}
