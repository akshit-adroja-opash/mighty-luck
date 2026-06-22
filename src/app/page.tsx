"use client";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSelectedGame, openModal } from "@/store/slices/uiSlice";

import HeroBanner from "@/components/sections/HeroBanner";
import DepositBanner from "@/components/sections/DepositBanner";
import PromotionsSection from "@/components/sections/PromotionsSection";
import SlotsSection from "@/components/sections/SlotsSection";
import OriginalsSection from "@/components/sections/OriginalsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CrashGamesSection from "@/components/sections/CrashGamesSection";
import ProvidersSection from "@/components/sections/ProvidersSection";
import TableGamesSection from "@/components/sections/TableGamesSection";
import BonusBuysSection from "@/components/sections/BonusBuysSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import RecentWinners from "@/components/sections/RecentWinners";
import GameCard from "@/components/ui/GameCard";

const allGamesDatabase = [
  { image: "/games/slots/slot-2.png", title: "SWEET BONANZA SUPER SCATTER", category: "Slots" },
  { image: "/games/slots/slot-3.png", title: "SWEET BONANZA", category: "Slots" },
  { image: "/games/slots/slot-4.png", title: "RETRO SWEETS", category: "Slots" },
  { image: "/games/slots/slot-5.png", title: "SWEET BONANZA CANDYLAND", category: "Slots" },
  { image: "/games/slots/slot-6.png", title: "SWEET CRAZE", category: "Slots" },
  { image: "/games/slots/slot-7.png", title: "SWEET RUSH MEGAWAYS", category: "Slots" },
  { image: "/games/slots/slot-1.png", title: "SWEET LAND", category: "Slots" },
  { image: "/games/slots/slot-1.png", title: "PATRICK VS NEFERTITI", category: "Slots" },
  { image: "/games/table/table-1.png", title: "AMERICAN ROULETTE", category: "Table Games" },
  { image: "/games/slots/slot-3.png", title: "CASH-O-MATIC! EXTREME CASH OUT", category: "Slots" },
  { image: "/games/table/table-2.png", title: "RIDE'EM POKER", category: "Table Games" },
  { image: "/games/original/original-1.png", title: "ALLY ALIENS", category: "Originals" },
  { image: "/games/original/original-2.png", title: "NEON SHAPES", category: "Originals" },
  { image: "/games/original/original-3.png", title: "COSMIC QUEST", category: "Originals" },
  { image: "/games/original/original-4.png", title: "CYBER SPIN", category: "Originals" },
  { image: "/games/crash/crash-1.png", title: "CRASH LANDING", category: "Crash Games" },
  { image: "/games/crash/crash-2.png", title: "NINJA CRASH", category: "Crash Games" },
  { image: "/games/table/table-1.png", title: "ROULETTE PRO", category: "Roulette" },
  { image: "/games/table/table-2.png", title: "LIVE BACCARAT", category: "Baccarat" },
  { image: "/games/table/table-1.png", title: "BLACKJACK VIP", category: "Blackjack" },
];

export default function HomePage() {
  const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const sections = [
    { name: "Slots", Component: SlotsSection },
    { name: "Originals", Component: OriginalsSection },
    { name: "Crash Games", Component: CrashGamesSection },
    { name: "Providers", Component: ProvidersSection },
    { name: "Table Games", Component: TableGamesSection },
    { name: "Bonus Buys", Component: BonusBuysSection },
    { name: "Collection", Component: CollectionsSection },
  ];

  if (activeCategory !== "Lobby") {
    const categoryGames = allGamesDatabase.filter(g => g.category === activeCategory);
    
    // If no games found in DB, just generate some placeholders for the UI
    const displayGames = categoryGames.length > 0 
      ? categoryGames 
      : Array.from({ length: 12 }, (_, i) => ({ 
          image: `/games/slots/slot-${(i % 7) + 1}.png`, 
          title: `${activeCategory} Game ${i + 1}`, 
          category: activeCategory 
        }));

    return (
      <main className="flex w-full flex-none flex-col gap-[30px] md:gap-6 lg:gap-10">
        <div className="flex w-full flex-col gap-[20px] md:gap-6 lg:gap-10">
          <HeroBanner />
          <DepositBanner />
        </div>
        
        <div className="flex flex-col gap-5 w-full">
          <h2 className="font-jost font-extrabold text-[20px] md:text-[24px] uppercase text-white tracking-[0.01em] px-2 md:px-0">
            {activeCategory} GAMES
          </h2>
          <div className="grid grid-cols-2 min-[414px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-[8px] md:gap-3 lg:gap-[12px] px-2 md:px-0">
            {displayGames.map((game, index) => (
              <GameCard 
                key={index}
                image={game.image} 
                title={game.title} 
                onClick={() => {
                  dispatch(setSelectedGame(game));
                  dispatch(openModal("gamePlay"));
                }}
                fluid
              />
            ))}
          </div>
        </div>

        <RecentWinners />  
      </main>
    );
  }

  // Dynamic Sort: Move activeCategory component to the front, keep others in their original order.
  const sortedSections = [...sections].sort((a, b) => {
    if (a.name === activeCategory) return -1;
    if (b.name === activeCategory) return 1;
    return 0;
  });

  return (
    <main className="flex w-full flex-none flex-col gap-[30px] md:gap-6 lg:gap-10">
      <div className="flex w-full flex-col gap-[20px] md:gap-6 lg:gap-10">
        <HeroBanner />
        <DepositBanner />
      </div>

      {/* Render dynamically sorted game categories */}
      {sortedSections.map(({ name, Component }) => (
        <React.Fragment key={name}>
          <Component />
          {name === "Originals" && (
            isAuthenticated ? <PromotionsSection /> : <WhyChooseUs />
          )}
        </React.Fragment>
      ))}

      <RecentWinners />  
    </main>
  );
}
