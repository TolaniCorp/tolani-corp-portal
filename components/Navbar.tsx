'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Global', href: '#global' },
        { name: 'Innovation', href: '#innovation' },
        { name: 'Community', href: '#community' },
        { name: 'Ecosystem', href: '/ecosystem' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <a href="#" className={styles.logo}>
                    <Image
                        src="/assets/foundation/tolani-logo.svg"
                        alt="Tolani Corp"
                        width={50}
                        height={46}
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                    <span className={styles.logoText}>Tolani Corp</span>
                </a>

                <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className={styles.cta}>
                        Partner With Us
                    </a>
                </div>

                <button
                    className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
