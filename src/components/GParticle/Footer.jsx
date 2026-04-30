import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 backdrop-blur-md bg-[#020617]/70 border-t border-white/10 pointer-events-auto"
    >
      <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-slate-500 font-semibold">
        <span>© 2024 GPARTICLE INC.</span>
        <span className="hidden md:inline h-3 w-[1px] bg-white/10" />
        <a href="#" className="hover:text-white transition-colors hidden md:inline">Privacy Policy</a>
        <span className="hidden md:inline h-3 w-[1px] bg-white/10" />
        <a href="#" className="hover:text-white transition-colors hidden md:inline">Terms of Service</a>
      </div>
      
      <div className="flex items-center gap-6">
         <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" 
            />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-tight">Systems Operational</span>
         </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
