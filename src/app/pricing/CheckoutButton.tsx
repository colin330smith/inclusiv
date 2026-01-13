'use client';

import { ArrowRight } from 'lucide-react';

// Direct Stripe payment link - bypasses API for immediate checkout
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/9B64gB1segodg1Oae7cjS00';

interface CheckoutButtonProps {
  plan: 'starter' | 'professional' | 'enterprise';
  label: string;
  highlight?: boolean;
  billing?: 'monthly' | 'annual';
}

export default function CheckoutButton({ label, highlight }: CheckoutButtonProps) {
  return (
    <a
      href={STRIPE_PAYMENT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full py-3 px-4 rounded-xl text-center font-semibold transition-colors ${
        highlight
          ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
      }`}
    >
      {label}
      {highlight && <ArrowRight className="inline w-4 h-4 ml-2" />}
    </a>
  );
}
