export function SoundWaveDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden opacity-[0.35]"
      aria-hidden
    >
      <svg
        className="absolute -left-[10%] top-1/4 h-32 w-[120%] text-[var(--neon-blue)] sm:h-40"
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 60 Q150 10 300 60 T600 60 T900 60 T1200 60"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 80 Q200 30 400 80 T800 80 T1200 80"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute -right-[5%] bottom-[15%] h-24 w-[90%] text-[var(--neon-pink)] sm:h-32"
        viewBox="0 0 900 100"
        fill="none"
      >
        <path
          d="M0 50 C120 0 240 100 360 50 S600 0 720 50 S840 100 900 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute left-[20%] top-[8%] h-16 w-16 text-[var(--neon-lime)] sm:h-20 sm:w-20"
        viewBox="0 0 64 64"
        fill="currentColor"
      >
        <path d="M32 4 L38 22 L56 22 L42 32 L48 50 L32 40 L16 50 L22 32 L8 22 L26 22 Z" />
      </svg>
      <svg
        className="absolute bottom-[25%] right-[12%] h-12 w-12 text-[var(--neon-pink)]/80 sm:h-14 sm:w-14"
        viewBox="0 0 48 48"
        fill="currentColor"
      >
        <ellipse cx="24" cy="14" rx="6" ry="4" transform="rotate(-20 24 14)" />
        <path d="M18 18 Q24 28 30 18" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
