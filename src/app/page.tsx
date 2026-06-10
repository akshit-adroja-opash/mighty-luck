import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

import HeroBanner from "@/components/sections/HeroBanner";
import DepositBanner from "@/components/sections/DepositBanner";
import SlotsSection from "@/components/sections/SlotsSection";
import OriginalsSection from "@/components/sections/OriginalsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CrashGamesSection from "@/components/sections/CrashGamesSection";
import ProvidersSection from "@/components/sections/ProvidersSection";
import TableGamesSection from "@/components/sections/TableGamesSection";
import BonusBuysSection from "@/components/sections/BonusBuysSection"
import CollectionsSection from "@/components/sections/CollectionsSection";
import RecentWinners from "@/components/sections/RecentWinners";
import SeoContent from "@/components/sections/SeoContent";
import CryptoBanner from "@/components/sections/CryptoBanner";

export default function HomePage() {
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

          <SlotsSection />

          <OriginalsSection />

          <WhyChooseUs />

          <CrashGamesSection />

          <ProvidersSection />

          <TableGamesSection/>

          <BonusBuysSection/>

          <CollectionsSection/>

          <RecentWinners/>  

          <SeoContent/>

          <CryptoBanner/>

          <Footer />
        </main>
        </div>
      </div>
    </Container>
  );
}
