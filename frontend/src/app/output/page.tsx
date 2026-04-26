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
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10">
        <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-900">Loading…</h1>
          <p className="mt-2 text-blue-800">Preparing your karaoke output.</p>
        </section>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10">
        <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-900">No karaoke output yet</h1>
          <p className="mt-2 text-blue-800">
            Please upload mp3 and lyrics first from the home page.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Karaoke Output</h1>
            <p className="mt-2 text-blue-800">File: {result.originalFileName}</p>
          </div>
          <Link
            href="/"
            onClick={() => sessionStorage.removeItem("karaokeResult")}
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            New Karaoke
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-blue-900">Audio Player</h2>
        <audio controls className="w-full">
          <source src={result.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-blue-900">Lyrics</h2>
        <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-blue-50 p-4 text-blue-900">
          {result.lyrics}
        </pre>
      </section>
    </main>
  );
}
