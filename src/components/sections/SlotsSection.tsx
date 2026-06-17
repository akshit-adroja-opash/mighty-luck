"use client";

import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import GameCarousel from "@/components/ui/GameCarousel";

const games = Array.from({ length: 20 }, (_, i) => `/games/slots/slot-${(i % 7) + 1}.png`);

export default function SlotsSection() {
  const router = useRouter();

  return (
    <GameCarousel
      title="SLOTS (1,487)"
      icon={<img src="/games/game-icons/slot.svg" alt="Slots" className="w-[18px] h-[18px] md:w-[30px] md:h-[30px]" />}
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
      </GameCarousel>
  );
}
