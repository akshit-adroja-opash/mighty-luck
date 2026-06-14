"use client";

import { useRef } from "react";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useScrollState } from "@/hooks/useScrollState";

const bonusBuys = Array.from({ length: 20 }, (_, i) => `/games/bonus/bonus-${(i % 8) + 1}.png`);

export default function BonusBuysSection() {
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
        title="BONUS BUYS (145)" 
        icon={<img src="/games/game-icons/bonus.svg" alt="Bonus Buys" className="w-[20px] h-[20px]" />} 
        iconBg="bg-transparent"
        onPrev={scrollLeft}
        onNext={scrollRight}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
