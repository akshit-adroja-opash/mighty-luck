"use client";

import React, { useRef } from 'react';
import SectionHeader from "@/components/ui/SectionHeader";

interface ProviderCardProps {
  name: string;
  games: number;
  logo?: string;
}

function ProviderCard({
  name,
  games,
  logo,
}: ProviderCardProps) {
  return (
    <div className="group flex h-[100px] w-[152px] cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[12px] bg-[#0C1F56] p-3 transition-colors hover:bg-[#173EAD]">
      <div className="flex h-10 w-20 items-center justify-center">
        {logo ? (
          <img
            src={logo}
            alt={name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-center text-sm font-bold uppercase leading-tight text-white">
            {name}
          </span>
        )}
      </div>
      <span className="font-manrope text-[10px] font-semibold leading-[14px] text-[#FFC83D]">
        {games} Games
      </span>
    </div>
  );
}

const baseProviders = [
  { name: "Belatra", games: 226 },
  { name: "Bgaming", games: 226 },
  { name: "Pragmatic", games: 226 },
  { name: "Evolution", games: 226 },
  { name: "Hacksaw", games: 226 },
  { name: "Nolimit", games: 226 },
  { name: "Push Gaming", games: 226 },
  { name: "Relax", games: 226 },
];

const topProviders = Array.from({ length: 20 }, (_, i) => baseProviders[i % baseProviders.length]);

export default function ProvidersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -328, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 328, behavior: "smooth" });
    }
  };

  return (
    <section className="flex w-full flex-col gap-[20px]">
      <SectionHeader 
        title="GAME PROVIDERS (34)" 
        icon={
          <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 25.5C16.2467 25.5 20.5 21.2467 20.5 16C20.5 10.7533 16.2467 6.5 11 6.5C5.75329 6.5 1.5 10.7533 1.5 16C1.5 21.2467 5.75329 25.5 11 25.5Z" stroke="#0C1F56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        } 
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        className="flex gap-[12px] overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {topProviders.map((provider, index) => (
          <div key={index} className="flex-shrink-0 snap-start">
            <ProviderCard
              name={provider.name}
              games={provider.games}
            />
          </div>
        ))}
      </div>
    </section>
  );
}