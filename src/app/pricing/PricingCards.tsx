'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import BillingToggle from './BillingToggle';
import CheckoutButton from './CheckoutButton';

// Monthly pricing
const monthlyPrices = {
  starter: { eur: '€49', usd: '$54' },
  professional: { eur: '€149', usd: '$164' },
  enterprise: { eur: '€499', usd: '$549' },
};

// Annual pricing (20% discount = ~2 months free)
const annualPrices = {
  starter: { eur: '€39', usd: '$43', yearlyTotal: '€470' },
  professional: { eur: '€119', usd: '$131', yearlyTotal: '€1,430' },
  enterprise: { eur: '€399', usd: '$439', yearlyTotal: '€4,790' },
};

const plans = [
  {
    name: 'Free',
    key: 'free',
    description: 'Perfect for a quick compliance check',
    features: [
      { text: 'Single page scan', included: true },
      { text: 'Basic accessibility report', included: true },
      { text: 'WCAG 2.1 AA issues detected', included: true },
      { text: 'Email delivery', included: true },
      { text: 'Full site scan', included: false },
      { text: 'Weekly monitoring', included: false },
      { text: 'AI-powered fixes', included: false },
      { text: 'Compliance certificate', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free Scan',
    popular: false,
    highlight: false,
    isPaid: false,
  },
  {
    name: 'Starter',
    key: 'starter',
    description: 'For small businesses getting compliant',
    features: [
      { text: 'Full site scan', included: true },
      { text: 'Up to 100 pages', included: true },
      { text: 'Weekly monitoring', included: true },
      { text: 'Detailed issue reports', included: true },
      { text: 'Platform-specific fixes', included: true },
      { text: 'Email + Slack alerts', included: true },
      { text: 'AI-powered fixes', included: false },
      { text: 'Compliance certificate', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start 14-Day Trial',
    popular: false,
    highlight: false,
    isPaid: true,
  },
  {
    name: 'Professional',
    key: 'professional',
    description: 'Full compliance for growing companies',
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Daily monitoring', included: true },
      { text: 'AI-powered code fixes', included: true },
      { text: '1-click remediation', included: true },
      { text: 'Compliance certificate', included: true },
      { text: 'Priority email support', included: true },
      { text: 'VPAT/ACR documentation', included: true },
      { text: 'Multiple team members', included: true },
      { text: 'Custom integrations', included: false },
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
    highlight: true,
    isPaid: true,
  },
  {
    name: 'Enterprise',
    key: 'enterprise',
    description: 'For organizations with complex needs',
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: '99.9% uptime SLA', included: true },
      { text: 'Full audit trail', included: true },
      { text: 'SSO/SAML authentication', included: true },
      { text: 'Custom reporting', included: true },
      { text: 'On-call support', included: true },
      { text: 'Legal compliance review', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    highlight: false,
    isPaid: true,
    isEnterprise: true,
  },
];

export default function PricingCards() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  const getPrice = (planKey: string) => {
    if (planKey === 'free') {
      return { eur: '€0', usd: '$0', period: '' };
    }

    const key = planKey as 'starter' | 'professional' | 'enterprise';

    if (billing === 'annual') {
      return {
        eur: annualPrices[key].eur,
        usd: annualPrices[key].usd,
        period: '/month',
        yearlyTotal: annualPrices[key].yearlyTotal,
        isAnnual: true,
      };
    }

    return {
      eur: monthlyPrices[key].eur,
      usd: monthlyPrices[key].usd,
      period: '/month',
      isAnnual: false,
    };
  };

  const getTrialText = () => {
    if (billing === 'annual') {
      return 'Start Now';
    }
    return 'Start 14-Day Trial';
  };

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <BillingToggle onChange={setBilling} defaultValue="annual" />
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const price = getPrice(plan.key);

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-indigo-500/20 to-indigo-500/5 border-2 border-indigo-500'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{plan.description}</p>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{price.eur}</span>
                    <span className="text-zinc-500">{price.period}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-zinc-400">{price.usd}</span>
                    <span className="text-zinc-600 text-sm">{price.period} USD</span>
                  </div>
                  {price.isAnnual && price.yearlyTotal && (
                    <div className="mt-2">
                      <span className="text-sm text-green-400">
                        {price.yearlyTotal}/year billed annually
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-zinc-300' : 'text-zinc-600'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {!plan.isPaid ? (
                <Link
                  href="/"
                  className="block w-full py-3 px-4 rounded-xl text-center font-semibold transition-colors bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  {plan.cta}
                </Link>
              ) : (
                <CheckoutButton
                  plan={plan.key as 'starter' | 'professional' | 'enterprise'}
                  label={plan.highlight ? getTrialText() : plan.cta}
                  highlight={plan.highlight || plan.isEnterprise}
                  billing={billing}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
