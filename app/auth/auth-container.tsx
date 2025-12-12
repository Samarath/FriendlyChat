"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { LoginForm } from "../components/login/login";
import { RegisterForm } from "../components/register/register";
import { GuestLoginForm } from "../components/login/guest-login";
import { AuthView } from "@/types/types";

export function AuthContainer() {
  const [currentView, setCurrentView] = useState<AuthView>("guest");

  const handleLogin = (data: { username: string; password: string }) => {
    console.log("Login:", data);
  };

  const handleRegister = (data: {
    email: string;
    username: string;
    password: string;
    gender: string;
    age: string;
    privacyAccepted: boolean;
  }) => {
    console.log("Register:", data);
  };

  const handleGuestLogin = (data: {
    username: string;
    gender: string;
    age: string;
  }) => {
    console.log("Guest Login:", data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#2dd4bf] flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-[#0d1117]" />
        </div>
        <span className="text-xl font-bold text-white">Friendly Chat</span>
      </div>

      <div className="w-full">
        {currentView === "login" && (
          <LoginForm
            onSwitchToRegister={() => setCurrentView("register")}
            onSwitchToGuest={() => setCurrentView("guest")}
            onLogin={handleLogin}
          />
        )}
        {currentView === "register" && (
          <RegisterForm
            onSwitchToLogin={() => setCurrentView("login")}
            onRegister={handleRegister}
          />
        )}
        {currentView === "guest" && (
          <GuestLoginForm
            onSwitchToLogin={() => setCurrentView("login")}
            onGuestLogin={handleGuestLogin}
          />
        )}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        © 2025 Friendly Chat. All rights reserved.
      </p>
    </div>
  );
}
