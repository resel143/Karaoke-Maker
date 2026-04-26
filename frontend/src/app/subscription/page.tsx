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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-900">Subscription Plans</h1>
        <p className="mt-2 text-blue-800">
          Choose the plan that fits your karaoke workflow.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-900">{tier.name}</h2>
            <p className="mt-2 text-xl font-bold text-blue-700">{tier.price}</p>
            <ul className="mt-3 space-y-2 text-blue-900">
              {tier.features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Choose {tier.name}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
