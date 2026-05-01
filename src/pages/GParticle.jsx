import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CameraShake } from '@react-three/drei';
import { Cpu, Zap, Globe, Shield, Code, BarChart3, ArrowRight, Microchip, Database, Network, Sparkles } from 'lucide-react';
import ParticleSystem from '../components/GParticle/ParticleSystem';
import ControlPanel from '../components/GParticle/ControlPanel';
import Footer from '../components/GParticle/Footer';

export default function GParticle() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [mode, setMode] = useState('neural');
  const [density, setDensity] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [theme, setTheme] = useState('cyan');

  const state = { mode, density, speed, theme };
  const setters = { setMode, setDensity, setSpeed, setTheme };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#020617] text-white selection:bg-white/30 font-sans scroll-smooth">

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#020617]/70 border-b border-white/10 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded border-[3px] border-white bg-transparent" />
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">Gparticle</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#technology" className="hover:text-white transition-colors">Technology</a>
          <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#research" className="hover:text-white transition-colors">Research</a>
          <a href="#stats" className="hover:text-white transition-colors">Performance</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-white hover:text-slate-300 px-2 transition-colors">Login</button>
          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.4)]">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />
      </div>

      <main className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6">
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
              className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium tracking-widest text-cyan-400 backdrop-blur-md uppercase"
            >
              <Sparkles className="h-3 w-3" />
              Next-Gen Neural Architecture
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="mb-6 text-5xl font-serif tracking-tight text-white sm:text-6xl md:text-[86px] md:leading-[1.02]"
            >
              Intelligence, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Decentralized.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="mb-10 max-w-2xl text-xl leading-relaxed text-slate-400"
            >
              Deploying trillion-parameter models on the edge. Our inference engine rewrites the laws of unified memory to bring world-class AI to every silicon chip.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <button className="group relative flex items-center gap-2 rounded-full bg-white px-10 py-5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Access SDK
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-10 py-5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10">
                Whitepaper
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* TECHNOLOGY SECTION */}
        <section id="technology" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Neural Infrastructure</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Built from the metal up to handle the next generation of generative AI.</p>
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
                  className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg hover:border-white/20 transition-colors group"
                >
                  <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="capabilities" className="py-24 px-6 bg-white/[0.02]">
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
                      <p className="text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)] animate-pulse" />
              <div className="z-10 text-center">
                <BarChart3 className="h-20 w-20 text-white/20 mx-auto mb-4" />
                <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest">Active Neural Link</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="stats" className="py-32 px-6">
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
                  <div className="text-6xl md:text-7xl font-serif text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH / CTA SECTION */}
        <section id="research" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-3xl -z-10" />
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to define the <br /> neural frontier?</h2>
            <p className="text-slate-400 text-lg mb-12">Join our open research program and help us build the future of decentralized intelligence.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all">Get API Key</button>
              <button className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all">Contact Sales</button>
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
          className="group flex h-14 items-center gap-3 rounded-full bg-white px-4 pr-6 text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
        >
          <span className="text-sm font-semibold">Playground</span>
        </button>
      </motion.div>

      <Footer />
    </div>
  );
}
