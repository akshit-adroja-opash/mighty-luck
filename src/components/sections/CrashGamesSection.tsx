"use client";

import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import GameCarousel from "@/components/ui/GameCarousel";

const crashGames = Array.from({ length: 20 }, (_, i) => `/games/crash/crash-${(i % 8) + 1}.png`);

export default function CrashGamesSection() {
  const router = useRouter();

  return (
    <GameCarousel
      title="CRASH GAMES (723)"
      icon={<img src="/games/game-icons/crash.svg" alt="Crash Games" className="w-[30px] h-[30px]" />}
    >
        {crashGames.map((image, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={image}
              title={`Crash Game ${index + 1}`}
              onClick={() => router.push(`/games/crash-${(index % 8) + 1}`)}
            />
          </div>
        ))}
      </GameCarousel>
  );
}
