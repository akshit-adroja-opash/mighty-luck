"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal, openModal, setActiveCategory, setSelectedGame } from "@/store/slices/uiSlice";
import GameCard from "@/components/ui/GameCard";
import { toast } from "sonner";
import { Heart, Star, LayoutGrid, User, CircleDot, Square } from "lucide-react";

/* ── Icon helpers ── */
const MaskIcon = ({ src }: { src: string }) => (
  <div 
    className="w-full h-full bg-current transition-colors" 
    style={{ 
      WebkitMaskImage: `url(${src})`, 
      maskImage: `url(${src})`, 
      WebkitMaskSize: 'contain', 
      WebkitMaskRepeat: 'no-repeat', 
      WebkitMaskPosition: 'center' 
    }} 
  />
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ── Sidebar nav items with icons ── */
const navIcons: Record<string, React.ReactNode> = {
  all: <MaskIcon src="/games/game-icons/game.svg" />,
  recent: <MaskIcon src="/games/game-icons/recent.svg" />,
  favorites: <MaskIcon src="/games/side-icon/like.svg" />,
  new: <MaskIcon src="/games/side-icon/new-r.svg" />,
};

const navItems = [
  { key: "all", label: "All Games" },
  { key: "recent", label: "Recently Played" },
  { key: "favorites", label: "Favorites" },
  { key: "new", label: "New Releases" },
];

const catIcons: Record<string, React.ReactNode> = {
  Originals: <MaskIcon src="/games/game-icons/originals.svg" />,
  Slots: <MaskIcon src="/games/game-icons/slot.svg" />,
  Roulette: <LayoutGrid size={16} />,
  "Crash Games": <MaskIcon src="/games/game-icons/crash.svg" />,
  "Table Games": <MaskIcon src="/games/game-icons/table.svg" />,
  "Live Casino": <MaskIcon src="/games/side-icon/live-c.svg" />,
  Baccarat: <MaskIcon src="/games/side-icon/baccrarat.svg" />,
  Blackjack: <MaskIcon src="/games/side-icon/blackjack.svg" />,
};

const categoryItems = [
  { key: "Originals", label: "Original" },
  { key: "Slots", label: "Slots" },
  { key: "Table Games", label: "Roulette" },
  { key: "Crash Games", label: "Crash Games" },
  { key: "Table Games2", label: "Table Games", category: "Table Games" },
  { key: "Live Casino", label: "Live Casino" },
  { key: "Baccarat", label: "Baccarat" },
  { key: "Blackjack", label: "Blackjack" },
];

export default function LobbyModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals.lobby);
  const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "favorites" | "new">("all");
  const [activePage, setActivePage] = useState(0);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const providersRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      if (activeCategory === "Lobby") {
        setActiveTab("all");
      }
    }
  }, [isOpen, activeCategory]);

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
    target.scrollTo({ left: scrollToX, behavior: "smooth" });
    setActivePage(pageIndex);
  };

  if (!isOpen) return null;

  const popularGames = [
    { image: "/games/slots/slot-1.png", title: "PATRICK VS NEFERTITI" },
    { image: "/games/slots/slot-2.png", title: "SWEET BONANZA SUPER SCATTER" },
    { image: "/games/table/table-1.png", title: "AMERICAN ROULETTE" },
    { image: "/games/slots/slot-3.png", title: "CASH-O-MATIC! EXTREME CASH OUT" },
    { image: "/games/table/table-2.png", title: "RIDE'EM POKER" },
  ];

  const allGamesDatabase = [
    { image: "/games/slots/slot-2.png", title: "SWEET BONANZA SUPER SCATTER", category: "Slots" },
    { image: "/games/slots/slot-3.png", title: "SWEET BONANZA", category: "Slots" },
    { image: "/games/slots/slot-4.png", title: "RETRO SWEETS", category: "Slots" },
    { image: "/games/slots/slot-5.png", title: "SWEET BONANZA CANDYLAND", category: "Slots" },
    { image: "/games/slots/slot-6.png", title: "SWEET CRAZE", category: "Slots" },
    { image: "/games/slots/slot-7.png", title: "SWEET RUSH MEGAWAYS", category: "Slots" },
    { image: "/games/slots/slot-1.png", title: "SWEET LAND", category: "Slots" },
    { image: "/games/slots/slot-1.png", title: "PATRICK VS NEFERTITI", category: "Slots" },
    { image: "/games/table/table-1.png", title: "AMERICAN ROULETTE", category: "Table Games" },
    { image: "/games/slots/slot-3.png", title: "CASH-O-MATIC! EXTREME CASH OUT", category: "Slots" },
    { image: "/games/table/table-2.png", title: "RIDE'EM POKER", category: "Table Games" },
    { image: "/games/original/original-1.png", title: "ALLY ALIENS", category: "Originals" },
    { image: "/games/original/original-2.png", title: "NEON SHAPES", category: "Originals" },
    { image: "/games/original/original-3.png", title: "COSMIC QUEST", category: "Originals" },
    { image: "/games/original/original-4.png", title: "CYBER SPIN", category: "Originals" },
    { image: "/games/crash/crash-1.png", title: "CRASH LANDING", category: "Crash Games" },
    { image: "/games/crash/crash-2.png", title: "NINJA CRASH", category: "Crash Games" },
    { image: "/games/table/table-1.png", title: "ROULETTE PRO", category: "Roulette" },
    { image: "/games/table/table-2.png", title: "LIVE BACCARAT", category: "Baccarat" },
    { image: "/games/table/table-1.png", title: "BLACKJACK VIP", category: "Blackjack" },
  ];

  const isBrowsingCategory = activeCategory !== "Lobby" && activeCategory !== "all" && activeTab !== "all" && activeTab !== "recent" && activeTab !== "favorites" && activeTab !== "new";
  const shouldShowGrid = searchQuery !== "" || isBrowsingCategory;

  const filteredGames = allGamesDatabase.filter((g) => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = isBrowsingCategory ? g.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const providers = [
    { name: "Belatra", games: 226, logo: "/games/providers/g1.png" },
    { name: "BGaming", games: 226, logo: "/games/providers/g2.png" },
    { name: "TaDa Gaming", games: 226, logo: "/games/providers/g3.png" },
    { name: "Endorphina", games: 226, logo: "/games/providers/g4.png" },
    { name: "Nolimit City", games: 226, logo: "/games/providers/g5.png" },
    { name: "Hacksaw Gaming", games: 226, logo: "/games/providers/g6.png" },
    { name: "Booming Games", games: 226, logo: "/games/providers/g7.png" },
    { name: "BGaming", games: 226, logo: "/games/providers/g2.png" },
  ];

  const handleCategoryClick = (categoryName: string) => {
    dispatch(setActiveCategory(categoryName));
    setActiveTab("" as any); // Clear top tabs selection
  };

  const handleGameClick = (game: { title: string; image: string }) => {
    dispatch(setSelectedGame(game));
    dispatch(openModal("gamePlay"));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) dispatch(closeModal("lobby"));
  };

  /* ── Reusable sidebar button ── */
  const SidebarBtn = ({ icon, label, isActive, onClick }: { icon?: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-[10px] gap-[8px] w-[148px] h-[36px] rounded-[8px] transition-all cursor-pointer text-left ${
        isActive ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF] hover:bg-[#112F82]/80"
      }`}
    >
      <div className="flex flex-row items-center gap-[12px] w-[128px] h-[16px] flex-grow">
        {icon && <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">{icon}</div>}
        <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] truncate">{label}</span>
      </div>
    </button>
  );

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#091741] md:bg-black/60 md:backdrop-blur-sm p-0 md:p-4"
    >
      {/* Modal Container */}
      <div className="relative flex flex-col lg:flex-row items-start bg-[#091741] rounded-none md:rounded-[16px] lg:rounded-[20px] p-4 md:p-5 lg:p-[24px] gap-4 lg:gap-[20px] w-full max-w-[1056px] h-[100dvh] md:h-auto max-h-[100dvh] md:max-h-[90dvh] lg:max-h-none lg:h-[636px] border-none md:border md:border-white/5 shadow-none md:shadow-2xl select-none animate-in fade-in zoom-in-95 duration-200 overflow-y-auto md:overflow-visible">
        
        {/* Close button */}
        {/* Close button (Desktop/Tablet) */}
        <button
          onClick={() => dispatch(closeModal("lobby"))}
          className="absolute hidden md:flex -top-[44px] right-0 lg:-right-[44px] lg:top-0 w-[32px] h-[32px] items-center justify-center bg-transparent text-white hover:text-[#A5B8EF] transition-colors cursor-pointer z-[110]"
        >
          <CloseIcon />
        </button>

        {/* ── MOBILE: Horizontal category tabs ── */}
        <div className="flex lg:hidden flex-col gap-3 w-full flex-none">
          {/* Nav row + Close Button */}
          <div className="flex flex-row items-center gap-2 w-full">
            <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar flex-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key as any);
                  if (item.key === "all") dispatch(setActiveCategory("Lobby"));
                  else toast.info(`Showing ${item.label.toLowerCase()}.`);
                }}
                className={`flex-none flex items-center gap-1.5 px-3 py-[6px] rounded-[8px] transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === item.key ? "bg-[#1463FF] text-white" : "bg-[#112F82] text-[#A5B8EF]"
                }`}
              >
                <div className="flex w-[14px] h-[14px] justify-center items-center">
                  {navIcons[item.key]}
                </div>
                <span className="font-manrope text-[11px] font-semibold tracking-[0.02em]">
                  {item.label}
                </span>
              </button>
            ))}
            <button
              onClick={() => setShowMobileCategories(!showMobileCategories)}
              className={`flex-none px-3 py-[6px] rounded-[8px] font-manrope text-[11px] font-semibold tracking-[0.02em] transition-all cursor-pointer whitespace-nowrap ${
                showMobileCategories ? "bg-[#FFC83D] text-black" : "bg-[#112F82] text-[#A5B8EF]"
              }`}
            >
              Categories ▾
            </button>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={() => dispatch(closeModal("lobby"))}
              className="flex-none flex w-[32px] h-[32px] items-center justify-center bg-[#112F82] rounded-full text-white hover:bg-[#1463FF] transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Expandable category list */}
          {showMobileCategories && (
            <div className="flex flex-row flex-wrap gap-2">
              {categoryItems.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    handleCategoryClick(c.category || c.key);
                    setShowMobileCategories(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-[6px] rounded-[8px] transition-all cursor-pointer ${
                    activeCategory === (c.category || c.key)
                      ? "bg-[#1463FF] text-white"
                      : "bg-[#0C1F56] text-[#A5B8EF] hover:bg-[#112F82]"
                  }`}
                >
                  <div className="flex w-[14px] h-[14px] justify-center items-center">
                    {catIcons[c.category || c.key]}
                  </div>
                  <span className="font-manrope text-[11px] font-semibold tracking-[0.02em] whitespace-nowrap">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── DESKTOP: Left Sidebar ── */}
        <div className="hidden lg:flex flex-col justify-center items-start gap-[12px] w-[180px] h-[588px] flex-none">
          
          {/* Box 1: Nav Options — 180×200px */}
          <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[200px] bg-[#0C1F56] rounded-[12px] flex-none">
            <div className="flex flex-col items-start gap-[8px] w-[148px] h-[168px] flex-grow">
              <SidebarBtn icon={navIcons.all} label="All Games" isActive={activeTab === "all"} onClick={() => { setActiveTab("all"); dispatch(setActiveCategory("Lobby")); }} />
              <SidebarBtn icon={navIcons.recent} label="Recently Played" isActive={activeTab === "recent"} onClick={() => { setActiveTab("recent"); toast.info("Showing recently played games."); }} />
              <SidebarBtn icon={navIcons.favorites} label="Favorites" isActive={activeTab === "favorites"} onClick={() => { setActiveTab("favorites"); toast.info("Showing favorite games."); }} />
              <SidebarBtn icon={navIcons.new} label="New Releases" isActive={activeTab === "new"} onClick={() => { setActiveTab("new"); toast.info("Showing new releases."); }} />
            </div>
          </div>

          {/* Box 2: Game Types — 180×376px */}
          <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[376px] bg-[#0C1F56] rounded-[12px] flex-none">
            <div className="flex flex-col items-start gap-[8px] w-[148px] h-[344px] flex-grow">
              {categoryItems.map((c) => (
                <SidebarBtn
                  key={c.key}
                  icon={catIcons[c.category || c.key]}
                  label={c.label}
                  isActive={activeCategory === (c.category || c.key)}
                  onClick={() => handleCategoryClick(c.category || c.key)}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── Right Content ── */}
        <div className="flex flex-col items-start gap-6 lg:gap-[40px] w-full flex-1 min-w-0 overflow-y-auto lg:overflow-hidden min-h-0 lg:h-[532px]">
          
          {/* Search bar */}
          <div className={`flex flex-row items-center justify-between rounded-[8px] flex-none transition-all duration-300 w-full ${
            searchQuery 
              ? "px-4 lg:px-[20px] pr-[10px] py-[10px] h-[44px] lg:h-[50px] bg-[#112F82] border border-[#1463FF]" 
              : "px-4 lg:px-[20px] py-[10px] h-[40px] bg-[#112F82] border border-transparent"
          }`}>
            <div className="flex flex-row items-center gap-[10px] flex-grow min-w-0">
              <div className="w-[16px] h-[16px] flex items-center justify-center flex-none text-[#BBCAF3]">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white outline-none w-full font-manrope text-[13px] lg:text-[14px] font-semibold leading-[19px] placeholder-[#BBCAF3] min-w-0"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="flex items-center justify-center px-3 lg:px-[16px] py-[6px] lg:py-[10px] bg-[#1463FF] hover:bg-[#1463FF]/80 text-white rounded-[6px] transition-all cursor-pointer flex-none ml-2"
              >
                <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em]">Clear</span>
              </button>
            )}
          </div>

          {shouldShowGrid ? (
            filteredGames.length > 0 ? (
              /* Search / Category Results */
              <div className="flex flex-col gap-4 lg:gap-[20px] w-full flex-1 min-h-0">
                <div className="flex flex-row items-center h-[29px] flex-none">
                  <span className="font-jost font-extrabold text-[18px] lg:text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white select-none">
                    {searchQuery ? "SEARCH RESULTS" : activeCategory.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {filteredGames.map((game, index) => (
                      <div key={index} className="w-full">
                        <GameCard 
                          image={game.image} 
                          title={game.title} 
                          onClick={() => handleGameClick(game)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* No Results */
              <div className="flex flex-col items-center gap-[8px] w-full py-8">
                <h3 className="font-manrope font-extrabold text-[16px] leading-[22px] text-center text-white select-none">
                  No Results for your Search
                </h3>
                <p className="max-w-[400px] lg:max-w-[800px] font-manrope font-medium text-[14px] lg:text-[16px] leading-[22px] text-center text-[#7795E8] select-none">
                  There are no results in this category for your search term, please select a different category or try searching for something else
                </p>
              </div>
            )
          ) : (
            /* ── Lobby Content (Normal view) — 856×452px ── */
            <div className="flex flex-col items-start gap-6 lg:gap-[32px] w-full lg:w-[856px] lg:h-[452px] flex-1 lg:flex-none min-h-0">
              
              {/* Popular Games — 808×249px */}
              <div className="flex flex-col gap-4 lg:gap-[20px] w-full lg:w-[808px] lg:h-[249px] flex-none">
                <div className="flex flex-row items-center gap-[8px] h-[29px] flex-none">
                  <div className="w-[20px] h-[20px] flex items-center justify-center text-[#FFBF1F]">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor"><path d="M11.6667 8.33333C12.375 7.625 12.875 6.20833 13.0833 5.375C14.7917 7.04167 15 10.6667 15 11.6667C15 15.3486 11.8661 18.3333 8 18.3333C4.13391 18.3333 1 15.3486 1 11.6667C1 7.98477 4.13391 5 8 5C8.83333 5 9.625 5.58333 10.2083 6.16667L11.6667 8.33333Z" stroke="#FFBF1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.00008 14.1667C9.38079 14.1667 10.5001 13.0474 10.5001 11.6667C10.5001 10.2859 9.38079 9.16667 8.00008 9.16667C6.61937 9.16667 5.50008 10.2859 5.50008 11.6667C5.50008 13.0474 6.61937 14.1667 8.00008 14.1667Z" stroke="#FFBF1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="font-jost font-extrabold text-[18px] lg:text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white select-none">
                    Popular Games
                  </span>
                </div>

                {/* Cards Row — 808×200px, gap 12px */}
                <div className="flex flex-row items-center gap-3 lg:gap-[12px] w-full lg:w-[808px] lg:h-[200px] overflow-x-auto no-scrollbar flex-none">
                  {popularGames.map((game, index) => (
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

              {/* Game Providers — 856×171px */}
              <div className="flex flex-col gap-4 lg:gap-[20px] w-full lg:w-[856px] lg:h-[171px] flex-none">
                <div className="flex flex-row items-center gap-[8px] h-[29px] flex-none">
                  <div className="w-[20px] h-[20px] flex items-center justify-center text-[#FFC83D]">
                    <svg width="15" height="20" viewBox="0 0 15 20" fill="currentColor"><circle cx="7.5" cy="5" r="4.25" stroke="#FFC83D" strokeWidth="1.5"/><path d="M1.5 18.5C1.5 14.5 4.18629 11.5 7.5 11.5C10.8137 11.5 13.5 14.5 13.5 18.5" stroke="#FFC83D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span className="font-jost font-extrabold text-[18px] lg:text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white select-none">
                    Game Providers
                  </span>
                </div>

                {/* Provider cards - scrollable */}
                <div className="flex flex-col gap-[16px] w-full lg:w-[856px] lg:h-[122px] flex-none">
                  <div
                    ref={providersRef}
                    onScroll={handleScroll}
                    className="flex flex-row items-center gap-3 lg:gap-[12px] w-full lg:w-[856px] lg:h-[100px] overflow-x-auto no-scrollbar snap-x snap-mandatory flex-none"
                  >
                    {providers.map((p, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          dispatch(setActiveCategory("Providers"));
                          dispatch(closeModal("lobby"));
                          toast.success(`Selected provider ${p.name}`);
                        }}
                        className="group flex flex-col justify-center items-center p-[12px] px-[20px] lg:px-[24px] gap-[8px] w-[130px] lg:w-[152px] h-[90px] lg:h-[100px] bg-[#0C1F56] hover:bg-[#112f82]/50 rounded-[12px] flex-none cursor-pointer transition-all snap-start"
                      >
                        <div className="flex h-[36px] lg:h-[40px] w-[70px] lg:w-[80px] flex-none items-center justify-center">
                          {p.logo ? (
                            <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                          ) : (
                            <span className="text-center text-[11px] lg:text-[12px] font-extrabold uppercase leading-tight tracking-wider text-white select-none group-hover:scale-105 transition-transform">
                              {p.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center flex-none">
                          <span className="font-manrope text-[10px] font-semibold leading-[14px] text-center text-[#FFC83D]">
                            {p.games} Games
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination dots */}
                  <div className="flex items-center justify-center w-full h-[6px] flex-none">
                    <div className="flex flex-row justify-center items-center gap-[4px]">
                      {[0, 1, 2].map((i) => (
                        <button
                          key={i}
                          onClick={() => handleDotClick(i)}
                          className={`h-[6px] rounded-[150px] transition-all cursor-pointer flex-none ${
                            activePage === i ? "w-[12px] bg-[#BBCAF3]" : "w-[6px] bg-[#BBCAF3]/50 hover:bg-[#BBCAF3]/80"
                          }`}
                          aria-label={`Page ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
