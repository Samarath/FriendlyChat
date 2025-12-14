import type { Metadata } from "next";
import "./globals.css";
import { StarryBackground } from "./components/starry-background/StarryBackground";
import { ReduxProvider } from "./ReduxProviderWrapper";

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
        <ReduxProvider>
          <StarryBackground />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
