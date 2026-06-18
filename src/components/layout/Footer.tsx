"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const columns = [
  { title: "SLOT GAMES", links: ["Slots", "Skill Games", "Jackpot", "Bonus Buy", "Crash Games"] },
  { title: "LIVE CASINO", links: ["Roulette", "Blackjack", "Live Casino", "Table Games", "Video Poker"] },
  { title: "CASINO", links: ["About Us", "Promotions", "Tournaments", "Affiliate Program", "Vip Club", "Refer a Friend", "Blog", "Bonus Shop"] },
  { title: "LEGAL", links: ["Privacy Policy", "Terms & Conditions", "Bonus Terms", "Responsible Gambling", "Payment Methods", "Sportsbook Rules"] },
  { title: "SUPPORT", links: ["Live Support"] },
];

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0); // First open by default to match CSS dump

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <footer className="flex w-full flex-none flex-col gap-[40px] md:gap-[48px] items-center lg:items-start overflow-hidden">

      {/* Top Section */}
      <div className="flex w-full md:max-w-full flex-col lg:flex-row justify-between items-center lg:items-start gap-[40px] lg:gap-[49px]">

        {/* Logo & Copyright */}
        <div className="flex flex-col items-center lg:items-start mx-auto lg:mx-0 gap-[16px] flex-none w-[213px] h-[81px]">
          <Logo 
            orientation="vertical"
            className="w-[132px] h-[50px] relative"
            iconClassName="h-[24px] w-[32px]"
            textClassName="text-[15px] tracking-widest text-center w-full"
          />
          <p className="font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] text-center lg:text-left w-full flex-none">
            @ 2026 Mighty Luck. All rights reserved.
          </p>
        </div>

        {/* Mobile Accordion */}
        <div className="flex lg:hidden w-full flex-col items-start gap-[20px]">
          {columns.map((col, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div key={idx} className="flex flex-col items-start gap-[8px] w-full">
                
                {/* Header Row */}
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="flex flex-row items-center justify-between w-full h-[24px] cursor-pointer"
                >
                  <span className="font-jost text-[16px] font-bold leading-[23px] tracking-[0.02em] text-white uppercase text-left">
                    {col.title}
                  </span>
                  <div className="flex flex-col items-center justify-center w-[24px] h-[24px] flex-none">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <path d="M1 1L6 6L11 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                {/* Links Container */}
                {isOpen && (
                  <div className="flex flex-col items-start gap-[12px] w-full mt-[4px]">
                    {col.links.map((link) => (
                      <Link
                        href="/"
                        key={link}
                        className="w-full h-[19px] font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.01em] text-[#D2DCF7] transition-colors hover:text-white"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Links Grid */}
        <div className="hidden lg:flex flex-wrap xl:flex-nowrap flex-row items-start gap-8 lg:gap-[20px] xl:gap-[32px] w-full lg:w-auto xl:w-[728px] justify-between lg:justify-start">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col items-start gap-[12px] w-auto min-w-[120px] flex-none">
              <span className="w-full h-[17px] font-jost text-[12px] font-bold uppercase leading-[17px] tracking-[0.02em] text-white">
                {col.title}
              </span>
              <div className="flex flex-col items-start gap-[8px] w-full">
                {col.links.map((link) => (
                  <Link
                    href="/"
                    key={link}
                    className="w-full h-[15px] font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex w-full md:max-w-full flex-col lg:flex-row justify-between items-start lg:items-center border-t border-[#112F82] pt-[60px] md:pt-8 gap-[20px] md:gap-6">

        {/* Legal Text */}
        <p className="w-full lg:max-w-[445px] text-left lg:text-justify font-manrope text-[10px] font-semibold leading-[14px] tracking-[0.01em] text-[#D2DCF7]">
          MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
        </p>

        {/* Logos */}
        <div className="flex flex-none flex-row items-center justify-center lg:justify-end w-full lg:w-auto gap-[30px] lg:gap-8 mx-auto lg:mx-0">
          <img src="/games/footer/18.svg" alt="18+" className="w-[38px] h-[38px] object-contain flex-shrink-0" />
          <img src="/games/footer/gamble-aware.svg" alt="GambleAware" className="w-[120px] h-[24px] object-contain flex-shrink-0" />
          <img src="/games/footer/gaming-license.svg" alt="Gaming License" className="w-[66.5px] h-[38px] object-contain flex-shrink-0" />
        </div>
      </div>

    </footer>
  );
}
