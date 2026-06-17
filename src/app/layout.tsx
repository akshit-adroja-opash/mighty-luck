import type { Metadata } from "next";
import { Jost, Manrope } from "next/font/google";
import "@/styles/globals.css";
import "flag-icons/css/flag-icons.min.css";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CryptoBanner from "@/components/sections/CryptoBanner";
import SeoContent from "@/components/sections/SeoContent";
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
      <body className="antialiased font-sans bg-[#091741] text-white">
        <StoreProvider>
          <Header />
          <Container>
            <div className="flex w-full flex-col lg:flex-row relative">
              <div className="hidden lg:block flex-none">
                <Sidebar />
              </div>
              <div className="flex flex-1 min-w-0 flex-col px-0 lg:pl-[24px] lg:pr-0 pb-[75px] lg:pb-0 gap-[10px] sm:gap-[20px] lg:gap-[40px] overflow-hidden">
                {children}

                <div className="w-full">
                  <SeoContent />
                </div>

                <div className="w-full">
                  <CryptoBanner />
                </div>

                <div className="w-full">
                  <Footer />
                </div>
              </div>
            </div>
          </Container>
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
