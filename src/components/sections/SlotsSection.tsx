"use client";

import { useRef } from "react";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";

const games = Array.from({ length: 20 }, (_, i) => `/games/slots/slot-${(i % 7) + 1}.png`);

export default function SlotsSection() {
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
        title="SLOTS (1,487)" 
        icon={<span className="text-xl">🎰</span>} 
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        className="flex w-[1300px] gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {games.map((game, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={game}
              title={`Game ${index}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
