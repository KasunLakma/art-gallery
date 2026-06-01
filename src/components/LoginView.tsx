"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "admin@artgallery.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid administrative credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/40 uppercase mb-2">
            Secure Portal
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-artDark font-light tracking-wide text-center">
            Admin Authentication
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
              Admin Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@artgallery.com"
              className="w-full bg-white/70 focus:bg-white border border-artRose-light/80 rounded-xl px-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
              Security Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/70 focus:bg-white border border-artRose-light/80 rounded-xl px-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-500 bg-red-50 border border-red-200/50 rounded-lg p-3 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300 hover:scale-[1.01] active:scale-98"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
