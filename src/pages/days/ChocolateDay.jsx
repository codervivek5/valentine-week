import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Info, RotateCcw, Thermometer, Sparkles, Share2, Map, ChevronRight, Zap, Target, Cpu, Flame, Snowflake } from 'lucide-react';
import confetti from 'canvas-confetti';

const ChocolateDay = () => {
    const [ingredients, setIngredients] = useState([]);
    const [step, setStep] = useState(0); // 0: Init, 1: Selection, 2: Tempering, 3: Result
    const [temp, setTemp] = useState(50);
    const [temperingProgress, setTemperingProgress] = useState(0);
    const [harmonyScore, setHarmonyScore] = useState(0);
    const [isBooting, setIsBooting] = useState(true);

    const options = [
        { id: 'dark', name: 'Dark Cocoa', color: '#3d1d13', icon: '🍫', harmony: 20 },
        { id: 'milk', name: 'Milk Base', color: '#8b5a2b', icon: '🥛', harmony: 15 },
        { id: 'hazelnut', name: 'Hazelnuts', color: '#c4a484', icon: '🌰', harmony: 25 },
        { id: 'caramel', name: 'Sea Salt Caramel', color: '#d97706', icon: '🍯', harmony: 30 },
        { id: 'berry', name: 'Raspberry Jam', color: '#9f1239', icon: '🍓', harmony: 20 },
        { id: 'gold', name: 'Gold Leaf', color: '#eab308', icon: '✨', harmony: 40 },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsBooting(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const addIngredient = (ing) => {
        if (ingredients.length < 3) {
            setIngredients([...ingredients, ing]);
        }
    };

    const removeIngredient = (idx) => {
        setIngredients(ingredients.filter((_, i) => i !== idx));
    };

    useEffect(() => {
        if (step === 2) {
            const interval = setInterval(() => {
                setTemp(prev => {
                    const change = Math.random() * 8 - 4; // Natural decay
                    return Math.max(0, Math.min(100, prev + change));
                });

                if (temp >= 45 && temp <= 55) {
                    setTemperingProgress(p => {
                        if (p >= 100) {
                            setStep(3);
                            calculateHarmony();
                            return 100;
                        }
                        return p + 1.5;
                    });
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [step, temp]);

    const calculateHarmony = () => {
        const total = ingredients.reduce((acc, curr) => acc + curr.harmony, 0);
        const score = Math.min(100, (total / 95) * 100);
        setHarmonyScore(score);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ingredients.map(i => i.color)
        });
    };

    const reset = () => {
        setIngredients([]);
        setStep(0);
        setTemp(50);
        setTemperingProgress(0);
        setHarmonyScore(0);
    };

    const handleShare = () => {
        const text = `I forged a ${Math.round(harmonyScore)}% Harmony Chocolate in the Cacao Reactor! 🍫✨`;
        if (navigator.share) {
            navigator.share({ title: 'LoveBound - Chocolate Day', text: text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert('Recipe data synced!');
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-4 px-4 overflow-hidden">
            {/* The Handheld Device Rendering */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative w-full max-w-[380px] aspect-[9/16] bg-[#1a1a1a] rounded-[3rem] border-[8px] border-[#2a2a2a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
            >
                {/* Internal Screen Area */}
                <div className="flex-1 m-3 rounded-[2rem] bg-black relative overflow-hidden flex flex-col border border-white/5">

                    {/* Boot Sequence */}
                    <AnimatePresence>
                        {isBooting && (
                            <motion.div
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 space-y-4"
                            >
                                <Cpu className="w-12 h-12 text-romantic-500 animate-pulse" />
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1.8 }}
                                        className="h-full bg-romantic-500 shadow-[0_0_15px_#f43f5e]"
                                    />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Cacao_Reactor_v2.0</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* HUD Header */}
                    <div className="p-4 flex justify-between items-center bg-white/5 border-b border-white/5 z-10">
                        <div className="flex items-center gap-1.5">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <span className="text-[8px] font-black text-gray-400">CORE_SYNC</span>
                        </div>
                        <span className="text-[8px] font-black text-romantic-500 tracking-widest uppercase">
                            {step === 0 ? 'READY' : step === 1 ? 'SELECTING' : step === 2 ? 'TEMPERING' : 'COMPLETE'}
                        </span>
                    </div>

                    {/* Main Interaction Area */}
                    <div className="flex-1 relative flex flex-col p-6 items-center justify-center">

                        {/* Central Reactor Visual */}
                        <div className="relative mb-8">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: 360,
                                    boxShadow: step === 2 ? [`0 0 20px #f43f5e33`, `0 0 60px #f43f5e66`, `0 0 20px #f43f5e33`] : '0 0 20px #ffffff11'
                                }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center relative bg-gradient-to-br from-white/5 to-transparent"
                            >
                                <AnimatePresence mode="wait">
                                    {ingredients.length === 0 ? (
                                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <ShoppingBag className="w-10 h-10 text-gray-800" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="core"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl flex flex-wrap p-2 gap-1 overflow-hidden"
                                            style={{ backgroundColor: ingredients[ingredients.length - 1].color }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-white/20" />
                                            {ingredients.map((ing, i) => (
                                                <span key={i} className="text-2xl md:text-3xl m-auto">{ing.icon}</span>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Orbital Rings */}
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute -inset-4 border border-white/5 rounded-full" />
                            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="absolute -inset-8 border border-white/5 rounded-full border-dotted" />
                        </div>

                        {/* Content Switching */}
                        <div className="w-full relative z-10 min-h-[120px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div key="init" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                                        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Initialize Forge</h2>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-6 py-2 bg-romantic-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-romantic-500/30"
                                        >
                                            BEGIN SEQUENCE
                                        </button>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div key="select" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-2 gap-2">
                                        <div className="col-span-2 flex justify-between items-center mb-1">
                                            <span className="text-[9px] font-black text-gray-500 uppercase">Slots: {ingredients.length}/3</span>
                                            {ingredients.length === 3 && (
                                                <button onClick={() => setStep(2)} className="text-[9px] font-black text-romantic-400 uppercase animate-pulse">Confirm →</button>
                                            )}
                                        </div>
                                        {options.map((opt) => (
                                            <button
                                                key={opt.id}
                                                disabled={ingredients.some(i => i.id === opt.id)}
                                                onClick={() => addIngredient(opt)}
                                                className="p-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-20"
                                            >
                                                <span className="text-lg">{opt.icon}</span>
                                                <span className="text-[8px] font-black text-gray-300 uppercase truncate">{opt.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="temper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-amber-500 tracking-tighter">HEAT_SYMMETRY</span>
                                            <span className="text-xl font-black text-white">{Math.round(temperingProgress)}%</span>
                                        </div>
                                        <div className="relative h-4 bg-white/5 border border-white/10 rounded-full overflow-hidden p-0.5">
                                            {/* Gold Zone */}
                                            <div className="absolute left-[45%] w-[10%] h-full bg-romantic-500/20 rounded-md" />
                                            <motion.div
                                                className="absolute top-0 w-1.5 h-full bg-romantic-500 shadow-[0_0_10px_#f43f5e]"
                                                animate={{ left: `${temp}%` }}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onTouchStart={() => setTemp(t => Math.max(0, t - 18))}
                                                onClick={() => setTemp(t => Math.max(0, t - 18))}
                                                className="flex-1 py-2 glass rounded-xl flex flex-col items-center gap-1 group"
                                            >
                                                <Snowflake className="w-3 h-3 text-blue-400 group-active:scale-125 transition-transform" />
                                                <span className="text-[7px] font-black text-gray-500 uppercase">COOL</span>
                                            </button>
                                            <button
                                                onTouchStart={() => setTemp(t => Math.min(100, t + 18))}
                                                onClick={() => setTemp(t => Math.min(100, t + 18))}
                                                className="flex-1 py-2 glass rounded-xl flex flex-col items-center gap-1 group"
                                            >
                                                <Flame className="w-3 h-3 text-red-400 group-active:scale-125 transition-transform" />
                                                <span className="text-[7px] font-black text-gray-500 uppercase">HEAT</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">FORGE_COMPLETED</div>
                                        <h3 className="text-5xl font-black italic text-romantic-300 leading-none">{Math.round(harmonyScore)}%</h3>
                                        <div className="grid grid-cols-2 gap-2 max-w-[200px] mx-auto">
                                            <button onClick={handleShare} className="py-2 bg-white text-black rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-1">
                                                <Share2 className="w-3 h-3" /> DATA
                                            </button>
                                            <button onClick={reset} className="py-2 glass rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-1">
                                                <RotateCcw className="w-3 h-3" /> REBOOT
                                            </button>
                                        </div>
                                        <Link to="/teddy-day" className="block text-romantic-400 text-[10px] font-black uppercase tracking-widest animate-pulse mt-4 flex items-center justify-center gap-2">
                                            NEXT_LVL <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="p-4 bg-white/5 border-t border-white/5 flex justify-center gap-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                    </div>
                </div>

                {/* External Hardware Details */}
                <div className="absolute top-1/2 -left-3 w-3 h-20 bg-[#2a2a2a] rounded-r-lg shadow-inner" />
                <div className="absolute top-1/3 -right-3 w-3 h-24 bg-[#2a2a2a] rounded-l-lg shadow-inner flex flex-col justify-around py-4">
                    <div className="w-1 h-1 bg-black/20 rounded-full" />
                    <div className="w-1 h-1 bg-black/20 rounded-full" />
                </div>
            </motion.div>

            {/* Background Aesthetic */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--romantic-900)_0%,_black_70%)] opacity-30" />
            <div className="fixed inset-0 -z-20 bg-[#0a0a0a]" />
        </div>
    );
};

export default ChocolateDay;
