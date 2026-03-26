"use client";

import { motion } from "framer-motion";

const brands = [
  "Clínica Luso-Brasileira",
  "DermaGaia",
  "Porto Estética",
  "Beleza Avançada",
  "Harmonize",
  "FaceStudio Norte"
];

export default function SocialProof() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">
          O tipo de clínicas que podem beneficiar com a nossa IA
        </p>
        
        <div className="flex overflow-hidden relative">
          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
            className="flex gap-16 min-w-max items-center"
          >
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <div 
                key={i} 
                className="text-xl md:text-2xl font-bold text-slate-700 opacity-60 grayscale transition-all hover:opacity-100 hover:text-emerald-400 hover:grayscale-0 cursor-default"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
