import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center animate-pulse">
            <Shield className="w-8 h-8 text-indigo-500" />
          </div>
          {/* Loading ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-indigo-500 animate-spin" style={{ animationDuration: '1s' }} />
        </div>

        {/* Loading Text */}
        <p className="text-zinc-400 text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
