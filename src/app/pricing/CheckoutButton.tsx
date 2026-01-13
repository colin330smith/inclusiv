'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  plan: 'starter' | 'professional' | 'enterprise';
  label: string;
  highlight?: boolean;
}

export default function CheckoutButton({ plan, label, highlight }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        alert('Unable to start checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`block w-full py-3 px-4 rounded-xl text-center font-semibold transition-colors disabled:opacity-50 ${
        highlight
          ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
      }`}
    >
      {loading ? (
        <Loader2 className="inline w-5 h-5 animate-spin" />
      ) : (
        <>
          {label}
          {highlight && <ArrowRight className="inline w-4 h-4 ml-2" />}
        </>
      )}
    </button>
  );
}
