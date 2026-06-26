"use client";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSelectedGame, openModal, setActiveCategory } from "@/store/slices/uiSlice";

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
import CollectionsSection, { CollectionCard, collections } from "@/components/sections/CollectionsSection";
import RecentWinners from "@/components/sections/RecentWinners";
import GameCard from "@/components/ui/GameCard";
import GameCarousel from "@/components/ui/GameCarousel";
import { ProviderCard, providers } from "@/components/sections/ProvidersSection";

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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Slots": return "/games/game-icons/slot.svg";
    case "Originals": return "/games/game-icons/originals.svg";
    case "Crash Games": return "/games/game-icons/crash.svg";
    case "Table Games": return "/games/game-icons/table.svg";
    case "Bonus Buys": return "/games/game-icons/bonus.svg";
    case "All Games": return "/games/side-icon/all.svg";
    case "New Games": return "/games/side-icon/new.svg";
    case "Popular Games": return "/games/side-icon/popular.svg";
    case "Live Casino": return "/games/side-icon/live.svg";
    default: return "/games/game-icons/slot.svg"; // Fallback
  }
};

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
      : Array.from({ length: 28 }, (_, i) => {
          let imgPath = `/games/slots/slot-${(i % 7) + 1}.png`;
          if (activeCategory === 'Originals') imgPath = `/games/original/original-${(i % 8) + 1}.png`;
          if (activeCategory === 'Crash Games') imgPath = `/games/crash/crash-${(i % 2) + 1}.png`;
          if (activeCategory === 'Table Games') imgPath = `/games/table/table-${(i % 2) + 1}.png`;
          
          return {
            image: imgPath,
            title: `${activeCategory} Game ${i + 1}`,
            category: activeCategory
          };
        });

    return (
      <main className="flex w-full flex-none flex-col gap-[30px] md:gap-6 lg:gap-10">
        <div className="flex w-full flex-col gap-[20px] md:gap-6 lg:gap-10">
          <HeroBanner />
          <DepositBanner />
        </div>
        
        <div className="flex flex-col gap-5 w-full">
          {(() => {
            const SectionComponent = sections.find(s => s.name === activeCategory)?.Component;
            
            // Only use the custom Carousel components for special non-game grids
            if (SectionComponent && (activeCategory === "Providers" || activeCategory === "Collection")) {
              let customTitle = activeCategory === "Providers" ? "GAME PROVIDERS" : "COLLECTIONS";
              return <SectionComponent title={customTitle} />;
            }

            return (
              <section className="flex w-full flex-col items-start gap-[12px] md:gap-5">
                <div className="flex w-full flex-row items-center justify-between mb-4">
                  {/* Left Side: Back Arrow, Title, Count */}
                  <div className="flex flex-row items-center gap-[12px]">
                    <button 
                      onClick={() => dispatch(setActiveCategory("Lobby"))}
                      className="flex items-center justify-center w-[24px] h-[24px] md:w-[32px] md:h-[32px] rounded-[6px] hover:bg-[#112F82] transition-colors text-[#A5B8EF] hover:text-white cursor-pointer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <h2 className="font-jost text-[18px] md:text-[24px] font-bold text-white capitalize">
                      {activeCategory === "Collection" ? "Collections" : activeCategory}
                    </h2>
                    <div className="flex items-center justify-center px-[8px] py-[2px] bg-[#00D06C] rounded-[12px] text-[12px] font-bold text-white">
                      91
                    </div>
                  </div>

                  {/* Right Side: Toggle and Provider Dropdown */}
                  <div className="flex flex-row items-center gap-[16px]">
                    <div className="hidden sm:flex items-center gap-[8px]">
                      <span className="text-white text-[12px] font-manrope font-semibold">Show Blocked</span>
                      <button className="relative w-[32px] h-[18px] rounded-full bg-[#00D06C] transition-colors cursor-pointer">
                        <div className="absolute right-[2px] top-[2px] w-[14px] h-[14px] rounded-full bg-white" />
                      </button>
                    </div>
                    <button className="flex items-center gap-[8px] px-[12px] py-[6px] bg-[#112F82] rounded-[6px] hover:bg-[#173EAD] transition-colors cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3H3V10H10V3Z" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 3H14V10H21V3Z" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 14H14V21H21V14Z" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 14H3V21H10V14Z" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[#A5B8EF] text-[12px] font-manrope font-semibold whitespace-nowrap">Provider: All</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-[8px] md:gap-[12px] w-full">
                  {displayGames.map((game, index) => (
                    <div key={index} className="w-full">
                      <GameCard 
                        image={game.image} 
                        title={game.title}
                        fluid={true}
                        onClick={() => {
                          dispatch(setSelectedGame(game));
                          dispatch(openModal("gamePlay"));
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Bottom Area: Progress Bar and Load More */}
                <div className="flex flex-col items-center w-full mt-[20px] md:mt-[40px] mb-[20px] gap-[16px]">
                  <div className="flex flex-col items-center w-full max-w-[300px] gap-[8px]">
                    <div className="w-full h-[4px] bg-[#112F82] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00D06C] rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-[#A5B8EF] text-[12px] font-manrope font-medium tracking-[0.02em]">
                      You viewed 28 out of 91 games
                    </span>
                  </div>
                  <button className="px-[24px] py-[10px] bg-transparent border border-[#1463FF] text-[#1463FF] rounded-[8px] font-manrope font-bold text-[14px] hover:bg-[#1463FF] hover:text-white transition-colors cursor-pointer">
                    Load More
                  </button>
                </div>
              </section>
            );
          })()}
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
