'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Loader2, CheckCircle } from 'lucide-react';

const supportTopics = [
  { label: 'Technical Support', value: 'technical' },
  { label: 'Billing & Pricing', value: 'billing' },
  { label: 'Compliance Questions', value: 'compliance' },
  { label: 'Enterprise Inquiry', value: 'enterprise' },
  { label: 'Partnership Opportunity', value: 'partnership' },
  { label: 'Bug Report', value: 'bug' },
  { label: 'Feature Request', value: 'feature' },
  { label: 'Other', value: 'other' },
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      website: formData.get('website') as string,
      topic: formData.get('topic') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
        <p className="text-zinc-400 mb-6">
          Thank you for reaching out. We&apos;ve sent a confirmation to your email and will respond within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Acme Inc."
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-zinc-300 mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-zinc-300 mb-2">
            What can we help with? *
          </label>
          <select
            id="topic"
            name="topic"
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Select a topic...</option>
            {supportTopics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            placeholder="Tell us more about how we can help..."
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            required
            className="mt-1 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-indigo-500 focus:ring-indigo-500"
          />
          <label htmlFor="privacy" className="text-sm text-zinc-400">
            I agree to the processing of my personal data in accordance with the{' '}
            <Link href="/privacy" className="text-indigo-400 hover:underline">
              Privacy Policy
            </Link>
            . *
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
