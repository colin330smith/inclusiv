'use client';

import { useState, useEffect } from 'react';
import { Check, X, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import BillingToggle from './BillingToggle';
import CheckoutButton from './CheckoutButton';
import CountdownTimer from '@/components/CountdownTimer';
import { GeoPricing, formatPrice } from '@/lib/geo-pricing';

interface GeoResponse {
  location: {
    country: string;
    countryCode: string;
    currency: string;
  } | null;
  pricing: GeoPricing;
  detected: boolean;
}

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

// Default EUR pricing
const defaultPricing: GeoPricing = {
  currency: 'EUR',
  currencySymbol: '€',
  exchangeRate: 1,
  pppMultiplier: 1,
  prices: {
    starter: { monthly: 49, annual: 39 },
    professional: { monthly: 149, annual: 119 },
    enterprise: { monthly: 499, annual: 399 },
  },
  showOriginalPrices: false,
  discountPercent: 0,
};

export default function PricingCards() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [geoPricing, setGeoPricing] = useState<GeoPricing>(defaultPricing);
  const [geoLocation, setGeoLocation] = useState<GeoResponse['location']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGeoPricing() {
      try {
        const res = await fetch('/api/geo');
        if (res.ok) {
          const data: GeoResponse = await res.json();
          setGeoPricing(data.pricing);
          setGeoLocation(data.location);
        }
      } catch (error) {
        console.error('Failed to fetch geo pricing:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGeoPricing();
  }, []);

  const getPrice = (planKey: string) => {
    if (planKey === 'free') {
      return {
        display: formatPrice(0, geoPricing.currencySymbol),
        period: '',
        yearlyTotal: '',
        isAnnual: false,
      };
    }

    const key = planKey as 'starter' | 'professional' | 'enterprise';
    const planPrices = geoPricing.prices[key];

    if (billing === 'annual') {
      const yearlyTotal = Math.round(planPrices.annual * 12);
      return {
        display: formatPrice(planPrices.annual, geoPricing.currencySymbol),
        period: '/month',
        yearlyTotal: formatPrice(yearlyTotal, geoPricing.currencySymbol),
        isAnnual: true,
      };
    }

    return {
      display: formatPrice(planPrices.monthly, geoPricing.currencySymbol),
      period: '/month',
      yearlyTotal: '',
      isAnnual: false,
    };
  };

  const getTrialText = () => {
    if (billing === 'annual') {
      return 'Start Now';
    }
    return 'Start 14-Day Trial';
  };

  // Show regional pricing badge if PPP discount is applied
  const showRegionalBadge = geoPricing.showOriginalPrices && geoPricing.discountPercent > 0;

  return (
    <div className="space-y-8">
      {/* Regional Pricing Banner */}
      {showRegionalBadge && geoLocation && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">
              Regional pricing for <strong>{geoLocation.country}</strong> —
              <span className="ml-1 text-green-400 font-semibold">
                Save {geoPricing.discountPercent}%
              </span>
            </span>
            <Sparkles className="w-4 h-4 text-green-400" />
          </div>
        </div>
      )}

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <BillingToggle onChange={setBilling} defaultValue="annual" />
      </div>

      {/* Limited Time Offer Countdown */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
          <span className="text-sm text-orange-300 font-medium">Launch pricing ends soon</span>
          <CountdownTimer compact label="" />
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
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
                    <span className="text-3xl font-bold text-white">{price.display}</span>
                    <span className="text-zinc-500">{price.period}</span>
                  </div>
                  {/* Show currency indicator if non-EUR */}
                  {geoPricing.currency !== 'EUR' && plan.key !== 'free' && (
                    <div className="text-sm text-zinc-500">
                      in {geoPricing.currency}
                    </div>
                  )}
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

      {/* Currency Note */}
      {geoLocation && geoPricing.currency !== 'EUR' && (
        <p className="text-center text-sm text-zinc-500">
          Prices shown in {geoPricing.currency}. You&apos;ll be charged in {geoPricing.currency} at checkout.
        </p>
      )}
    </div>
  );
}
