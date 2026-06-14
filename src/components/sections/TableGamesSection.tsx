"use client";

import { useRef } from "react";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useScrollState } from "@/hooks/useScrollState";

const tableGames = Array.from({ length: 20 }, (_, i) => `/games/table/table-${(i % 8) + 1}.png`);

export default function TableGamesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, checkScroll } = useScrollState(scrollRef);

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
    <section className="flex w-full flex-none flex-col gap-5 overflow-hidden">
      <SectionHeader 
        title="TABLE GAMES (51)" 
        icon={<img src="/games/game-icons/table.svg" alt="Table Games" className="w-[20px] h-[20px]" />} 
        iconBg="bg-transparent"
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {tableGames.map((image, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={image}
              title={`Table Game ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
