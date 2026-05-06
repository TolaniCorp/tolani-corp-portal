"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/strategy", label: "Plans" },
  { href: "/platform-engineering", label: "Atlas" },
  { href: "/teaming-events", label: "Events" },
  { href: "/communications", label: "Network" },
  { href: "/about", label: "About" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/app", label: "App" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="flex md:hidden">
      <button
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="-m-2.5 inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white/85 text-tolani-black shadow-sm backdrop-blur transition-colors hover:border-tolani-gold hover:text-tolani-gold"
      >
        <span className="sr-only">{open ? "Close main menu" : "Open main menu"}</span>
        <span aria-hidden="true" className="relative h-5 w-5">
          <span
            className={`absolute left-0 top-1 block h-0.5 w-5 bg-current transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition-transform ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[60] bg-white px-6 py-7 text-tolani-black shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Home" onClick={close}>
              <span className="text-2xl font-bold">
                TOLANI<span className="text-tolani-gold">CORP</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={close}
              className="-m-2.5 inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-tolani-black transition-colors hover:border-tolani-gold hover:text-tolani-gold"
            >
              <span className="sr-only">Close main menu</span>
              <span aria-hidden="true" className="relative h-5 w-5">
                <span className="absolute left-0 top-2.5 block h-0.5 w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-2.5 block h-0.5 w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="mt-10 grid gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="block rounded-lg border border-slate-200 px-4 py-3 text-base font-semibold text-slate-950 transition-colors hover:border-tolani-gold hover:text-tolani-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Link
              href="/#purchase-channels"
              onClick={close}
              className="inline-flex w-full items-center justify-center rounded-lg bg-tolani-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-tolani-charcoal"
            >
              Purchase Channels <span aria-hidden="true" className="ml-2">&rarr;</span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
