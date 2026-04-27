import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { CameraShake } from '@react-three/drei';
import ParticleSystem from '../components/GParticle/ParticleSystem';
import ControlPanel from '../components/GParticle/ControlPanel';

export default function GParticle() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  const [mode, setMode] = useState('neural');
  const [density, setDensity] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [theme, setTheme] = useState('cyan');

  const state = { mode, density, speed, theme };
  const setters = { setMode, setDensity, setSpeed, setTheme };

  // Open Control Panel
  const scrollToDemo = () => {
    setIsPanelOpen(true);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#020617] text-white selection:bg-cyan-500/30">
      
      {/* 3D Background - Fixed behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <fog attach="fog" args={['#020617', 10, 30]} />
          <ambientLight intensity={0.5} />
          <ParticleSystem {...state} />
          <CameraShake yawFrequency={0.1} pitchFrequency={0.1} rollFrequency={0.1} intensity={0.5} />
        </Canvas>
        
        {/* Subtle radial gradient overlay to merge canvas with HTML */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex w-full max-w-4xl flex-col items-center text-center pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-sm font-medium text-cyan-200 shadow-[0_0_15px_rgba(0,238,255,0.1)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            gparticle system online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mb-6 text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 sm:text-6xl md:text-[72px] md:leading-[1.1]"
          >
            Visualizing Intelligence <br className="hidden md:block" /> Through Particles.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            gparticle transforms complex data into interactive 3D particle systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <button 
              onClick={scrollToDemo}
              className="group relative flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#020617] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,238,255,0.4)]"
            >
              Explore Visualization
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </button>
            <button className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white">
              Learn more
            </button>
          </motion.div>
        </motion.div>
      </section>



      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-[#020617]/80 px-6 py-12 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl justify-center text-sm text-slate-500">
          © 2026 gparticle. Built for AI visualization.
        </div>
      </footer>

      {/* Control Panel Overlay */}
      <ControlPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        state={state} 
        setters={setters} 
      />

      {/* Floating Playground Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button 
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="group flex h-14 items-center gap-3 rounded-full border border-white/10 bg-[#020617]/80 px-2 pr-6 text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,238,255,0.2)]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
            <span className="text-lg text-cyan-400">✺</span>
          </div>
          <span className="text-sm font-medium">Playground</span>
        </button>
      </motion.div>
    </div>
  );
}
