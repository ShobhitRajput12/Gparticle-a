import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CameraShake } from '@react-three/drei';
import { Cpu, Zap, Globe, Shield, Code, BarChart3, ArrowRight, Microchip, Database, Network, Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import ParticleSystem from '../components/GParticle/ParticleSystem';
import ControlPanel from '../components/GParticle/ControlPanel';
import Footer from '../components/GParticle/Footer';

export default function GParticle() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedTheme = window.localStorage.getItem('gparticle-theme-mode');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return !window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  const [mode, setMode] = useState('neural');
  const [density, setDensity] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [theme, setTheme] = useState('cyan');

  const state = { mode, density, speed, theme };
  const setters = { setMode, setDensity, setSpeed, setTheme };

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDarkMode);
    window.localStorage.setItem('gparticle-theme-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className={`relative flex min-h-screen w-full flex-col font-sans scroll-smooth ${isDarkMode ? 'bg-[#020617] text-white selection:bg-white/30' : 'bg-white text-black selection:bg-black/20'}`}>

      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 sm:px-10 md:px-12 lg:px-16 backdrop-blur-md border-b pointer-events-auto ${isDarkMode ? 'bg-gradient-to-r from-[#020617]/75 via-slate-900/50 to-[#020617]/75 border-white/10' : 'bg-gradient-to-r from-slate-200/75 via-slate-100/55 to-slate-200/75 border-black/10'}`}>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-6 w-6 rounded border-[3px] bg-transparent ${isDarkMode ? 'border-white' : 'border-black'}`} />
          <span className={`text-xl font-bold tracking-tight uppercase italic ${isDarkMode ? 'text-white' : 'text-black'}`}>Gparticle</span>
        </div>
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          <a href="#technology" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Technology</a>
          <a href="#capabilities" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Capabilities</a>
          <a href="#research" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Research</a>
          <a href="#stats" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Performance</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
            className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${isDarkMode ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-black/20 bg-black/5 text-black hover:bg-black/10'}`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className={`hidden sm:inline-flex text-sm font-medium px-2 transition-colors ${isDarkMode ? 'text-white hover:text-slate-300' : 'text-black hover:text-slate-700'}`}>Login</button>
          <button className={`hidden sm:inline-flex rounded-full px-5 py-2 text-sm font-semibold transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-black text-white hover:bg-slate-800 shadow-[0_0_15px_rgba(2,6,23,0.35)]'}`}>
            Book a Demo
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className={`md:hidden grid h-9 w-9 place-items-center rounded-full border transition-colors ${isDarkMode ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-black/20 bg-black/5 text-black hover:bg-black/10'}`}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="md:hidden mt-4">
            <div className={`rounded-2xl border p-4 ${isDarkMode ? 'border-white/10 bg-gradient-to-r from-[#020617]/70 via-slate-900/45 to-[#020617]/70' : 'border-black/10 bg-gradient-to-r from-slate-200/80 via-slate-100/60 to-slate-200/80'}`}>
              <div className="flex flex-col gap-3 text-sm font-medium">
                <a onClick={closeMobileMenu} href="#technology" className={`transition-colors ${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-black'}`}>Technology</a>
                <a onClick={closeMobileMenu} href="#capabilities" className={`transition-colors ${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-black'}`}>Capabilities</a>
                <a onClick={closeMobileMenu} href="#research" className={`transition-colors ${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-black'}`}>Research</a>
                <a onClick={closeMobileMenu} href="#stats" className={`transition-colors ${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-800 hover:text-black'}`}>Performance</a>
              </div>
              <div className="mt-4 flex gap-3">
                <button className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isDarkMode ? 'border border-white/20 text-white hover:bg-white/5' : 'border border-black/20 text-black hover:bg-black/5'}`}>
                  Login
                </button>
                <button className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}>
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* 3D Background - Fixed behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <fog attach="fog" args={['#020617', 10, 30]} />
          <ambientLight intensity={0.5} />
          <ParticleSystem {...state} />
          <CameraShake yawFrequency={0.1} pitchFrequency={0.1} rollFrequency={0.1} intensity={0.5} />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />
      </div>

      <main className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="flex min-h-screen flex-col items-center justify-center px-8 sm:px-10 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex w-full max-w-5xl flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`mb-8 flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium tracking-widest text-cyan-400 backdrop-blur-md uppercase ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}
            >
              <Sparkles className="h-3 w-3" />
              Next-Gen Neural Architecture
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className={`mb-6 text-5xl font-serif tracking-tight sm:text-6xl md:text-[86px] md:leading-[1.02] ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Intelligence, <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-white to-slate-500' : 'from-black to-slate-400'}`}>Decentralized.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className={`mb-10 max-w-2xl text-xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}
            >
              Deploying trillion-parameter models on the edge. Our inference engine rewrites the laws of unified memory to bring world-class AI to every silicon chip.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <button className={`group relative flex items-center gap-2 rounded-full px-10 py-5 text-sm font-bold transition-all hover:scale-105 ${isDarkMode ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' : 'bg-black text-white hover:shadow-[0_0_40px_rgba(2,6,23,0.25)]'}`}>
                Access SDK
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className={`rounded-full border px-10 py-5 text-sm font-bold backdrop-blur-md transition-all ${isDarkMode ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-black/20 bg-black/5 text-black hover:bg-black/10'}`}>
                Whitepaper
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* TECHNOLOGY SECTION */}
        <section id="technology" className="py-24 px-8 sm:px-10 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Neural Infrastructure</h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Built from the metal up to handle the next generation of generative AI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Microchip className="text-cyan-400" />,
                  title: "Custom Kernels",
                  desc: "Hand-optimized CUDA and Metal kernels for zero-latency operator fusion."
                },
                {
                  icon: <Database className="text-blue-400" />,
                  title: "Memory Compression",
                  desc: "4-bit and 2-bit quantization without precision loss using G-Quant technology."
                },
                {
                  icon: <Network className="text-violet-400" />,
                  title: "Distributed Weights",
                  desc: "Parallelized model execution across heterogeneous hardware clusters."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-3xl border backdrop-blur-lg transition-colors group ${isDarkMode ? 'border-white/10 bg-white/5 hover:border-white/20' : 'border-black/10 bg-black/5 hover:border-black/20'}`}
                >
                  <div className={`mb-6 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="capabilities" className={`py-24 px-8 sm:px-10 md:px-12 lg:px-16 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Intelligence on every <span className="italic text-cyan-400">edge.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Real-time Vision", desc: "Process 4K video streams with sub-5ms latency for autonomous systems." },
                  { title: "On-device LLMs", desc: "Run multi-modal models locally with full privacy and zero cloud costs." },
                  { title: "Neural Simulation", desc: "High-fidelity physics and fluid simulations powered by AI accelerators." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_10px_#22d3ee]" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`relative aspect-square rounded-full border bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)] animate-pulse" />
              <div className="z-10 text-center">
                <BarChart3 className={`h-20 w-20 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
                <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest">Active Neural Link</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="stats" className="py-32 px-8 sm:px-10 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { value: "14.2x", label: "Faster Inference" },
                { value: "92%", label: "Memory Reduction" },
                { value: "0ms", label: "Cloud Latency" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`text-6xl md:text-7xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{stat.value}</div>
                  <div className={`uppercase tracking-widest text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH / CTA SECTION */}
        <section id="research" className="relative overflow-hidden py-24 px-8 sm:px-10 md:px-12 lg:px-16">
          <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-3xl -z-10" />
          <div className="mx-auto w-full max-w-5xl">
            <div
              className={`mx-auto rounded-3xl text-center backdrop-blur-md px-6 py-12 sm:px-10 sm:py-14 md:px-14 ${
                isDarkMode ? 'border border-white/10 bg-white/5' : 'border border-black/10 bg-white/70'
              }`}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to define the <br /> neural frontier?</h2>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-700'} text-lg mb-12`}>Join our open research program and help us build the future of decentralized intelligence.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className={`px-8 py-4 rounded-full font-bold transition-all ${isDarkMode ? 'bg-white text-black hover:bg-slate-200' : 'bg-black text-white hover:bg-slate-800'}`}>Get API Key</button>
                <button className={`px-8 py-4 rounded-full font-bold transition-all ${isDarkMode ? 'border border-white/20 hover:bg-white/5' : 'border border-black/20 hover:bg-black/5'}`}>Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-32" /> {/* Spacer for fixed footer */}
      </main>

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
        className="fixed bottom-24 right-8 z-50 pointer-events-auto"
      >
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="group flex h-11 items-center gap-2 rounded-full bg-white px-3 pr-4 text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.45)]"
        >
          <span className="text-xs font-semibold">Playground</span>
        </button>
      </motion.div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
