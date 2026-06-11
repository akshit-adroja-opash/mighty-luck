import Link from "next/link";

const columns = [
  {
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

export default function Footer() {
  return (
    <footer className="flex w-[1136px] h-[357px] flex-none flex-col gap-[48px] items-start pb-[48px]">
      
      {/* Top Section */}
      <div className="flex w-[1136px] h-[205px] flex-none flex-row justify-between items-start">
        
        {/* Logo & Copyright */}
        <div className="flex w-[213px] h-[81px] flex-none flex-col items-start gap-[16px]">
          <div className="relative w-[130.49px] h-[50px] flex flex-col items-start justify-center">
            {/* Crown Logo SVG with gold gradient */}
            <svg width="32" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-0.5">
              <defs>
                <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="12%" stopColor="#FFD85A" />
                  <stop offset="86.68%" stopColor="#FFB800" />
                </linearGradient>
              </defs>
              <path d="M2 13L6 4L10 8L12 2L14 8L18 4L22 13H2Z" fill="url(#logo-gold)" />
              <circle cx="12" cy="1.5" r="1" fill="url(#logo-gold)" />
              <circle cx="6" cy="3.5" r="0.75" fill="url(#logo-gold)" />
              <circle cx="18" cy="3.5" r="0.75" fill="url(#logo-gold)" />
            </svg>
            <h2 className="font-jost text-[15px] font-black uppercase tracking-[0.05em] text-white leading-none">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </h2>
          </div>
          <p className="w-[213px] font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7]">
            @ 2026 Mighty Luck. All rights reserved.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex w-[728px] h-[205px] flex-none flex-row items-start justify-between gap-[32px]">
          {columns.map((col, idx) => (
            <div key={idx} className="flex w-[120px] flex-col items-start gap-[12px]">
              {/* MENU NAME */}
              <span className="font-jost text-[12px] font-bold uppercase tracking-[0.02em] text-white">
                {col.title}
              </span>
              
              {/* List of items */}
              <div className="flex flex-col items-start gap-[8px] w-[120px]">
                {col.links.map((link) => (
                  <Link 
                    href="/" 
                    key={link} 
                    className="flex h-[15px] w-[120px] items-center font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] transition-colors hover:text-white"
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
      <div className="flex h-[104px] w-[1136px] flex-none flex-row justify-between items-start border-t border-[#112F82] pt-[48px] gap-[10px]">
        
        {/* Legal Text */}
        <p className="w-[445px] h-[56px] text-justify font-manrope text-[10px] font-semibold leading-[14px] tracking-[0.01em] text-[#D2DCF7]">
          MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
        </p>

        {/* Logos */}
        <div className="flex h-[38px] w-[288.5px] flex-none flex-row items-center justify-end gap-[32px]">
          {/* 18+ Icon */}
          <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D2DCF7] text-[#D2DCF7]">
            <span className="font-sans text-[14px] font-bold leading-none">18+</span>
          </div>
          
          {/* GambleAware text */}
          <div className="flex h-[24px] w-[120px] items-center justify-center text-[18px] tracking-tight text-[#D2DCF7]">
            Gamble<span className="font-bold">Aware</span>
          </div>

          {/* GCB License */}
          <div className="flex h-[38px] w-[66.5px] flex-shrink-0 flex-col items-center justify-center rounded bg-[#20082E] text-[#D2DCF7]">
            <span className="font-sans text-[16px] font-black leading-none">GCB</span>
            <span className="font-sans text-[6px] font-semibold tracking-wider">cert.gcb.cw</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
