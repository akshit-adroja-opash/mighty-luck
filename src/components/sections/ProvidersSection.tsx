"use client";

import React from "react";

interface ProviderCardProps {
  name: string;
  games: number;
  logo?: string;
  fluid?: boolean;
}

export function ProviderCard({ name, games, logo, fluid = false }: ProviderCardProps) {
  return (
    <div
      className={`group flex h-[60px] md:h-[100px] flex-none cursor-pointer flex-col items-center justify-center gap-[4.8px] md:gap-[8px] rounded-[8px] md:rounded-[12px] bg-[#0C1F56] px-[14.4px] md:px-[24px] py-[7.2px] md:py-[12px] transition-colors hover:bg-[#173EAD] ${
        fluid ? "w-full" : "w-[88px] md:w-[152px]"
      }`}
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
      <div className="flex min-h-[23px] md:min-h-[30px] w-full flex-none flex-row items-center justify-between gap-2 overflow-hidden">
        <div className="flex min-h-[23px] md:min-h-[30px] flex-1 min-w-0 flex-row items-center gap-[7.2px] md:gap-[12px]">
          <div className="flex h-[18px] w-[18px] md:h-[30px] md:w-[30px] flex-none items-center justify-center rounded-[2px] bg-transparent [&>img]:w-[18px] [&>img]:h-[18px] md:[&>img]:w-[30px] md:[&>img]:h-[30px]">
            <img src="/games/game-icons/game.svg" alt="Game Providers" className="w-[18px] h-[18px] md:w-[30px] md:h-[30px]" />
          </div>
          <h2 className="flex-1 min-w-0 truncate font-jost text-[16px] md:text-[20px] font-extrabold leading-[23px] md:leading-[29px] tracking-[0.01em] text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-[8px] md:gap-[12px] w-full">
        {topProviders.map((provider, index) => (
          <div key={index} className="w-full">
            <ProviderCard
              name={provider.name}
              games={provider.games}
              logo={provider.logo}
              fluid={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
