import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Timer, Trophy, Zap, Clock } from 'lucide-react';
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

        // Combo logic: catching within 1 second increments combo
        if (timeDiff < 1000) {
            const newCombo = combo + 1;
            setCombo(newCombo);
            if (newCombo > maxCombo) setMaxCombo(newCombo);
        } else {
            setCombo(1);
        }

        setLastCatchTime(now);

        // Score calculation
        let points = type === 'golden' ? 50 : 10;
        points *= Math.floor(1 + combo / 5); // Multiplier every 5 combo

        setScore(s => s + points);

        if (type === 'golden') {
            setTimeLeft(prev => prev + 3); // Time bonus
            confetti({
                particleCount: 50,
                spread: 40,
                colors: ['#fbbf24', '#ffffff']
            });
        }

        spawnTarget();
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
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-6xl font-black text-gradient tracking-tight italic">Combo Fever</h1>
                <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px]">Chain the love. Faster clicks, higher multipliers.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-12">
                <div className="glass-card p-6 rounded-3xl flex flex-col items-center">
                    <Timer className="w-8 h-8 text-blue-400 mb-3" />
                    <div className="text-4xl font-black">{timeLeft}s</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Clock</div>
                </div>
                <div className="glass-card p-6 rounded-3xl flex flex-col items-center col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Zap className="w-20 h-20 text-yellow-400" />
                    </div>
                    <div className="text-sm font-black text-romantic-400 uppercase tracking-[0.3em] mb-2">Total Affection</div>
                    <div className="text-6xl font-black text-white glow-red">{score}</div>
                    {combo > 1 && (
                        <motion.div
                            initial={{ scale: 0.8 }} animate={{ scale: 1.1 }}
                            className="mt-2 text-xs font-black text-yellow-500 uppercase tracking-widest flex items-center gap-2"
                        >
                            <Zap className="w-3" /> {combo}X COMBO <Zap className="w-3" />
                        </motion.div>
                    )}
                </div>
                <div className="glass-card p-6 rounded-3xl flex flex-col items-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
                    <div className="text-4xl font-black">{maxCombo}</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Best Streak</div>
                </div>
            </div>

            <div className="relative w-full aspect-[21/9] glass-card rounded-[3rem] border-white/10 overflow-hidden cursor-crosshair bg-neutral-900 shadow-inner">
                {!isPlaying ? (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md p-10">
                        {timeLeft <= 0 && (
                            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center mb-10 space-y-4">
                                <h2 className="text-7xl font-black text-white italic">Session Over</h2>
                                <div className="flex gap-8 justify-center items-center">
                                    <div className="text-left">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Rank</span>
                                        <span className="text-5xl font-black text-yellow-500">{score > 1000 ? 'S+' : score > 500 ? 'A' : 'B'}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Accurate Kisses</span>
                                        <span className="text-5xl font-black text-white">{score / 10}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <button
                            onClick={startGame}
                            className="px-16 py-6 bg-romantic-600 hover:bg-romantic-700 rounded-2xl font-black text-2xl shadow-[0_20px_40px_rgba(244,63,94,0.3)] transition-all active:scale-95 flex items-center gap-4"
                        >
                            {timeLeft === 30 ? 'INITIATE SESSION' : 'RE-ENGAGE'} <Heart className="fill-white" />
                        </button>
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.button
                            key={`${target.x}-${target.y}`}
                            initial={{ scale: 0, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                            className={`absolute p-6 text-6xl select-none filter transition-all ${target.type === 'golden' ? 'drop-shadow-[0_0_20px_#eab308]' : 'drop-shadow-[0_0_20px_#f43f5e]'}`}
                            style={{ left: `${target.x}%`, top: `${target.y}%` }}
                            onClick={() => handleCatch(target.type)}
                        >
                            {target.type === 'golden' ? '💋' : '💖'}
                            {target.type === 'golden' && (
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="absolute -inset-2 border-2 border-yellow-500 rounded-full"
                                />
                            )}
                        </motion.button>
                    </AnimatePresence>
                )}

                {/* Environment Decor */}
                <div className="absolute bottom-6 left-6 flex items-center gap-4 opacity-10 font-black italic text-4xl pointer-events-none uppercase tracking-tighter">
                    Reflection // Velocity // Soul
                </div>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                {[
                    { icon: <Zap className="w-4 h-4" />, label: "Chain Multiplier", desc: "Every 5 catches" },
                    { icon: <Clock className="w-4 h-4" />, label: "Soul Boost", desc: "Golden Kiss = +3s" },
                    { icon: <Stars className="w-4 h-4" />, label: "Critical Focus", desc: "Precision rewards" },
                    { icon: <Trophy className="w-4 h-4" />, label: "Global Glory", desc: "S+ Rank = Legend" }
                ].map((item, i) => (
                    <div key={i} className="p-4 glass rounded-2xl border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-romantic-300 font-black uppercase text-[9px] tracking-widest">
                            {item.icon} {item.label}
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold">{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KissDay;
