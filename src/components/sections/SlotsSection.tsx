"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useScrollState } from "@/hooks/useScrollState";

const games = Array.from({ length: 20 }, (_, i) => `/games/slots/slot-${(i % 7) + 1}.png`);

export default function SlotsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
        title="SLOTS (1,487)" 
        icon={<img src="/games/game-icons/slot.svg" alt="Slots" className="w-[30px] h-[30px]" />} 
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
        {games.map((game, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={game}
              title={`Slot Game ${index + 1}`}
              onClick={() => router.push(`/games/slot-${(index % 7) + 1}`)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
