"use client";

import type React from "react";

import { useState } from "react";
import {
  Mail,
  User,
  Users,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { RegisterFormProps } from "@/types/types";

export function RegisterForm({
  onSwitchToLogin,
  onRegister,
}: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      alert("Please accept the privacy policy to continue");
      return;
    }
    onRegister({ email, username, password, gender, age, privacyAccepted });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-[#1a2332] rounded-2xl border border-[#2a3441] p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ec4899] mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2">Join Friendly Chat today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reg-username"
              className="text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="reg-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reg-password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-gray-300"
              >
                Gender
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-gray-500">
                    Select
                  </option>
                  <option value="male" className="bg-[#1a2332]">
                    Male
                  </option>
                  <option value="female" className="bg-[#1a2332]">
                    Female
                  </option>
                  <option value="other" className="bg-[#1a2332]">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="age"
                className="text-sm font-medium text-gray-300"
              >
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="age"
                  type="number"
                  min="13"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPrivacyAccepted(!privacyAccepted)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                privacyAccepted
                  ? "bg-[#2dd4bf] border-[#2dd4bf]"
                  : "border-[#2a3441] bg-[#0d1521] hover:border-[#2dd4bf]"
              }`}
            >
              {privacyAccepted && <Check className="w-4 h-4 text-[#0d1117]" />}
            </button>
            <label className="text-sm text-gray-400 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-[#2dd4bf] hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#2dd4bf] hover:underline">
                Terms of Service
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#ec4899] text-white font-semibold hover:bg-[#db2777] transition-colors mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#2dd4bf] hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
