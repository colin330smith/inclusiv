'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  plan: 'starter' | 'professional' | 'enterprise';
  label: string;
  highlight?: boolean;
  billing?: 'monthly' | 'annual';
}

export default function CheckoutButton({ plan, label, highlight, billing = 'monthly' }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          billing,
          successUrl: `${window.location.origin}/success?plan=${plan}`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned:', data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`block w-full py-3 px-4 rounded-xl text-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        highlight
          ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
      }`}
    >
      {isLoading ? (
        <Loader2 className="inline w-4 h-4 animate-spin" />
      ) : (
        <>
          {label}
          {highlight && <ArrowRight className="inline w-4 h-4 ml-2" />}
        </>
      )}
    </button>
  );
}
