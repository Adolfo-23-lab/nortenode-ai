import { Bot, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
                NorteNode AI
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Engenharia de conversão para clínicas na Área Metropolitana do Porto. Automação inteligente de agendamentos.
            </p>
          </div>
          
          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:nortenode.ia@gmail.com"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  nortenode.ia@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+351937809995"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +351 937 809 995
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                Vila Nova de Gaia, Portugal
              </li>
            </ul>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/quem-somos" className="hover:text-emerald-400 transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/solucoes/widget-web" className="hover:text-emerald-400 transition-colors">
                  Widget Web IA
                </Link>
              </li>
              <li>
                <Link href="/solucoes/whatsapp" className="hover:text-emerald-400 transition-colors">
                  WhatsApp IA
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-emerald-400 transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/contactos" className="hover:text-emerald-400 transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-white font-semibold mb-4">Siga-nos</h4>
            <div className="flex gap-4 text-slate-400">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
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
