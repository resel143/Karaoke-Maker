"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SoundWaveDecor } from "./SoundWaveDecor";

const SLIDES = [
  {
    src: "/hero/slide-1.png",
    alt: "Singer performing karaoke under neon lights",
    title: "Turn Any Track Into a Party",
    subtitle: "Drop your MP3, add lyrics, and feel the room light up.",
  },
  {
    src: "/hero/slide-2.png",
    alt: "Friends singing karaoke together",
    title: "Sing Loud. Sing Together.",
    subtitle: "Neon nights, big hooks, and zero boring moments.",
  },
  {
    src: "/hero/slide-3.png",
    alt: "Karaoke night on stage",
    title: "Your Spotlight Starts Here",
    subtitle: "Studio-grade vibes — built for creators who love the stage.",
  },
];

const SLIDE_MS = 6500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="relative h-[min(88vh,760px)] min-h-[380px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,212,255,0.12)]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        <SoundWaveDecor />

        <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--neon-lime)]">
                Karaoke Maker
              </p>
              <h2 className="font-[family-name:var(--font-bungee)] text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-3 text-base text-zinc-200 sm:text-lg">{slide.subtitle}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="relative inline-flex items-center gap-2 rounded-full border border-[var(--neon-pink)]/40 bg-black/35 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--neon-blue)] shadow-[0_0_16px_rgba(255,20,147,0.35)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-pink)] opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon-pink)]" />
                  </span>
                  Live Now
                </span>

                <motion.a
                  href="#create-form"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--neon-pink)] via-[#ff4ecd] to-[var(--neon-blue)] px-7 py-3 text-base font-bold text-[#0a0a0c] shadow-[0_0_22px_rgba(255,20,147,0.85)] ring-2 ring-white/20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Singing
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2 sm:mt-0 sm:flex-col sm:justify-end sm:pb-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all sm:h-10 sm:w-2.5 ${
                  i === index
                    ? "w-8 bg-[var(--neon-lime)] shadow-[0_0_12px_rgba(196,255,0,0.7)] sm:h-10 sm:w-2.5"
                    : "w-2.5 bg-white/35 hover:bg-white/60 sm:w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
