import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Palette, Sparkles, Wand2, Info, Share2, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const TeddyDay = () => {
    const [step, setStep] = useState(0); // 0: Start, 1: Color, 2: Binding, 3: Success
    const [color, setColor] = useState('#f472b6');
    const [accessory, setAccessory] = useState('heart');
    const [name, setName] = useState('');
    const [personality, setPersonality] = useState('');
    const [isBinding, setIsBinding] = useState(false);

    const colors = [
        { name: 'Classic Pink', hex: '#f472b6', trait: 'Sweet' },
        { name: 'Lavender', hex: '#a78bfa', trait: 'Dreamy' },
        { name: 'Honey', hex: '#fbbf24', trait: 'Warm' },
        { name: 'Cocoa', hex: '#78350f', trait: 'Comforting' }
    ];

    const accessories = [
        { id: 'heart', icon: '❤️', name: 'Heart of Gold' },
        { id: 'ribbon', icon: '🎀', name: 'Silk Ribbon' },
        { id: 'stars', icon: '✨', name: 'Stardust Belt' },
        { id: 'crown', icon: '👑', name: 'Noble Crown' }
    ];

    const bindSoul = () => {
        setIsBinding(true);
        // Determine personality
        const selectedColor = colors.find(c => c.hex === color);
        const personalities = [selectedColor.trait, 'Loyal', 'Playful', 'Brave', 'Kind'];
        const randomTrait = personalities[Math.floor(Math.random() * personalities.length)];

        setTimeout(() => {
            setPersonality(randomTrait);
            setStep(3);
            setIsBinding(false);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: [color, '#ffffff']
            });
        }, 2500);
    };

    const handleShare = () => {
        const text = `I just created ${name}, a ${personality} teddy in LoveBound! 🧸✨\nColor: ${colors.find(c => c.hex === color).name}\nAccessory: ${accessories.find(a => a.id === accessory).name}`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Teddy Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Teddy details copied to clipboard!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-8 md:mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-black mb-2 text-gradient glow-red uppercase tracking-tighter italic">The Teddy Workshop</h1>
                <p className="text-sm md:text-base text-gray-400 font-medium">Create a companion for life. Bind its soul with love.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-square max-w-[320px] md:max-w-none mx-auto w-full order-1 lg:order-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${color}-${accessory}-${step}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative"
                        >
                            <div className="text-[12rem] md:text-[18rem] select-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ color }}>
                                🧸
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl mt-4 md:mt-6">
                                {accessories.find(a => a.id === accessory)?.icon}
                            </div>

                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full text-black font-black text-xs shadow-2xl flex items-center gap-2 whitespace-nowrap border-2 border-romantic-500"
                                >
                                    <Heart className="w-3 h-3 text-romantic-500 fill-romantic-500" /> {name}
                                </motion.div>
                            )}

                            {isBinding && (
                                <motion.div
                                    className="absolute inset-0 rounded-full border-4 border-dashed border-romantic-500/40"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="order-2 lg:order-2">
                    <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-white/5 shadow-2xl min-h-[450px] md:min-h-[500px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <motion.div
                                    key="color"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                                        <Palette className="text-romantic-400" /> Pick an Essence
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {colors.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => { setColor(c.hex); setStep(1); }}
                                                className="p-4 md:p-5 rounded-2xl md:rounded-3xl glass hover:bg-white/10 transition-all text-left group border-white/5 hover:border-romantic-500/50"
                                            >
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full mb-3 shadow-xl" style={{ backgroundColor: c.hex }} />
                                                <div className="font-bold text-xs md:text-sm uppercase tracking-tight">{c.name}</div>
                                                <div className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-widest">{c.trait}</div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div
                                    key="acc"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                                        <Wand2 className="text-romantic-400" /> Add a Totem
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {accessories.map(acc => (
                                            <button
                                                key={acc.id}
                                                onClick={() => { setAccessory(acc.id); setStep(2); }}
                                                className="p-4 md:p-6 rounded-2xl md:rounded-3xl glass hover:bg-white/10 transition-all text-center group border-white/5 hover:border-romantic-500/50"
                                            >
                                                <div className="text-3xl md:text-4xl mb-2">{acc.icon}</div>
                                                <div className="font-bold text-[10px] md:text-xs uppercase tracking-widest">{acc.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep(0)} className="w-full py-2 text-[10px] text-gray-500 font-bold uppercase hover:text-white transition-colors tracking-widest">← Back to Color</button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="bind"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Naming Ceremony</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter Teddy's Name..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-xl md:text-2xl font-black focus:outline-none focus:ring-2 focus:ring-romantic-500 text-center uppercase tracking-tighter transition-all"
                                        />
                                        <button
                                            disabled={!name || isBinding}
                                            onClick={bindSoul}
                                            className="w-full py-5 md:py-6 bg-romantic-600 hover:bg-romantic-700 disabled:opacity-50 rounded-2xl md:rounded-3xl font-black text-xl md:text-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                        >
                                            {isBinding ? 'Binding Soul...' : 'Bind the Soul'} <Sparkles />
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-6 glass rounded-2xl md:rounded-3xl border-romantic-500/20">
                                        <p className="text-[9px] md:text-xs text-center text-gray-500 leading-relaxed font-bold uppercase tracking-[0.2em]">
                                            The ritual will manifest a unique personality trait from the chosen essence.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6 md:space-y-10"
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-4xl md:text-6xl font-black text-gradient uppercase tracking-tighter italic">{name}</h3>
                                        <div className="text-romantic-300 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">The {personality} Companion</div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={handleShare}
                                            className="w-full py-4 md:py-5 bg-romantic-600 hover:bg-romantic-700 rounded-xl md:rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                        >
                                            Share Teddy <Share2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => { setStep(0); setName(''); }}
                                            className="w-full py-3 md:py-4 glass border border-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-gray-400"
                                        >
                                            <RefreshCcw className="w-4 h-4" /> Create Another
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeddyDay;
