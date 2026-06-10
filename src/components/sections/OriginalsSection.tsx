"use client";

import { useRef } from "react";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";

const baseOriginals = [
  {
    title: "Pandarific",
    image: "/games/originals/pandarific.png",
  },
  {
    title: "Zeus Goes Bananas",
    image: "/games/originals/zeus.png",
  },
  {
    title: "Patrick vs Nefertiti",
    image: "/games/originals/patrick.png",
  },
  {
    title: "Scroll Of Gods",
    image: "/games/originals/gods.png",
  },
  {
    title: "XO Paradise",
    image: "/games/originals/xo.png",
  },
  {
    title: "Cash-O-Matic",
    image: "/games/originals/cash.png",
  },
  {
    title: "Elven Fortune",
    image: "/games/originals/elven.png",
  },
];

const originals = Array.from({ length: 20 }, (_, i) => ({
  ...baseOriginals[i % baseOriginals.length],
  id: `original-${i}`,
}));

export default function OriginalsSection() {
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
        title="ORIGINALS (14)" 
        icon={<span className="text-xl">👑</span>} 
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        className="flex w-[1300px] gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {originals.map((game) => (
          <div key={game.id} className="flex-none snap-start">
            <GameCard
              image={game.image}
              title={game.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}