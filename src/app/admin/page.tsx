"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const authToken = localStorage.getItem("inclusiv_admin_auth");
    if (authToken === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (in production, use proper authentication)
    // Default password is "inclusiv2025" - change this!
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "inclusiv2025";
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("inclusiv_admin_auth", "authenticated");
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("inclusiv_admin_auth");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Dashboard
            </h1>
            <p className="text-zinc-500 text-center mb-8">
              Enter your password to access analytics
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-12 pr-12 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
              >
                Access Dashboard
              </button>
            </form>

            <p className="text-zinc-600 text-xs text-center mt-6">
              Protected area. Authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Admin Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-500" />
              <span className="text-lg font-bold text-white">Inclusiv</span>
            </div>
            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-full">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <AdminDashboard />
    </div>
  );
}
