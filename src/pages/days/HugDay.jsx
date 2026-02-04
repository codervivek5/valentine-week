import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sun, Wind, Snowflake, Flame, Share2, RefreshCcw } from 'lucide-react';
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
        const spawner = setInterval(spawnFrost, 1500); // Increased frequency for more gamified difficulty
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

    const handleShare = () => {
        const text = `I just shattered the frost in LoveBound with a warm hug! ❄️➡️🔥\nAtmosphere temperature: ${Math.round(warmth)}% warmer!`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Hug Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Hug details copied to clipboard!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4 text-center">
            <div className="mb-8 md:mb-12 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-gradient uppercase tracking-tighter italic">The Frost Guard</h1>
                <p className="text-gray-400 max-w-lg mx-auto uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold px-4">Defend the warmth. Shatter the ice to preserve the heart's glow.</p>
            </div>

            <div className="relative max-w-xl mx-auto aspect-square glass-card rounded-[2.5rem] md:rounded-[4rem] border-white/5 overflow-hidden flex items-center justify-center shadow-2xl">
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
                <div className="relative z-10 w-full px-6 md:px-12 space-y-8 md:space-y-12">
                    <div className="flex flex-col items-center gap-6 md:gap-8">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleHug}
                            className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-romantic-400 to-romantic-700 flex items-center justify-center shadow-[0_0_60px_rgba(244,63,94,0.4)] group relative"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <Heart className="w-20 h-20 md:w-28 md:h-28 text-white fill-white" />
                            </motion.div>
                            {/* Steam Particles */}
                            {warmth > 70 && [...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: -100, opacity: 0, scale: 2 }}
                                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.5 }}
                                    className="absolute top-0 text-white opacity-40"
                                >
                                    <Wind className="w-6 h-6 md:w-8 md:h-8 rotate-90" />
                                </motion.div>
                            ))}
                        </motion.button>
                        <div className="text-[10px] md:text-xs font-black tracking-[0.4em] text-gray-500 uppercase">Transmit Warmth</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between font-black text-[8px] md:text-[10px] uppercase tracking-widest px-1">
                            <span className="flex items-center gap-1.5 text-blue-400"><Snowflake className="w-3" /> Absolute Zero</span>
                            <span className="flex items-center gap-1.5 text-romantic-400">Solar Heart <Flame className="w-3" /></span>
                        </div>
                        <div className="w-full h-3 md:h-4 bg-white/5 rounded-full p-1 border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-orange-400 to-rose-600 rounded-full"
                                animate={{ width: `${warmth}%` }}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] md:text-[9px] font-black text-white/50 whitespace-nowrap">
                                {Math.round(warmth)}% THERMAL HARMONY
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
                            animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
                            exit={{ scale: 2.5, opacity: 0, filter: 'blur(10px)' }}
                            onClick={() => shatterFrost(frost.id)}
                            className="absolute z-20 p-3 md:p-4 bg-blue-400/20 backdrop-blur-md rounded-xl md:rounded-2xl border border-blue-400/50 text-blue-100 shadow-[0_0_30px_rgba(96,165,250,0.3)]"
                            style={{ left: `${frost.x}%`, top: `${frost.y}%` }}
                        >
                            <Snowflake className="w-8 h-8 md:w-10 md:h-10" />
                        </motion.button>
                    ))}
                </AnimatePresence>

                {/* Game End States */}
                <AnimatePresence>
                    {(isSuccess || isGameOver) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-50 bg-neutral-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:p-12"
                        >
                            {isSuccess ? (
                                <>
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-romantic-500 rounded-full flex items-center justify-center shadow-[0_0_50px_#f43f5e] mb-6 md:mb-8">
                                        <Flame className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-gradient uppercase tracking-tighter italic mb-4">The Eternal Glow</h2>
                                    <p className="text-sm md:text-base text-gray-400 italic mb-8 md:mb-10 max-w-md">"You've defied the chill. The universe is now {Math.round(warmth)}% warmer because of your love."</p>
                                    <div className="flex flex-col gap-3 w-full max-w-xs">
                                        <button
                                            onClick={handleShare}
                                            className="w-full py-4 bg-romantic-600 hover:bg-romantic-700 rounded-xl md:rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                        >
                                            Share Warmth <Share2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="w-full py-3 glass border border-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-gray-400 font-black"
                                        >
                                            <RefreshCcw className="w-4 h-4" /> Relight the Heart
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_50px_#3b82f6] mb-6 md:mb-8">
                                        <Snowflake className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-blue-400 uppercase tracking-tighter italic mb-4">Frozen Silence</h2>
                                    <p className="text-sm md:text-base text-gray-400 italic mb-8 md:mb-10 max-w-md">The chill was too strong... but love never truly dies. Try once more?</p>
                                    <button
                                        onClick={reset}
                                        className="w-full max-w-xs py-4 md:py-5 bg-blue-600 hover:bg-blue-700 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-2xl transition-all active:scale-95"
                                    >
                                        RECLAIM THE HEAT
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HugDay;
