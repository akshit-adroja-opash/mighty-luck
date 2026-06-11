"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import SeoContent from "@/components/sections/SeoContent";
import CryptoBanner from "@/components/sections/CryptoBanner";
import GameCard from "@/components/ui/GameCard";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Mock game database (replace with real API)
───────────────────────────────────────────── */
const allGames = [
  { id: "pandarific",        title: "Pandarific",           image: "/games/originals/pandarific.png", provider: "BGaming" },
  { id: "zeus-goes-bananas", title: "Zeus Goes Bananas",    image: "/games/originals/zeus.png",       provider: "BGaming" },
  { id: "patrick",           title: "Patrick vs Nefertiti", image: "/games/originals/patrick.png",    provider: "BGaming" },
  { id: "scroll-of-gods",    title: "Scroll Of Gods",       image: "/games/originals/gods.png",       provider: "BGaming" },
  { id: "xo-paradise",       title: "XO Paradise",          image: "/games/originals/xo.png",         provider: "BGaming" },
  { id: "cash-o-matic",      title: "Cash-O-Matic",         image: "/games/originals/cash.png",       provider: "BGaming" },
  { id: "elven-fortune",     title: "Elven Fortune",        image: "/games/originals/elven.png",      provider: "BGaming" },
  { id: "ally-aliens",       title: "Ally Aliens",          image: "/games/slots/ally-aliens.png",    provider: "BGaming" },
  { id: "cactus-goes-nuts",  title: "Cactus Goes Nuts",     image: "/games/slots/cactus.png",         provider: "BGaming" },
  { id: "panthers-riches",   title: "Panther's Riches",     image: "/games/slots/panthers.png",       provider: "BGaming" },
];

/* ─────────────────────────────────────────────────────
   BGaming white logo — built from Figma percentage specs
   Container: 80 × 40px
   bgaming_white box: 77.87 × 11.87px, centered
   
   Percentages are relative to the 77.87 × 11.87px box:
   Fill-1  (B body):   left 1.25%→right 84.25%   top 35%→bottom 35.39%
   Fill-4  (B middle): left 28.96%→right 12.36%   top 35.07%→bottom 35.32%  opacity 0.2
   Fill-6  (GAMING):   left 18.17%→right 1.41%    top 39.54%→bottom 39.8%
───────────────────────────────────────────────────── */
function BGamingLogo() {
  // The inner wordmark box dimensions (Figma: bgaming_white)
  const W = 77.87;
  const H = 11.87;

  // Fill-1: the "B" letter block
  const f1L = W * 0.0125;
  const f1R = W * 0.8425;
  const f1T = H * 0.35;
  const f1B = H * 0.3539;
  const f1W = W - f1L - f1R;
  const f1H = H - f1T - f1B;

  // Fill-4: semi-transparent middle stripe of the "B"
  const f4L = W * 0.2896;
  const f4R = W * 0.1236;
  const f4T = H * 0.3507;
  const f4B = H * 0.3532;
  const f4W = W - f4L - f4R;
  const f4H = H - f4T - f4B;

  // Fill-6: "GAMING" text bar
  const f6L = W * 0.1817;
  const f6R = W * 0.0141;
  const f6T = H * 0.3954;
  const f6B = H * 0.398;
  const f6W = W - f6L - f6R;
  const f6H = H - f6T - f6B;

  return (
    <div
      className="relative flex-none"
      style={{ width: "80px", height: "40px" }}
    >
      {/* bgaming_white: 77.87 × 11.87px centered in 80 × 40 */}
      <div
        className="absolute"
        style={{
          width: `${W}px`,
          height: `${H}px`,
          left: `calc(50% - ${W / 2 + 0.06}px)`,
          top:  `calc(50% - ${H / 2 + 0.06}px)`,
        }}
      >
        {/* "B" letter — Fill-1 */}
        <div
          className="absolute bg-white"
          style={{ left: f1L, top: f1T, width: f1W, height: f1H }}
        />
        {/* Semi-transparent mid-bar of "B" — Fill-4 */}
        <div
          className="absolute bg-white"
          style={{ left: f4L, top: f4T, width: f4W, height: f4H, opacity: 0.2 }}
        />
        {/* "GAMING" word bar — Fill-6 */}
        <div
          className="absolute bg-white"
          style={{ left: f6L, top: f6T, width: f6W, height: f6H }}
        />
      </div>
    </div>
  );
}

