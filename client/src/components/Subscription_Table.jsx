import React, { useState } from "react";
import { Check, X, Sparkles, Star, Crown, AlertTriangle, Shield } from "lucide-react";

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

export default function PricingTable({ onSelect, onPremiumClick, user, onCancelSubscription }) {
  const [period, setPeriod] = useState("monthly"); // 'monthly' | 'yearly'

  return (
    <section className="px-4 sm:px-10 xl:px-24 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>{user?.isPremium ? "Your current plan" : "Simple pricing, no surprises"}</span>
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-slate-800">
          {user?.isPremium ? "Manage your subscription" : "Choose your plan"}
        </h2>
        <p className="mt-3 text-slate-600">
          {user?.isPremium ? "You can downgrade anytime." : "Start for free and upgrade anytime. Cancel whenever you like."}
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

      {/* Premium User Section */}
      {user?.isPremium && (
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="border border-slate-200 rounded-xl">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-slate-900">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <span className="text-lg font-semibold">Current plan</span>
                  </div>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Premium</h3>
                  <p className="mt-1 text-slate-600">Unlimited access to all features</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-slate-900">$12</div>
                  <div className="text-slate-500">/mo</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: "All tools unlocked" },
                  { label: "Priority support" },
                  { label: "Commercial usage" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-md border border-slate-200">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-slate-500">Billed monthly. Cancel anytime.</div>
                <button
                  onClick={() => {
                    console.log('[PricingTable] Manage clicked');
                    onCancelSubscription?.();
                  }}
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 border border-slate-300 text-slate-800 hover:bg-slate-50 transition"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className={`grid grid-cols-1 ${user?.isPremium ? 'hidden' : 'md:grid-cols-2 max-w-5xl'} gap-6 mt-12`}>
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
                    onClick={() => {
                      console.log('[PricingTable] CTA clicked', { plan: plan.id, period });
                      if (plan.id === "premium") {
                        onPremiumClick?.();
                      } else {
                        onSelect?.(plan.id, period);
                      }
                    }}
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
