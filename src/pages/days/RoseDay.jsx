import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Heart, Sparkles, Send, Droplets, Sun, Sprout } from 'lucide-react';
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

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl font-black mb-4 text-gradient glow-red">The Enchanted Rose</h1>
                <p className="text-gray-400">Love requires care. Nurture your seed into a beautiful blossom.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <h3 className="text-3xl font-bold text-center">Select your Essence</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {colors.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => {
                                                setRoseColor(c.hex);
                                                setStep(1);
                                            }}
                                            className="p-6 rounded-3xl glass hover:bg-white/10 transition-all text-left group border border-white/5 hover:border-romantic-500/50"
                                        >
                                            <div
                                                className="w-16 h-16 rounded-full mb-4 shadow-xl group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: c.hex }}
                                            />
                                            <div className="font-bold text-lg">{c.name}</div>
                                            <div className="text-sm text-gray-500">{c.meaning}</div>
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
                                className="text-center space-y-10"
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                    >
                                        <Sprout className="w-40 h-40 mx-auto text-green-500" />
                                    </motion.div>
                                    {neededAction && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-4 right-1/4 bg-romantic-500 px-4 py-2 rounded-full text-xs font-black shadow-lg animate-bounce"
                                        >
                                            NEED {neededAction.toUpperCase()}!
                                        </motion.div>
                                    )}
                                </div>

                                <div className="flex justify-center gap-6">
                                    <button
                                        onClick={() => handleNurture('water')}
                                        className={`p-6 rounded-full glass transition-all ${neededAction === 'water' ? 'bg-blue-500/20 border-blue-500' : 'opacity-40'}`}
                                    >
                                        <Droplets className="w-10 h-10 text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleNurture('light')}
                                        className={`p-6 rounded-full glass transition-all ${neededAction === 'light' ? 'bg-yellow-500/20 border-yellow-500' : 'opacity-40'}`}
                                    >
                                        <Sun className="w-10 h-10 text-yellow-400" />
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
                                    <Flower className="w-16 h-16" style={{ color: roseColor }} />
                                    <h3 className="text-3xl font-bold">A Gift of Love</h3>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Whisper your message to the rose..."
                                    className="w-full h-40 bg-white/5 border border-white/10 rounded-[2rem] p-6 focus:outline-none focus:ring-2 focus:ring-romantic-500 transition-all text-lg"
                                />
                                <button
                                    onClick={handleCreateRose}
                                    disabled={!message}
                                    className="w-full py-6 bg-romantic-600 hover:bg-romantic-700 disabled:opacity-50 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all"
                                >
                                    Send with Heart <Send className="w-6 h-6" />
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8"
                            >
                                <div className="relative inline-block">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                    >
                                        <Flower className="w-48 h-48 mx-auto filter drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]" style={{ color: roseColor }} />
                                    </motion.div>
                                    <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-12 h-12 animate-pulse" />
                                </div>
                                <h3 className="text-4xl font-black">Bloomed & Sent!</h3>
                                <p className="text-gray-400 italic font-serif text-lg">"{message}"</p>
                                <button
                                    onClick={() => {
                                        setStep(0);
                                        setMessage('');
                                        setNurtureStats({ water: 0, light: 0 });
                                    }}
                                    className="w-full py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-bold"
                                >
                                    Nurture Another
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-8">
                    <h3 className="text-3xl font-bold flex items-center gap-3">
                        <Heart className="w-8 h-8 text-romantic-500 heartbeat" />
                        The Eternal Garden
                    </h3>
                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        {roses.length === 0 ? (
                            <div className="p-12 rounded-[2.5rem] border border-dashed border-white/10 text-center text-gray-500 italic">
                                The garden is waiting for your touch.
                            </div>
                        ) : (
                            roses.slice().reverse().map((rose) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={rose.id}
                                    className="p-6 rounded-[2rem] glass-card flex gap-6 items-center group"
                                >
                                    <div
                                        className="w-14 h-14 rounded-full shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: rose.color }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-lg font-medium truncate italic">"{rose.message}"</p>
                                        <p className="text-xs text-romantic-300/60 uppercase tracking-widest mt-1">Planted in the stars</p>
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
