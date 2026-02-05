import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flower, Heart, Sparkles, Send, Droplets, Sun, Sprout, Share2, Wind, Zap, Star, ShieldCheck, Map, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const RoseDay = () => {
    const [step, setStep] = useState(0); // 0: Soil, 1: Selection, 2: Roots, 3: Care, 4: Message, 5: Success
    const [roseColor, setRoseColor] = useState('#f43f5e');
    const [dustPoints, setDustPoints] = useState([]);
    const [rootProgress, setRootProgress] = useState(0);
    const [careStats, setCareStats] = useState({ water: 0, light: 0 });
    const [message, setMessage] = useState('');
    const [personalization, setPersonalization] = useState({ glow: false, sparkles: false, aura: false });
    const [roses, setRoses] = useState([]);
    const [dustInitialized, setDustInitialized] = useState(false);

    const colors = [
        { name: 'Red', hex: '#f43f5e', meaning: 'Eternal Passion', trait: 'Devotion' },
        { name: 'Yellow', hex: '#fbbf24', meaning: 'Joyous Unity', trait: 'Laughter' },
        { name: 'White', hex: '#ffffff', meaning: 'Pure Intent', trait: 'Peace' },
        { name: 'Pink', hex: '#ec4899', meaning: 'Gentle Grace', trait: 'Kindness' },
        { name: 'Violet', hex: '#a855f7', meaning: 'Mystic Allure', trait: 'Fantasy' },
        { name: 'Blue', hex: '#3b82f6', meaning: 'Infinite Depth', trait: 'Calm' },
    ];

    // Phase 0: Soil Setup
    useEffect(() => {
        if (step === 0 && !dustInitialized) {
            const points = Array.from({ length: 12 }, (_, i) => ({
                id: i,
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                scale: Math.random() * 0.5 + 0.5
            }));
            setDustPoints(points);
            setDustInitialized(true);
        }
    }, [step, dustInitialized]);

    const clearDust = (id) => {
        setDustPoints(prev => {
            const next = prev.filter(p => p.id !== id);
            if (next.length === 0) {
                setTimeout(() => setStep(1), 500);
            }
            return next;
        });
    };

    const handleNurture = (type) => {
        setCareStats(prev => {
            const newVal = Math.min(prev[type] + 20, 100);
            if (prev.water + prev.light >= 160) {
                setTimeout(() => setStep(4), 500);
            }
            return { ...prev, [type]: newVal };
        });
    };

    const handleCreateRose = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [roseColor, '#ffffff', '#fbbf24']
        });
        setRoses(prev => [...prev, { color: roseColor, message, id: Date.now(), personalization }]);
        setStep(5);
    };

    const handleShare = () => {
        const colorName = colors.find(c => c.hex === roseColor)?.name || 'Red';
        const text = `I nurtured a ${colorName} Rose of ${colors.find(c => c.hex === roseColor)?.trait} in LoveBound! 🌹✨\nMessage: "${message}"`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Rose Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Rose details copied to clipboard!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 md:mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-black mb-2 text-gradient glow-red">The Enchanted Rose</h1>
                <p className="text-sm md:text-base text-gray-400 font-medium tracking-wide">A journey of multi-stage devotion. Nurture your soul's blossom.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
                <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden min-h-[500px] flex flex-col justify-center border-white/5">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center space-y-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">The Sacred Soil</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">Clear the spectral dust to reveal the fertile ground of devotion.</p>
                                </div>
                                <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-neutral-900/50 rounded-full border border-white/5 overflow-hidden group">
                                    {dustPoints.map(p => (
                                        <motion.button
                                            key={p.id}
                                            whileHover={{ scale: 1.2 }}
                                            onClick={() => clearDust(p.id)}
                                            className="absolute w-8 h-8 flex items-center justify-center cursor-pointer text-romantic-500/30 hover:text-romantic-500 transition-colors"
                                            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `scale(${p.scale})` }}
                                        >
                                            <Wind className="w-full h-full animate-pulse" />
                                        </motion.button>
                                    ))}
                                    {dustPoints.length === 0 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center">
                                            <ShieldCheck className="w-16 h-16 text-green-500 animate-bounce" />
                                        </motion.div>
                                    )}
                                </div>
                                <div className="text-[10px] font-black text-romantic-400 uppercase tracking-widest animate-pulse">
                                    {dustPoints.length} Residual Dust Particles Remaining
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Choose Your Essence</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Select the core vibration of your affection.</p>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                    {colors.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => {
                                                setRoseColor(c.hex);
                                                setStep(2);
                                            }}
                                            className="p-4 rounded-2xl glass hover:bg-white/10 transition-all text-left group border border-white/5 hover:border-romantic-500/50 relative overflow-hidden"
                                        >
                                            <div
                                                className="w-10 h-10 rounded-full mb-3 shadow-xl group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: c.hex }}
                                            />
                                            <div className="font-black text-sm uppercase tracking-tighter">{c.name}</div>
                                            <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">{c.meaning}</div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="text-center space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Deep Roots</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Tap rhythmically to anchor your love into eternity.</p>
                                </div>
                                <div className="relative h-64 flex flex-col items-center">
                                    <div className="absolute inset-0 bg-neutral-900/30 rounded-[3rem] border border-white/5" />

                                    {/* Sprout atop the soil */}
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="relative z-20 mt-12"
                                    >
                                        <Sprout className="w-16 h-16 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
                                    </motion.div>

                                    {/* Roots growing downwards */}
                                    <div className="flex-1 w-full flex flex-col items-center pt-2">
                                        <motion.div
                                            className="w-1.5 bg-gradient-to-b from-green-500 options-to-green-900 rounded-full"
                                            animate={{ height: `${rootProgress * 0.6}%` }}
                                            transition={{ type: 'spring', damping: 20 }}
                                        />
                                        <div className="flex gap-4 -mt-1 opacity-40">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: rootProgress > 50 ? 20 : 0 }}
                                                    className="w-1 bg-green-800 rounded-full"
                                                    style={{ rotate: `${(i - 1) * 30}deg`, transformOrigin: 'top' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const newProg = rootProgress + 20;
                                        setRootProgress(newProg);
                                        if (newProg >= 100) setTimeout(() => setStep(3), 500);
                                    }}
                                    className="w-full py-6 glass border border-romantic-500/20 rounded-2xl font-black text-xl hover:bg-white/5 active:scale-95 transition-all uppercase tracking-widest text-romantic-300 shadow-xl shadow-romantic-500/5"
                                >
                                    Establish Foundation
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Celestial Care</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Balance the elements of growth.</p>
                                </div>

                                <div className="relative aspect-square max-w-[200px] mx-auto flex items-center justify-center">
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, scale: { repeat: Infinity, duration: 4 } }}
                                        className="absolute inset-0 border-2 border-dashed border-romantic-500/20 rounded-full"
                                    />
                                    <Flower className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]" style={{ color: roseColor }} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => handleNurture('water')}
                                            className="w-full p-4 glass rounded-2xl flex flex-col items-center gap-2 hover:bg-white/5 transition-all group"
                                        >
                                            <Droplets className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Hydrate</span>
                                        </button>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div className="h-full bg-blue-500" animate={{ width: `${careStats.water}%` }} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => handleNurture('light')}
                                            className="w-full p-4 glass rounded-2xl flex flex-col items-center gap-2 hover:bg-white/5 transition-all group"
                                        >
                                            <Sun className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Radiate</span>
                                        </button>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div className="h-full bg-yellow-500" animate={{ width: `${careStats.light}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">The Whisper</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">Your message will breathe life into the final form.</p>
                                </div>
                                <div className="relative group">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your eternal whisper here..."
                                        className="w-full h-40 bg-neutral-900 shadow-inner border border-white/5 rounded-[2rem] p-8 focus:outline-none focus:ring-4 focus:ring-romantic-500/10 transition-all text-lg italic leading-relaxed"
                                    />
                                    <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <Wind className="w-12 h-12 text-blue-300" />
                                    </div>
                                </div>
                                <button
                                    onClick={handleCreateRose}
                                    disabled={!message}
                                    className="w-full py-6 bg-gradient-to-r from-romantic-600 to-purple-600 hover:brightness-110 disabled:opacity-50 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(244,63,94,0.3)] active:scale-95"
                                >
                                    Initiate Bloom <Zap className="w-6 h-6 fill-white" />
                                </button>
                            </motion.div>
                        )}

                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8"
                            >
                                <div className="relative inline-block">
                                    <motion.div
                                        animate={{
                                            rotate: [0, 5, -5, 0],
                                            scale: personalization.glow ? [1, 1.15, 1] : [1, 1.05, 1],
                                            filter: personalization.glow ? "drop-shadow(0 0 30px rgba(244,63,94,0.8))" : "drop-shadow(0 0 20px rgba(244,63,94,0.3))"
                                        }}
                                        transition={{ repeat: Infinity, duration: personalization.glow ? 2 : 5 }}
                                    >
                                        <Flower className="w-40 h-40 md:w-56 md:h-56 mx-auto transition-all" style={{ color: roseColor }} />
                                    </motion.div>
                                    {personalization.sparkles && (
                                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                            <Sparkles className="absolute -top-6 -right-6 text-yellow-400 w-12 h-12" />
                                            <Star className="absolute top-1/2 -left-8 text-blue-400 w-6 h-6" />
                                        </motion.div>
                                    )}
                                    {personalization.aura && (
                                        <motion.div
                                            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute inset-0 rounded-full border-4 border-romantic-500/30 -z-10"
                                        />
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Celestial Blossom</h3>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {[
                                            { id: 'glow', icon: <Zap size={14} />, label: 'Infuse Glow' },
                                            { id: 'sparkles', icon: <Star size={14} />, label: 'Add Sparkles' },
                                            { id: 'aura', icon: <ShieldCheck size={14} />, label: 'Project Aura' }
                                        ].map(pref => (
                                            <button
                                                key={pref.id}
                                                onClick={() => setPersonalization(p => ({ ...p, [pref.id]: !p[pref.id] }))}
                                                className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${personalization[pref.id] ? 'bg-romantic-500/20 border-romantic-500 text-romantic-400' : 'bg-white/5 border-white/5 text-gray-500'}`}
                                            >
                                                <span className="flex items-center gap-2">{pref.icon} {pref.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-400 italic font-serif text-lg px-6 leading-relaxed">"{message}"</p>

                                <div className="flex flex-col gap-3 pt-4">
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-5 bg-romantic-600 hover:bg-romantic-700 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                    >
                                        Share Gift <Share2 className="w-5 h-5" />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            to="/"
                                            className="py-4 glass border border-white/5 hover:bg-white/10 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-gray-500"
                                        >
                                            <Map className="w-4 h-4" /> World Map
                                        </Link>
                                        <Link
                                            to="/propose-day"
                                            className="py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-white"
                                        >
                                            Next Quest <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setStep(0);
                                            setMessage('');
                                            setCareStats({ water: 0, light: 0 });
                                            setRootProgress(0);
                                            setPersonalization({ glow: false, sparkles: false, aura: false });
                                            setDustInitialized(false);
                                        }}
                                        className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] hover:text-gray-400 transition-colors mt-2"
                                    >
                                        Restart Journey
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-6 md:space-y-8">
                    <h3 className="text-2xl md:text-3xl font-black flex items-center gap-3 uppercase tracking-tighter">
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-romantic-500 heartbeat" />
                        The Eternal Garden
                    </h3>
                    <div className="space-y-4 md:space-y-6 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                        {roses.length === 0 ? (
                            <div className="p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-dashed border-white/10 text-center text-gray-500 italic text-sm">
                                The garden is waiting for your touch. Plant your first seed above.
                            </div>
                        ) : (
                            roses.slice().reverse().map((rose) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={rose.id}
                                    className="p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] glass-card flex gap-4 md:gap-6 items-center group border-white/5"
                                >
                                    <div
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform flex items-center justify-center"
                                        style={{ backgroundColor: rose.color }}
                                    >
                                        <Flower className="w-6 h-6 text-white/50" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-base md:text-lg font-medium truncate italic text-gray-200">"{rose.message}"</p>
                                        <p className="text-[10px] text-romantic-300/60 uppercase tracking-widest mt-1 font-black">
                                            {rose.personalization.aura && '✦ AURA '}
                                            {rose.personalization.glow && '✦ GLOW '}
                                            {rose.personalization.sparkles && '✦ SPARKLES '}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoseDay;
