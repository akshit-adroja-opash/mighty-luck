"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import SectionHeader from "@/components/ui/SectionHeader";

const baseOriginals = [
  { id: "original-1", title: "Alien Aliens",    image: "/games/original/original-1.png" },
  { id: "original-2", title: "Neon Shapes",     image: "/games/original/original-2.png" },
  { id: "original-3", title: "Cosmic Quest",    image: "/games/original/original-3.png" },
  { id: "original-4", title: "Cyber Spin",      image: "/games/original/original-4.png" },
  { id: "original-5", title: "Fruit Galaxy",    image: "/games/original/original-5.png" },
  { id: "original-6", title: "Lucky Stars",     image: "/games/original/original-6.png" },
  { id: "original-7", title: "Planet Fortune",  image: "/games/original/original-7.png" },
  { id: "original-8", title: "Meteor Dash",     image: "/games/original/original-8.png" },
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
