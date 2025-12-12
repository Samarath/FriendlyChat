"use client";

import type React from "react";

import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { LoginFormProps } from "@/types/types";

export function LoginForm({
  onSwitchToRegister,
  onSwitchToGuest,
  onLogin,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-[#1a2332] rounded-2xl border border-[#2a3441] p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2dd4bf] mb-4">
            <User className="w-8 h-8 text-[#0d1117]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Sign in to continue to Friendly Chat
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 pl-11 pr-12 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#2dd4bf] text-[#0d1117] font-semibold hover:bg-[#26b8a5] transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#2a3441]" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-[#2a3441]" />
        </div>

        <button
          type="button"
          onClick={onSwitchToGuest}
          className="w-full h-12 rounded-xl bg-[#ec4899] text-white font-semibold hover:bg-[#db2777] transition-colors"
        >
          Continue as Guest
        </button>

        <p className="text-center mt-6 text-gray-400">
          {"Don't have an account? "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#2dd4bf] hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
