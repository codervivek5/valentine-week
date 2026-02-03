import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Sparkles, Send, MapPin, Calendar, Music, History } from 'lucide-react';
import confetti from 'canvas-confetti';

const ValentineDay = () => {
    const [formData, setFormData] = useState({
        to: '',
        from: '',
        reason: '',
        memory: ''
    });
    const [step, setStep] = useState(1); // 1: Form, 2: Recap, 3: Finale
    const [isSealing, setIsSealing] = useState(false);

    const handleStartRecap = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleFinalReveal = () => {
        setIsSealing(true);
        setTimeout(() => {
            setStep(3);
            setIsSealing(false);

            // Final Symphony of Confetti
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-16 space-y-4">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="inline-block"
                >
                    <Stars className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_#eab308]" />
                </motion.div>
                <h1 className="text-7xl font-black text-gradient tracking-tighter">The Final Symphony</h1>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">The culmination of a week-long journey into the heart.</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="glass-card p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl"
                    >
                        <form onSubmit={handleStartRecap} className="space-y-10 relative z-10">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Your Beloved</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.to}
                                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                        placeholder="Partner's Name"
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:ring-4 focus:ring-romantic-500/10 focus:outline-none placeholder:text-gray-800 text-lg transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Author of Love</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.from}
                                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                        placeholder="Your Name"
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:ring-4 focus:ring-romantic-500/10 focus:outline-none placeholder:text-gray-800 text-lg transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">A Core Reason</label>
                                <textarea
                                    required
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    placeholder="Because you are the melody to my silence..."
                                    className="w-full h-40 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 focus:ring-4 focus:ring-romantic-500/10 focus:outline-none text-xl italic leading-relaxed"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-8 bg-gradient-to-br from-romantic-500 via-purple-600 to-romantic-800 hover:brightness-110 rounded-[2rem] font-black text-2xl shadow-[0_25px_50px_-12px_rgba(244,63,94,0.5)] transition-all flex items-center justify-center gap-4 active:scale-95"
                            >
                                COMPILE JOURNEY <Send className="w-6 h-6" />
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="recap"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-12 rounded-[4rem] space-y-12 bg-neutral-900 border-white/5 shadow-2xl"
                    >
                        <div className="text-center space-y-2">
                            <History className="w-10 h-10 text-romantic-500 mx-auto mb-4" />
                            <h3 className="text-3xl font-black">Reflecting on the Week</h3>
                            <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Synchronizing Your Experiences</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { day: "Day 01", event: "The Enchanted Rose Bloomed", status: "VERIFIED" },
                                { day: "Day 02", event: "The Rhythm of Courage Mastered", status: "STABLE" },
                                { day: "Day 04", event: "Soul Binding Ritual Finalized", status: "SOUL-LINKED" }
                            ].map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.3 }}
                                    key={i}
                                    className="flex items-center justify-between p-6 glass rounded-2xl border-white/5"
                                >
                                    <div className="flex gap-4 items-center">
                                        <span className="text-[10px] font-black text-gray-700">{item.day}</span>
                                        <span className="text-sm font-bold text-gray-300">{item.event}</span>
                                    </div>
                                    <span className="text-[8px] font-black text-romantic-300 border border-romantic-500/20 px-2 py-1 rounded bg-romantic-500/5">{item.status}</span>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            disabled={isSealing}
                            onClick={handleFinalReveal}
                            className="w-full py-8 bg-white text-black hover:bg-romantic-100 rounded-[2rem] font-black text-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all relative overflow-hidden"
                        >
                            <span className="relative z-10">{isSealing ? 'SYNTHESIZING...' : 'THE GRAND REVEAL'}</span>
                            {isSealing && <motion.div layoutId="load" className="absolute left-0 top-0 bottom-0 bg-romantic-400 opacity-20" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} />}
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="finale"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="relative"
                    >
                        {/* The Masterpiece Letter */}
                        <div className="glass-card p-16 md:p-24 rounded-[5rem] bg-gradient-to-b from-neutral-900 to-black border-romantic-500/40 shadow-[0_0_120px_rgba(244,63,94,0.3)] relative group">
                            <div className="absolute top-12 left-12 flex items-center gap-3 text-gray-700 font-black tracking-widest text-[9px]">
                                <Calendar className="w-4 h-4" /> 2026 02 14 // FINAL SYMPHONY
                            </div>

                            <div className="space-y-16 relative z-10 font-serif text-white">
                                <motion.h2 initial={{ y: 20 }} animate={{ y: 0 }} className="text-5xl italic text-romantic-200">Dearest {formData.to},</motion.h2>

                                <div className="space-y-10 text-3xl leading-[1.6] text-gray-100 font-light pr-10">
                                    <p>
                                        Throughout this week of shared moments and digital echoes,
                                        one truth has remained constant: {formData.reason}.
                                    </p>
                                    <p>
                                        Every bloom, every rhythm, and every heartbeat of mine has been
                                        a tribute to the harmony we build together.
                                    </p>
                                    <p>
                                        Thank you for being my adventure.
                                    </p>
                                </div>

                                <div className="pt-20">
                                    <p className="text-xl text-gray-500 italic mb-4">With unconditional devotion,</p>
                                    <p className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-romantic-200 to-gray-500 tracking-tighter">{formData.from}</p>
                                </div>
                            </div>

                            {/* Elegant Wax Seal Icon */}
                            <div className="absolute bottom-20 right-20">
                                <motion.div
                                    initial={{ scale: 4, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, type: 'spring', damping: 10 }}
                                    className="w-32 h-32 rounded-full bg-romantic-900 border-8 border-romantic-950 shadow-2xl flex items-center justify-center -rotate-12"
                                >
                                    <Heart className="w-16 h-16 text-romantic-400 fill-romantic-500" />
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-center gap-6">
                            <button
                                onClick={() => window.print()}
                                className="px-12 py-5 glass rounded-[2rem] font-black text-lg hover:bg-white/5 transition-all flex items-center gap-3"
                            >
                                <Music className="w-5 h-5 text-romantic-400" /> ARCHIVE AS PDF
                            </button>
                            <button
                                onClick={() => setStep(1)}
                                className="px-12 py-5 bg-white/5 border border-white/10 rounded-[2rem] font-bold text-gray-500 hover:text-white transition-all"
                            >
                                RE-WRITE THE ORE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValentineDay;
