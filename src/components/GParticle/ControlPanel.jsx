import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2, Globe, Activity, Layers } from 'lucide-react';

export default function ControlPanel({ isOpen, onClose, state, setters }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-24 right-8 z-50 w-80 rounded-2xl border border-white/10 bg-[#020617]/80 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.15)]"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Settings2 size={20} />
            <h3 className="font-semibold tracking-wide">SYSTEM CONTROLS</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400 uppercase tracking-widest">
              Topology Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['neural', 'grid', 'sphere'].map((m) => (
                <button
                  key={m}
                  onClick={() => setters.setMode(m)}
                  className={`flex flex-col items-center gap-1 rounded-xl border py-3 transition-all ${
                    state.mode === m
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                      : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {m === 'neural' && <Activity size={18} />}
                  {m === 'grid' && <Layers size={18} />}
                  {m === 'sphere' && <Globe size={18} />}
                  <span className="text-[10px] uppercase font-bold tracking-wider">{m}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Density Slider */}
          <div>
            <div className="mb-2 flex justify-between text-xs font-medium text-slate-400 uppercase tracking-widest">
              <span>Particle Density</span>
              <span className="text-cyan-400">{state.density}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={state.density}
              onChange={(e) => setters.setDensity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Speed Slider */}
          <div>
            <div className="mb-2 flex justify-between text-xs font-medium text-slate-400 uppercase tracking-widest">
              <span>Simulation Speed</span>
              <span className="text-cyan-400">{state.speed}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.speed}
              onChange={(e) => setters.setSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Color Theme */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400 uppercase tracking-widest">
              Energy Spectrum
            </label>
            <div className="flex gap-3">
              {['cyan', 'blue', 'violet'].map((t) => (
                <button
                  key={t}
                  onClick={() => setters.setTheme(t)}
                  className={`h-8 flex-1 rounded-full border-2 transition-all ${
                    state.theme === t ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                  } ${
                    t === 'cyan' ? 'bg-cyan-400' : t === 'blue' ? 'bg-blue-500' : 'bg-violet-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
