import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, RefreshCcw, Sparkles, Activity, Share2, Map, ShieldCheck, Trophy, Zap, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const ProposeDay = () => {
    const [currentScene, setCurrentScene] = useState(0);
    const [choices, setChoices] = useState([]);
    const [courage, setCourage] = useState(0);
    const [isBeating, setIsBeating] = useState(false);
    const [stats, setStats] = useState({ romantic: 0, trust: 0, chaotic: 0 });

    const scenes = useMemo(() => [
        {
            id: 0,
            title: "Atmosphere Synthesis",
            text: "The evening environment is shifting. How do you calibrate the sensory input?",
            equation: "Mood = (Song / Silence) * Jasmine^2",
            options: [
                { text: "Increase Melodic Frequency", next: 1, trait: "musical", weight: { romantic: 12, trust: 5 } },
                { text: "Enforce Pure Silence", next: 1, trait: "intimate", weight: { trust: 15, romantic: 3 } },
                { text: "Introduce Soft Whispers", next: 1, trait: "tender", weight: { romantic: 10, trust: 10 } }
            ]
        },
        {
            id: 1,
            title: "Visual Identity",
            text: "Your presence is a variable in this equation. Choose your spectral representation.",
            equation: "Presence = (Confidence + Style) / Heartbeat",
            options: [
                { text: "Radiate Passionate Crimson", next: 2, trait: "passionate", weight: { romantic: 15, chaotic: 5 } },
                { text: "Reflect Eternal Pure White", next: 2, trait: "pure", weight: { trust: 18 } },
                { text: "Absorb Midnight Black", next: 2, trait: "mysterious", weight: { chaotic: 12, romantic: 8 } }
            ]
        },
        {
            id: 2,
            title: "The Token Variable",
            text: "A material object must bridge the gap between intent and reality. What is the bridge?",
            equation: "Connection = (Gift * Memory) / Distance",
            options: [
                { text: "Vintage Ink on Paper", next: 3, trait: "poetic", weight: { trust: 15, romantic: 10 } },
                { text: "Crystalline Carbon Bond", next: 3, trait: "classic", weight: { trust: 25 } },
                { text: "Botanical Time Capsule", next: 3, trait: "nostalgic", weight: { romantic: 20, trust: 5 } }
            ]
        },
        {
            id: 3,
            title: "Communication Protocol",
            text: "The air between you is dense with unspoken data. Execute a dialogue script.",
            equation: "Understanding = (Words + Silence) / (Fear * 10)",
            options: [
                { text: "Invoke Soulmate Theory", next: 4, trait: "dreamy", weight: { romantic: 15, trust: 5 } },
                { text: "Define Infinite Commitment", next: 4, trait: "steady", weight: { trust: 20 } },
                { text: "Trigger Chaotic Honesty", next: 4, trait: "bold", weight: { chaotic: 20, romantic: 5 } }
            ]
        },
        {
            id: 4,
            title: "Spatial Optimization",
            text: "The location must align with the cosmic intent. Select the final coordinates.",
            equation: "Memory = (Vibe * Height) + (First_Kiss / 2)",
            options: [
                { text: "Elevated Celestial Vertex", next: 5, trait: "aesthetic", weight: { romantic: 20 } },
                { text: "Submerged Biolum Grid", next: 5, trait: "adventurous", weight: { chaotic: 15, trust: 10 } },
                { text: "The Original Origin Point", next: 5, trait: "sentimental", weight: { trust: 20, romantic: 5 } }
            ]
        },
        {
            id: 5,
            title: "Recursive Definition",
            text: "Summarize the entirety of this relationship in a single non-nullable string.",
            equation: "Us = Σ(Moments + Tears + Laughter)",
            options: [
                { text: "Inevitable Force", next: 6, trait: "fated", weight: { trust: 12, romantic: 15 } },
                { text: "Immutable Home", next: 6, trait: "secure", weight: { trust: 25 } },
                { text: "Sustained Wildfire", next: 6, trait: "intense", weight: { chaotic: 20, romantic: 10 } }
            ]
        },
        {
            id: 6,
            title: "The Critical Rhythm",
            text: "Internal core temperature rising. Synchronize your pulse with the universe.",
            equation: "Success = lim (Fear → 0) [ Courage / Heartbeat ]",
            isRhythmStep: true
        },
        {
            id: 7,
            title: "The Eternal Choice",
            text: "All calculations complete. The singularity is here. Do you accept the outcome?",
            equation: "Life = You + Me",
            isFinal: true
        }
    ], []);

    const handleChoice = (option) => {
        setChoices(prev => [...prev, option.trait]);
        setStats(prev => ({
            romantic: prev.romantic + (option.weight.romantic || 0),
            trust: prev.trust + (option.weight.trust || 0),
            chaotic: prev.chaotic + (option.weight.chaotic || 0)
        }));
        setCurrentScene(option.next);
    };

    const handleHeartbeatClick = () => {
        if (isBeating) {
            setCourage(prev => Math.min(prev + 14, 100));
            if (courage + 14 >= 100) {
                setTimeout(() => setCurrentScene(7), 500);
            }
        } else {
            setCourage(prev => Math.max(prev - 10, 0));
        }
    };

    useEffect(() => {
        if (currentScene === 6) {
            const interval = setInterval(() => {
                setIsBeating(prev => !prev);
            }, 650);
            return () => clearInterval(interval);
        }
    }, [currentScene]);

    const handleFinalPropose = () => {
        const duration = 6 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 70 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 200);

        setCurrentScene(8);
    };

    const compatibility = useMemo(() => {
        const total = stats.romantic + stats.trust + stats.chaotic;
        if (total === 0) return 0;
        const score = Math.floor(((stats.romantic * 1.3 + stats.trust * 1.7) / (total * 1.6)) * 100);
        return Math.min(score, 100);
    }, [stats]);

    const handleShare = () => {
        const text = `The algorithm found ${compatibility}% compatibility! 💍 My journey: ${choices.join(', ')}. Forever initialized!`;
        if (navigator.share) {
            navigator.share({ title: 'LoveBound - Propose Day', text: text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert('Journey data synced to clipboard!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-2 md:py-8 px-4 flex flex-col justify-center min-h-[90vh]">
            {/* Header Badges */}
            {currentScene <= 7 && (
                <div className="flex justify-center gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 no-scrollbar px-2">
                    {[
                        { Icon: ShieldCheck, text: "Intent Verified", color: "text-emerald-400" },
                        { Icon: Activity, text: "Pulse Sync", color: "text-romantic-400" },
                        { Icon: Star, text: "Elite Quest", color: "text-amber-400" }
                    ].map((badge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shrink-0"
                        >
                            <badge.Icon className={`w-3.5 h-3.5 ${badge.color}`} />
                            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-tighter text-gray-400">{badge.text}</span>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {currentScene <= 7 ? (
                    <motion.div
                        key={currentScene}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="glass-card p-5 md:p-12 rounded-[2rem] md:rounded-[3.5rem] text-center space-y-6 md:space-y-10 relative overflow-hidden border-white/10 shadow-2xl"
                    >
                        {/* Progress Tracker */}
                        <div className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-white/5 border-b border-white/5">
                            <span className="text-[10px] font-black tracking-[0.2em] text-romantic-400">QUEST {currentScene + 1}/8</span>
                            <div className="flex items-center gap-1.5">
                                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-black text-white">{compatibility}% SYNC</span>
                            </div>
                        </div>

                        <div className="pt-8 space-y-3">
                            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{scenes[currentScene].title}</h2>
                            <div className="flex flex-col items-center gap-2">
                                <code className="text-[10px] md:text-xs bg-romantic-500/10 text-romantic-300 px-3 py-1 rounded-md border border-romantic-500/20 font-mono">
                                    {scenes[currentScene].equation}
                                </code>
                                <p className="text-base md:text-xl text-gray-400 font-serif italic max-w-xl mx-auto leading-relaxed">
                                    "{scenes[currentScene].text}"
                                </p>
                            </div>
                        </div>

                        {scenes[currentScene].options && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6">
                                {scenes[currentScene].options.map((opt, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ y: -5, backgroundColor: 'rgba(244, 63, 94, 0.15)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleChoice(opt)}
                                        className="group relative flex flex-col items-center justify-center p-5 md:p-8 bg-white/5 border border-white/5 hover:border-romantic-500/30 rounded-2xl md:rounded-3xl transition-all"
                                    >
                                        <span className="text-sm md:text-base font-bold leading-tight text-white mb-2">{opt.text}</span>
                                        <div className="w-6 h-0.5 bg-romantic-500/20 rounded-full group-hover:w-full transition-all duration-300" />
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {scenes[currentScene].isRhythmStep && (
                            <div className="py-4 md:py-8 space-y-6 md:space-y-10">
                                <div className="relative flex justify-center items-center">
                                    <motion.div animate={{ scale: isBeating ? [1, 1.5, 1] : 1 }} className="absolute w-32 h-32 md:w-56 md:h-56 bg-romantic-500/10 rounded-full blur-[60px]" />
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        onClick={handleHeartbeatClick}
                                        animate={{
                                            scale: isBeating ? [1, 1.2, 1] : 1,
                                            filter: isBeating ? 'drop-shadow(0 0 20px #f43f5e)' : 'none'
                                        }}
                                        className={`relative z-10 w-28 h-28 md:w-44 md:h-44 rounded-full flex items-center justify-center transition-all ${isBeating ? 'bg-romantic-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'bg-white/5 border border-white/10'}`}
                                    >
                                        <Heart className={`w-12 h-12 md:w-20 md:h-20 ${isBeating ? 'text-white fill-white' : 'text-gray-700'}`} />
                                    </motion.button>
                                </div>
                                <div className="max-w-xs mx-auto space-y-2.5">
                                    <div className="flex justify-between text-[10px] font-black text-romantic-400">
                                        <div className="flex items-center gap-1.5 uppercase tracking-widest"><Trophy className="w-3.5 h-3.5" /> Stability</div>
                                        <span>{courage}%</span>
                                    </div>
                                    <div className="w-full h-3 md:h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5 md:p-1">
                                        <motion.div className="h-full bg-gradient-to-r from-romantic-600 to-rose-400 rounded-full" animate={{ width: `${courage}%` }} />
                                    </div>
                                    <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Synchronize with the Pulse</p>
                                </div>
                            </div>
                        )}

                        {scenes[currentScene].isFinal && (
                            <motion.div className="space-y-8 pt-4">
                                <div className="grid grid-cols-3 gap-3 md:gap-6">
                                    {[{ l: 'Romance', v: stats.romantic, c: 'text-romantic-400' }, { l: 'Trust', v: stats.trust, c: 'text-indigo-400' }, { l: 'Stability', v: compatibility, c: 'text-amber-400' }].map((s, i) => (
                                        <div key={i} className="bg-white/5 p-3 md:p-5 rounded-2xl md:rounded-[2rem] border border-white/5">
                                            <div className={`${s.c} font-black text-xl md:text-3xl`}>{s.v}</div>
                                            <div className="text-[8px] md:text-[10px] uppercase font-black text-gray-500 mt-1">{s.l}</div>
                                        </div>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(244, 63, 94, 0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleFinalPropose}
                                    className="w-full py-6 md:py-10 bg-gradient-to-r from-romantic-600 via-rose-500 to-romantic-600 bg-[length:200%_auto] rounded-[2rem] md:rounded-[3rem] text-3xl md:text-6xl font-black shadow-2xl flex items-center justify-center gap-4 md:gap-8 group transition-all"
                                >
                                    PROPOSE <Sparkles className="w-8 h-8 md:w-12 md:h-12 group-hover:rotate-12 transition-transform" />
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-10 md:space-y-16 py-8"
                    >
                        <div className="relative inline-block">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-romantic-500 rounded-full blur-[100px] opacity-20" />
                            <div className="text-8xl md:text-[15rem] heartbeat drop-shadow-[0_0_80px_rgba(244,63,94,0.4)] relative z-10">💍</div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-6xl md:text-[10rem] font-black text-gradient glow-red tracking-tight uppercase italic leading-none">Eternal!</h2>
                            <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-2 rounded-full border border-white/10 border-romantic-500/20 whitespace-nowrap">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <span className="text-xl md:text-3xl font-black uppercase text-romantic-400">Sync Score: {compatibility}%</span>
                            </div>
                        </div>

                        <div className="p-8 md:p-14 glass rounded-[2.5rem] md:rounded-[4.5rem] max-w-2xl mx-auto border-romantic-500/20 shadow-2xl relative">
                            <ShieldCheck className="absolute -top-6 -right-6 w-14 h-14 md:w-20 md:h-20 text-emerald-400 drop-shadow-[0_10px_20px_rgba(52,211,153,0.3)]" />
                            <p className="text-lg md:text-2xl text-gray-300 italic leading-relaxed font-serif">
                                "Calculations confirm your resonance as <span className="text-romantic-300 font-bold underline px-1">{choices.join(', ')}</span>.
                                You've navigated the binary Labyrinth of Love and emerged with a Golden Ratio heart."
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 max-w-sm mx-auto w-full pt-6">
                            <button onClick={handleShare} className="w-full py-5 md:py-7 bg-white text-black hover:bg-romantic-50 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-2xl flex items-center justify-center gap-3 transition-all">
                                Export Results <Share2 className="w-6 h-6 md:w-7 md:h-7" />
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/" className="py-4 glass border border-white/5 hover:bg-white/10 rounded-2xl font-black text-[10px] md:text-xs text-gray-400 flex items-center justify-center gap-2 uppercase tracking-widest text-center">
                                    Map
                                </Link>
                                <Link to="/chocolate-day" className="py-4 bg-romantic-500/20 hover:bg-romantic-500/30 rounded-2xl font-black text-[10px] md:text-xs text-romantic-300 flex items-center justify-center gap-2 uppercase tracking-widest text-center">
                                    Next Quest
                                </Link>
                            </div>
                            <button onClick={() => { setCurrentScene(0); setChoices([]); setCourage(0); setStats({ romantic: 0, trust: 0, chaotic: 0 }); }} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.4em] transition-colors mt-4">
                                Reset Simulation
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProposeDay;
