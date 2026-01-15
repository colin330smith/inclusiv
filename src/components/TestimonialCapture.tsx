'use client';

import { useState } from 'react';
import { Star, Quote, Send, CheckCircle, X } from 'lucide-react';

interface TestimonialCaptureProps {
  score: number;
  domain: string;
  onClose?: () => void;
}

export default function TestimonialCapture({ score, domain, onClose }: TestimonialCaptureProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState<'rate' | 'feedback' | 'thanks'>('rate');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [canShare, setCanShare] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Only show for high scores (positive experience likely)
  if (score < 75 || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleRatingSelect = (stars: number) => {
    setRating(stars);
    if (stars >= 4) {
      setStep('feedback');
    } else {
      // Low rating - just thank them and close
      setStep('thanks');
      setTimeout(handleClose, 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          score,
          rating,
          feedback,
          name,
          company,
          canShare,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Continue even if API fails
    }

    setSubmitted(true);
    setStep('thanks');
    setTimeout(handleClose, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-1 text-zinc-400 hover:text-white transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      {step === 'rate' && (
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-white font-semibold">Great score!</p>
              <p className="text-zinc-400 text-sm">{domain} scored {score}/100</p>
            </div>
          </div>

          <p className="text-zinc-300 mb-4">How was your experience with Inclusiv?</p>

          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingSelect(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-zinc-600'
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-zinc-500 text-xs">
            Click to rate your experience
          </p>
        </div>
      )}

      {step === 'feedback' && (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-semibold">Share your experience</h3>
          </div>

          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you find most helpful?"
                rows={3}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 resize-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={canShare}
                onChange={(e) => setCanShare(e.target.checked)}
                className="mt-1 w-4 h-4 bg-zinc-800 border-zinc-700 rounded text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-zinc-400 text-xs">
                I agree to have my feedback shared on Inclusiv&apos;s website and marketing materials.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </button>
          </div>
        </form>
      )}

      {step === 'thanks' && (
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {submitted ? 'Thank you!' : 'Thanks for your feedback!'}
          </h3>
          <p className="text-zinc-400 text-sm">
            {submitted
              ? 'Your testimonial helps others discover accessible web practices.'
              : 'We appreciate you taking the time to rate us.'}
          </p>
        </div>
      )}
    </div>
  );
}
