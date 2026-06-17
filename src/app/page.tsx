"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

export default function HomePage() {
  const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const sections = [
    { name: "Slots", Component: SlotsSection },
    { name: "Originals", Component: OriginalsSection },
    { name: "Crash Games", Component: CrashGamesSection },
    { name: "Providers", Component: ProvidersSection },
    { name: "Table Games", Component: TableGamesSection },
    { name: "Bonus Buys", Component: BonusBuysSection },
    { name: "Collection", Component: CollectionsSection },
  ];

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
