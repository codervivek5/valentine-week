import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Tag, Save, RefreshCw, Stars, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const TeddyDay = () => {
    const [color, setColor] = useState('#fbbf24');
    const [accessory, setAccessory] = useState('none');
    const [name, setName] = useState('');
    const [step, setStep] = useState(1); // 1: Design, 2: Soul Binding, 3: Final
    const [isBinding, setIsBinding] = useState(false);
    const [personality, setPersonality] = useState(null);

    const colors = [
        { name: 'Honey', hex: '#fbbf24', trait: 'Sweet' },
        { name: 'Chocolate', hex: '#78350f', trait: 'Cozy' },
        { name: 'Cloud', hex: '#e5e7eb', trait: 'Dreamy' },
        { name: 'Berry', hex: '#f43f5e', trait: 'Passionate' },
        { name: 'Lavender', hex: '#a78bfa', trait: 'Gentle' },
    ];

    const accessories = [
        { id: 'none', label: 'Raw Essence', icon: '🐾' },
        { id: 'bow', label: 'Royal Bow', icon: '🎀' },
        { id: 'heart', label: 'Boundless Love', icon: '❤️' },
        { id: 'glasses', label: 'Urban Legend', icon: '🕶️' },
        { id: 'crown', label: 'Eternal Sovereign', icon: '👑' },
    ];

    const startBinding = () => {
        setStep(2);
    };

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
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 },
                colors: [color, '#ffffff']
            });
        }, 2500);
    };

    const reset = () => {
        setColor('#fbbf24');
        setAccessory('none');
        setName('');
        setStep(1);
        setIsBinding(false);
        setPersonality(null);
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-6xl font-black mb-4 text-gradient">The Soul Binder</h1>
                <p className="text-gray-400">Crafting a companion is design; giving it a soul is magic.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Preview Area */}
                <div className="relative">
                    <div className="glass-card p-16 rounded-[4rem] relative flex items-center justify-center min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {step < 3 ? (
                                <motion.div
                                    key="preview"
                                    animate={{
                                        y: [0, -15, 0],
                                        scale: isBinding ? [1, 1.1, 1] : 1,
                                        filter: isBinding ? 'brightness(1.5) blur(1px)' : 'none'
                                    }}
                                    transition={{
                                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                                        scale: { repeat: Infinity, duration: 0.5 }
                                    }}
                                    className="relative"
                                >
                                    <svg width="280" height="280" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="60" cy="60" r="30" fill={color} />
                                        <circle cx="180" cy="60" r="30" fill={color} />
                                        <circle cx="120" cy="150" r="80" fill={color} />
                                        <circle cx="120" cy="100" r="60" fill={color} />
                                        <circle cx="120" cy="120" r="20" fill="white" fillOpacity="0.2" />
                                        <circle cx="100" cy="90" r="6" fill="#1f2937" />
                                        <circle cx="140" cy="90" r="6" fill="#1f2937" />
                                        <circle cx="120" cy="110" r="8" fill="#1f2937" />
                                    </svg>

                                    {accessory !== 'none' && (
                                        <motion.div
                                            key={accessory}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl drop-shadow-2xl"
                                        >
                                            {accessories.find(a => a.id === accessory)?.icon}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8"
                                >
                                    <div className="relative inline-block">
                                        <svg width="200" height="200" viewBox="0 0 240 240" fill="none">
                                            <circle cx="60" cy="60" r="30" fill={color} />
                                            <circle cx="180" cy="60" r="30" fill={color} />
                                            <circle cx="120" cy="150" r="80" fill={color} />
                                            <circle cx="120" cy="100" r="60" fill={color} />
                                        </svg>
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                                        >
                                            <Heart className="w-16 h-16 fill-white" />
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h3 className="text-5xl font-black text-white glow-red mb-2">{name}</h3>
                                        <div className="inline-block px-4 py-1 bg-romantic-500/20 rounded-full border border-romantic-500/30 text-romantic-300 font-bold uppercase tracking-widest text-xs">
                                            The {personality} Companion
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Visual Effects for Binding */}
                        {isBinding && (
                            <div className="absolute inset-0 z-10 pointer-events-none">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.5, 1],
                                            opacity: [0, 0.5, 0]
                                        }}
                                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                                        className="absolute inset-0 border-2 border-romantic-500/20 rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Interaction Area */}
                <div className="space-y-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="design"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="glass-card p-10 rounded-3xl space-y-10">
                                    <section>
                                        <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
                                            <Palette className="w-4 h-4" /> 01. Coat Material
                                        </div>
                                        <div className="flex flex-wrap gap-5">
                                            {colors.map((c) => (
                                                <button
                                                    key={c.name}
                                                    onClick={() => setColor(c.hex)}
                                                    className={`w-14 h-14 rounded-full transition-all relative border-4 ${color === c.hex ? 'border-white scale-110' : 'border-transparent'}`}
                                                    style={{ backgroundColor: c.hex }}
                                                >
                                                    {color === c.hex && <motion.div layoutId="colorSel" className="absolute -inset-2 border-2 border-white/20 rounded-full" />}
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
                                            <Tag className="w-4 h-4" /> 02. Sacred Accessory
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {accessories.map((acc) => (
                                                <button
                                                    key={acc.id}
                                                    onClick={() => setAccessory(acc.id)}
                                                    className={`p-5 rounded-2xl border transition-all flex items-center gap-4 ${accessory === acc.id ? 'bg-romantic-600 border-romantic-500 shadow-lg' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                                >
                                                    <span className="text-2xl">{acc.icon}</span>
                                                    <span className="font-bold text-sm tracking-tight">{acc.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4">03. Bestow a Name</div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter a name to be etched in time..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-romantic-500 text-lg"
                                        />
                                    </section>

                                    <button
                                        onClick={startBinding}
                                        disabled={!name}
                                        className="w-full py-6 bg-romantic-600 hover:bg-romantic-700 disabled:opacity-50 rounded-2xl font-black text-2xl flex items-center justify-center gap-4 shadow-xl transition-all"
                                    >
                                        Continue to Ritual <Stars />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="ritual"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-12 rounded-[3.5rem] text-center space-y-10 border-romantic-500/50 shadow-[0_0_100px_rgba(244,63,94,0.1)]"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black">Soul Binding</h3>
                                    <p className="text-gray-400">Concentrate your love and initiate the link.</p>
                                </div>

                                <div className="relative py-12">
                                    <motion.button
                                        disabled={isBinding}
                                        onClick={bindSoul}
                                        className="relative z-10 w-32 h-32 bg-gradient-to-br from-romantic-400 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.5)] group"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: 360
                                            }}
                                            transition={{ repeat: Infinity, duration: 5 }}
                                        >
                                            <Stars className="w-16 h-16 text-white fill-white" />
                                        </motion.div>
                                    </motion.button>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-romantic-300">Synchronizing Soul Waves</div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-romantic-500"
                                            animate={{ width: isBinding ? '100%' : '0%' }}
                                            transition={{ duration: 2.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="p-10 glass-card rounded-[3rem] border-green-500/20 bg-green-500/[0.02]">
                                    <h4 className="text-2xl font-bold text-green-400 mb-4">Adoption Complete</h4>
                                    <p className="text-gray-400 leading-relaxed italic">
                                        "In the tapestry of time, {name} now shines as a beacon of your affection. This {personality.toLowerCase()} soul will carry your message forever."
                                    </p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="w-full py-5 glass hover:bg-white/10 rounded-2xl font-black flex items-center justify-center gap-3 transition-all"
                                >
                                    <RefreshCw className="w-5 h-5" /> Bestow Another Soul
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TeddyDay;
