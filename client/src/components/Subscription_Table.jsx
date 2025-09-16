import React, { useState } from "react";
import { Check, X, Sparkles, Star } from "lucide-react";

/**
 * Highly-modern 2-plan pricing table (Free & Premium)
 * - TailwindCSS styles
 * - Monthly / Yearly toggle with savings hint
 * - Accessible, responsive, and self-contained
 * - Accepts `onSelect` callback to handle CTA clicks
 */

const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Everything to get started",
    price: { monthly: 0, yearly: 0 },
    cta: "Start free",
    popular: false,
    features: [
      { label: "Title Generation", included: true },
      { label: "Article Generation", included: true },
      { label: "Generate Images", included: false },
      { label: "Remove Background", included: false },
      { label: "Remove Object", included: false },
      { label: "Resume Review", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For power creators",
    price: { monthly: 12, yearly: 96 }, // $12/mo or $96/yr (=$8/mo)
    cta: "Go Premium",
    popular: true,
    features: [
      { label: "Title Generation", included: true },
      { label: "Article Generation", included: true },
      { label: "Generate Images", included: true },
      { label: "Remove Background", included: true },
      { label: "Remove Object", included: true },
      { label: "Resume Review", included: true },
    ],
  },
];

function Price({ amount, period }) {
  if (amount === 0) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold">Free</span>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <span className="text-5xl font-extrabold">${amount}</span>
      <span className="text-slate-500 mb-1">/{period === "monthly" ? "mo" : "yr"}</span>
    </div>
  );
}

export default function PricingTable({ onSelect }) {
  const [period, setPeriod] = useState("monthly"); // 'monthly' | 'yearly'

  return (
    <section className="px-4 sm:px-10 xl:px-24 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Simple pricing, no surprises</span>
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-slate-800">
          Choose your plan
        </h2>
        <p className="mt-3 text-slate-600">
          Start for free and upgrade anytime. Cancel whenever you like.
        </p>

        {/* Billing toggle */}
        <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100">
          {[
            { id: "monthly", label: "Monthly" },
            { id: "yearly", label: "Yearly" },
          ].map((opt) => {
            const active = period === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setPeriod(opt.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-600 hover:text-slate-800"
                }`}
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {period === "yearly" && (
          <div className="mt-2 text-emerald-600 text-sm font-medium">
            Save up to 33% when billed yearly
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan) => {
          const amount = plan.price[period];
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl ${
                isPopular
                  ? "bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-[1.5px]"
                  : "border border-slate-200"
              }`}
            >
              {/* Inner card */}
              <div className={`rounded-2xl h-full ${isPopular ? "bg-white" : "bg-white"}`}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-sm">
                      <Star className="w-3.5 h-3.5" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                      <p className="mt-1 text-slate-600">{plan.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Price amount={amount} period={period} />
                    {plan.id === "premium" && period === "yearly" && (
                      <div className="mt-1 text-slate-500 text-sm">
                        Effective <span className="font-medium text-slate-700">$8/mo</span> billed annually
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelect?.(plan.id, period)}
                    className={`${
                      isPopular
                        ? "mt-6 w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-3 font-medium shadow-sm hover:bg-indigo-700 transition"
                        : "mt-6 w-full inline-flex items-center justify-center rounded-xl border border-slate-300 text-slate-800 px-4 py-3 font-medium hover:bg-slate-50 transition"
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {f.included ? (
                          <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <span className={`text-sm ${f.included ? "text-slate-700" : "text-slate-500"}`}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      
    </section>
  );
}
