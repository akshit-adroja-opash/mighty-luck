"use client";

import React from "react";
import GameCarousel from "@/components/ui/GameCarousel";

interface ProviderCardProps {
  name: string;
  games: number;
  logo?: string;
}

function ProviderCard({ name, games, logo }: ProviderCardProps) {
  return (
    /* Card: w-[152px] h-[100px] flex-col justify-center items-center px-[24px] py-[12px] gap-[8px] rounded-[12px] */
    <div
      className="group flex h-[100px] w-[152px] flex-none cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[12px] bg-[#0C1F56] px-[24px] py-[12px] transition-colors hover:bg-[#173EAD]"
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
        <span className="w-[53px] text-center font-manrope text-[10px] font-semibold leading-[14px] text-[#FFC83D]">
          {games} Games
        </span>
      </div>
    </div>
  );
}

/* Providers list — matches Figma order */
const providers = [
  { name: "Belatra",        games: 226, logo: "/games/providers/g1.png" },
  { name: "BGaming",        games: 226, logo: "/games/providers/g2.png" },
  { name: "TaDa Gaming",    games: 226, logo: "/games/providers/g3.png" },
  { name: "Endorphina",     games: 226, logo: "/games/providers/g4.png" },
  { name: "Nolimit City",   games: 226, logo: "/games/providers/g5.png" },
  { name: "Hacksaw Gaming", games: 226, logo: "/games/providers/g6.png" },
  { name: "Booming Games",  games: 226, logo: "/games/providers/g7.png" },
  { name: "BGaming",        games: 226, logo: "/games/providers/g2.png" },
];

/* Extend to 20 items for the scroll row */
const topProviders = Array.from({ length: 20 }, (_, i) => providers[i % providers.length]);

export default function ProvidersSection() {
  return (
    <GameCarousel
      title="GAME PROVIDERS (34)"
      titleWidth="237px"
      icon={<img src="/games/game-icons/game.svg" alt="Game Providers" className="w-[30px] h-[30px]" />}
    >
        {topProviders.map((provider, index) => (
          <div key={index} className="flex-none snap-start">
            <ProviderCard
              name={provider.name}
              games={provider.games}
              logo={provider.logo}
            />
          </div>
        ))}
      </GameCarousel>
  );
}
