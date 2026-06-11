"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal, openModal, setActiveCategory, setSelectedGame } from "@/store/slices/uiSlice";
import GameCard from "@/components/ui/GameCard";
import { toast } from "sonner";

export default function LobbyModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals.lobby);
  const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "favorites" | "new">("all");
  const [activePage, setActivePage] = useState(0);
  const providersRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    const percentage = target.scrollLeft / maxScroll;
    const page = Math.min(2, Math.max(0, Math.round(percentage * 2)));
    setActivePage(page);
  };

  const handleDotClick = (pageIndex: number) => {
    const target = providersRef.current;
    if (!target) return;
    const maxScroll = target.scrollWidth - target.clientWidth;
    const scrollToX = (maxScroll * pageIndex) / 2;
    target.scrollTo({
      left: scrollToX,
      behavior: "smooth",
    });
    setActivePage(pageIndex);
  };

  if (!isOpen) return null;

  const popularGames = [
    { image: "/games/1.png", title: "PATRICK VS NEFERTITI" },
    { image: "/games/2.png", title: "SWEET BONANZA SUPER SCATTER" },
    { image: "/games/3.png", title: "AMERICAN ROULETTE" },
    { image: "/games/4.png", title: "CASH-O-MATIC! EXTREME CASH OUT" },
    { image: "/games/5.png", title: "RIDE'EM POKER" },
  ];

  const providers = [
    { name: "Belatra", games: 226, logo: "/providers/belatra.png" },
    { name: "BGaming", games: 226, logo: "/providers/bgaming.png" },
    { name: "TaDa Gaming", games: 226, logo: "/providers/tada.png" },
    { name: "Endorphina", games: 226, logo: "/providers/endorphina.png" },
    { name: "Nolimit City", games: 226, logo: "/providers/nolimit.png" },
    { name: "BGaming", games: 226, logo: "/providers/bgaming.png" },
    { name: "Belatra", games: 226, logo: "/providers/belatra.png" },
    { name: "TaDa Gaming", games: 226, logo: "/providers/tada.png" },
  ];

  const handleCategoryClick = (categoryName: string) => {
    dispatch(setActiveCategory(categoryName));
    dispatch(closeModal("lobby"));
    toast.success(`Category switched to ${categoryName}`);
  };

  const handleGameClick = (game: { title: string; image: string }) => {
    dispatch(setSelectedGame(game));
    dispatch(openModal("gamePlay"));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal("lobby"));
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Modal Container: 1056px x 636px */}
      <div className="relative flex flex-row items-start bg-[#091741] rounded-[20px] p-[24px] gap-[20px] w-[1056px] h-[636px] border border-white/5 shadow-2xl overflow-visible select-none animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button (floating outside top-right) */}
        <button
          onClick={() => dispatch(closeModal("lobby"))}
          className="absolute -top-[6px] -right-[32px] text-white hover:text-[#A5B8EF] transition-colors cursor-pointer z-[110]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Left Sidebar: 180px x 588px */}
        <div className="flex flex-col justify-center items-start gap-[12px] w-[180px] h-[588px] flex-none">
          
          {/* Box 1: Nav Options */}
          <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[200px] bg-[#0C1F56] rounded-[12px] flex-none">
            <div className="flex flex-col items-start gap-[8px] w-[148px] h-[168px] flex-grow">
              
              {/* All Games */}
              <button
                onClick={() => {
                  setActiveTab("all");
                  dispatch(setActiveCategory("Lobby"));
                }}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeTab === "all" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 1H2C1.45 1 1 1.45 1 2V10C1 10.55 1.45 11 2 11H14C14.55 11 15 10.55 15 10V2C15 1.45 14.55 1 14 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.5 6H6.5M5.5 5V7M10.5 6.5C10.5 6.78 10.28 7 10 7C9.72 7 9.5 6.78 9.5 6.5C9.5 6.22 9.72 6 10 6C10.28 6 10.5 6.22 10.5 6.5ZM12.5 5.5C12.5 5.78 12.28 6 12 6C11.72 6 11.5 5.78 11.5 5.5C11.5 5.22 11.72 5 12 5C12.28 5 12.5 5.22 12.5 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">All Games</span>
                </div>
              </button>

              {/* Recently Played */}
              <button
                onClick={() => {
                  setActiveTab("recent");
                  toast.info("Showing recently played games.");
                }}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeTab === "recent" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 4.5V8.5L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Recently Played</span>
                </div>
              </button>

              {/* Favorites */}
              <button
                onClick={() => {
                  setActiveTab("favorites");
                  toast.info("Showing favorite games.");
                }}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeTab === "favorites" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 13.5C8 13.5 1.5 10 1.5 5.5C1.5 3 3.5 1.5 5.5 1.5C6.8 1.5 7.6 2.3 8 3C8.4 2.3 9.2 1.5 10.5 1.5C12.5 1.5 14.5 3 14.5 5.5C14.5 10 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Favorites</span>
                </div>
              </button>

              {/* New Releases */}
              <button
                onClick={() => {
                  setActiveTab("new");
                  toast.info("Showing new releases.");
                }}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeTab === "new" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1L9.7 4.7L13.7 5.2L10.7 7.9L11.5 12L8 9.8L4.5 12L5.3 7.9L2.3 5.2L6.3 4.7L8 1Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">New Releases</span>
                </div>
              </button>

            </div>
          </div>

          {/* Box 2: Game Types */}
          <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[376px] bg-[#0C1F56] rounded-[12px] flex-none">
            <div className="flex flex-col items-start gap-[8px] w-[148px] h-[344px] flex-grow">
              
              {/* Original */}
              <button
                onClick={() => handleCategoryClick("Originals")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Originals" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 6H6.5V1L1.5 10H5.5V15L10.5 6Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Original</span>
                </div>
              </button>

              {/* Slots */}
              <button
                onClick={() => handleCategoryClick("Slots")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Slots" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3V9M8 3C8 3 9 1 11.5 1C12.5 1 13.5 2 13.5 3.5C13.5 6 11 8.5 11 8.5M8 3C8 3 7 1 4.5 1C3.5 1 2.5 2 2.5 3.5C2.5 6 5 8.5 5 8.5" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="5" cy="11" r="3" fill="currentColor"/>
                      <circle cx="11" cy="11" r="3" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Slots</span>
                </div>
              </button>

              {/* Roulette */}
              <button
                onClick={() => handleCategoryClick("Table Games")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Table Games" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Roulette</span>
                </div>
              </button>

              {/* Crash Games */}
              <button
                onClick={() => handleCategoryClick("Crash Games")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Crash Games" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 2.5C13.5 2.5 12.5 3.5 10 3.5C7.5 3.5 5.5 5.5 5.5 8C5.5 9 6.5 10.5 6.5 10.5M13.5 2.5C13.5 2.5 12.5 1.5 10 1.5C7.5 1.5 5.5 3.5 5.5 6M13.5 2.5L10 6M5.5 8L1.5 12.5L3.5 14.5L8 10.5M2 14L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Crash Games</span>
                </div>
              </button>

              {/* Table Games */}
              <button
                onClick={() => handleCategoryClick("Table Games")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Table Games" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 4.5V13.5C1.5 14 2 14.5 2.5 14.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="4.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="9.5" cy="6.5" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Table Games</span>
                </div>
              </button>

              {/* Live Casino */}
              <button
                onClick={() => handleCategoryClick("Live Casino")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Live Casino" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2.5C9.1 2.5 10 3.4 10 4.5C10 5.6 9.1 6.5 8 6.5C6.9 6.5 6 5.6 6 4.5C6 3.4 6.9 2.5 8 2.5ZM8 6.5C9.1 6.5 10 7.4 10 8.5C10 9.6 9.1 10.5 8 10.5C6.9 10.5 6 9.6 6 8.5C6 7.4 6.9 6.5 8 6.5ZM4.5 8.5C4.5 7.4 5.4 6.5 6.5 6.5C7.6 6.5 8.5 7.4 8.5 8.5C8.5 9.6 7.6 10.5 6.5 10.5C5.4 10.5 4.5 9.6 4.5 8.5ZM8 10.5L8 14.5M6 14.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Live Casino</span>
                </div>
              </button>

              {/* Baccarat */}
              <button
                onClick={() => handleCategoryClick("Table Games")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Baccarat" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.5L2 4V9C2 12.2 4.5 14 8 14.5C11.5 14 14 12.2 14 9V4L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.5 8H10.5M8 5.5V10.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Baccarat</span>
                </div>
              </button>

              {/* Blackjack */}
              <button
                onClick={() => handleCategoryClick("Table Games")}
                className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] flex-none transition-all cursor-pointer ${
                  activeCategory === "Blackjack" ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
                }`}
              >
                <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.5" y="4.5" width="8" height="10" rx="1" transform="rotate(-15 1.5 4.5)" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="6.5" y="2.5" width="8" height="10" rx="1" transform="rotate(10 6.5 2.5)" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Blackjack</span>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Right Content: 808px x 532px */}
        <div className="flex flex-col items-start gap-[40px] w-[808px] h-[532px] flex-none overflow-hidden">
          
          {/* Search bar row */}
          <div className="flex flex-row items-center px-[20px] py-[10px] gap-[10px] w-[808px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
            <div className="w-[16px] h-[16px] flex items-center justify-center flex-none text-[#BBCAF3]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Start typing a game name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white outline-none w-full font-manrope text-[14px] font-semibold leading-[19px] placeholder-[#BBCAF3]"
            />
          </div>

          {/* Lobby Content Blocks */}
          <div className="flex flex-col items-start gap-[32px] w-[856px] h-[452px] flex-none">
            
            {/* Popular Games block */}
            <div className="flex flex-col gap-[20px] w-[808px] h-[249px] flex-none">
              <div className="flex flex-row justify-between items-center w-[808px] h-[29px] flex-none">
                <div className="flex flex-row items-center gap-[8px] h-[29px]">
                  <div className="w-[20px] h-[20px] flex items-center justify-center text-[#FFBF1F]">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6667 8.33333C12.375 7.625 12.875 6.20833 13.0833 5.375C14.7917 7.04167 15 10.6667 15 11.6667C15 15.3486 11.8661 18.3333 8 18.3333C4.13391 18.3333 1 15.3486 1 11.6667C1 7.98477 4.13391 5 8 5C8.83333 5 9.625 5.58333 10.2083 6.16667L11.6667 8.33333Z" stroke="#FFBF1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.00008 14.1667C9.38079 14.1667 10.5001 13.0474 10.5001 11.6667C10.5001 10.2859 9.38079 9.16667 8.00008 9.16667C6.61937 9.16667 5.50008 10.2859 5.50008 11.6667C5.50008 13.0474 6.61937 14.1667 8.00008 14.1667Z" stroke="#FFBF1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white select-none">
                    Popular Games
                  </span>
                </div>
              </div>

              {/* 5 Cards Row */}
              <div className="flex flex-row items-center gap-[12px] w-[808px] h-[200px] flex-none">
                {popularGames
                  .filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .slice(0, 5)
                  .map((game, index) => (
                    <div key={index} className="flex-none">
                      <GameCard 
                        image={game.image} 
                        title={game.title} 
                        onClick={() => handleGameClick(game)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Game Providers block */}
            <div className="flex flex-col gap-[20px] w-[856px] h-[171px] flex-none">
              
              <div className="flex flex-row justify-between items-center w-[856px] h-[29px] flex-none">
                <div className="flex flex-row items-center gap-[8px] h-[29px]">
                  <div className="w-[20px] h-[20px] flex items-center justify-center text-[#FFC83D]">
                    <svg width="15" height="20" viewBox="0 0 15 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7.5" cy="5" r="4.25" stroke="#FFC83D" strokeWidth="1.5"/>
                      <path d="M1.5 18.5C1.5 14.5 4.18629 11.5 7.5 11.5C10.8137 11.5 13.5 14.5 13.5 18.5" stroke="#FFC83D" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white select-none">
                    Game Providers
                  </span>
                </div>
              </div>

              {/* 5 Providers row */}
              <div className="flex flex-col gap-[16px] w-[856px] h-[122px] flex-none">
                <div
                  ref={providersRef}
                  onScroll={handleScroll}
                  className="flex flex-row items-center gap-[12px] w-[856px] h-[100px] flex-none overflow-x-auto scrollbar-none snap-x snap-mandatory"
                >
                  {providers.map((p, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        dispatch(setActiveCategory("Providers"));
                        dispatch(closeModal("lobby"));
                        toast.success(`Selected provider ${p.name}`);
                      }}
                      className="group flex flex-col justify-center items-center p-[12px] px-[24px] gap-[8px] w-[152px] h-[100px] bg-[#0C1F56] hover:bg-[#112f82]/50 border border-white/5 hover:border-white/10 rounded-[12px] flex-none cursor-pointer transition-all snap-start"
                    >
                      <div className="flex h-[40px] w-[80px] flex-none items-center justify-center">
                        <span className="text-center text-[12px] font-extrabold uppercase leading-tight tracking-wider text-white select-none group-hover:scale-105 transition-transform">
                          {p.name}
                        </span>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-[10px] w-[104px] h-[14px] flex-none">
                        <span className="font-manrope text-[10px] font-semibold leading-[14px] text-center text-[#FFC83D]">
                          {p.games} Games
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination dots */}
                <div className="flex flex-col items-center w-[856px] h-[6px] flex-none">
                  <div className="flex flex-row justify-center items-center gap-[4px] w-[32px] h-[6px] flex-none">
                    <button
                      onClick={() => handleDotClick(0)}
                      className={`h-[6px] rounded-[150px] transition-all cursor-pointer flex-none ${
                        activePage === 0 ? "w-[12px] bg-[#BBCAF3]" : "w-[6px] bg-[#BBCAF3]/50 hover:bg-[#BBCAF3]/80"
                      }`}
                      aria-label="Page 1"
                    />
                    <button
                      onClick={() => handleDotClick(1)}
                      className={`h-[6px] rounded-[150px] transition-all cursor-pointer flex-none ${
                        activePage === 1 ? "w-[12px] bg-[#BBCAF3]" : "w-[6px] bg-[#BBCAF3]/50 hover:bg-[#BBCAF3]/80"
                      }`}
                      aria-label="Page 2"
                    />
                    <button
                      onClick={() => handleDotClick(2)}
                      className={`h-[6px] rounded-[150px] transition-all cursor-pointer flex-none ${
                        activePage === 2 ? "w-[12px] bg-[#BBCAF3]" : "w-[6px] bg-[#BBCAF3]/50 hover:bg-[#BBCAF3]/80"
                      }`}
                      aria-label="Page 3"
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
