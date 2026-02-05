import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenTool, Heart, Check, Trash2, History, Share2, MousePointer2, ShieldCheck, Lock, Map, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const PromiseDay = () => {
    const [step, setStep] = useState(1); // 1: Write, 2: Sign, 3: Success
    const [currentPromise, setCurrentPromise] = useState('');
    const [promises, setPromises] = useState([]);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startSigning = () => setStep(2);

    const handleSeal = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#ffffff']
        });

        const newPromise = {
            text: currentPromise,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            hash: Math.random().toString(36).substring(7).toUpperCase(),
            id: Date.now()
        };
        setPromises([newPromise, ...promises]);
        setStep(3);
    };

    const handleShare = () => {
        const text = `I just sealed a sacred promise in LoveBound! 📜✨\nPromise: "${currentPromise}"\nSealed with a digital signature!`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Promise Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Promise details copied to clipboard!');
        }
    };

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
        <div className="max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-4xl md:text-6xl font-black mb-2 text-gradient uppercase tracking-tighter italic">The Vow Registry</h1>
                <p className="text-sm md:text-base text-gray-400 font-medium px-4 tracking-widest uppercase text-[10px] font-bold">Promises are the threads that weave two souls together. Make them eternal.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="glass-card p-6 md:p-10 rounded-[2.2rem] md:rounded-[3rem] border-white/5 shadow-2xl min-h-[450px] md:min-h-[500px] flex flex-col justify-center order-1 lg:order-1">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="space-y-6 md:space-y-8"
                            >
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Inscribe your Vow</h3>
                                <div className="relative">
                                    <textarea
                                        value={currentPromise}
                                        onChange={(e) => setCurrentPromise(e.target.value)}
                                        placeholder="I promise to always..."
                                        className="w-full h-40 md:h-52 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] p-6 focus:outline-none focus:ring-2 focus:ring-romantic-500 transition-all text-lg md:text-xl font-medium leading-relaxed"
                                    />
                                    <div className="absolute bottom-4 right-6 text-[10px] font-black uppercase tracking-widest text-gray-600">
                                        Word of Honor
                                    </div>
                                </div>
                                <button
                                    onClick={startSigning}
                                    disabled={!currentPromise}
                                    className="w-full py-5 md:py-6 bg-romantic-600 hover:bg-romantic-700 disabled:opacity-50 rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                >
                                    Proceed to Seal <Check className="w-6 h-6" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6 md:space-y-8"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Sign the Sacred Bond</h3>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1 font-black">Use your touch or mouse to sign</p>
                                </div>
                                <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden cursor-crosshair relative shadow-inner">
                                    <canvas
                                        ref={canvasRef}
                                        width={400}
                                        height={250}
                                        onMouseDown={startDraw}
                                        onMouseMove={draw}
                                        onMouseUp={endDraw}
                                        onMouseOut={endDraw}
                                        onTouchStart={startDraw}
                                        onTouchMove={draw}
                                        onTouchEnd={endDraw}
                                        className="w-full h-[200px] md:h-[250px] touch-none"
                                    />
                                    <div className="absolute bottom-4 right-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 pointer-events-none">
                                        <MousePointer2 className="w-3 h-3" /> Digital Signature Area
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 border border-white/10 hover:bg-white/5 rounded-xl md:rounded-2xl transition-all text-xs md:text-sm font-black uppercase tracking-widest text-gray-400"
                                    >
                                        Refine
                                    </button>
                                    <button
                                        onClick={handleSeal}
                                        className="flex-[2] py-4 bg-romantic-600 hover:bg-romantic-700 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-lg shadow-romantic-500/20"
                                    >
                                        Seal Vow
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 md:space-y-8"
                            >
                                <div className="inline-block p-6 rounded-full bg-romantic-500/10 mb-2 font-black italic">
                                    <PenTool className="w-12 h-12 md:w-16 md:h-16 text-romantic-400" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Vow Eternalized</h3>
                                <p className="text-lg md:text-xl text-gray-300 italic font-medium px-4 leading-relaxed">
                                    "Your words are now part of the cosmic record, sealed with your unique essence."
                                </p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-5 bg-romantic-600 hover:bg-romantic-700 rounded-xl md:rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                                    >
                                        Share Vow <Share2 className="w-5 h-5" />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            to="/"
                                            className="py-4 glass border border-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-gray-500 hover:text-white"
                                        >
                                            <Map className="w-4 h-4" /> World Map
                                        </Link>
                                        <Link
                                            to="/hug-day"
                                            className="py-4 bg-white/10 hover:bg-white/20 rounded-xl md:rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-white"
                                        >
                                            Next Quest <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setStep(1);
                                            setCurrentPromise('');
                                        }}
                                        className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] hover:text-gray-400 transition-colors mt-2"
                                    >
                                        New Promise Ceremony
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-6 md:space-y-8 order-2 lg:order-2">
                    <h3 className="text-2xl md:text-3xl font-black flex items-center gap-3 uppercase tracking-tighter italic">
                        <History className="text-romantic-500" /> The Vow Archives
                    </h3>
                    <div className="space-y-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                        {promises.length === 0 ? (
                            <div className="p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-dashed border-white/10 text-center text-gray-500 italic font-medium">
                                The registry is blank. Begin your legacy.
                            </div>
                        ) : (
                            promises.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-6 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] glass-card border-white/5 relative overflow-hidden group shadow-lg"
                                >
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                                        <Heart className="w-12 h-12 md:w-16 md:h-16 text-romantic-500" />
                                    </div>
                                    <p className="text-lg md:text-xl font-serif italic text-gray-200 leading-relaxed mb-4">"{p.text}"</p>
                                    <div className="flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest text-romantic-300/60 border-t border-white/5 pt-4">
                                        <span>EST. {p.date}</span>
                                        <span>ID: {p.hash}</span>
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

export default PromiseDay;
