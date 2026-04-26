import Link from "next/link";

const TIERS = [
  {
    name: "Starter",
    price: "$9/mo",
    features: ["10 songs / month", "Basic lyric styling", "Standard support"],
  },
  {
    name: "Creator",
    price: "$19/mo",
    features: ["40 songs / month", "Priority processing", "HD exports"],
  },
  {
    name: "Studio",
    price: "$39/mo",
    features: ["120 songs / month", "Team workspace", "Advanced templates"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited songs", "SLA + dedicated support", "Custom integrations"],
  },
];

export default function SubscriptionPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <section className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 p-6 shadow-[0_0_40px_rgba(255,20,147,0.06)] backdrop-blur-md sm:p-8">
        <h1 className="font-[family-name:var(--font-bungee)] text-3xl text-white sm:text-4xl">
          Subscription Plans
        </h1>
        <p className="mt-2 text-zinc-400">
          Choose the plan that fits your karaoke workflow.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full border border-[var(--neon-lime)]/60 bg-black/30 px-4 py-2 text-sm font-bold text-[var(--neon-lime)] shadow-[0_0_16px_rgba(196,255,0,0.25)] hover:bg-[var(--neon-lime)]/10"
        >
          Back to Home
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(0,212,255,0.06)] backdrop-blur-md transition hover:border-[var(--neon-blue)]/40"
          >
            <h2 className="text-2xl font-bold text-white">{tier.name}</h2>
            <p className="mt-2 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)] bg-clip-text text-2xl font-extrabold text-transparent">
              {tier.price}
            </p>
            <ul className="mt-3 space-y-2 text-zinc-300">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-[var(--neon-lime)]">♪</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-5 w-full rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[#ff6bcb] py-2.5 text-sm font-bold text-[#0a0a0c] shadow-[0_0_20px_rgba(255,20,147,0.65)] transition hover:shadow-[0_0_26px_rgba(0,212,255,0.45)]"
            >
              Choose {tier.name}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
