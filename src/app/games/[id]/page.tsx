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
  { id: "original-1", title: "Alien Aliens",    image: "/games/original/original-1.png", provider: "BGaming" },
  { id: "original-2", title: "Neon Shapes",     image: "/games/original/original-2.png", provider: "BGaming" },
  { id: "original-3", title: "Cosmic Quest",    image: "/games/original/original-3.png", provider: "BGaming" },
  { id: "original-4", title: "Cyber Spin",      image: "/games/original/original-4.png", provider: "BGaming" },
  { id: "original-5", title: "Fruit Galaxy",    image: "/games/original/original-5.png", provider: "BGaming" },
  { id: "original-6", title: "Lucky Stars",     image: "/games/original/original-6.png", provider: "BGaming" },
  { id: "original-7", title: "Planet Fortune",  image: "/games/original/original-7.png", provider: "BGaming" },
  { id: "original-8", title: "Meteor Dash",     image: "/games/original/original-8.png", provider: "BGaming" },
  { id: "slot-1",            title: "Zeus Goes Bananas",    image: "/games/slots/slot-1.png",         provider: "BGaming" },
  { id: "slot-2",            title: "Ninja Crash Slot",     image: "/games/slots/slot-2.png",         provider: "BGaming" },
  { id: "slot-3",            title: "Space Fortune",        image: "/games/slots/slot-3.png",         provider: "BGaming" },
  { id: "slot-4",            title: "Treasure Island",      image: "/games/slots/slot-4.png",         provider: "BGaming" },
  { id: "slot-5",            title: "Lucky Leprechaun",     image: "/games/slots/slot-5.png",         provider: "BGaming" },
  { id: "slot-6",            title: "Wild Safari",          image: "/games/slots/slot-6.png",         provider: "BGaming" },
  { id: "slot-7",            title: "Mystic Dragon",        image: "/games/slots/slot-7.png",         provider: "BGaming" },
];

/* ─────────────────────────────────────────────────────
   BGaming Logo (Exact visual replica)
───────────────────────────────────────────────────── */
function BGamingLogo() {
  return (
    <div className="flex h-[40px] w-[80px] flex-none items-center justify-center">
      <div className="flex w-[78px] flex-row items-center justify-between">
        <div className="flex h-[13px] w-[13px] flex-none items-center justify-center bg-white">
          <span className="font-sans text-[11px] font-black leading-none text-black">
            B
          </span>
        </div>
        <div className="h-[9px] w-px flex-none bg-white/30" />
        <span className="flex-none font-sans text-[10px] font-bold leading-none text-white">
          G
        </span>
        <div className="h-[9px] w-px flex-none bg-white/30" />
        <span className="flex-none font-sans text-[10px] font-bold leading-none text-white">
          A
        </span>
        <div className="h-[9px] w-px flex-none bg-white/30" />
        <span className="flex-none font-sans text-[10px] font-bold leading-none text-white">
          M
        </span>
        <div className="h-[9px] w-px flex-none bg-white/30" />
        <span className="flex-none font-sans text-[10px] font-bold leading-none text-white">
          I
        </span>
        <div className="h-[9px] w-px flex-none bg-white/30" />
        <span className="flex-none font-sans text-[10px] font-bold leading-none text-white">
          N
        </span>
        <div className="h-[9px] w-px flex-none bg-white/30" />
        <span className="flex-none font-sans text-[10px] font-bold leading-none text-white">
          G
        </span>
      </div>
    </div>
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
            Matches Figma: width 1184px, px 24px (inner content 1136px), gap 100px
        */}
        <div className="flex w-[1184px] flex-none flex-col items-start gap-[100px] px-[24px]">

          {/* ══════════════════════════════
              SECTION 1: Game Block (1067px)
              Contains: Game Window (777px) + Other Games (250px)
              Gap: 40px
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
              <div className="flex h-[100px] w-[1136px] flex-none flex-row items-center justify-between rounded-[16px] bg-[#0C1F56] px-[30px] py-[12px]">
                {/* LEFT: provider + divider + title — 295px, gap 32px */}
                <div className="flex h-[40px] w-[295px] flex-none flex-row items-center gap-[32px]">
                  {/* Provider logo — 80 × 40px, built from Figma */}
                  <BGamingLogo />


                  {/* Divider — 1px × 33px */}
                  <div className="h-[33px] w-px flex-none bg-white/60" />

                  {/* Game title — Jost 700 20px */}
                  <div className="flex w-[151px] flex-none flex-row items-center justify-center gap-[10px]">
                    <span className="w-full text-center font-jost text-[20px] font-bold leading-[29px] text-white">
                      {game.title}
                    </span>
                  </div>
                </div>

                {/* RIGHT: icons + toggle */}
                <div className="flex h-[24px] w-auto flex-none flex-row items-center justify-end gap-[40px]">

                  {/* Icons — 64×20, gap 24 */}
                  <div className="flex h-[20px] w-[64px] flex-none flex-row items-center gap-[24px]">
                    <button className="relative flex h-[20px] w-[20px] flex-none items-center justify-center cursor-pointer hover:opacity-70 transition-opacity" aria-label="Fullscreen">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 5 5 5 5 9" />
                        <line x1="5" y1="5" x2="10" y2="10" />
                        <polyline points="15 5 19 5 19 9" />
                        <line x1="19" y1="5" x2="14" y2="10" />
                        <polyline points="9 19 5 19 5 15" />
                        <line x1="5" y1="19" x2="10" y2="14" />
                        <polyline points="15 19 19 19 19 15" />
                        <line x1="19" y1="19" x2="14" y2="14" />
                      </svg>
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

                  {/* Fun Play / Toggle / Real Play */}
                  <div className="flex h-[24px] w-auto flex-none flex-row items-center gap-[8px]">
                    <span className="whitespace-nowrap font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                      Fun Play
                    </span>

                    {/* Toggle — 42×24, radius 30 */}
                    <button
                      onClick={() => setIsRealPlay(!isRealPlay)}
                      className={`flex h-[24px] w-[42px] flex-none cursor-pointer flex-row items-start gap-[10px] rounded-[30px] transition-colors duration-200 ${
                        isRealPlay ? "justify-end bg-[#1463FF] py-[3px] pl-[20px] pr-[3px]" : "justify-start bg-[#112F82] py-[3px] pl-[3px] pr-[20px]"
                      }`}
                      aria-label="Toggle play mode"
                    >
                      <span className="block h-[18px] w-[18px] shrink-0 rounded-[30px] bg-white" />
                    </button>

                    <span className="whitespace-nowrap font-manrope text-[12px] font-bold leading-[16px] tracking-[0.02em] text-white">
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
                  <span className="whitespace-nowrap flex-none font-jost text-[20px] font-extrabold leading-[29px] tracking-[0.01em] uppercase text-white">
                    OTHER GAMES YOU MIGHT LIKE
                  </span>
                </div>

                {/* Right: View all + arrows */}
                <div className="flex h-[30px] flex-none flex-row items-center gap-[20px]">
                  <span className="whitespace-nowrap cursor-pointer font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#D6BBE7] transition-colors hover:text-white">
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
