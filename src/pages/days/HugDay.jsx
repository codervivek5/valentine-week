import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sun, Wind, Snowflake, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

const HugDay = () => {
    const [warmth, setWarmth] = useState(20);
    const [frosts, setFrosts] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    // Generate random frost patches
    const spawnFrost = useCallback(() => {
        if (isSuccess || isGameOver) return;
        const newFrost = {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            scale: 0.5
        };
        setFrosts(prev => [...prev, newFrost]);
    }, [isSuccess, isGameOver]);

    useEffect(() => {
        const spawner = setInterval(spawnFrost, 2000);
        const drainer = setInterval(() => {
            if (isSuccess || isGameOver) return;

            // Warmth decays naturally + more if frosts are present
            setWarmth(prev => {
                const decay = 1 + (frosts.length * 2);
                const next = prev - decay;
                if (next <= 0) {
                    setIsGameOver(true);
                    return 0;
                }
                return next;
            });
        }, 500);

        return () => {
            clearInterval(spawner);
            clearInterval(drainer);
        };
    }, [spawnFrost, frosts.length, isSuccess, isGameOver]);

    const handleHug = () => {
        if (isSuccess || isGameOver) return;
        setWarmth(prev => {
            const next = prev + 4;
            if (next >= 100) {
                setIsSuccess(true);
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#f43f5e', '#fdba74', '#ffffff']
                });
                return 100;
            }
            return next;
        });
    };

    const shatterFrost = (id) => {
        setFrosts(prev => prev.filter(f => f.id !== id));
        setWarmth(prev => Math.min(100, prev + 5)); // Reward for shattering
    };

    const reset = () => {
        setWarmth(20);
        setFrosts([]);
        setIsSuccess(false);
        setIsGameOver(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
            <div className="mb-12 space-y-4">
                <h1 className="text-6xl font-black text-gradient tracking-tight">The Frost Guard</h1>
                <p className="text-gray-400 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-bold">Defend the warmth. Click the ice to shatter the chill.</p>
            </div>

            <div className="relative max-w-2xl mx-auto aspect-square glass-card rounded-[4rem] border-white/5 overflow-hidden flex items-center justify-center">
                {/* Dynamic Background */}
                <motion.div
                    animate={{
                        backgroundColor: warmth > 60 ? '#f43f5e' : warmth > 30 ? '#fdba74' : '#3b82f6',
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 blur-3xl rounded-full"
                    style={{ scale: 0.8 }}
                />

                {/* The Game Core */}
                <div className="relative z-10 w-full px-12 space-y-12">
                    <div className="flex flex-col items-center gap-8">
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={handleHug}
                            className="w-48 h-48 rounded-full bg-gradient-to-br from-romantic-400 to-romantic-700 flex items-center justify-center shadow-[0_0_60px_rgba(244,63,94,0.4)] group relative"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <Heart className="w-24 h-24 text-white fill-white" />
                            </motion.div>
                            {/* Steam Particles */}
                            {warmth > 70 && [...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: -100, opacity: 0, scale: 2 }}
                                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.5 }}
                                    className="absolute top-0 text-white opacity-40"
                                >
                                    <Wind className="w-8 h-8 rotate-90" />
                                </motion.div>
                            ))}
                        </motion.button>
                        <div className="text-xs font-black tracking-[0.5em] text-gray-500 uppercase">Transmit Warmth</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between font-black text-[10px] uppercase tracking-widest">
                            <span className="flex items-center gap-2 text-blue-400"><Snowflake className="w-3" /> Absolute Zero</span>
                            <span className="flex items-center gap-2 text-romantic-400">Solar Heart <Flame className="w-3" /></span>
                        </div>
                        <div className="w-full h-4 bg-white/5 rounded-full p-1 border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-orange-400 to-rose-600 rounded-full"
                                animate={{ width: `${warmth}%` }}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-black text-white/50">
                                {Math.round(warmth)}% TEMPERATURE
                            </div>
                        </div>
                    </div>
                </div>

                {/* Frost Patches */}
                <AnimatePresence>
                    {frosts.map((frost) => (
                        <motion.button
                            key={frost.id}
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                            exit={{ scale: 3, opacity: 0, filter: 'blur(10px)' }}
                            onClick={() => shatterFrost(frost.id)}
                            className="absolute z-20 p-4 bg-blue-400/20 backdrop-blur-md rounded-2xl border border-blue-400/50 text-blue-100 shadow-[0_0_30px_rgba(96,165,250,0.3)] animate-pulse"
                            style={{ left: `${frost.x}%`, top: `${frost.y}%` }}
                        >
                            <Snowflake className="w-10 h-10" />
                        </motion.button>
                    ))}
                </AnimatePresence>

                {/* Game End States */}
                <AnimatePresence>
                    {(isSuccess || isGameOver) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-50 bg-neutral-950/80 backdrop-blur-xl flex flex-col items-center justify-center p-12"
                        >
                            {isSuccess ? (
                                <>
                                    <div className="w-32 h-32 bg-romantic-500 rounded-full flex items-center justify-center shadow-[0_0_50px_#f43f5e] mb-8">
                                        <Flame className="w-16 h-16 text-white" />
                                    </div>
                                    <h2 className="text-5xl font-black text-gradient glow-red mb-4 text-center">A Hug That Set the Stars Alight</h2>
                                    <p className="text-gray-400 italic mb-10 text-center">"You've defied the chill. The universe is now {Math.round(warmth)}% warmer because of your love."</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_50px_#3b82f6] mb-8">
                                        <Snowflake className="w-16 h-16 text-white" />
                                    </div>
                                    <h2 className="text-5xl font-black text-blue-400 mb-4 tracking-tighter text-center">Frozen in Silence</h2>
                                    <p className="text-gray-400 italic mb-10 text-center">The chill was too strong... but love never truly dies. Try once more?</p>
                                </>
                            )}
                            <button
                                onClick={reset}
                                className="px-12 py-5 bg-romantic-600 hover:bg-romantic-700 rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95"
                            >
                                RESTORE THE VIBE
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HugDay;
