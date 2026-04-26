"use client";

import { HeroSlider } from "@/components/HeroSlider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type KaraokeResult = {
  audioUrl: string;
  lyrics: string;
  originalFileName: string;
};

export default function Home() {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!audioFile) {
      setError("Please upload an MP3 file.");
      return;
    }

    if (!lyrics.trim()) {
      setError("Please paste your lyrics.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("lyrics", lyrics);

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/karaoke/create`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create karaoke project.");
      }

      sessionStorage.setItem("karaokeResult", JSON.stringify(data as KaraokeResult));
      router.push("/output");
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="pb-8 pt-6 sm:pb-12 sm:pt-8">
        <HeroSlider />
      </section>

      <main
        id="create-form"
        className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-16 sm:px-6"
      >
        <section className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/80 p-6 shadow-[0_0_40px_rgba(0,212,255,0.08)] backdrop-blur-md sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-bungee)] text-2xl text-white sm:text-3xl">
                Create your track
              </h1>
              <p className="mt-2 text-zinc-400">
                Upload an `.mp3` and paste lyrics — preview plays on the output page. AI
                sync comes next.
              </p>
            </div>
            <Link
              href="/subscription"
              className="rounded-full border border-[var(--neon-blue)]/50 bg-black/30 px-4 py-2 text-sm font-bold text-[var(--neon-blue)] shadow-[0_0_18px_rgba(0,212,255,0.35)] transition hover:border-[var(--neon-lime)] hover:text-[var(--neon-lime)] hover:shadow-[0_0_20px_rgba(196,255,0,0.35)]"
            >
              View Plans
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-200">
              Upload MP3
              <input
                type="file"
                accept=".mp3,audio/mpeg"
                onChange={(event) => setAudioFile(event.target.files?.[0] || null)}
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-zinc-100 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-[var(--neon-pink)] file:to-[var(--neon-blue)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#0a0a0c]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-200">
              Lyrics
              <textarea
                value={lyrics}
                onChange={(event) => setLyrics(event.target.value)}
                placeholder="Paste lyrics here..."
                rows={10}
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-zinc-100 outline-none ring-[var(--neon-blue)]/40 placeholder:text-zinc-500 focus:ring-2"
              />
            </label>

            {error ? (
              <p className="text-sm font-semibold text-[var(--neon-pink)]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[#7c3aed] px-5 py-3 font-bold text-[#0a0a0c] shadow-[0_0_24px_rgba(0,212,255,0.55)] transition hover:shadow-[0_0_28px_rgba(255,20,147,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Creating…" : "Create Karaoke Output"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
