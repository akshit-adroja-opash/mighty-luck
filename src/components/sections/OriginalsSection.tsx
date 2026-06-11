"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";

const baseOriginals = [
  { id: "pandarific",         title: "Pandarific",           image: "/games/originals/pandarific.png" },
  { id: "zeus-goes-bananas",  title: "Zeus Goes Bananas",    image: "/games/originals/zeus.png" },
  { id: "patrick",            title: "Patrick vs Nefertiti", image: "/games/originals/patrick.png" },
  { id: "scroll-of-gods",     title: "Scroll Of Gods",       image: "/games/originals/gods.png" },
  { id: "xo-paradise",        title: "XO Paradise",          image: "/games/originals/xo.png" },
  { id: "cash-o-matic",       title: "Cash-O-Matic",         image: "/games/originals/cash.png" },
  { id: "elven-fortune",      title: "Elven Fortune",        image: "/games/originals/elven.png" },
];

const originals = Array.from({ length: 14 }, (_, i) => ({
  ...baseOriginals[i % baseOriginals.length],
  uid: `original-${i}`,
}));

export default function OriginalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -328, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 328, behavior: "smooth" });
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
          <div key={game.uid} className="flex-none snap-start">
            <GameCard
              image={game.image}
              title={game.title}
              onClick={() => router.push(`/games/${game.id}`)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}