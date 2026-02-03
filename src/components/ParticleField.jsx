import React, { useEffect, useRef } from 'react';

const ParticleField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 40;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 20 + 5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * -0.5 - 0.1; // Upward float
                this.opacity = Math.random() * 0.5 + 0.1;
                this.type = Math.random() > 0.5 ? 'heart' : 'star';
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#f43f5e';

                if (this.type === 'heart') {
                    ctx.beginPath();
                    const topCurveHeight = this.size * 0.3;
                    ctx.moveTo(this.x, this.y + topCurveHeight);
                    // Left side
                    ctx.bezierCurveTo(
                        this.x, this.y,
                        this.x - this.size / 2, this.y,
                        this.x - this.size / 2, this.y + topCurveHeight
                    );
                    ctx.bezierCurveTo(
                        this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
                        this.x, this.y + (this.size + topCurveHeight) / 2,
                        this.x, this.y + this.size
                    );
                    // Right side
                    ctx.bezierCurveTo(
                        this.x, this.y + (this.size + topCurveHeight) / 2,
                        this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
                        this.x + this.size / 2, this.y + topCurveHeight
                    );
                    ctx.bezierCurveTo(
                        this.x + this.size / 2, this.y,
                        this.x, this.y,
                        this.x, this.y + topCurveHeight
                    );
                    ctx.fill();
                } else {
                    ctx.fillStyle = '#fde68a';
                    ctx.beginPath();
                    for (let i = 0; i < 5; i++) {
                        ctx.lineTo(
                            this.x + this.size * Math.cos((18 + i * 72) / 180 * Math.PI),
                            this.y + this.size * Math.sin((18 + i * 72) / 180 * Math.PI)
                        );
                        ctx.lineTo(
                            this.x + this.size / 2 * Math.cos((54 + i * 72) / 180 * Math.PI),
                            this.y + this.size / 2 * Math.sin((54 + i * 72) / 180 * Math.PI)
                        );
                    }
                    ctx.closePath();
                    ctx.fill();
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.001;

                if (this.y < -this.size || this.opacity <= 0) {
                    this.reset();
                    this.y = canvas.height + this.size;
                }
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};

export default ParticleField;
