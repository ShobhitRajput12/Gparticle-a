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
    <div className="relative flex min-h-screen w-full flex-col bg-[#020617] text-white selection:bg-[#ff6000]/30 font-sans">

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#020617]/70 border-b border-white/10 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded border-[3px] border-[#ff6000] bg-transparent" />
          <span className="text-xl font-bold tracking-tight text-white">Gparticle</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Research</a>
          <a href="#" className="hover:text-white transition-colors">Radar</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Download App</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-white hover:text-slate-300 px-2 transition-colors">Login</button>
          <button className="rounded-full bg-[#ff6000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#ff7b2b] transition-colors shadow-[0_0_15px_rgba(255,96,0,0.4)]">
            Book a Demo
          </button>
        </div>
      </header>
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
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex w-full max-w-4xl flex-col items-center text-center pointer-events-auto"
        >
          {/* Y Combinator Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="mb-12 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-400"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#ff6000] text-white text-[10px]">Y</span>
            Backed by Y Combinator
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium tracking-widest text-slate-300 backdrop-blur-md uppercase"
          >
            NEW RESEARCH →
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mb-8 text-5xl font-serif tracking-tight text-white sm:text-6xl md:text-[76px] md:leading-[1.05]"
          >
            Making every device an <br className="hidden md:block" /> <span className="whitespace-nowrap">AI-native</span> device.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mb-12 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            We research and build inference engines from the metal up - custom kernels, operator fusion, unified memory optimization. For the hardware you already own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-8 sm:flex-row"
          >
            <button
              className="group relative flex items-center gap-2 rounded-full bg-[#ff6000] px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#ff7b2b] hover:shadow-[0_0_30px_rgba(255,96,0,0.4)]"
            >
              Read our research
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </button>
            <button className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white">
              About us
            </button>
          </motion.div>
        </motion.div>
      </section>




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
        className="fixed bottom-8 right-8 z-50 pointer-events-auto"
      >
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="group flex h-14 items-center gap-3 rounded-full bg-[#ff6000] px-4 pr-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#ff7b2b] hover:shadow-[0_0_25px_rgba(255,96,0,0.5)]"
        >
          <span className="text-lg">▶</span>
          <span className="text-sm font-semibold">Playground</span>
        </button>
      </motion.div>
    </div>
  );
}
