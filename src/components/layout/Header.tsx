"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Search, LogOut, Bell, Gift, Wallet, Users, Gift as GiftIcon, Crown, Trophy, Dice5, Club, Headphones } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openModal, closeModal, setAuthModalView, toggleSidebar } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/authSlice";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";



export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center bg-[#0C1F56]">
      <div className="relative flex flex-row items-center justify-between w-full max-w-[1440px] mx-auto h-[60px] px-4 lg:px-6">

        {/* Blue Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full bg-[#1463FF]" style={{ width: "143px", height: "143px", left: "114px", top: "37px", filter: "blur(25px)" }} />
        </div>

        {/* Left: Hamburger (mobile) + Logo + Search */}
        <div className="relative z-10 flex h-[40px] items-center flex-none gap-3 lg:gap-[51px]">

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden h-[44px] w-[44px] items-center justify-center text-white transition-colors hover:opacity-80 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Image src="/images/Vector.png" alt="Menu" width={21} height={14} />
          </button>

          {/* Desktop menu icon */}
          <button 
            onClick={() => dispatch(toggleSidebar())}
            className="hidden lg:flex h-[24px] w-[24px] items-center justify-center flex-none text-white transition-colors hover:opacity-80 cursor-pointer"
          >
            {sidebarOpen ? (
              <Image src="/images/Vector.png" alt="Menu" width={21} height={14} style={{ width: "20.57px", height: "13.71px" }} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="14" y2="12"/>
                <line x1="4" y1="18" x2="20" y2="18"/>
                <polyline points="18 9 15 12 18 15"/>
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex h-[34.66px] items-center gap-2 cursor-pointer flex-none">
          <img src="/images/logo.svg" alt="Mighty Luck" className="flex-none -mt-1 w-[34px] h-[25px]" />
            <span className="hidden sm:inline-block text-[20px] font-black uppercase tracking-wide text-white font-jost whitespace-nowrap leading-[34.66px]">
              MIGHTY <span style={{ background: "linear-gradient(90deg, #FFD85A 12%, #FFB800 86.68%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LUCK</span>
            </span>
          </Link>

          {/* Search Bar — desktop only */}
          <div className="hidden lg:flex h-[40px] w-[280px] flex-none flex-row items-center rounded-[8px] bg-[#112F82] px-5 py-[10px] gap-[10px]">
            <Search size={16} className="text-white flex-none" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent font-manrope text-[14px] font-semibold leading-[19px] text-[#BBCAF3] outline-none placeholder:text-[#BBCAF3]"
            />
          </div>
        </div>

        {/* Right: Auth */}
        <div className="relative z-10 flex h-[40px] flex-none flex-row items-center justify-end gap-2 lg:gap-4">
          {isAuthenticated ? (
            <div className="flex flex-row items-center gap-2 lg:gap-4">

              {/* Balance + Deposit */}
              <div className="flex h-[40px] flex-none flex-row items-center gap-1">
                <div className="hidden md:flex h-[40px] w-[116px] flex-none flex-row items-center justify-center rounded-[8px] bg-[#112F82] px-4 lg:px-[30px] gap-[10px]">
                  <span className="flex-none font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white">$105,98</span>
                </div>
                <button
                  onClick={() => dispatch(openModal("wallet"))}
                  className="flex h-[40px] min-w-[44px] sm:w-[110px] flex-none flex-row items-center justify-center rounded-[8px] bg-[#FFC83D] transition-colors hover:opacity-90 cursor-pointer px-3 sm:px-4 gap-2"
                >
                  <Wallet size={15} className="text-[#1A1404]" fill="#1A1404" />
                  <span className="hidden sm:inline font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-[#1A1404]">Deposit</span>
                </button>
              </div>

              {/* Icons */}
              <div className="flex h-[40px] items-center gap-2">
                <button className="relative flex h-[40px] w-[40px] flex-none items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:opacity-90 cursor-pointer">
                  <Bell size={16} className="text-[#D2DCF7]" fill="#D2DCF7" />
                  <span className="absolute flex rounded-full bg-[#FF0E0E]" style={{ width: "8px", height: "8px", left: "32px", top: "0px" }} />
                </button>
                <button className="relative hidden sm:flex h-[40px] w-[40px] flex-none items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:opacity-90 cursor-pointer">
                  <div 
                    className="w-[16px] h-[16px] bg-[#D2DCF7] flex-none"
                    style={{
                      maskImage: `url(/games/side-icon/pro.svg)`,
                      WebkitMaskImage: `url(/games/side-icon/pro.svg)`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center'
                    }}
                  />
                  <span className="absolute flex rounded-full bg-[#FF0E0E]" style={{ width: "8px", height: "8px", left: "32px", top: "0px" }} />
                </button>
              </div>

              {/* Avatar + Dropdown */}
              <div className="relative flex-none">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-transparent bg-[#173EAD] transition-colors hover:border-[#FFC83D] cursor-pointer"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=1463FF&color=fff&bold=true`}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%_+_8px)] flex w-48 flex-col overflow-hidden rounded-lg bg-[#112F82] shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-[#173EAD]">
                      <p className="text-sm font-bold text-white truncate">{user?.name || "Player"}</p>
                      <p className="text-xs text-[#BBCAF3] truncate">{user?.email || "player@example.com"}</p>
                    </div>
                    <Link href="/refer-a-friend" onClick={() => setIsDropdownOpen(false)} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-[#BBCAF3] transition-colors hover:bg-[#173EAD] hover:text-white cursor-pointer">
                      <Users size={16} /> Refer a Friend
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-[#BBCAF3] transition-colors hover:bg-[#173EAD] hover:text-white cursor-pointer">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-[40px] items-center gap-2">
              <button
                onClick={() => { dispatch(setAuthModalView("login")); dispatch(openModal("auth")); }}
                className="flex h-[40px] w-auto sm:w-[99px] flex-none items-center justify-center gap-[10px] rounded-[8px] bg-[#1463FF] px-3 py-[10px] font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white whitespace-nowrap transition-colors hover:bg-blue-600 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => { dispatch(setAuthModalView("register")); dispatch(openModal("auth")); }}
                className="flex h-[40px] w-auto sm:w-[90px] flex-none items-center justify-center gap-[10px] rounded-[8px] bg-[#FFC83D] px-3 py-[10px] font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap transition-colors hover:bg-yellow-400 cursor-pointer"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[280px] bg-[#0C1F56] z-50 lg:hidden flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#112F82]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <img src="/images/logo.svg" alt="Mighty Luck" className="flex-none w-[34px] h-[25px]" />
                <span className="text-[18px] font-black uppercase tracking-wide text-white font-jost">
                  MIGHTY <span style={{ background: "linear-gradient(90deg, #FFD85A 12%, #FFB800 86.68%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LUCK</span>
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-white hover:bg-[#112F82] transition-colors" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4">
              <div className="flex h-[44px] w-full items-center rounded-[8px] bg-[#112F82] px-4 gap-3">
                <Search size={16} className="text-[#BBCAF3] flex-none" />
                <input type="text" placeholder="What are you looking for?" className="flex-1 bg-transparent font-manrope text-[14px] font-semibold text-[#BBCAF3] outline-none placeholder:text-[#BBCAF3]" />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1 px-4 pb-4">
              <SidebarMenu onItemClick={() => setIsMobileMenuOpen(false)} />
            </nav>

            {/* Mobile Auth at bottom */}
            {!isAuthenticated && (
              <div className="mt-auto p-4 flex flex-col gap-3 border-t border-[#112F82]">
                <button onClick={() => { dispatch(setAuthModalView("login")); dispatch(openModal("auth")); setIsMobileMenuOpen(false); }} className="flex h-[44px] w-full items-center justify-center rounded-[8px] bg-[#1463FF] font-manrope text-[14px] font-bold text-white hover:bg-blue-600 transition-colors cursor-pointer">Login</button>
                <button onClick={() => { dispatch(setAuthModalView("register")); dispatch(openModal("auth")); setIsMobileMenuOpen(false); }} className="flex h-[44px] w-full items-center justify-center rounded-[8px] bg-[#FFC83D] font-manrope text-[14px] font-bold text-[#1A1404] hover:bg-yellow-400 transition-colors cursor-pointer">Join Now</button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
