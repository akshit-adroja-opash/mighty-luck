"use client";

import React from "react";
import GameCarousel from "@/components/ui/GameCarousel";

interface ProviderCardProps {
  name: string;
  games: number;
  logo?: string;
}

export function ProviderCard({ name, games, logo }: ProviderCardProps) {
  return (
    <div
      className="group flex h-[60px] md:h-[100px] w-[88px] md:w-[152px] flex-none cursor-pointer flex-col items-center justify-center gap-[4.8px] md:gap-[8px] rounded-[8px] md:rounded-[12px] bg-[#0C1F56] px-[14.4px] md:px-[24px] py-[7.2px] md:py-[12px] transition-colors hover:bg-[#173EAD]"
    >
      {/* Logo area */}
      <div className="flex h-[24px] md:h-[40px] w-[48px] md:w-[80px] flex-none items-center justify-center">
        {logo ? (
          <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          /* Fallback: white text label mimicking vector logo */
          <span className="text-center text-[8px] md:text-[11px] font-extrabold uppercase leading-tight tracking-wider text-white">
            {name}
          </span>
        )}
      </div>

      {/* Games label */}
      <div className="flex h-[11px] md:h-[16px] w-full flex-none items-center justify-center">
        <span className="text-center font-manrope text-[9px] md:text-[12px] font-semibold leading-[11px] md:leading-[16px] text-[#FFC83D]">
          {games} Games
        </span>
      </div>
    </div>
  );
}

/* Providers list — matches Figma order */
export const providers = [
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

export default function ProvidersSection({ title = "GAME PROVIDERS (34)" }: { title?: string }) {
  return (
    <div className="flex flex-col gap-[12px] md:gap-5 w-full flex-none overflow-hidden">
      <GameCarousel
        title={title}
        titleWidth="237px"
        icon={<img src="/games/game-icons/game.svg" alt="Game Providers" className="w-[18px] h-[18px] md:w-[30px] md:h-[30px]" />}
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
    </div>
  );
}
