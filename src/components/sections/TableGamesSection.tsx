"use client";

import { useRouter } from "next/navigation";
import GameCard from "@/components/ui/GameCard";
import GameCarousel from "@/components/ui/GameCarousel";

const tableGames = Array.from({ length: 20 }, (_, i) => `/games/table/table-${(i % 8) + 1}.png`);

export default function TableGamesSection({ title = "TABLE GAMES (51)" }: { title?: string }) {
  const router = useRouter();
  return (
    <GameCarousel
      title={title}
      icon={<img src="/games/game-icons/table.svg" alt="Table Games" className="w-[30px] h-[30px]" />}
    >
        {tableGames.map((image, index) => (
          <div key={index} className="flex-none snap-start">
            <GameCard
              image={image}
              title={`Table Game ${index + 1}`}
              onClick={() => router.push(`/games/table-${(index % 8) + 1}`)}
            />
          </div>
        ))}
      </GameCarousel>
  );
}
