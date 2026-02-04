import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, RefreshCcw, Sparkles, Activity, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ProposeDay = () => {
    const [currentScene, setCurrentScene] = useState(0);
    const [choices, setChoices] = useState([]);
    const [courage, setCourage] = useState(0);
    const [isBeating, setIsBeating] = useState(false);

    const scenes = [
        {
            id: 0,
            title: "The Atmosphere",
            text: "The evening is perfect. The air smells of rain and jasmine. How do you set the mood?",
            options: [
                { text: "Play a song that's 'ours'", next: 1, trait: "musical" },
                { text: "Find a quiet, secluded spot", next: 2, trait: "intimate" }
            ]
        },
        {
            id: 1,
            title: "The Melody",
            text: "The music floats between you. They look at you, eyes shimmering. What's your next move?",
            options: [
                { text: "Recall your first meeting", next: 3, trait: "nostalgic" },
                { text: "Dance in the moonlight", next: 3, trait: "romantic" }
            ]
        },
        {
            id: 2,
            title: "The Silence",
            text: "It's so quiet you can hear each other breathe. Small talk feels unnecessary. Do you...",
            options: [
                { text: "Hold their hands firmly", next: 3, trait: "steady" },
                { text: "Leaning in for a forehead kiss", next: 3, trait: "tender" }
            ]
        },
        {
            id: 3,
            title: "The Gathering Courage",
            text: "Your heart is racing. To ask the big question, you need to find your rhythm.",
            isRhythmStep: true
        },
        {
            id: 4,
            title: "The Eternal Question",
            text: "Everything has led to this moment. Will you be mine forever?",
            isFinal: true
        }
    ];

    const handleChoice = (option) => {
        setChoices([...choices, option.trait]);
        setCurrentScene(option.next);
    };

    const handleHeartbeatClick = () => {
        if (isBeating) {
            setCourage(prev => Math.min(prev + 10, 100));
            if (courage + 10 >= 100) {
                setTimeout(() => setCurrentScene(4), 500);
            }
        } else {
            setCourage(prev => Math.max(prev - 5, 0));
        }
    };

    useEffect(() => {
        if (currentScene === 3) {
            const interval = setInterval(() => {
                setIsBeating(prev => !prev);
            }, 800);
            return () => clearInterval(interval);
        }
    }, [currentScene]);

    const handleFinalPropose = () => {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#ffffff', '#fb7185', '#be123c']
        });
        setCurrentScene(5);
    };

    const handleShare = () => {
        const text = `I just proposed in LoveBound! 💍✨ My journey was ${choices.join(', ')}. Forever begins!`;
        if (navigator.share) {
            navigator.share({
                title: 'LoveBound - Propose Day',
                text: text,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('Proposal details copied to clipboard!');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-6 md:py-12 px-2 md:px-4 min-h-[70vh] flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {currentScene <= 4 ? (
                    <motion.div
                        key={currentScene}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center space-y-8 md:space-y-10 relative overflow-hidden border-white/5 shadow-2xl"
                    >
                        {/* Progress indicator */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-romantic-400 to-romantic-600 shadow-[0_0_10px_#f43f5e]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(currentScene / 4) * 100}%` }}
                            />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{scenes[currentScene].title}</h2>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-serif italic px-2">
                            "{scenes[currentScene].text}"
                        </p>

                        {scenes[currentScene].options && (
                            <div className="flex flex-col gap-4 mt-6 md:mt-10">
                                {scenes[currentScene].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(opt)}
                                        className="group relative flex items-center justify-between p-6 md:p-8 bg-white/5 hover:bg-romantic-600/10 border border-white/5 hover:border-romantic-500/50 rounded-2xl md:rounded-3xl transition-all shadow-lg"
                                    >
                                        <span className="text-lg md:text-xl font-bold">{opt.text}</span>
                                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-romantic-500 transform group-hover:translate-x-2 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {scenes[currentScene].isRhythmStep && (
                            <div className="py-6 md:py-10 space-y-8 md:space-y-12">
                                <div className="relative flex justify-center items-center">
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        onClick={handleHeartbeatClick}
                                        animate={{
                                            scale: isBeating ? [1, 1.2, 1] : 1,
                                            filter: isBeating ? 'drop-shadow(0 0 20px #f43f5e)' : 'none'
                                        }}
                                        className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-colors shadow-2xl ${isBeating ? 'bg-romantic-500' : 'bg-white/10'}`}
                                    >
                                        <Heart className={`w-16 h-16 md:w-20 md:h-20 ${isBeating ? 'text-white fill-white' : 'text-gray-600'}`} />
                                    </motion.button>
                                    <div className="absolute -bottom-8">
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-500">Tap to the Rhythm</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-romantic-400">
                                        <div className="flex items-center gap-2"><Activity className="w-4 h-4" /> Courage Meter</div>
                                        <span>{courage}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                                        <motion.div
                                            className="h-full bg-romantic-500 rounded-full"
                                            animate={{ width: `${courage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {scenes[currentScene].isFinal && (
                            <motion.button
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                onClick={handleFinalPropose}
                                className="w-full py-6 md:py-8 bg-romantic-600 hover:bg-romantic-700 rounded-2xl md:rounded-3xl text-2xl md:text-3xl font-black shadow-2xl shadow-romantic-500/50 flex items-center justify-center gap-4 group transition-all"
                            >
                                PROPOSE <Sparkles className="group-hover:rotate-12 transition-transform" />
                            </motion.button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 md:space-y-10 px-4"
                    >
                        <div className="text-8xl md:text-[12rem] heartbeat drop-shadow-[0_0_50px_rgba(244,63,94,0.3)]">💍</div>
                        <h2 className="text-5xl md:text-7xl font-black text-gradient glow-red tracking-tight uppercase italic">Forever Begins!</h2>
                        <div className="p-6 md:p-8 glass rounded-[2rem] md:rounded-[3rem] max-w-lg mx-auto border-romantic-500/30 shadow-2xl">
                            <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed">
                                "Your path was <span className="text-romantic-300 font-bold underline px-1">{choices.join(', ')}</span>.
                                With a courageous heart, you've started a journey that will never end."
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
                            <button
                                onClick={handleShare}
                                className="w-full py-5 bg-romantic-600 hover:bg-romantic-700 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-romantic-500/20"
                            >
                                Share Moment <Share2 className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => { setCurrentScene(0); setChoices([]); setCourage(0); }}
                                className="w-full flex items-center justify-center gap-3 py-5 glass rounded-2xl font-black text-lg hover:bg-white/10 transition-all border-white/10"
                            >
                                <RefreshCcw className="w-5 h-5" /> Re-experience
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProposeDay;
