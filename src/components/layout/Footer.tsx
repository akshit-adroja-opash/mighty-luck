import Link from "next/link";

const footerLinks = [
  {
    title: "MENU NAME", // Wait, the screenshot has no titles for columns! Ah, the screenshot shows blank column headers or they are just empty? Actually, looking at the dump, the headers say "MENU NAME". Let's use the actual names from the previous file but styled correctly. Wait, the screenshot doesn't show titles! "Slots, Skill Games..." is at the very top of the column! 
    // Ah, wait! The dump says "MENU NAME" display: flex, width 120px height 17px. But in the screenshot, the top item is just "Slots". But let's check the dump again.
    // Dump: "MENU NAME" text, height 17px. Then links underneath. The screenshot has "Slots" as a regular link.
    // Actually, in the screenshot, the columns *don't* have headers! They just start with the links. 
    // Let's look at the dump: it literally has a text block "MENU NAME" with Jost 12px 700 uppercase. I will keep the titles but if they want to hide them later they can. Let's use the titles from the old component.
    title: "CASINO",
    links: ["Slots", "Skill Games", "Jackpot", "Bonus Buy", "Crash Games"],
  },
  {
    title: "LIVE CASINO",
    links: ["Roulette", "Blackjack", "Live Casino", "Table Games", "Video Poker"],
  },
  {
    title: "PROMOS",
    links: ["About Us", "Promotions", "Tournaments", "Affiliate Program", "Vip Club", "Refer a Friend", "Blog", "Bonus Shop"],
  },
  {
    title: "LEGAL",
    links: ["Privacy Policy", "Terms & Conditions", "Bonus Terms", "Responsible Gambling", "Payment Methods", "Sportsbook Rules"],
  },
  {
    title: "SUPPORT",
    links: ["Live Support"],
  },
];

// Re-map to match the screenshot precisely where the titles might just be empty strings or omitted. The user's screenshot literally has NO column headers, just the grey text links starting at the top. I will omit the titles to match the screenshot exactly.
const columns = [
  ["Slots", "Skill Games", "Jackpot", "Bonus Buy", "Crash Games"],
  ["Roulette", "Blackjack", "Live Casino", "Table Games", "Video Poker"],
  ["About Us", "Promotions", "Tournaments", "Affiliate Program", "Vip Club", "Refer a Friend", "Blog", "Bonus Shop"],
  ["Privacy Policy", "Terms & Conditions", "Bonus Terms", "Responsible Gambling", "Payment Methods", "Sportsbook Rules"],
  ["Live Support"],
];

export default function Footer() {
  return (
    <footer className="mt-20 flex w-full flex-col items-center pb-[48px]">
      <div className="flex w-full flex-col gap-[48px]">
        
        {/* Top Section */}
        <div className="flex w-full items-start justify-between">
          
          {/* Logo & Copyright */}
          <div className="flex w-[213px] flex-col items-start gap-[16px]">
            <div className="flex h-[50px] w-[132px] flex-col items-start justify-center">
              <span className="text-2xl text-[#FFC83D] leading-none">👑</span>
              <h2 className="font-jost text-xl font-black uppercase tracking-wide text-[#FFC83D]">
                MIGHTY LUCK
              </h2>
            </div>
            <p className="w-[213px] font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7]">
              @ 2026 Mighty Luck. All rights reserved.
            </p>
          </div>

          {/* Links Grid */}
          <div className="flex w-[728px] items-start gap-[32px]">
            {columns.map((col, idx) => (
              <div key={idx} className="flex w-[120px] flex-col items-start gap-[8px]">
                {col.map((link) => (
                  <Link 
                    href="/" 
                    key={link} 
                    className="flex h-[15px] w-[120px] items-center font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex h-[104px] w-full items-start justify-between border-t border-[#112F82] pt-[48px]">
          
          {/* Legal Text */}
          <p className="w-[445px] text-justify font-manrope text-[10px] font-semibold leading-[14px] tracking-[0.01em] text-[#D2DCF7]">
            MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
          </p>

          {/* Logos */}
          <div className="flex h-[38px] w-[288.5px] items-center justify-end gap-[32px]">
            {/* 18+ Icon */}
            <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D2DCF7] text-[#D2DCF7]">
              <span className="font-sans text-[14px] font-bold leading-none">18+</span>
            </div>
            
            {/* GambleAware text */}
            <div className="flex h-[24px] w-[120px] items-center justify-center text-[18px] tracking-tight text-[#D2DCF7]">
              Gamble<span className="font-bold">Aware</span>
            </div>

            {/* GCB License */}
            <div className="flex h-[38px] w-[66.5px] flex-col items-center justify-center rounded bg-[#20082E] text-[#D2DCF7]">
              <span className="font-sans text-[16px] font-black leading-none">GCB</span>
              <span className="font-sans text-[6px] font-semibold tracking-wider">cert.gcb.cw</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}