"use client";

import React, { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

interface ProviderCardProps {
  name: string;
  games: number;
  bg?: string;
  logo?: string;
}

function ProviderCard({ name, games, bg = "#0C1F56", logo }: ProviderCardProps) {
  return (
    /* Card: w-[152px] h-[100px] flex-col justify-center items-center px-[24px] py-[12px] gap-[8px] rounded-[12px] */
    <div
      className="group flex h-[100px] w-[152px] flex-none cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[12px] px-[24px] py-[12px] transition-opacity hover:opacity-90"
      style={{ background: bg }}
    >
      {/* Logo area: w-[80px] h-[40px] */}
      <div className="flex h-[40px] w-[80px] flex-none items-center justify-center">
        {logo ? (
          <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          /* Fallback: white text label mimicking vector logo */
          <span className="text-center text-[11px] font-extrabold uppercase leading-tight tracking-wider text-white">
            {name}
          </span>
        )}
      </div>

      {/* Games label: w-[104px] h-[14px] container → text w-[53px] Manrope 600 10px center #FFC83D */}
      <div className="flex h-[14px] w-[104px] flex-none items-center justify-center">
        <span className="w-[53px] text-center font-['Manrope'] text-[10px] font-semibold leading-[14px] text-[#FFC83D]">
          {games} Games
        </span>
      </div>
    </div>
  );
}

/* Providers list — matches Figma order; BGaming (index 1) uses #173EAD highlight */
const providers = [
  { name: "Belatra",        games: 226, bg: "#0C1F56" },
  { name: "BGaming",        games: 226, bg: "#173EAD" }, // active / highlighted card
  { name: "TaDa Gaming",    games: 226, bg: "#0C1F56" },
  { name: "Endorphina",     games: 226, bg: "#0C1F56" },
  { name: "Nolimit City",   games: 226, bg: "#0C1F56" },
  { name: "Hacksaw Gaming", games: 226, bg: "#0C1F56" },
  { name: "Booming Games",  games: 226, bg: "#0C1F56" },
  { name: "Relax Gaming",   games: 226, bg: "#0C1F56" },
  { name: "Push Gaming",    games: 226, bg: "#0C1F56" },
  { name: "Pragmatic Play", games: 226, bg: "#0C1F56" },
];

/* Extend to 20 items for the scroll row */
const topProviders = Array.from({ length: 20 }, (_, i) => providers[i % providers.length]);

export default function ProvidersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -(152 + 12) * 2, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: (152 + 12) * 2, behavior: "smooth" });
    }
  };

  return (
    /* Section: w-[1136px] h-[150px] flex-col gap-[20px] overflow-hidden */
    <section className="flex h-[150px] w-[1136px] flex-none flex-col items-start gap-[20px] overflow-hidden">

      {/* Header: titleWidth=237px to match "GAME PROVIDERS (34)" = 237px */}
      <SectionHeader
        title="GAME PROVIDERS (34)"
        titleWidth="237px"
        icon={
          /* Provider icon: person/user silhouette in #FFC83D */
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="6" r="5" fill="#0C1F56"/>
            <path d="M1 21C1 17.134 4.582 14 9 14C13.418 14 17 17.134 17 21" stroke="#0C1F56" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      {/* Card row: w-[1300px] h-[100px] flex-row gap-[12px] */}
      <div
        ref={scrollRef}
        className="flex h-[100px] w-[1300px] flex-none flex-row gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {topProviders.map((provider, index) => (
          <div key={index} className="flex-none snap-start">
            <ProviderCard
              name={provider.name}
              games={provider.games}
              bg={provider.bg}
            />
          </div>
        ))}
      </div>

    </section>
  );
}