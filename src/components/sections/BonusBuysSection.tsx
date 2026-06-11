"use client";

import { useRef } from "react";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";

const bonusBuys = Array.from({ length: 20 }, (_, i) => `/games/bonus/bonus-${(i % 8) + 1}.png`);

export default function BonusBuysSection() {
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
        title="BONUS BUYS (145)" 
        icon={<span className="text-xl">💰</span>} 
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        className="flex w-[1300px] gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {bonusBuys.map((image, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={image}
              title={`Bonus Buy ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
