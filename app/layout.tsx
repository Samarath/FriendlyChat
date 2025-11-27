import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import { StarryBackground } from "./components/starry-background/StarryBackground";
import { ChatPanel } from "./components/chat-panel/ChatPanel";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Friendly Chat",
  description: "A good to start to meet a stranger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900">
        <StarryBackground />
        {/* <Header /> */}
        <main>{children}</main>
        <ChatPanel />
      </body>
    </html>
  );
}
