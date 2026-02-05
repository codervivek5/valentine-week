import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, Timer, Trophy, Zap, Clock, Stars, Share2, RefreshCcw, Map, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const KissDay = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [target, setTarget] = useState({ x: 50, y: 50, type: 'normal' });
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [lastCatchTime, setLastCatchTime] = useState(0);

    const spawnTarget = useCallback(() => {
        const isSpecial = Math.random() > 0.85;
        setTarget({
            x: Math.random() * 70 + 15,
            y: Math.random() * 70 + 15,
            type: isSpecial ? 'golden' : 'normal'
        });
    }, []);

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(30);
        setCombo(0);
        setMaxCombo(0);
        spawnTarget();
    };

    const handleCatch = (type) => {
        const now = Date.now();
        const timeDiff = now - lastCatchTime;

        if (timeDiff < 1200) {
            const newCombo = combo + 1;
            setCombo(newCombo);
            if (newCombo > maxCombo) setMaxCombo(newCombo);
        } else {
            setCombo(1);
        }

        setLastCatchTime(now);

        let points = type === 'golden' ? 50 : 10;
        points *= Math.floor(1 + combo / 3);

        setScore(s => s + points);

        if (type === 'golden') {
            setTimeLeft(prev => prev + 3);
            confetti({
                particleCount: 50,
                spread: 40,
                colors: ['#fbbf24', '#ffffff']
            });
        }

        spawnTarget();
    };

    const handleShare = () => {
        const rank = score > 1500 ? 'S+' : score > 800 ? 'A' : score > 400 ? 'B' : 'C';
        const text = `I just kissed my way to Rank ${rank} in LoveBound! 💋✨\nSession Score: ${score}\nMax Combo: ${maxCombo}x`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Kiss Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Kiss score details copied to clipboard!');
        }
    };

    useEffect(() => {
        let timer;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft <= 0 && isPlaying) {
            setIsPlaying(false);
            confetti({
                particleCount: 200,
                spread: 160,
                origin: { y: 0.6 }
            });
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    return (
        <div className="max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4 text-center">
            <div className="mb-8 md:mb-12 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-gradient uppercase tracking-tighter italic">Combo Fever</h1>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs px-4">Chain the love. Faster clicks reveal hidden multipliers.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
                <div className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center shadow-xl border-white/5">
                    <Timer className="w-5 h-5 md:w-8 md:h-8 text-blue-400 mb-2 md:mb-3" />
                    <div className="text-2xl md:text-4xl font-black">{timeLeft}s</div>
                    <div className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Clock</div>
                </div>
                <div className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center col-span-2 relative overflow-hidden shadow-xl border-white/5">
                    <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                        <Zap className="w-12 h-12 md:w-20 md:h-20 text-yellow-400" />
                    </div>
                    <div className="text-[10px] md:text-sm font-black text-romantic-400 uppercase tracking-[0.2em] mb-1">Total Affection</div>
                    <div className="text-4xl md:text-6xl font-black text-white glow-red">{score}</div>
                    {combo > 1 && (
                        <motion.div
                            initial={{ scale: 0.8 }} animate={{ scale: 1.1 }}
                            className="mt-2 text-[10px] md:text-xs font-black text-yellow-500 uppercase tracking-widest flex items-center gap-1 md:gap-2"
                        >
                            <Zap className="w-3 md:w-4" /> {combo}X STREAK <Zap className="w-3 md:w-4" />
                        </motion.div>
                    )}
                </div>
                <div className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center shadow-xl border-white/5">
                    <Trophy className="w-5 h-5 md:w-8 md:h-8 text-yellow-500 mb-2 md:mb-3" />
                    <div className="text-2xl md:text-4xl font-black">{maxCombo}</div>
                    <div className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Peak Streak</div>
                </div>
            </div>

            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] glass-card rounded-[2rem] md:rounded-[3rem] border-white/10 overflow-hidden cursor-crosshair bg-neutral-900 shadow-inner">
                {!isPlaying ? (
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl p-6 md:p-10">
                        {timeLeft <= 0 && (
                            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center mb-8 md:mb-10 space-y-4 md:space-y-6">
                                <h2 className="text-4xl md:text-7xl font-black text-gradient uppercase tracking-tighter italic">Session Over</h2>
                                <div className="flex gap-6 md:gap-12 justify-center items-center">
                                    <div className="text-left">
                                        <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest block">Rank</span>
                                        <span className="text-3xl md:text-6xl font-black text-romantic-400">{score > 1500 ? 'S+' : score > 800 ? 'A' : 'B'}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest block">Accuracy</span>
                                        <span className="text-3xl md:text-6xl font-black text-white">{Math.min(100, Math.floor(score / 20))}%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 pt-4">
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <button
                                            onClick={handleShare}
                                            className="px-8 md:px-12 py-3 md:py-4 bg-romantic-600 hover:bg-romantic-700 rounded-xl md:rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20 flex-1"
                                        >
                                            Share Result <Share2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={startGame}
                                            className="px-8 md:px-12 py-3 md:py-4 glass border border-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-gray-400"
                                        >
                                            <RefreshCcw className="w-4 h-4" /> Re-Engage
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            to="/"
                                            className="py-4 glass border border-white/5 hover:bg-white/10 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-gray-500 hover:text-white"
                                        >
                                            <Map className="w-4 h-4" /> World Map
                                        </Link>
                                        <Link
                                            to="/valentine-day"
                                            className="py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-white"
                                        >
                                            The Finale <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {timeLeft === 30 && (
                            <button
                                onClick={startGame}
                                className="px-10 md:px-16 py-4 md:py-6 bg-romantic-600 hover:bg-romantic-700 rounded-2xl md:rounded-3xl font-black text-xl md:text-2xl shadow-[0_20px_40px_rgba(244,63,94,0.3)] transition-all active:scale-95 flex items-center gap-4"
                            >
                                INITIATE SESSION <Heart className="fill-white" />
                            </button>
                        )}
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.button
                            key={`${target.x}-${target.y}`}
                            initial={{ scale: 0, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                            className={`absolute p-4 md:p-6 text-5xl md:text-6xl select-none filter transition-all ${target.type === 'golden' ? 'drop-shadow-[0_0_20px_#eab308]' : 'drop-shadow-[0_0_20px_#f43f5e]'}`}
                            style={{ left: `${target.x}%`, top: `${target.y}%` }}
                            onClick={() => handleCatch(target.type)}
                        >
                            {target.type === 'golden' ? '💋' : '💖'}
                            {target.type === 'golden' && (
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="absolute -inset-2 border-2 border-yellow-500 rounded-full"
                                />
                            )}
                        </motion.button>
                    </AnimatePresence>
                )}

                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex items-center gap-4 opacity-10 font-black italic text-2xl md:text-4xl pointer-events-none uppercase tracking-tighter">
                    Precision // Velocity // Devotion
                </div>
            </div>

            <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-1">
                {[
                    { icon: <Zap className="w-4 h-4" />, label: "Chain Multiplier", desc: "Every 3 catches" },
                    { icon: <Clock className="w-4 h-4" />, label: "Soul Boost", desc: "Golden = +3s" },
                    { icon: <Stars className="w-4 h-4" />, label: "Precision", desc: "S+ Rank = Legend" },
                    { icon: <Trophy className="w-4 h-4" />, label: "Glory", desc: "Set the record" }
                ].map((item, i) => (
                    <div key={i} className="p-3 md:p-4 glass rounded-xl md:rounded-2xl border-white/5 space-y-1 md:space-y-2 text-left">
                        <div className="flex items-center gap-2 text-romantic-300 font-black uppercase text-[8px] md:text-[9px] tracking-widest whitespace-nowrap">
                            {item.icon} {item.label}
                        </div>
                        <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-tight">{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KissDay;
