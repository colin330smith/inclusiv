'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Check,
  Sparkles,
  X,
} from 'lucide-react';

interface OnboardingWizardProps {
  userName?: string | null;
  isNewUser?: boolean;
}

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Inclusiv',
    description: 'Your complete accessibility compliance solution. Let\'s get you set up in under 2 minutes.',
    icon: Sparkles,
    color: 'indigo',
  },
  {
    id: 'add-site',
    title: 'Add Your First Site',
    description: 'Enter your website URL to start monitoring. We\'ll scan it for WCAG 2.1 issues automatically.',
    icon: Globe,
    color: 'blue',
  },
  {
    id: 'first-scan',
    title: 'Get Instant Results',
    description: 'Your first scan takes about 30 seconds. You\'ll see a detailed report with actionable fixes.',
    icon: Zap,
    color: 'yellow',
  },
  {
    id: 'compliance',
    title: 'Stay Compliant',
    description: 'Schedule recurring scans and get alerts when issues arise. Meet EAA and WCAG deadlines with confidence.',
    icon: Shield,
    color: 'green',
  },
];

export function OnboardingWizard({ userName, isNewUser }: OnboardingWizardProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [url, setUrl] = useState('');
  const router = useRouter();

  // Check if user has completed onboarding
  useEffect(() => {
    if (isNewUser && typeof window !== 'undefined') {
      const hasCompletedOnboarding = localStorage.getItem('inclusiv_onboarding_complete');
      if (!hasCompletedOnboarding) {
        // Small delay for better UX
        const timer = setTimeout(() => setOpen(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isNewUser]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('inclusiv_onboarding_complete', 'true');
    setOpen(false);
    if (url) {
      router.push(`/dashboard/sites/add?url=${encodeURIComponent(url)}`);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('inclusiv_onboarding_complete', 'true');
    setOpen(false);
  };

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Skip button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress bar */}
              <div className="h-1 bg-zinc-800">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        step.color === 'indigo'
                          ? 'bg-indigo-500/10'
                          : step.color === 'blue'
                          ? 'bg-blue-500/10'
                          : step.color === 'yellow'
                          ? 'bg-yellow-500/10'
                          : 'bg-green-500/10'
                      }`}
                    >
                      <step.icon
                        className={`w-7 h-7 ${
                          step.color === 'indigo'
                            ? 'text-indigo-400'
                            : step.color === 'blue'
                            ? 'text-blue-400'
                            : step.color === 'yellow'
                            ? 'text-yellow-400'
                            : 'text-green-400'
                        }`}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {currentStep === 0 && userName
                          ? `Welcome, ${userName.split(' ')[0]}!`
                          : step.title}
                      </h2>
                      <p className="text-zinc-400 mt-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* URL Input on step 2 */}
                    {step.id === 'add-site' && (
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Your website URL
                        </label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        />
                        <p className="text-xs text-zinc-500 mt-2">
                          You can add more sites later from your dashboard
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Step indicators */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep
                          ? 'bg-indigo-500 w-6'
                          : index < currentStep
                          ? 'bg-indigo-500/50'
                          : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-8 py-4 border-t border-zinc-800 bg-zinc-900/50">
                <button
                  onClick={handleSkip}
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Check className="w-4 h-4" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Trigger button for manually showing onboarding
export function OnboardingTrigger() {
  const handleReset = () => {
    localStorage.removeItem('inclusiv_onboarding_complete');
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
    >
      Replay onboarding
    </button>
  );
}
