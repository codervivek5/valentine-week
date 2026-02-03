import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Unlock, History, RotateCcw, PenTool } from 'lucide-react';
import confetti from 'canvas-confetti';

const PromiseDay = () => {
    const [step, setStep] = useState(1); // 1: Type, 2: Sign, 3: Success
    const [currentPromise, setCurrentPromise] = useState('');
    const [promises, setPromises] = useState([
        { text: "I promise to always listen to you.", date: "2026-02-11", hash: "V0ID-99" }
    ]);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startSigning = () => setStep(2);

    const handleSeal = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8b5cf6', '#f43f5e']
        });

        const newPromise = {
            text: currentPromise,
            date: new Date().toISOString().split('T')[0],
            hash: Math.random().toString(36).substring(7).toUpperCase()
        };

        setPromises([newPromise, ...promises]);
        setStep(3);
    };

    // Canvas Logic for Signing
    useEffect(() => {
        if (step === 2 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
        }
    }, [step]);

    const startDraw = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const endDraw = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-serif">
            <div className="text-center mb-16 space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                    <ShieldCheck className="w-12 h-12 text-romantic-500 heartbeat" />
                </motion.div>
                <h1 className="text-6xl font-black text-gradient tracking-tight">The Oath Wall</h1>
                <p className="text-gray-400 font-sans max-w-xl mx-auto">Seal your heart's decree with the Enchanted Ink of Truth.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card p-10 rounded-[2.5rem] space-y-8 border-romantic-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]"
                        >
                            <div className="flex items-center gap-3 text-romantic-400">
                                <PenTool className="w-6 h-6" />
                                <span className="font-sans font-black uppercase tracking-widest text-xs">A New Covenant</span>
                            </div>
                            <textarea
                                value={currentPromise}
                                onChange={(e) => setCurrentPromise(e.target.value)}
                                placeholder="What is your eternal promise?..."
                                className="w-full h-52 bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 focus:outline-none focus:ring-4 focus:ring-romantic-500/20 transition-all text-2xl italic leading-relaxed"
                            />
                            <button
                                onClick={startSigning}
                                disabled={!currentPromise}
                                className="w-full py-6 bg-romantic-600 hover:bg-romantic-700 disabled:opacity-30 rounded-2xl font-black font-sans text-xl shadow-xl transition-all"
                            >
                                Proceed to Signature
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, rotate: 2 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -2 }}
                            className="glass-card p-10 rounded-[3rem] space-y-8 bg-neutral-900 shadow-2xl"
                        >
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black font-sans">Seal with Ink</h3>
                                <p className="text-xs text-gray-500 font-sans uppercase tracking-[0.3em]">Signature or Symbol of Devotion</p>
                            </div>

                            <div className="relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden">
                                <canvas
                                    ref={canvasRef}
                                    width={400}
                                    height={200}
                                    onMouseDown={startDraw}
                                    onMouseMove={draw}
                                    onMouseUp={endDraw}
                                    onMouseOut={endDraw}
                                    onTouchStart={startDraw}
                                    onTouchMove={draw}
                                    onTouchEnd={endDraw}
                                    className="w-full h-52 cursor-crosshair touch-none"
                                />
                                <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
                                    <PenTool className="w-12 h-12 text-romantic-500" />
                                </div>
                            </div>

                            <div className="flex gap-4 font-sans">
                                <button onClick={() => setStep(1)} className="flex-1 py-4 glass rounded-2xl font-bold">Refine Text</button>
                                <button onClick={handleSeal} className="flex-1 py-4 bg-romantic-600 rounded-2xl font-black shadow-lg">Finalize Oath</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-12 rounded-[4rem] text-center space-y-8 border-romantic-500"
                        >
                            <div className="flex justify-center">
                                <div className="w-24 h-24 bg-romantic-500 rounded-full flex items-center justify-center shadow-[0_0_40px_#f43f5e] animate-pulse">
                                    <Lock className="w-12 h-12 text-white" />
                                </div>
                            </div>
                            <h3 className="text-4xl font-black">Oath Eternalized</h3>
                            <p className="text-gray-400 leading-relaxed font-sans px-4">
                                "Your promise has been etched into the vault of time. It shall remain, unwavering and true."
                            </p>
                            <button onClick={() => { setStep(1); setCurrentPromise(''); }} className="w-full py-5 glass hover:bg-white/10 rounded-2xl font-black font-sans tracking-wide">
                                Seal Post-Oath Decree
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* History Area */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between font-sans px-2">
                        <h3 className="text-xl font-black tracking-widest text-gray-500 flex items-center gap-3">
                            <History className="w-5 h-5" /> Covenant History
                        </h3>
                        <div className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-romantic-300 font-bold uppercase tracking-tighter">Verified Arcana</div>
                    </div>

                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                        {promises.map((p, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i}
                                className="p-8 glass-card rounded-[2.5rem] border-l-8 border-romantic-500 bg-gradient-to-br from-white/[0.03] to-transparent group"
                            >
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity">
                                    <ShieldCheck className="w-10 h-10 text-romantic-500" />
                                </div>
                                <p className="text-2xl leading-relaxed italic pr-4 mb-6">"{p.text}"</p>
                                <div className="flex items-center justify-between font-sans">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">Temporal Stamp</span>
                                        <span className="text-xs font-bold text-gray-400">{p.date}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">Hash ID</span>
                                        <span className="text-xs font-mono text-romantic-400">{p.hash}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromiseDay;
