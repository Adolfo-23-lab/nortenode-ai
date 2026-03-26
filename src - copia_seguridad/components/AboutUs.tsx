"use client";

import { motion } from "framer-motion";
import { Users, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="py-24 relative px-4 md:px-6 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full aspect-square"
        >
          {/* Main Image */}
          <div className="absolute top-0 left-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 glass">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
              alt="Equipa NorteNode AI"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
            />
          </div>
          {/* Secondary Image */}
          <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-20 glass">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
              alt="Escritório em Vila Nova de Gaia"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
            />
          </div>
          {/* Decorative */}
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] -z-10" />
        </motion.div>

        {/* Right Side: Copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              A Nossa Missão no Norte
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-6" />
          </motion.div>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg text-slate-300 leading-relaxed"
          >
            Somos uma agência boutique sediada em <span className="text-white font-medium">Vila Nova de Gaia</span>, 
            exclusivamente focada em engenharia de conversão para o setor da saúde e estética. 
          </motion.p>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg text-slate-300 leading-relaxed"
          >
            Acreditamos que uma clínica moderna não precisa de mais &quot;likes&quot; ou de websites lentos. 
            Precisa de sistemas inteligentes e automatizados que transformem visitantes locais do Porto 
            e Gaia em pacientes na sua agenda.
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
          >
            <div className="glass p-4 rounded-2xl border border-white/5 flex items-start gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Localização</h4>
                <p className="text-sm text-slate-400">Vila Nova de Gaia, Portugal</p>
              </div>
            </div>
            <div className="glass p-4 rounded-2xl border border-white/5 flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Equipa Especializada</h4>
                <p className="text-sm text-slate-400">Sócios 100% dedicados à sua clínica</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
