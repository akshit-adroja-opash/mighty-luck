"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Search, LogOut, Bell, Wallet, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openModal, setAuthModalView, toggleSidebar, setActiveCategory, closeModal } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/authSlice";
import { useState, useRef, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import Logo from "@/components/ui/Logo";
import MobileBottomNav from "./MobileBottomNav";

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsDropdownOpen(false);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[120] flex w-full justify-center bg-[#0C1F56]">
      <div className="relative flex flex-row items-center justify-between w-full max-w-[1440px] mx-auto h-[50px] lg:h-[60px] px-5 lg:px-6">

        {/* Blue Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="hidden lg:block absolute rounded-full bg-[#1463FF]" style={{ width: "143px", height: "143px", left: "114px", top: "37px", filter: "blur(25px)" }} />
          <div className="lg:hidden absolute rounded-full bg-[#1463FF]" style={{ width: "71.5px", height: "71.5px", left: "6px", top: "33px", filter: "blur(12.5px)" }} />
        </div>

        {/* Left: Hamburger (mobile) + Logo + Search */}
        <div className="relative z-10 flex h-[30px] lg:h-[40px] items-center flex-none gap-3 lg:gap-[51px]">

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
          <Logo 
            isLink 
            className="h-[30px] lg:h-[34.66px] gap-2 cursor-pointer flex-none" 
            iconClassName="-mt-1 w-[34px] h-[25px]" 
            textClassName="text-[20px] tracking-wide leading-[34.66px]" 
            hideTextOnMobile 
          />

          {/* Search Bar — desktop only */}
          <div 
            onClick={() => {
              dispatch(openModal("lobby"));
              dispatch(setActiveCategory("Lobby"));
            }}
            className="hidden lg:flex h-[40px] w-[280px] flex-none flex-row items-center rounded-[8px] bg-[#112F82] px-5 py-[10px] gap-[10px] cursor-pointer hover:bg-[#173EAD] transition-colors"
          >
            <Search size={16} className="text-white flex-none pointer-events-none" />
            <input
              type="text"
              readOnly
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent font-manrope text-[14px] font-semibold leading-[19px] text-[#BBCAF3] outline-none placeholder:text-[#BBCAF3] cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Auth */}
        <div className="relative z-40 flex h-[30px] lg:h-[40px] flex-none flex-row items-center justify-end gap-2 lg:gap-4">
          {isAuthenticated ? (
            <div className="flex flex-row items-center gap-[16px] lg:gap-4">

              {/* Balance + Deposit */}
              <div className="flex h-[30px] lg:h-[40px] flex-none flex-row items-center gap-1 lg:gap-[10px]">
                <div className="flex h-[30px] w-[82px] lg:h-[40px] lg:w-[116px] flex-none flex-row items-center justify-center rounded-[6px] lg:rounded-[8px] bg-[#112F82] px-[20px] lg:px-[30px] py-[8px] lg:py-0 gap-[7.5px] lg:gap-[10px]">
                  <span className="flex-none font-manrope text-[10.5px] lg:text-[14px] font-bold leading-[14px] lg:leading-[19px] tracking-[0.02em] text-white">$105,98</span>
                </div>
                <button
                  onClick={() => dispatch(openModal("wallet"))}
                  className="flex h-[30px] w-[30px] lg:h-[40px] lg:w-[110px] flex-none flex-row items-center justify-center rounded-[6px] lg:rounded-[8px] bg-[#FFC83D] transition-colors hover:opacity-90 cursor-pointer p-[8px] lg:px-[16px] lg:py-[0px] gap-2"
                >
                  <Wallet className="w-[12px] h-[12px] lg:w-[15px] lg:h-[15px] text-[#1A1404] flex-none" fill="#1A1404" />
                  <span className="hidden lg:inline font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-[#1A1404]">Deposit</span>
                </button>
              </div>

              {/* Icons & Avatar */}
              <div className="flex h-[30px] lg:h-[40px] items-center gap-[8px]">
                <button className="relative flex h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] flex-none items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:opacity-90 cursor-pointer">
                  <Bell size={16} className="text-[#D2DCF7]" fill="#D2DCF7" />
                  <span className="absolute flex rounded-full bg-[#FF0E0E] w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] left-[22px] lg:left-[30px] top-[0px] lg:top-[-2px]" />
                </button>
                <button className="relative flex h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] flex-none items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:opacity-90 cursor-pointer">
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
                  <span className="absolute flex rounded-full bg-[#FF0E0E] w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] left-[22px] lg:left-[30px] top-[0px] lg:top-[-2px]" />
                </button>
                
                {/* Avatar + Dropdown */}
                <div className="relative flex-none h-[30px] w-[30px] lg:h-[40px] lg:w-[40px]" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent bg-[#173EAD] transition-colors hover:border-[#FFC83D] cursor-pointer"
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
                      <Link 
                        href="/refer-a-friend" 
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                          dispatch(closeModal("lobby"));
                        }} 
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-[#BBCAF3] transition-colors hover:bg-[#173EAD] hover:text-white cursor-pointer"
                      >
                        <Users size={16} /> Refer a Friend
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-[#BBCAF3] transition-colors hover:bg-[#173EAD] hover:text-white cursor-pointer">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[30px] sm:h-[40px] items-center gap-[7.5px] sm:gap-[10px]">
              <button
                onClick={() => { dispatch(setAuthModalView("login")); dispatch(openModal("auth")); }}
                className="flex h-[30px] sm:h-[40px] w-[74px] sm:w-[99px] flex-none items-center justify-center gap-[10px] rounded-[6px] sm:rounded-[8px] bg-[#1463FF] px-[22.5px] sm:px-[30px] py-[7.5px] sm:py-[10px] font-manrope text-[10.5px] sm:text-[14px] font-bold leading-[14px] sm:leading-[19px] tracking-[0.02em] text-white whitespace-nowrap transition-colors hover:bg-blue-600 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => { dispatch(setAuthModalView("register")); dispatch(openModal("auth")); }}
                className="flex h-[30px] sm:h-[40px] w-[67px] sm:w-[90px] flex-none items-center justify-center gap-[10px] rounded-[6px] sm:rounded-[8px] bg-[#FFC83D] px-[22.5px] sm:px-[30px] py-[7.5px] sm:py-[10px] font-manrope text-[10.5px] sm:text-[14px] font-bold leading-[14px] sm:leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap transition-colors hover:bg-yellow-400 cursor-pointer"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Mobile Full Screen Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed left-0 right-0 top-[50px] bottom-[75px] bg-[#0C1F56] z-30 lg:hidden flex flex-col items-center overflow-y-auto px-5 py-5">
          <div className="flex w-full max-w-[374px] md:max-w-[480px] flex-col gap-[16px]">
            <SidebarMenu onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
