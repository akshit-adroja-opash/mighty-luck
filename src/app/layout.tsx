import type { Metadata } from "next";
import { Jost, Manrope } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/layout/Header";
import StoreProvider from "@/store/StoreProvider";
import AuthModal from "@/components/auth/AuthModal";
import WalletModal from "@/components/wallet/WalletModal";
import LobbyModal from "@/components/lobby/LobbyModal";
import GamePlayModal from "@/components/game/GamePlayModal";
import { Toaster } from "sonner";

const jostFont = Jost({
  subsets: ["latin"],
  variable: "--font-family-jost",
  display: "swap",
});

const manropeFont = Manrope({
  subsets: ["latin"],
  variable: "--font-family-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mighty Luck Casino",
  description: "Play the Best Crypto Casino Games Online at Mighty Luck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jostFont.variable} ${manropeFont.variable}`}>
      <body className="antialiased font-sans">
        <StoreProvider>
          <Header />
          {children}
          <AuthModal />
          <WalletModal />
          <LobbyModal />
          <GamePlayModal />
          <Toaster 
            richColors 
            position="top-right" 
            toastOptions={{
              style: { width: 'auto', minWidth: 'fit-content', paddingRight: '20px' }
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
