import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
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

// Temporary mock components for pages
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="p-4 rounded-full bg-romantic-500/20 mb-6"
    >
      <Heart className="w-16 h-16 text-romantic-500 animate-pulse" />
    </motion.div>
    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">Valentine's Week</h1>
    <p className="text-xl text-gray-400 max-w-2xl mb-12">
      Experience the week of love with immersive, gamified challenges. Each day brings a new journey to your heart.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {['Rose Day', 'Propose Day', 'Chocolate Day', 'Teddy Day', 'Promise Day', 'Hug Day', 'Kiss Day', 'Valentine Day'].map((day) => (
        <Link
          key={day}
          to={`/${day.toLowerCase().replace(' ', '-')}`}
          className="glass-card p-6 rounded-2xl hover:bg-romantic-500/10 transition-all group"
        >
          <span className="block text-sm text-romantic-300 mb-2">February {7 + ['Rose Day', 'Propose Day', 'Chocolate Day', 'Teddy Day', 'Promise Day', 'Hug Day', 'Kiss Day', 'Valentine Day'].indexOf(day)}</span>
          <span className="font-semibold group-hover:text-romantic-400">{day}</span>
        </Link>
      ))}
    </div>
  </div>
);

const DayPlaceholder = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh]">
    <h2 className="text-4xl font-bold mb-4">{name}</h2>
    <p className="text-gray-400">Gamified experience for {name} is coming soon!</p>
    <Link to="/" className="mt-8 text-romantic-400 hover:underline">← Back to Home</Link>
  </div>
);

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleField />
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Heart className="w-6 h-6 text-romantic-500 fill-romantic-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-romantic-400 to-white">LoveBound</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link to="/" className={`hover:text-romantic-400 transition-colors ${location.pathname === '/' ? 'text-romantic-400' : ''}`}>Home</Link>
            <Link to="/rose-day" className={`hover:text-romantic-400 transition-colors ${location.pathname === '/rose-day' ? 'text-romantic-400' : ''}`}>Rose Day</Link>
            <Link to="/valentine-day" className="bg-romantic-600 hover:bg-romantic-700 px-4 py-2 rounded-full transition-all text-sm font-medium">Valentine's Special</Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-midnight-950/95 backdrop-blur-xl pt-20 px-6"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold">
              <Link onClick={() => setIsMenuOpen(false)} to="/">Home</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/rose-day">Rose Day</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/valentine-day">Valentine's Special</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 LoveBound - Made with ❤️ for Valentine's Week</p>
      </footer>
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
