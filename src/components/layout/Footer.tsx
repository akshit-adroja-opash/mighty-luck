import Link from "next/link";
import Logo from "@/components/ui/Logo";

const columns = [
  { title: "SLOT GAMES", links: ["Slots", "Skill Games", "Jackpot", "Bonus Buy", "Crash Games"] },
  { title: "LIVE CASINO", links: ["Roulette", "Blackjack", "Live Casino", "Table Games", "Video Poker"] },
  { title: "CASINO", links: ["About Us", "Promotions", "Tournaments", "Affiliate Program", "Vip Club", "Refer a Friend", "Blog", "Bonus Shop"] },
  { title: "LEGAL", links: ["Privacy Policy", "Terms & Conditions", "Bonus Terms", "Responsible Gambling", "Payment Methods", "Sportsbook Rules"] },
  { title: "SUPPORT", links: ["Live Support"] },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-none flex-col gap-10 md:gap-12 items-start">

      {/* Top Section */}
      <div className="flex w-full flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[49px]">

        {/* Logo & Copyright */}
        <div className="flex flex-col items-start gap-[16px] flex-none w-[213px] h-[81px]">
          <Logo 
            orientation="vertical"
            className="w-[132px] h-[50px] relative"
            iconClassName="h-[24px] w-[32px]"
            textClassName="text-[15px] tracking-widest text-center w-full"
          />
          <p className="font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] w-[213px] flex-none">
            @ 2026 Mighty Luck. All rights reserved.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex flex-wrap xl:flex-nowrap flex-row items-start gap-8 lg:gap-[20px] xl:gap-[32px] w-full lg:w-auto xl:w-[728px] justify-between lg:justify-start">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col items-start gap-[12px] w-auto min-w-[120px] flex-none">
              <span className="w-full h-[17px] font-jost text-[12px] font-bold uppercase leading-[17px] tracking-[0.02em] text-white">
                {col.title}
              </span>
              <div className="flex flex-col items-start gap-[8px] w-full">
                {col.links.map((link) => (
                  <Link
                    href="/"
                    key={link}
                    className="w-full h-[15px] font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-center border-t border-[#112F82] pt-8 gap-6">

        {/* Legal Text */}
        <p className="w-full sm:max-w-[445px] text-justify font-manrope text-[10px] font-semibold leading-[14px] tracking-[0.01em] text-[#D2DCF7]">
          MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
        </p>

        {/* Logos */}
        <div className="flex flex-none flex-row items-center gap-6 sm:gap-8">
          <img src="/games/footer/18.svg" alt="18+" className="h-[38px] w-auto object-contain flex-shrink-0" />
          <img src="/games/footer/gamble-aware.svg" alt="GambleAware" className="h-[20px] sm:h-[24px] w-auto object-contain flex-shrink-0" />
          <img src="/games/footer/gaming-license.svg" alt="Gaming License" className="h-[38px] w-auto object-contain flex-shrink-0" />
        </div>
      </div>

    </footer>
  );
}
