/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                tolani: {
                    gold: "#D4AF37",      // Primary Brand Color
                    goldLight: "#F3E5AB", // Champagne/Light Gold
                    black: "#0F0F0F",     // Rich Black
                    charcoal: "#2B2B2B",  // Graphite
                    white: "#FFFFFF",
                },
            },
            fontFamily: {
                heading: ["var(--font-inter)", "sans-serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