/* Fullscreen / Expand icon — matches Figma Vector (5%, 14.17%, 5.83%) */
function ExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7V3H7"   stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 7V3H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 13V17H7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 13V17H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


export default function GamePage() {
  const params  = useParams();
  const router  = useRouter();
  const id      = params?.id as string;

  const game       = allGames.find((g) => g.id === id) ?? allGames[0];
  const otherGames = allGames.filter((g) => g.id !== game.id);

  const [isRealPlay, setIsRealPlay] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -328, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 328,  behavior: "smooth" });

  return (
    <Container>
      <div className="flex w-full flex-row">
        {/* Sidebar */}
        <div className="w-[232px] flex-none">
          <Sidebar />
        </div>

        {/* ── Main column ──
            Figma: width 1184px, padding 0px 24px, gap 100px
        ── */}
        <div
          className="flex flex-none flex-col items-start"
          style={{ width: "1184px", padding: "24px 24px 0", gap: "100px" }}
        >

          {/* ══════════════════════════════
              SECTION 1: Game + Other Games
              Figma: 1136px, gap: 40px
          ══════════════════════════════ */}
          <div className="flex w-[1136px] flex-none flex-col items-start gap-[40px]">

            {/* ── Game Preview + Info Bar (gap: 20px) ── */}
            <div className="flex w-[1136px] flex-none flex-col items-start gap-[20px]">

              {/* Game Preview — 1136 × 657px */}
              <div className="relative h-[657px] w-[1136px] flex-none overflow-hidden rounded-[16px]">
                <Image
                  src="/game 1.png"
                  alt={game.title}
                  fill
                  sizes="1136px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Info Bar — 1136 × 100px */}
              <div
                className="flex h-[100px] w-[1136px] flex-none flex-row items-center justify-between rounded-[16px] bg-[#0C1F56]"
                style={{ padding: "12px 30px", gap: "12px" }}
              >
                {/* LEFT: provider + divider + title — 295px, gap 32px */}
                <div className="flex h-[40px] w-[295px] flex-none flex-row items-center gap-[32px]">
                  {/* Provider logo — 80 × 40px, built from Figma */}
                  <BGamingLogo />


                  {/* Divider — 1px × 33px */}
                  <div className="h-[33px] w-px flex-none bg-white/60" />

                  {/* Game title — Jost 700 20px, 151 × 29px */}
                  <div className="flex h-[29px] w-[151px] flex-none items-center justify-center">
                    <span className="w-[151px] text-center font-jost text-[20px] font-bold leading-[29px] text-white">
                      {game.title}
                    </span>
                  </div>
                </div>

                {/* RIGHT: icons + toggle — 265px, gap 40px, justify-end */}
                <div className="flex h-[24px] w-[265px] flex-none flex-row items-center justify-end gap-[40px]">

                  {/* Icons — 64×20, gap 24 */}
                  <div className="flex h-[20px] w-[64px] flex-none flex-row items-center gap-[24px]">
                    <button className="flex h-[20px] w-[20px] flex-none items-center justify-center cursor-pointer hover:opacity-70 transition-opacity" aria-label="Fullscreen">
                      <ExpandIcon />
                    </button>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="flex h-[20px] w-[20px] flex-none items-center justify-center cursor-pointer"
                      aria-label="Favourite"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.67A4 4 0 0 1 17 8c0 4.65-7 9-7 9z"
                          fill={isFavorite ? "#FFC83D" : "none"}
                          stroke={isFavorite ? "#FFC83D" : "white"}
                          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Fun Play / Toggle / Real Play — 161×24, gap 8 */}
                  <div className="flex h-[24px] w-[161px] flex-none flex-row items-center gap-[8px]">
                    <span className="h-[16px] w-[49px] flex-none font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                      Fun Play
                    </span>

                    {/* Toggle — 42×24, radius 30, padding 3px 3px 3px 20px (Real=on) */}
                    <button
                      onClick={() => setIsRealPlay(!isRealPlay)}
                      className="flex-none cursor-pointer transition-colors duration-200"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        padding: isRealPlay ? "3px 3px 3px 20px" : "3px 20px 3px 3px",
                        gap: "10px",
                        width: "42px",
                        height: "24px",
                        background: isRealPlay ? "#1463FF" : "#112F82",
                        borderRadius: "30px",
                      }}
                      aria-label="Toggle play mode"
                    >
                      <span style={{ display: "block", width: "18px", height: "18px", background: "#FFFFFF", borderRadius: "30px", flexShrink: 0 }} />
                    </button>

                    <span className="h-[16px] w-[54px] flex-none font-manrope text-[12px] font-bold leading-[16px] tracking-[0.02em] text-white">
                      Real Play
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── OTHER GAMES YOU MIGHT LIKE — 1136 × 250px, gap 20px ── */}
            <div className="flex h-[250px] w-[1136px] flex-none flex-col items-start gap-[20px]">

              {/* Header — 1136 × 30px */}
              <div className="flex h-[30px] w-[1136px] flex-none flex-row items-center justify-between">
                {/* Left: icon + title */}
                <div className="flex h-[30px] flex-none flex-row items-center gap-[12px]">
                  <div className="relative h-[30px] w-[30px] flex-none">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M15 1L6 11V19C6 25.5 10.5 29 15 30C19.5 29 24 25.5 24 19V11L15 1Z" fill="#FFBF1F"/>
                    </svg>
                  </div>
                  <span className="h-[29px] w-[332px] flex-none font-jost text-[20px] font-extrabold leading-[29px] tracking-[0.01em] uppercase text-white">
                    OTHER GAMES YOU MIGHT LIKE
                  </span>
                </div>

                {/* Right: View all + arrows */}
                <div className="flex h-[30px] flex-none flex-row items-center gap-[20px]">
                  <span className="h-[16px] w-[45px] cursor-pointer font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#D6BBE7] transition-colors hover:text-white">
                    View all
                  </span>
                  <div className="flex flex-row items-center gap-[8px]">
                    <button
                      onClick={scrollLeft}
                      className="flex h-[30px] w-[30px] flex-none cursor-pointer items-center justify-center rounded-[4px] hover:opacity-100 transition-opacity"
                      style={{ background: "#40105C", opacity: 0.4, transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
                      aria-label="Previous"
                    >
                      <ChevronLeft size={12} color="white" />
                    </button>
                    <button
                      onClick={scrollRight}
                      className="flex h-[30px] w-[30px] flex-none cursor-pointer items-center justify-center rounded-[4px] hover:opacity-80 transition-opacity"
                      style={{ background: "#40105C" }}
                      aria-label="Next"
                    >
                      <ChevronRight size={12} color="white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards row — 1136 × 200px, gap 12px */}
              <div
                ref={scrollRef}
                className="flex h-[200px] w-[1136px] flex-none flex-row items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ gap: "12px" }}
              >
                {otherGames.map((g) => (
                  <div key={g.id} className="h-[200px] w-[152px] flex-none">
                    <GameCard
                      image={g.image}
                      title={g.title}
                      onClick={() => router.push(`/games/${g.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════
              SECTION 2: SEO Content (708px)
          ══════════════════════════════ */}
          <SeoContent />

          {/* ══════════════════════════════
              SECTION 3: Crypto Banner (100px)
          ══════════════════════════════ */}
          <CryptoBanner />

          {/* ══════════════════════════════
              SECTION 4: Footer (357px)
              Footer's own mt-[100px] removed;
              parent gap:100px handles spacing
          ══════════════════════════════ */}
          <Footer />
        </div>
      </div>
    </Container>
  );
}
