import type { Metadata } from "next";
import { Jost, Manrope } from "next/font/google";
import "@/styles/globals.css";

const jostFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const manropeFont = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
