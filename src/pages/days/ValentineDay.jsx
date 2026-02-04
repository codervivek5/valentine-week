import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Sparkles, Send, MapPin, Calendar, Music, History, Share2, Download, RefreshCcw } from 'lucide-react';
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

    const handleShare = () => {
        const text = `I just composed a Final Symphony for ${formData.to} in LoveBound! 🎻✨\n"Throughout this week, one truth has remained constant: ${formData.reason}"\nForever begins today!`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Valentine Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Symphony details copied to clipboard!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4">
            <div className="text-center mb-8 md:mb-16 space-y-4">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="inline-block"
                >
                    <Stars className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-[0_0_15px_#eab308]" />
                </motion.div>
                <h1 className="text-4xl md:text-7xl font-black text-gradient uppercase tracking-tighter italic">The Final Symphony</h1>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs px-4">The culmination of a week-long journey into the heart's architecture.</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="glass-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden group shadow-2xl border-white/5"
                    >
                        <form onSubmit={handleStartRecap} className="space-y-8 md:space-y-10 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Your Beloved</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.to}
                                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                        placeholder="Partner's Name"
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:ring-4 focus:ring-romantic-500/10 focus:outline-none placeholder:text-gray-700 text-base md:text-lg transition-all"
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
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:ring-4 focus:ring-romantic-500/10 focus:outline-none placeholder:text-gray-700 text-base md:text-lg transition-all"
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
                                    className="w-full h-40 bg-white/[0.03] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 focus:ring-4 focus:ring-romantic-500/10 focus:outline-none text-lg md:text-xl italic leading-relaxed"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-6 md:py-8 bg-gradient-to-br from-romantic-500 via-purple-600 to-romantic-800 hover:brightness-110 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-2xl shadow-[0_25px_50px_-12px_rgba(244,63,94,0.5)] transition-all flex items-center justify-center gap-4 active:scale-95"
                            >
                                COMPILE JOURNEY <Send className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="recap"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="glass-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] space-y-8 md:space-y-12 bg-neutral-950 border-white/5 shadow-2xl"
                    >
                        <div className="text-center space-y-2">
                            <History className="w-8 h-8 md:w-10 md:h-10 text-romantic-500 mx-auto mb-4" />
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Reflecting on the Week</h3>
                            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">Synthesizing Your Experiences</p>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            {[
                                { day: "Day 01", event: "Enchanted Rose Bloomed", status: "VERIFIED" },
                                { day: "Day 02", event: "Rhythm of Courage Stable", status: "STABLE" },
                                { day: "Day 04", event: "Soul Binding Finalized", status: "SOUL-LINKED" },
                                { day: "Day 07", event: "Thermal Harmony Preserved", status: "HEATED" }
                            ].map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    key={i}
                                    className="flex items-center justify-between p-4 md:p-6 glass rounded-xl md:rounded-2xl border-white/5"
                                >
                                    <div className="flex gap-3 md:gap-4 items-center">
                                        <span className="text-[8px] md:text-[10px] font-black text-gray-700">{item.day}</span>
                                        <span className="text-xs md:text-sm font-bold text-gray-300">{item.event}</span>
                                    </div>
                                    <span className="text-[7px] md:text-[8px] font-black text-romantic-300 border border-romantic-500/20 px-2 py-1 rounded bg-romantic-500/5 uppercase">{item.status}</span>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            disabled={isSealing}
                            onClick={handleFinalReveal}
                            className="w-full py-6 md:py-8 bg-white text-black hover:bg-romantic-100 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all relative overflow-hidden"
                        >
                            <span className="relative z-10 uppercase tracking-widest">{isSealing ? 'SYNTHESIZING...' : 'GRAND REVEAL'}</span>
                            {isSealing && <motion.div layoutId="load" className="absolute left-0 top-0 bottom-0 bg-romantic-400 opacity-20" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} />}
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="finale"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        {/* The Masterpiece Letter */}
                        <div className="glass-card p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] bg-gradient-to-b from-neutral-900 to-black border-romantic-500/40 shadow-[0_0_120px_rgba(244,63,94,0.3)] relative group overflow-hidden">
                            <div className="absolute top-6 md:top-12 left-6 md:left-12 flex items-center gap-2 md:gap-3 text-gray-700 font-black tracking-widest text-[8px] md:text-[9px] uppercase">
                                <Calendar className="w-3 h-3 md:w-4 md:h-4" /> 2026 02 14 // FINAL SYMPHONY
                            </div>

                            <div className="space-y-8 md:space-y-16 relative z-10 font-serif text-white">
                                <motion.h2 initial={{ y: 20 }} animate={{ y: 0 }} className="text-4xl md:text-6xl italic text-romantic-200">Dearest {formData.to},</motion.h2>

                                <div className="space-y-6 md:space-y-10 text-xl md:text-4xl leading-[1.5] md:leading-[1.6] text-gray-100 font-light pr-4 md:pr-10">
                                    <p>
                                        Throughout this week of shared moments and digital echoes,
                                        one truth has remained constant: <span className="text-romantic-300 font-medium whitespace-pre-wrap">{formData.reason}</span>.
                                    </p>
                                    <p>
                                        Every bloom, every rhythm, and every heartbeat of mine has been
                                        a tribute to the harmony we build together day after day.
                                    </p>
                                    <p className="font-bold italic">
                                        Thank you for being my adventure.
                                    </p>
                                </div>

                                <div className="pt-10 md:pt-20">
                                    <p className="text-base md:text-xl text-gray-500 italic mb-2 md:mb-4">With unconditional devotion,</p>
                                    <p className="text-4xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-romantic-200 to-gray-500 tracking-tighter uppercase italic">{formData.from}</p>
                                </div>
                            </div>

                            {/* Elegant Wax Seal Icon */}
                            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
                                <motion.div
                                    initial={{ scale: 4, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, type: 'spring', damping: 10 }}
                                    className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-romantic-900 border-[6px] md:border-8 border-romantic-950 shadow-2xl flex items-center justify-center -rotate-12"
                                >
                                    <Heart className="w-12 h-12 md:w-20 md:h-20 text-romantic-400 fill-romantic-500" />
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-16 flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4">
                            <button
                                onClick={handleShare}
                                className="flex-1 py-4 md:py-6 bg-romantic-600 hover:bg-romantic-700 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                            >
                                <Share2 className="w-6 h-6" /> Share Symphony
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="flex-1 py-4 md:py-6 glass border border-white/5 hover:bg-white/10 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-gray-400"
                            >
                                <Download className="w-5 h-5" /> Archive PDF
                            </button>
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-4 md:py-6 glass border border-white/5 hover:bg-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all group"
                                title="Restart Journey"
                            >
                                <RefreshCcw className="w-6 h-6 text-gray-600 group-hover:text-romantic-400 transition-colors" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValentineDay;
