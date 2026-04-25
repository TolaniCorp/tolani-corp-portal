import Link from 'next/link'
import { ReactNode } from 'react'

function Header() {
    return (
        <header className="absolute left-0 right-0 top-0 z-50 pt-14">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" aria-label="Home">
                        <span className="text-2xl font-bold text-tolani-black">
                            TOLANI<span className="text-tolani-gold">CORP</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex md:gap-x-12">
                        <Link href="/strategy" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            Plans
                        </Link>
                        <Link href="/platform-engineering" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            Atlas
                        </Link>
                        <Link href="/teaming-events" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            Events
                        </Link>
                        <Link href="/communications" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            Network
                        </Link>
                        <Link href="/about" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            About
                        </Link>
                        <Link href="/ecosystem" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            Ecosystem
                        </Link>
                        <Link href="/app" className="text-sm font-semibold leading-6 text-tolani-black hover:text-tolani-gold">
                            App
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-tolani-black">
                            <span className="sr-only">Open main menu</span>
                            {/* Icon */}
                        </button>
                    </div>
                    <div className="hidden lg:flex">
                        <Link href="/#purchase-channels" className="rounded-full bg-tolani-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-tolani-charcoal">
                            Purchase Channels <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="mt-24 sm:mt-32 rounded-t-3xl bg-tolani-black py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <span className="text-2xl font-bold text-white">
                            TOLANI<span className="text-tolani-gold">CORP</span>
                        </span>
                        <p className="mt-4 text-sm leading-6 text-gray-300">
                            Building Beyond Boundaries. <br />
                            We build businesses, legacies, and the future.
                        </p>
                    </div>
                    {/* Section 1 */}
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Ecosystem</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li><a href="https://tccg.work" className="text-sm leading-6 text-gray-300 hover:text-white">TCCG</a></li>
                            <li><a href="https://tolanilabs.io" className="text-sm leading-6 text-gray-300 hover:text-white">Tolani Labs</a></li>
                            <li><Link href="/ecosystem" className="text-sm leading-6 text-gray-300 hover:text-white">View All</Link></li>
                        </ul>
                    </div>
                    {/* Section 2 */}
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Strategy</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li><Link href="/strategy" className="text-sm leading-6 text-gray-300 hover:text-white">Portfolio Strategy</Link></li>
                            <li><Link href="/platform-engineering" className="text-sm leading-6 text-gray-300 hover:text-white">Platform Atlas</Link></li>
                            <li><Link href="/teaming-events" className="text-sm leading-6 text-gray-300 hover:text-white">Teaming Events</Link></li>
                        </ul>
                    </div>
                    {/* Section 3 */}
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Network</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li><Link href="/communications" className="text-sm leading-6 text-gray-300 hover:text-white">Communications</Link></li>
                            <li><Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">About</Link></li>
                            <li><Link href="/ecosystem" className="text-sm leading-6 text-gray-300 hover:text-white">Ecosystem</Link></li>
                            <li><Link href="/employee-portal" className="text-sm leading-6 text-gray-300 hover:text-white">Employee Portal</Link></li>
                            <li><Link href="/app" className="text-sm leading-6 text-gray-300 hover:text-white">Operations App</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li><Link href="/privacy" className="text-sm leading-6 text-gray-300 hover:text-white">Privacy</Link></li>
                            <li><Link href="/terms" className="text-sm leading-6 text-gray-300 hover:text-white">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">&copy; 2026 Tolani Corp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export function Shell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-full bg-white font-sans text-tolani-black antialiased">
            <Header />
            <main className="isolate">
                {children}
            </main>
            <Footer />
        </div>
    )
}
