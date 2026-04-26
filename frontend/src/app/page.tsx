"use client";

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
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <section className="rounded-2xl border border-blue-200 bg-white/90 p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-blue-900">Karaoke Maker</h1>
          <Link
            href="/subscription"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            View Subscriptions
          </Link>
        </div>
        <p className="mt-2 text-blue-800">
          Upload your `.mp3` and lyrics. Basic player output is ready (AI sync will be added later).
        </p>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-blue-900">
            Upload MP3
            <input
              type="file"
              accept=".mp3,audio/mpeg"
              onChange={(event) => setAudioFile(event.target.files?.[0] || null)}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-white hover:file:bg-blue-700"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-blue-900">
            Lyrics
            <textarea
              value={lyrics}
              onChange={(event) => setLyrics(event.target.value)}
              placeholder="Paste lyrics here..."
              rows={10}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 outline-none ring-blue-300 placeholder:text-blue-400 focus:ring-2"
            />
          </label>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isLoading ? "Creating..." : "Create Karaoke Output"}
          </button>
        </form>
      </section>
    </main>
  );
}
