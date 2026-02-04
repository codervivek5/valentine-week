import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Heart, Sparkles, Send, Droplets, Sun, Sprout, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const RoseDay = () => {
    const [step, setStep] = useState(0); // 0: Start, 1: Nurture, 2: Message, 3: Success
    const [roseColor, setRoseColor] = useState('#f43f5e');
    const [nurtureStats, setNurtureStats] = useState({ water: 0, light: 0 });
    const [message, setMessage] = useState('');
    const [roses, setRoses] = useState([]);
    const [neededAction, setNeededAction] = useState(null); // 'water' or 'light'

    const colors = [
        { name: 'Red', hex: '#f43f5e', meaning: 'Deep Love' },
        { name: 'Yellow', hex: '#fbbf24', meaning: 'Friendship' },
        { name: 'White', hex: '#ffffff', meaning: 'Purity' },
        { name: 'Pink', hex: '#ec4899', meaning: 'Grace' },
    ];

    useEffect(() => {
        if (step === 1) {
            const interval = setInterval(() => {
                setNeededAction(Math.random() > 0.5 ? 'water' : 'light');
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleNurture = (type) => {
        if (type === neededAction) {
            setNurtureStats(prev => ({ ...prev, [type]: prev[type] + 1 }));
            setNeededAction(null);

            if (nurtureStats.water + nurtureStats.light >= 4) {
                setStep(2);
            }
        }
    };

    const handleCreateRose = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [roseColor]
        });
        setRoses([...roses, { color: roseColor, message, id: Date.now() }]);
        setStep(3);
    };

    const handleShare = () => {
        const text = `I just nurtured a beautiful ${roseColor === '#f43f5e' ? 'Red' : roseColor === '#fbbf24' ? 'Yellow' : roseColor === '#ffffff' ? 'White' : 'Pink'} rose in LoveBound! 🌹✨\nMessage: "${message}"`;
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
                <p className="text-sm md:text-base text-gray-400 font-medium tracking-wide">Love requires care. Nurture your seed into a beautiful blossom.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
                <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col justify-center border-white/5">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6 md:y-8"
                            >
                                <h3 className="text-2xl md:text-3xl font-black text-center uppercase tracking-tighter">Select your Essence</h3>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    {colors.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => {
                                                setRoseColor(c.hex);
                                                setStep(1);
                                            }}
                                            className="p-4 md:p-6 rounded-2xl md:rounded-3xl glass hover:bg-white/10 transition-all text-left group border border-white/5 hover:border-romantic-500/50"
                                        >
                                            <div
                                                className="w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 md:mb-4 shadow-xl group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: c.hex }}
                                            />
                                            <div className="font-bold text-base md:text-lg">{c.name}</div>
                                            <div className="text-xs text-gray-500">{c.meaning}</div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center space-y-8 md:space-y-10"
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                    >
                                        <Sprout className="w-32 h-32 md:w-40 md:h-40 mx-auto text-green-500" />
                                    </motion.div>
                                    {neededAction && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-4 right-1/4 bg-romantic-500 px-3 md:px-4 py-1 md:py-2 rounded-full text-[10px] md:text-xs font-black shadow-lg animate-bounce"
                                        >
                                            NEED {neededAction.toUpperCase()}!
                                        </motion.div>
                                    )}
                                </div>

                                <div className="flex justify-center gap-4 md:gap-6">
                                    <button
                                        onClick={() => handleNurture('water')}
                                        className={`p-4 md:p-6 rounded-full glass transition-all ${neededAction === 'water' ? 'bg-blue-500/20 border-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'opacity-40'}`}
                                    >
                                        <Droplets className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleNurture('light')}
                                        className={`p-4 md:p-6 rounded-full glass transition-all ${neededAction === 'light' ? 'bg-yellow-500/20 border-yellow-500 scale-110 shadow-lg shadow-yellow-500/20' : 'opacity-40'}`}
                                    >
                                        <Sun className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                                    </button>
                                </div>

                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-green-500 to-romantic-500"
                                        animate={{ width: `${((nurtureStats.water + nurtureStats.light) / 5) * 100}%` }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4">
                                    <Flower className="w-12 h-12 md:w-16 md:h-16" style={{ color: roseColor }} />
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">A Gift of Love</h3>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Whisper your message to the rose..."
                                    className="w-full h-32 md:h-40 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-romantic-500 transition-all text-base md:text-lg"
                                />
                                <button
                                    onClick={handleCreateRose}
                                    disabled={!message}
                                    className="w-full py-4 md:py-6 bg-romantic-600 hover:bg-romantic-700 disabled:opacity-50 rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                >
                                    Send with Heart <Send className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 md:space-y-8"
                            >
                                <div className="relative inline-block">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                    >
                                        <Flower className="w-32 h-32 md:w-48 md:h-48 mx-auto filter drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]" style={{ color: roseColor }} />
                                    </motion.div>
                                    <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-10 h-10 md:w-12 md:h-12 animate-pulse" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Bloomed & Sent!</h3>
                                <p className="text-gray-400 italic font-serif text-base md:text-lg px-4 truncate">"{message}"</p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-4 bg-romantic-600 hover:bg-romantic-700 rounded-xl md:rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-romantic-500/20"
                                    >
                                        Share Rose <Share2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStep(0);
                                            setMessage('');
                                            setNurtureStats({ water: 0, light: 0 });
                                        }}
                                        className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl font-bold transition-all border border-white/5"
                                    >
                                        Nurture Another
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
                            <div className="p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-dashed border-white/10 text-center text-gray-500 italic">
                                The garden is waiting for your touch.
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
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: rose.color }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-base md:text-lg font-medium truncate italic text-gray-200">"{rose.message}"</p>
                                        <p className="text-[10px] text-romantic-300/60 uppercase tracking-widest mt-1 font-black">Planted in the stars</p>
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
