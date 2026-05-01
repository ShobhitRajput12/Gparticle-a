import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#020617] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 lg:pr-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 rounded border-[3px] border-white bg-transparent" />
              <span className="text-xl font-bold tracking-tight text-white uppercase italic">Gparticle</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              Architecting the next generation of decentralized neural intelligence for every device on the planet. From metal to edge.
            </p>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-7">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Research</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Inference Engine</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Quantization</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Kernel Ops</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Whitepapers</a></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API Keys</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">SDKs</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Benchmarks</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} GPARTICLE INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
              />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Systems Active</span>
            </div>
            <div className="flex gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
