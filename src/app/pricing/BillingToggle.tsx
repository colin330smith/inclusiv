'use client';

import { useState } from 'react';

interface BillingToggleProps {
  onChange: (billing: 'monthly' | 'annual') => void;
  defaultValue?: 'monthly' | 'annual';
}

export default function BillingToggle({ onChange, defaultValue = 'annual' }: BillingToggleProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>(defaultValue);

  const handleChange = (newBilling: 'monthly' | 'annual') => {
    setBilling(newBilling);
    onChange(newBilling);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1">
        <button
          onClick={() => handleChange('monthly')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            billing === 'monthly'
              ? 'bg-zinc-700 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => handleChange('annual')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            billing === 'annual'
              ? 'bg-indigo-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Annual
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            billing === 'annual'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-green-500/10 text-green-500'
          }`}>
            Save 20%
          </span>
        </button>
      </div>
      {billing === 'annual' && (
        <p className="text-sm text-green-400">
          2 months free with annual billing
        </p>
      )}
    </div>
  );
}
