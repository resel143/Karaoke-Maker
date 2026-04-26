"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type KaraokeResult = {
  audioUrl: string;
  lyrics: string;
  originalFileName: string;
};

function readKaraokeFromSession(): KaraokeResult | null {
  const raw = sessionStorage.getItem("karaokeResult");
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as KaraokeResult;
  } catch {
    return null;
  }
}

export default function OutputPage() {
  const [result, setResult] = useState<KaraokeResult | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setResult(readKaraokeFromSession());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!hydrated) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 p-6 backdrop-blur-md">
          <h1 className="font-[family-name:var(--font-bungee)] text-2xl text-white">
            Loading…
          </h1>
          <p className="mt-2 text-zinc-400">Preparing your karaoke output.</p>
        </section>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 p-6 backdrop-blur-md">
          <h1 className="font-[family-name:var(--font-bungee)] text-2xl text-white">
            No karaoke output yet
          </h1>
          <p className="mt-2 text-zinc-400">
            Please upload mp3 and lyrics first from the home page.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[#7c3aed] px-5 py-2.5 font-bold text-[#0a0a0c] shadow-[0_0_20px_rgba(0,212,255,0.5)]"
          >
            Go to Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
      <section className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-bungee)] text-3xl text-white">
              Karaoke Output
            </h1>
            <p className="mt-2 text-zinc-400">File: {result.originalFileName}</p>
          </div>
          <Link
            href="/"
            onClick={() => sessionStorage.removeItem("karaokeResult")}
            className="shrink-0 rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[#ff6bcb] px-4 py-2.5 text-sm font-bold text-[#0a0a0c] shadow-[0_0_20px_rgba(255,20,147,0.75)]"
          >
            New Karaoke
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h2 className="mb-3 text-xl font-bold text-[var(--neon-blue)]">Audio Player</h2>
        <audio controls className="w-full rounded-lg opacity-95">
          <source src={result.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/80 p-6 backdrop-blur-md">
        <h2 className="mb-3 text-xl font-bold text-[var(--neon-lime)]">Lyrics</h2>
        <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 text-zinc-200">
          {result.lyrics}
        </pre>
      </section>
    </main>
  );
}
