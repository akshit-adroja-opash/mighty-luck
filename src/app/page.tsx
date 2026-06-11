"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

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
import SeoContent from "@/components/sections/SeoContent";
import CryptoBanner from "@/components/sections/CryptoBanner";

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
    <Container>
      <div className="flex w-full flex-row">
        <div className="w-[232px] flex-none">
          <Sidebar />
        </div>

        <div className="flex w-[1184px] flex-none flex-col px-[24px]">
          <main className="flex w-[1136px] flex-none flex-col gap-[40px]">
            <HeroBanner />
            <DepositBanner />

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
            <SeoContent />
            <CryptoBanner />
            <Footer />
          </main>
        </div>
      </div>
    </Container>
  );
}
