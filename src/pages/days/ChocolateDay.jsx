import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Info, RotateCcw, Thermometer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const ChocolateDay = () => {
    const [ingredients, setIngredients] = useState([]);
    const [step, setStep] = useState(1); // 1: Selection, 2: Tempering, 3: Final
    const [temp, setTemp] = useState(50);
    const [temperingProgress, setTemperingProgress] = useState(0);
    const [harmonyScore, setHarmonyScore] = useState(0);

    const options = [
        { id: 'dark', name: 'Dark Cocoa', color: '#3d1d13', icon: '🍫', harmony: 20 },
        { id: 'milk', name: 'Milk Base', color: '#8b5a2b', icon: '🥛', harmony: 15 },
        { id: 'hazelnut', name: 'Hazelnuts', color: '#c4a484', icon: '🌰', harmony: 25 },
        { id: 'caramel', name: 'Sea Salt Caramel', color: '#d97706', icon: '🍯', harmony: 30 },
        { id: 'berry', name: 'Raspberry Jam', color: '#9f1239', icon: '🍓', harmony: 20 },
        { id: 'gold', name: 'Gold Leaf', color: '#eab308', icon: '✨', harmony: 40 },
    ];

    const addIngredient = (ing) => {
        if (ingredients.length < 4) {
            setIngredients([...ingredients, ing]);
        }
    };

    useEffect(() => {
        if (step === 2) {
            const interval = setInterval(() => {
                // Random temperature fluctuation
                setTemp(prev => {
                    const change = Math.random() * 6 - 3;
                    return Math.max(0, Math.min(100, prev + change));
                });

                // If temp is in sweet spot (40-60), increase progress
                if (temp >= 40 && temp <= 60) {
                    setTemperingProgress(p => {
                        if (p >= 100) {
                            setStep(3);
                            calculateHarmony();
                            return 100;
                        }
                        return p + 2;
                    });
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [step, temp]);

    const calculateHarmony = () => {
        const total = ingredients.reduce((acc, curr) => acc + curr.harmony, 0);
        // Add bonus for specific pairs (e.g., dark + gold)
        let bonus = 0;
        const ids = ingredients.map(i => i.id);
        if (ids.includes('dark') && ids.includes('gold')) bonus += 20;
        if (ids.includes('caramel') && ids.includes('berry')) bonus -= 10; // Clashing flavors

        setHarmonyScore(Math.min(100, (total / 120) * 100 + bonus));

        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.7 },
            colors: ingredients.map(i => i.color)
        });
    };

    const reset = () => {
        setIngredients([]);
        setStep(1);
        setTemp(50);
        setTemperingProgress(0);
        setHarmonyScore(0);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-6xl font-black mb-4 text-gradient">The Chocolate Forge</h1>
                <p className="text-gray-400">Master the art of chocolate tempering to create the perfect flavor harmony.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="glass-card p-8 rounded-3xl"
                            >
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    Select Essence
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {options.map((opt) => (
                                        <button
                                            key={opt.id}
                                            disabled={ingredients.some(i => i.id === opt.id)}
                                            onClick={() => addIngredient(opt)}
                                            className="p-5 rounded-3xl glass hover:bg-white/10 disabled:opacity-30 transition-all text-left flex items-center gap-4 group border border-white/5 hover:border-romantic-500/50"
                                        >
                                            <span className="text-3xl group-hover:scale-125 transition-transform">{opt.icon}</span>
                                            <span className="font-bold text-lg">{opt.name}</span>
                                        </button>
                                    ))}
                                </div>
                                {ingredients.length > 0 && (
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full mt-8 py-5 bg-romantic-600 hover:bg-romantic-700 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                                    >
                                        Start Tempering <Thermometer className="w-6 h-6" />
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="glass-card p-10 rounded-[2.5rem] space-y-12"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-2">Tempering Ritual</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Keep the slider in the Gold Zone</p>
                                </div>

                                <div className="relative h-60 flex items-center justify-center">
                                    <div className="absolute inset-0 flex justify-center opacity-10">
                                        <Thermometer className="w-full h-full text-romantic-500" />
                                    </div>

                                    {/* The Gauge */}
                                    <div className="w-full h-12 bg-white/5 rounded-full relative overflow-hidden border border-white/10">
                                        {/* The Sweet Spot */}
                                        <div className="absolute left-[40%] w-[20%] h-full bg-yellow-500/30 blur-sm" />
                                        <div className="absolute left-[40%] w-[20%] h-full border-x-2 border-yellow-500/50" />

                                        {/* The Indicator */}
                                        <motion.div
                                            className="absolute top-0 w-2 h-full bg-romantic-500 shadow-[0_0_15px_#f43f5e]"
                                            animate={{ left: `${temp}%` }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    </div>

                                    <div className="absolute -bottom-10 flex gap-4">
                                        <button
                                            onMouseDown={() => setTemp(t => Math.max(0, t - 15))}
                                            className="px-6 py-2 glass rounded-full font-black text-blue-400 hover:bg-blue-400/10 active:scale-95 transition-all"
                                        >COOL</button>
                                        <button
                                            onMouseDown={() => setTemp(t => Math.min(100, t + 15))}
                                            className="px-6 py-2 glass rounded-full font-black text-red-400 hover:bg-red-400/10 active:scale-95 transition-all"
                                        >HEAT</button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-500">
                                        <span>Progress</span>
                                        <span>{Math.round(temperingProgress)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-yellow-500 to-romantic-500"
                                            animate={{ width: `${temperingProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-10 rounded-[3rem] text-center space-y-8"
                            >
                                <div className="inline-block p-6 rounded-full bg-romantic-500/10 mb-4">
                                    <Sparkles className="w-16 h-16 text-romantic-400" />
                                </div>
                                <h3 className="text-4xl font-black">Refined Masterpiece</h3>
                                <div className="space-y-2">
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Flavor Harmony Score</div>
                                    <div className="text-6xl font-black text-romantic-300">{Math.round(harmonyScore)}%</div>
                                </div>
                                <p className="text-gray-400 italic">
                                    "{harmonyScore > 80 ? 'An divine symphony of flavors that will leave them breathless.' : 'A beautiful blend that speaks directly to the soul.'}"
                                </p>
                                <button
                                    onClick={reset}
                                    className="w-full py-5 glass hover:bg-white/10 rounded-2xl font-black text-lg flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" /> Start New Batch
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col items-center justify-center space-y-10">
                    <div className="relative w-full aspect-square max-w-[450px]">
                        {/* The Box */}
                        <div className="absolute inset-0 bg-neutral-900 border-[8px] border-neutral-800 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-wrap p-6 gap-6">
                            {ingredients.map((ing, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -20, y: 20 }}
                                    animate={{ scale: 1, rotate: 0, y: 0 }}
                                    className="w-[calc(50%-0.75rem)] aspect-square rounded-2xl shadow-2xl flex items-center justify-center text-5xl relative overflow-hidden group"
                                    style={{ backgroundColor: ing.color }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
                                        {ing.icon}
                                    </motion.span>
                                </motion.div>
                            ))}
                            {ingredients.length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-800 font-black uppercase tracking-[0.4em]">
                                    <ShoppingBag className="w-20 h-20 mb-4 opacity-5" />
                                    Empty Crate
                                </div>
                            )}
                        </div>
                        {/* Box Lid Effect */}
                        <AnimatePresence>
                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute -inset-4 border-2 border-romantic-500/50 rounded-[3.5rem] pointer-events-none"
                                    style={{ boxShadow: '0 0 50px rgba(244,63,94,0.2)' }}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="glass p-6 rounded-3xl w-full border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Alchemical Balance
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {ingredients.map(ing => (
                                <span key={ing.id} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-tighter">
                                    {ing.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChocolateDay;
