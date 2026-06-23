"use client";

import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import GameCarousel from "@/components/ui/GameCarousel";

const bonusBuys = Array.from({ length: 20 }, (_, i) => `/games/bonus/bonus-${(i % 8) + 1}.png`);

export default function BonusBuysSection({ title = "BONUS BUYS (145)" }: { title?: string }) {
  const router = useRouter();
  return (
    <GameCarousel
      title={title}
      icon={<img src="/games/game-icons/bonus.svg" alt="Bonus Buys" className="w-[30px] h-[30px]" />}
    >
        {bonusBuys.map((image, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={image}
              title={`Bonus Buy ${index + 1}`}
              onClick={() => router.push(`/games/bonus-${(index % 8) + 1}`)}
            />
          </div>
        ))}
      </GameCarousel>
  );
}
