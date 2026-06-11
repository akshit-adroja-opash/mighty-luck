"use client";

import { useRef } from "react";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";

const tableGames = Array.from({ length: 20 }, (_, i) => `/games/table/table-${(i % 8) + 1}.png`);

export default function TableGamesSection() {
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
    <section className="flex w-[1136px] flex-none flex-col gap-[20px] overflow-hidden">
      <SectionHeader 
        title="TABLE GAMES (51)" 
        icon={<span className="text-xl">♠️</span>} 
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        className="flex w-[1300px] gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
