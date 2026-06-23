"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import GameCard from "@/components/ui/GameCard";
import { Heart, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { openModal } from "@/store/slices/uiSlice";
import React from "react";

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

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      dispatch(openModal("auth"));
    }
  }, [isAuthenticated, router, dispatch]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner, to prevent flash of content
  }

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -328, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 328,  behavior: "smooth" });

  return (
        <div className="flex w-full flex-none flex-col items-start gap-12 lg:gap-[100px]">

          {/* ══════════════════════════════
              SECTION 1: Game Block (1067px)
              SECTION 1: Game Block
              Contains: Game Window + Other Games
              Gap: 40px
          ══════════════════════════════ */}
          <div className="flex w-full flex-none flex-col items-start gap-8 lg:gap-[40px]">

            {/* ── Game Preview + Info Bar (gap: 20px) ── */}
            <div className="flex w-full flex-none flex-col items-start gap-[20px]">
              {/* Game Window Placeholder
                  aspect-[1136/657] ensures height scales correctly with width
               */}
              <div className="relative w-full aspect-[1136/657] flex-none overflow-hidden rounded-[16px]">
                <Image
                  src="/game-1.png"
                  alt={game.title}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Info Bar (100px) */}
              <div className="flex h-auto lg:h-[100px] w-full flex-none flex-col lg:flex-row items-center justify-between rounded-[16px] bg-[#0C1F56] p-4 lg:px-[30px] lg:py-[12px] gap-4 lg:gap-0">
                {/* LEFT: provider + divider + title */}
                <div className="flex h-auto lg:h-[40px] w-full lg:w-auto flex-none flex-row items-center justify-start gap-4 lg:gap-[32px]">
                  {/* Provider logo */}
                  <BGamingLogo />

                  {/* Divider */}
                  <div className="hidden lg:block h-[33px] w-px flex-none bg-white/60" />

                  {/* Game title */}
                  <div className="flex w-auto flex-none flex-row items-center justify-start lg:gap-[10px]">
                    <span className="w-full text-left font-jost text-[16px] lg:text-[20px] font-bold leading-[29px] text-white whitespace-nowrap">
                      {game.title}
                    </span>
                  </div>
                </div>

                {/* RIGHT: icons + toggle */}
                <div className="flex h-auto lg:h-[24px] w-full lg:w-auto flex-none flex-row items-center justify-between lg:justify-end gap-4 lg:gap-[40px]">

                  {/* Icons */}
                  <div className="flex h-[20px] w-auto lg:w-[64px] flex-none flex-row items-center gap-[24px]">
                    <button className="relative flex h-[20px] w-[20px] flex-none items-center justify-center cursor-pointer hover:opacity-70 transition-opacity" aria-label="Fullscreen">
                      <img src="/images/icons/expand.svg" alt="Expand" className="w-full h-full object-contain" />
                    </button>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="flex h-[20px] w-[20px] flex-none items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
                      aria-label="Favourite"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 5.83337C10 5.83337 10 5.83337 9.24 4.83337C8.36 3.67337 7.06 2.83337 5.5 2.83337C3.01 2.83337 1 4.84337 1 7.33337C1 8.26337 1.28 9.12337 1.76 9.83337C2.57 11.0434 10 18.8334 10 18.8334M10 5.83337C10 5.83337 10 5.83337 10.76 4.83337C11.64 3.67337 12.94 2.83337 14.5 2.83337C16.99 2.83337 19 4.84337 19 7.33337C19 8.26337 18.72 9.12337 18.24 9.83337C17.43 11.0434 10 18.8334 10 18.8334"
                          fill={isFavorite ? "#FFC83D" : "none"}
                          stroke={isFavorite ? "#FFC83D" : "white"}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Fun Play / Toggle / Real Play */}
                  <div className="flex h-[24px] w-auto flex-none flex-row items-center gap-[8px]">
                    <span className="whitespace-nowrap font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                      Fun Play
                    </span>

                    {/* Toggle */}
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

            {/* ── OTHER GAMES YOU MIGHT LIKE ── */}
            <div className="flex h-auto lg:h-[250px] w-full flex-none flex-col items-start gap-[20px]">

              {/* Header */}
              <div className="flex w-full flex-row flex-wrap items-center justify-between gap-y-4 gap-x-2">
                {/* Left: icon + title */}
                <div className="flex w-auto flex-row items-center gap-[12px]">
                  <div className="relative h-[24px] w-[24px] sm:h-[30px] sm:w-[30px] flex-none">
                    <svg className="w-full h-full" viewBox="0 0 30 30" fill="none">
                      <path d="M15 1L6 11V19C6 25.5 10.5 29 15 30C19.5 29 24 25.5 24 19V11L15 1Z" fill="#FFBF1F"/>
                    </svg>
                  </div>
                  <h2 className="m-0 font-jost text-[16px] sm:text-[20px] font-extrabold leading-[1.2] sm:leading-[29px] tracking-[0.01em] uppercase text-white">
                    OTHER GAMES YOU MIGHT LIKE
                  </h2>
                </div>

                {/* Right: View all + arrows */}
                <div className="flex w-auto h-[30px] flex-none flex-row items-center gap-[12px]">
                  <span className="whitespace-nowrap cursor-pointer font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#D2DCF7] transition-colors hover:text-white">
                    View all
                  </span>
                  <div className="flex w-auto h-[30px] flex-row items-center gap-[8px]">
                    <button
                      onClick={scrollLeft}
                      className="flex h-[30px] w-[30px] flex-none cursor-pointer items-center justify-center rounded-[4px] hover:opacity-100 transition-opacity bg-[#112F82] opacity-40"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={12} color="white" />
                    </button>
                    <button
                      onClick={scrollRight}
                      className="flex h-[30px] w-[30px] flex-none cursor-pointer items-center justify-center rounded-[4px] hover:opacity-80 transition-opacity bg-[#112F82]"
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
                className="flex w-full h-[160px] sm:h-[185px] lg:h-[200px] flex-none flex-row items-center overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ gap: "12px" }}
              >
                {otherGames.map((g) => (
                  <div key={g.id} className="h-[160px] sm:h-[185px] lg:h-[200px] w-[120px] sm:w-[140px] lg:w-[152px] flex-none">
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
        </div>
  );
}
