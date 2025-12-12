"use client";

import type React from "react";

import { useState } from "react";
import { User, Users, Calendar, ArrowLeft } from "lucide-react";
import { GuestLoginFormProps } from "@/types/types";

export function GuestLoginForm({
  onSwitchToLogin,
  onGuestLogin,
}: GuestLoginFormProps) {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuestLogin({ username, gender, age });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-[#1a2332] rounded-2xl border border-[#2a3441] p-6 md:p-8">
        {/* Back Button */}
        {/* <button
          type="button"
          onClick={onSwitchToLogin}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Login</span>
        </button> */}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8b5cf6] mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Guest Access</h1>
          <p className="text-gray-400 mt-2">Join the chat without an account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="guest-username"
              className="text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="guest-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a display name"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="guest-gender"
                className="text-sm font-medium text-gray-300"
              >
                Gender
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  id="guest-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all appearance-none cursor-pointer"
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
                htmlFor="guest-age"
                className="text-sm font-medium text-gray-300"
              >
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="guest-age"
                  type="number"
                  min="13"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0d1521] border border-[#2a3441] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0d1521] rounded-xl p-4 border border-[#2a3441]">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-[#2dd4bf] font-medium">Note:</span> As a
              guest, your messages will be temporary and you{"'"}ll have limited
              features. Create an account for the full experience!
            </p>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#8b5cf6] text-white font-semibold hover:bg-[#7c3aed] transition-colors"
          >
            Join as Guest
          </button>
        </form>

        {/* <p className="text-center mt-6 text-gray-400 text-sm">
          Want to save your chats?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#ec4899] hover:underline font-medium"
          >
            Create an account
          </button>
        </p> */}
      </div>
    </div>
  );
}
