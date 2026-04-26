"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:text-[var(--neon-lime)]";
  const active = "text-[var(--neon-blue)]";
  const inactive = "text-zinc-200";

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050508]/95 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#050508]/20 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-bungee)] text-lg tracking-wide text-white sm:text-xl"
        >
          Karaoke<span className="text-[var(--neon-pink)]">.</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`${linkBase} ${pathname === "/" ? active : inactive}`}
          >
            Home
          </Link>
          <Link
            href="/subscription"
            className={`${linkBase} ${pathname === "/subscription" ? active : inactive}`}
          >
            Plans
          </Link>
          <Link
            href="/#create-form"
            className="ml-1 rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[#ff6bcb] px-4 py-2 text-sm font-bold text-[#0a0a0c] shadow-[0_0_18px_rgba(255,20,147,0.55)] transition hover:shadow-[0_0_26px_rgba(0,212,255,0.5)]"
          >
            Start
          </Link>
        </nav>
      </div>
    </header>
  );
}
