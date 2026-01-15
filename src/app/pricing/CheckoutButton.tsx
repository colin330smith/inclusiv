'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Tag } from 'lucide-react';

interface CheckoutButtonProps {
  plan: 'starter' | 'professional' | 'enterprise';
  label: string;
  highlight?: boolean;
  billing?: 'monthly' | 'annual';
}

export default function CheckoutButton({ plan, label, highlight, billing = 'monthly' }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Check for coupon in URL or localStorage on mount
  useEffect(() => {
    // Check URL params first (e.g., ?coupon=LAUNCH30)
    const urlParams = new URLSearchParams(window.location.search);
    const urlCoupon = urlParams.get('coupon');

    if (urlCoupon) {
      setAppliedCoupon(urlCoupon.toUpperCase());
      localStorage.setItem('applied_coupon', urlCoupon.toUpperCase());
    } else {
      // Fall back to localStorage
      const storedCoupon = localStorage.getItem('applied_coupon');
      if (storedCoupon) {
        setAppliedCoupon(storedCoupon);
      }
    }
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          billing,
          couponCode: appliedCoupon,
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
    <div className="space-y-2">
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
      {appliedCoupon && (
        <div className="flex items-center justify-center gap-1 text-xs text-green-400">
          <Tag className="w-3 h-3" />
          <span>{appliedCoupon} discount applied</span>
        </div>
      )}
    </div>
  );
}
