'use client';

import { useEffect, useMemo, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    const particles = useMemo(() => {
        const mulberry32 = (seed: number) => {
            return () => {
                let t = (seed += 0x6d2b79f5);
                t = Math.imul(t ^ (t >>> 15), t | 1);
                t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        };

        const rng = mulberry32(424242);
        return Array.from({ length: 20 }, () => ({
            delay: `${rng() * 5}s`,
            x: `${rng() * 100}%`,
            duration: `${15 + rng() * 10}s`,
        }));
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
            heroRef.current.style.setProperty('--mouse-x', `${x}px`);
            heroRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={heroRef} className={styles.hero}>
            {/* Animated Background Elements */}
            <div className={styles.backgroundElements}>
                <div className={styles.gridLines}></div>
                <div className={styles.glowOrb1}></div>
                <div className={styles.glowOrb2}></div>
                <div className={styles.particles}>
                    {particles.map((p, i) => (
                        <div
                            key={i}
                            className={styles.particle}
                            style={{
                                '--delay': p.delay,
                                '--x': p.x,
                                '--duration': p.duration,
                            } as React.CSSProperties}
                        ></div>
                    ))}
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.label}>
                        <span className={styles.labelDot}></span>
                        Global Conglomerate
                    </div>

                    <h1 className={styles.title}>
                        Building
                        <span className={styles.titleAccent}> Beyond</span>
                        <br />
                        <span className={styles.titleGold}>Boundaries</span>
                    </h1>

                    <p className={styles.description}>
                        At Tolani Corp, we don't just build businesses—we build legacies.
                        Rooted in innovation, transparency, and integrity, our commitment
                        extends far beyond mere profitability.
                    </p>

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>4+</span>
                            <span className={styles.statLabel}>Global Regions</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Subsidiaries</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>∞</span>
                            <span className={styles.statLabel}>Innovation</span>
                        </div>
                    </div>

                    <div className={styles.ctas}>
                        <a href="#about" className={styles.ctaPrimary}>
                            Discover Our Vision
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#innovation" className={styles.ctaSecondary}>
                            Explore Innovation
                        </a>
                    </div>
                </div>

                <div className={styles.visual}>
                    <div className={styles.visualInner}>
                        <div className={styles.floatingCard} style={{ '--delay': '0s' } as React.CSSProperties}>
                            <div className={styles.cardIcon}>🏗️</div>
                            <span>TC Construction</span>
                        </div>
                        <div className={styles.floatingCard} style={{ '--delay': '0.5s' } as React.CSSProperties}>
                            <div className={styles.cardIcon}>🔬</div>
                            <span>Tolani Labs</span>
                        </div>
                        <div className={styles.floatingCard} style={{ '--delay': '1s' } as React.CSSProperties}>
                            <div className={styles.cardIcon}>⚡</div>
                            <span>Neo Labs</span>
                        </div>
                        <div className={styles.floatingCard} style={{ '--delay': '1.5s' } as React.CSSProperties}>
                            <div className={styles.cardIcon}>💝</div>
                            <span>Tolani Foundation</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <span>Scroll to Explore</span>
                <div className={styles.scrollArrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
