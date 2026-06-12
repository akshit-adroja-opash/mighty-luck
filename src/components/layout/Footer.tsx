import Link from "next/link";

const columns = [
  { title: "CASINO", links: ["Slots", "Skill Games", "Jackpot", "Bonus Buy", "Crash Games"] },
  { title: "LIVE CASINO", links: ["Roulette", "Blackjack", "Live Casino", "Table Games", "Video Poker"] },
  { title: "PROMOS", links: ["About Us", "Promotions", "Tournaments", "Affiliate Program", "Vip Club", "Refer a Friend", "Blog", "Bonus Shop"] },
  { title: "LEGAL", links: ["Privacy Policy", "Terms & Conditions", "Bonus Terms", "Responsible Gambling", "Payment Methods", "Sportsbook Rules"] },
  { title: "SUPPORT", links: ["Live Support"] },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-none flex-col gap-10 md:gap-12 items-start pb-10 md:pb-12">

      {/* Top Section */}
      <div className="flex w-full flex-col md:flex-row justify-between items-start gap-8 md:gap-6">

        {/* Logo & Copyright */}
        <div className="flex flex-col items-start gap-4 flex-none">
          <div className="flex flex-col items-start justify-center">
            <svg width="32" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-0.5">
              <defs>
                <linearGradient id="footer-logo-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="12%" stopColor="#FFD85A" />
                  <stop offset="86.68%" stopColor="#FFB800" />
                </linearGradient>
              </defs>
              <path d="M2 13L6 4L10 8L12 2L14 8L18 4L22 13H2Z" fill="url(#footer-logo-gold)" />
              <circle cx="12" cy="1.5" r="1" fill="url(#footer-logo-gold)" />
              <circle cx="6" cy="3.5" r="0.75" fill="url(#footer-logo-gold)" />
              <circle cx="18" cy="3.5" r="0.75" fill="url(#footer-logo-gold)" />
            </svg>
            <h2 className="font-jost text-[15px] font-black uppercase tracking-[0.05em] text-white leading-none">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </h2>
          </div>
          <p className="font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] max-w-[213px]">
            @ 2026 Mighty Luck. All rights reserved.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full md:w-auto">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col items-start gap-3">
              <span className="font-jost text-[12px] font-bold uppercase tracking-[0.02em] text-white">
                {col.title}
              </span>
              <div className="flex flex-col items-start gap-2">
                {col.links.map((link) => (
                  <Link
                    href="/"
                    key={link}
                    className="font-manrope text-[11px] font-semibold leading-[15px] tracking-[0.01em] text-[#D2DCF7] transition-colors hover:text-white"
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
          <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D2DCF7] text-[#D2DCF7]">
            <span className="font-sans text-[14px] font-bold leading-none">18+</span>
          </div>
          <div className="flex h-[24px] items-center justify-center text-[18px] tracking-tight text-[#D2DCF7]">
            Gamble<span className="font-bold">Aware</span>
          </div>
          <div className="flex h-[38px] w-[66px] flex-shrink-0 flex-col items-center justify-center rounded bg-[#20082E] text-[#D2DCF7]">
            <span className="font-sans text-[16px] font-black leading-none">GCB</span>
            <span className="font-sans text-[6px] font-semibold tracking-wider">cert.gcb.cw</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
