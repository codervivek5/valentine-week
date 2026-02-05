import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Play, Trophy, Sparkles, Map, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RoseDay from './pages/days/RoseDay';
import ParticleField from './components/ParticleField';
import ProposeDay from './pages/days/ProposeDay';
import ChocolateDay from './pages/days/ChocolateDay';
import TeddyDay from './pages/days/TeddyDay';
import PromiseDay from './pages/days/PromiseDay';
import HugDay from './pages/days/HugDay';
import KissDay from './pages/days/KissDay';
import ValentineDay from './pages/days/ValentineDay';

// New high-fidelity Level Select screen
const Home = () => {
  const days = [
    { name: 'Rose Day', date: 'Feb 7', icon: '🌹', path: '/rose-day', desc: 'Plant the seeds of devotion' },
    { name: 'Propose Day', date: 'Feb 8', icon: '💍', path: '/propose-day', desc: 'Sync your hearts beat' },
    { name: 'Chocolate Day', date: 'Feb 9', icon: '🍫', path: '/chocolate-day', desc: 'Forge the perfect sweet' },
    { name: 'Teddy Day', date: 'Feb 10', icon: '🧸', path: '/teddy-day', desc: 'Craft a companion for life' },
    { name: 'Promise Day', date: 'Feb 11', icon: '🤝', path: '/promise-day', desc: 'Bind your souls together' },
    { name: 'Hug Day', date: 'Feb 12', icon: '🫂', path: '/hug-day', desc: 'Feel the warmth of infinity' },
    { name: 'Kiss Day', date: 'Feb 13', icon: '💋', path: '/kiss-day', desc: 'The ultimate combo of love' },
    { name: 'Valentine Day', date: 'Feb 14', icon: '💝', path: '/valentine-day', desc: 'The Final Devotion' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center py-10 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 space-y-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-romantic-500/20 text-romantic-400 font-black text-xs uppercase tracking-[0.3em]">
          <Trophy className="w-4 h-4" /> Season 2026 Active
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-gradient uppercase italic tracking-tighter">LoveBound</h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Select your quest. Embark on the 7-day odyssey.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-romantic-500/5 blur-[100px] -z-10" />

        {days.map((day, idx) => (
          <motion.div
            key={day.name}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              to={day.path}
              className="group block relative p-6 rounded-[2.5rem] glass border border-white/5 hover:border-romantic-500/30 transition-all overflow-hidden h-full text-left"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-black italic">{idx + 1}</span>
              </div>

              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl drop-shadow-2xl group-hover:scale-125 transition-transform inline-block">{day.icon}</span>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full group-hover:text-romantic-300">
                  {day.date}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-gradient">{day.name}</h3>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-wide group-hover:text-gray-300 transition-colors">
                  {day.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden mr-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }} // Mock progress
                    className="h-full bg-romantic-500/50"
                  />
                </div>
                <Play className="w-5 h-5 text-romantic-500 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]"
      >
        Scroll to explore the maps
      </motion.div>
    </div>
  );
};

// Immersive HUD (instead of Navbar)
const HUD = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <div className="fixed top-6 left-6 right-6 z-[60] pointer-events-none flex justify-between items-center">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="pointer-events-auto"
      >
        <Link to="/" className="flex items-center gap-3 px-4 py-2 glass rounded-full border border-white/10 text-white/70 hover:text-romantic-400 transition-all group">
          <Map className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">World Map</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3 glass px-6 py-2 rounded-full border border-white/10 pointer-events-auto"
      >
        <div className="w-2 h-2 rounded-full bg-romantic-500 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
          Quest Active: <span className="text-white italic">{location.pathname.replace('/', '').replace('-', ' ')}</span>
        </span>
      </motion.div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-stone-950">
      <ParticleField />
      <HUD />

      <main className="flex-grow flex items-center justify-center py-12 px-2 sm:px-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={useLocation().pathname}
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rose-day" element={<RoseDay />} />
          <Route path="/propose-day" element={<ProposeDay />} />
          <Route path="/chocolate-day" element={<ChocolateDay />} />
          <Route path="/teddy-day" element={<TeddyDay />} />
          <Route path="/promise-day" element={<PromiseDay />} />
          <Route path="/hug-day" element={<HugDay />} />
          <Route path="/kiss-day" element={<KissDay />} />
          <Route path="/valentine-day" element={<ValentineDay />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
