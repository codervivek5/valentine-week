import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Info, RotateCcw, Thermometer, Sparkles, Share2, Map, ChevronRight, Zap, Target, Cpu, Flame, Snowflake, Settings, Power } from 'lucide-react';
import confetti from 'canvas-confetti';

const ChocolateDay = () => {
    const [ingredients, setIngredients] = useState([]);
    const [step, setStep] = useState(0); // 0: Init, 1: Selection, 2: Tempering, 3: Result
    const [temp, setTemp] = useState(50);
    const [temperingProgress, setTemperingProgress] = useState(0);
    const [harmonyScore, setHarmonyScore] = useState(0);
    const [isBooting, setIsBooting] = useState(true);
    const [powerState, setPowerState] = useState('low'); // 'low', 'high', 'critical'

    const options = [
        { id: 'dark', name: 'Dark Cocoa', color: '#3d1d13', icon: '🍫', harmony: 20, glow: 'rgba(61, 29, 19, 0.6)' },
        { id: 'milk', name: 'Milk Base', color: '#8b5a2b', icon: '🥛', harmony: 15, glow: 'rgba(139, 90, 43, 0.6)' },
        { id: 'hazelnut', name: 'Hazelnuts', color: '#c4a484', icon: '🌰', harmony: 25, glow: 'rgba(196, 164, 132, 0.6)' },
        { id: 'caramel', name: 'Sea Salt Caramel', color: '#d97706', icon: '🍯', harmony: 30, glow: 'rgba(217, 119, 6, 0.6)' },
        { id: 'berry', name: 'Raspberry Jam', color: '#9f1239', icon: '🍓', harmony: 20, glow: 'rgba(159, 18, 57, 0.6)' },
        { id: 'gold', name: 'Gold Leaf', color: '#eab308', icon: '✨', harmony: 40, glow: 'rgba(234, 179, 8, 0.6)' },
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
                    const decay = (Math.random() * 8 - 3); // Faster decay
                    return Math.max(0, Math.min(100, prev + decay));
                });

                if (temp >= 45 && temp <= 55) {
                    setTemperingProgress(p => {
                        if (p >= 100) {
                            setStep(3);
                            calculateHarmony();
                            return 100;
                        }
                        return p + 1.8;
                    });
                    setPowerState('high');
                } else if (temp > 70 || temp < 30) {
                    setPowerState('critical');
                } else {
                    setPowerState('low');
                }
            }, 80);
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
        setPowerState('low');
    };

    const handleShare = () => {
        const text = `Forged a ${Math.round(harmonyScore)}% Crystal Harmony Chocolate! 🍫✨ #LoveBound`;
        if (navigator.share) {
            navigator.share({ title: 'LoveBound Reactor', text: text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert('Core data exported!');
        }
    };

    return (
        <div className="min-h-[95vh] flex items-center justify-center py-6 px-4 overflow-hidden bg-black select-none">
            {/* The Premium Handheld Device */}
            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                className="relative w-full max-w-[360px] aspect-[9/17] bg-[#121212] rounded-[3.5rem] border-[10px] border-[#222] shadow-[0_50px_100px_-20px_rgba(244,63,94,0.3),_inset_0_-10px_20px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
            >
                {/* Physical Hardware Highlights */}
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

                {/* Internal Screen Area */}
                <div className="flex-1 m-4 rounded-[2.5rem] bg-[#050505] relative overflow-hidden flex flex-col border border-white/10 shadow-[inner_0_0_30px_rgba(0,0,0,0.8)]">

                    {/* CRT Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none z-40 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                    <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-romantic-500/5 to-transparent h-20 animate-scanline" />

                    {/* Boot Sequence */}
                    <AnimatePresence>
                        {isBooting && (
                            <motion.div
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 text-romantic-500"
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                    <Cpu className="w-14 h-14" />
                                </motion.div>
                                <div className="mt-8 w-full max-w-[150px] space-y-2">
                                    <div className="flex justify-between text-[8px] font-black tracking-widest">
                                        <span>INITIATING</span>
                                        <span className="animate-pulse">_</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 1.7 }}
                                            className="h-full bg-romantic-500 shadow-[0_0_15px_#f43f5e]"
                                        />
                                    </div>
                                </div>
                                <span className="absolute bottom-10 text-[7px] font-black tracking-[0.4em] opacity-30">OS_CORE_X_CHLORO</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* HUD Header */}
                    <div className="px-6 py-4 flex justify-between items-center bg-white/[0.02] border-b border-white/5 z-10">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${step === 2 && powerState === 'critical' ? 'bg-red-500 animate-ping' : 'bg-romantic-500'} shadow-[0_0_8px_currentColor]`} />
                            <span className="text-[9px] font-black text-white/40 tracking-tighter">LVL_04</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                            <span className="text-[10px] font-black text-white">REACTIVE</span>
                        </div>
                    </div>

                    {/* Main Interaction Area */}
                    <div className="flex-1 relative flex flex-col p-6 items-center justify-between">

                        {/* Central Reactor Visual */}
                        <div className="relative flex-1 flex items-center justify-center w-full">
                            <motion.div
                                animate={{
                                    scale: step === 2 ? [1, 1.05, 1] : 1,
                                    boxShadow: ingredients.length > 0
                                        ? `0 0 40px ${options.find(o => o.id === ingredients[ingredients.length - 1].id)?.glow}`
                                        : '0 0 20px rgba(244,63,94,0.1)'
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="relative w-40 h-40 rounded-full flex items-center justify-center"
                            >
                                {/* Digital Grid Background */}
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(244,63,94,0.15)_0%,_transparent_70%)]" />

                                <AnimatePresence mode="wait">
                                    {ingredients.length === 0 ? (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                                <Target className="w-6 h-6 text-gray-700" />
                                            </div>
                                            <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest text-center leading-relaxed">Load<br />Molecular_Base</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="core"
                                            animate={{
                                                rotate: 360,
                                                borderColor: ingredients[ingredients.length - 1].color
                                            }}
                                            transition={{ rotate: { repeat: Infinity, duration: 15, ease: "linear" } }}
                                            className="w-32 h-32 rounded-full border-4 border-double shadow-2xl flex flex-wrap p-3 gap-2 overflow-hidden items-center justify-center glass"
                                            style={{ backgroundColor: `${ingredients[ingredients.length - 1].color}33`, borderColor: ingredients[ingredients.length - 1].color }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/30" />
                                            {ingredients.map((ing, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ scale: 0, rotate: -45 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    className="text-3xl relative z-10 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                                >
                                                    {ing.icon}
                                                </motion.span>
                                            ))}
                                            {/* Energy Blur Effect for Tempering */}
                                            {step === 2 && (
                                                <motion.div
                                                    animate={{ opacity: [0, 0.4, 0], scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                                    className="absolute inset-0 bg-romantic-500 blur-2xl"
                                                />
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Orbital Elements */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    className="absolute -inset-6 border-t border-romantic-500/20 rounded-full"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                    className="absolute -inset-10 border-r border-white/5 rounded-full border-dashed"
                                />
                            </motion.div>
                        </div>

                        {/* Tactical HUD Content */}
                        <div className="w-full mt-4 min-h-[140px] flex flex-col items-center justify-center">
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="init"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center space-y-6"
                                    >
                                        <div className="space-y-1">
                                            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Cacao_Reactor</h2>
                                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">Initialize Molecular Fusion</p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setStep(1)}
                                            className="px-8 py-3 bg-romantic-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-[0_15px_30px_rgba(244,63,94,0.3)] border-t border-white/20"
                                        >
                                            START CORE
                                        </motion.button>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[9px] font-black text-romantic-500 uppercase">MOD_SELECT</span>
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map(i => (
                                                    <div key={i} className={`w-3 h-1 rounded-full ${i < ingredients.length ? 'bg-romantic-500 shadow-[0_0_5px_#f43f5e]' : 'bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2.5">
                                            {options.map((opt) => (
                                                <motion.button
                                                    key={opt.id}
                                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                                    whileTap={{ scale: 0.98 }}
                                                    disabled={ingredients.some(i => i.id === opt.id) || ingredients.length >= 3}
                                                    onClick={() => addIngredient(opt)}
                                                    className="p-2.5 border border-white/5 rounded-2xl bg-white/[0.03] transition-all flex items-center gap-3 disabled:opacity-20 relative overflow-hidden group"
                                                >
                                                    <span className="text-xl group-hover:drop-shadow-[0_0_5px_currentColor]" style={{ color: opt.color }}>{opt.icon}</span>
                                                    <span className="text-[8px] font-black text-gray-400 uppercase truncate tracking-tighter">{opt.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                        {ingredients.length === 3 && (
                                            <motion.button
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                onClick={() => setStep(2)}
                                                className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                                            >
                                                STABILIZE CORE <Zap className="w-3 h-3 fill-black" />
                                            </motion.button>
                                        )}
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="temper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-5">
                                        <div className="flex justify-between items-end px-1">
                                            <div className="flex flex-col">
                                                <span className="text-[7px] font-black text-gray-500 uppercase">THERMAL_HARMONY</span>
                                                <span className={`text-[10px] font-black ${powerState === 'critical' ? 'text-red-500 animate-pulse' : powerState === 'high' ? 'text-romantic-400' : 'text-amber-500'}`}>
                                                    {powerState === 'critical' ? 'CRITICAL_SPIKE' : powerState === 'high' ? 'SYNC_ACTIVE' : 'LOW_ENERGY'}
                                                </span>
                                            </div>
                                            <span className="text-2xl font-black text-white italic tracking-tighter">{Math.round(temperingProgress)}%</span>
                                        </div>

                                        <div className="relative h-6 bg-white/[0.05] border border-white/10 rounded-xl overflow-hidden p-1 shadow-inner">
                                            {/* Safe Sync Zone */}
                                            <div className="absolute left-[45%] w-[10%] h-full bg-romantic-500/20 blur-[2px] rounded" />
                                            <div className="absolute left-[45%] w-[10%] h-full border-x border-romantic-500/40" />
                                            <motion.div
                                                className="absolute top-1 w-2 h-[calc(100%-8px)] bg-romantic-500 rounded shadow-[0_0_15px_#f43f5e] z-10"
                                                animate={{ left: `${temp}%` }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onTouchStart={() => setTemp(t => Math.max(0, t - 20))}
                                                onMouseDown={() => setTemp(t => Math.max(0, t - 20))}
                                                className="flex-1 py-3 bg-white/5 border border-white/5 hover:border-blue-500/50 rounded-2xl flex flex-col items-center gap-1.5 active:scale-95 transition-all group"
                                            >
                                                <Snowflake className="w-4 h-4 text-blue-400 group-hover:drop-shadow-[0_0_8px_#60a5fa]" />
                                                <span className="text-[8px] font-black text-gray-500 tracking-widest">COOL</span>
                                            </button>
                                            <button
                                                onTouchStart={() => setTemp(t => Math.min(100, t + 20))}
                                                onMouseDown={() => setTemp(t => Math.min(100, t + 20))}
                                                className="flex-1 py-3 bg-white/5 border border-white/5 hover:border-red-500/50 rounded-2xl flex flex-col items-center gap-1.5 active:scale-95 transition-all group"
                                            >
                                                <Flame className="w-4 h-4 text-red-500 group-hover:drop-shadow-[0_0_8px_#ef4444]" />
                                                <span className="text-[8px] font-black text-gray-500 tracking-widest">HEAT</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-5">
                                        <div className="inline-flex items-center gap-1.5 bg-romantic-500/20 px-3 py-1 rounded-full border border-romantic-500/30">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-[8px] font-black text-romantic-300 uppercase tracking-widest">Masterpiece_ forged</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[8px] font-black text-gray-500 uppercase">Total_Synergy</span>
                                            <h3 className="text-6xl font-black italic text-gradient tracking-tighter drop-shadow-[0_0_20px_rgba(244,63,94,0.4)] leading-none">{Math.round(harmonyScore)}%</h3>
                                        </div>
                                        <div className="flex flex-col gap-2.5 w-full max-w-[220px] mx-auto">
                                            <button onClick={handleShare} className="py-3.5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                                                <Share2 className="w-4 h-4" /> EXPORT_DATA
                                            </button>
                                            <button onClick={reset} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all">
                                                <RotateCcw className="w-3.5 h-3.5" /> RESTART_SYNC
                                            </button>
                                        </div>
                                        <Link to="/teddy-day" className="block text-romantic-400 text-[9px] font-black uppercase tracking-[0.2em] font-serif italic mt-6 flex items-center justify-center gap-2 hover:text-white transition-colors">
                                            Continue Journey <ChevronRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer System Details */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-center gap-4">
                        <div className="flex gap-1.5 opacity-20">
                            {[...Array(6)].map((_, i) => <div key={i} className="w-0.5 h-0.5 rounded-full bg-white" />)}
                        </div>
                        <div className="text-[7px] font-black text-white/20 uppercase tracking-[0.5em] mt-0.5">Hardware_Interface</div>
                        <div className="flex gap-1.5 opacity-20">
                            {[...Array(6)].map((_, i) => <div key={i} className="w-0.5 h-0.5 rounded-full bg-white" />)}
                        </div>
                    </div>
                </div>

                {/* External Hardware Elements */}
                {/* Volume/Power Buttons */}
                <div className="absolute top-1/4 -right-[2px] w-1.5 h-16 bg-[#2a2a2a] rounded-l-md border-l border-white/10 shadow-[inner_0_0_5px_black]" />
                <div className="absolute top-[45%] -left-[2px] w-1.5 h-24 bg-[#2a2a2a] rounded-r-md border-r border-white/10 shadow-[inner_0_0_5px_black]" />

                {/* Status LED */}
                <div className="absolute bottom-10 left-12 flex flex-col gap-1.5">
                    <div className={`w-1 h-3 rounded-full ${step === 2 ? 'bg-romantic-500 animate-pulse' : 'bg-gray-800'} transition-colors shadow-[0_0_5px_currentColor]`} />
                    <div className="w-1 h-3 rounded-full bg-gray-800" />
                </div>
            </motion.div>

            {/* Background Vibe */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--romantic-900)_0%,_black_90%)] opacity-20" />
            <div className="fixed inset-0 -z-20 bg-[#050505]" />
        </div>
    );
};

export default ChocolateDay;
