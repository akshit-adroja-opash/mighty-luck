"use client";

import Link from "next/link";
import { Menu, Search, User as UserIcon, LogOut, Bell, Gift, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openModal, closeModal, setAuthModalView } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/authSlice";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center bg-[#0C1F56]">
      {/* Main Header Container - Exact Figma Match */}
      <div 
        className="relative flex flex-row items-center justify-between isolation-isolate flex-none"
        style={{ width: "1440px", height: "60px", padding: "10px 24px", gap: "369px" }}
      >
        
        {/* Blue Glow Ellipse Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute rounded-full bg-[#1463FF]"
            style={{
              width: "143px",
              height: "143px",
              left: "114px",
              top: "37px",
              filter: "blur(25px)",
            }}
          />
        </div>

        {/* Left Side: Menu, Logo & Search — width 596px, gap 51px */}
        <div className="relative z-10 flex h-[40px] w-[596px] items-center flex-none" style={{ gap: "51px" }}>
          
          {/* Menu Button */}
          <button className="flex h-[24px] w-[24px] items-center justify-center flex-none text-white transition-colors hover:opacity-80 cursor-pointer">
            <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Top line */}
              <path d="M1 1H19.5" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              {/* Bottom line */}
              <path d="M1 13H19.5" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              {/* Middle line with left arrow */}
              <path d="M6 7H19.5" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              <path d="M6 3.5L1.5 7L6 10.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex h-[34.66px] w-[190px] items-center gap-2 cursor-pointer flex-none">
            {/* Custom Crown with Lightning Bolt SVG */}
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none -mt-1">
              {/* Crown Base */}
              <path d="M2 19H24L21 5L16.5 10L13 2L9.5 10L5 5L2 19Z" fill="url(#crownGradient)"/>
              {/* Lightning Bolt Cutout */}
              <path d="M14 7L10 13.5H13.5L12 18L16.5 11.5H13L14 7Z" fill="#0C1F56"/>
              <defs>
                <linearGradient id="crownGradient" x1="0" y1="12" x2="26" y2="12" gradientUnits="userSpaceOnUse">
                  <stop offset="0.12" stopColor="#FFD85A"/>
                  <stop offset="0.8668" stopColor="#FFB800"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[20px] font-black uppercase tracking-wide text-white font-jost whitespace-nowrap leading-[34.66px]">
              MIGHTY <span style={{ background: "linear-gradient(90deg, #FFD85A 12%, #FFB800 86.68%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LUCK</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex h-[40px] w-[280px] flex-none flex-row items-center rounded-[8px] bg-[#112F82]" style={{ padding: "10px 20px", gap: "10px" }}>
            <div className="flex h-[15.99px] w-[16px] flex-none flex-col items-center justify-center p-0">
              <Search size={16} className="text-white" />
            </div>
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="h-[19px] w-[169px] flex-none bg-transparent font-manrope text-[14px] font-semibold leading-[19px] text-[#BBCAF3] outline-none placeholder:text-[#BBCAF3]"
            />
          </div>
        </div>

        {/* Right Side: Auth Buttons — width 390px, gap 16px, justify end */}
        <div className="relative z-10 flex h-[40px] w-[390px] flex-none flex-row items-center justify-end" style={{ gap: "16px" }}>
          {isAuthenticated ? (
            <div className="flex flex-row items-center" style={{ gap: "16px" }}>
              
              {/* Balance & Deposit */}
              <div className="flex h-[40px] w-[230px] flex-none flex-row items-center" style={{ gap: "4px" }}>
                {/* Balance */}
                <div className="flex h-[40px] w-[116px] flex-none flex-row items-center justify-center rounded-[8px] bg-[#112F82]" style={{ padding: "10px 30px", gap: "10px" }}>
                  <span className="flex-none font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white" style={{ width: "56px", height: "19px" }}>$105,98</span>
                </div>
                {/* Deposit */}
                <button 
                  onClick={() => dispatch(openModal("wallet"))}
                  className="flex h-[40px] w-[110px] flex-none flex-row items-center justify-center rounded-[8px] bg-[#FFC83D] transition-colors hover:opacity-90 cursor-pointer"
                  style={{ padding: "10px 16px", gap: "8px" }}
                >
                  <div className="flex h-[16px] w-[16px] items-center justify-center flex-none">
                    <Wallet size={15} className="text-[#1A1404]" fill="#1A1404" />
                  </div>
                  <span className="flex-none font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-[#1A1404]" style={{ width: "54px", height: "19px" }}>Deposit</span>
                </button>
              </div>

              {/* Action Icons */}
              <div className="flex h-[40px] w-[88px] flex-none flex-row items-center" style={{ gap: "8px" }}>
                {/* Notification */}
                <button className="relative flex h-[40px] w-[40px] flex-none flex-row items-center justify-center rounded-[6px] bg-[#173EAD] isolation-isolate transition-colors hover:opacity-90 cursor-pointer" style={{ padding: "10px 12px", gap: "10px" }}>
                  <Bell size={16} className="text-[#D2DCF7] z-0" fill="#D2DCF7" />
                  <span 
                    className="absolute flex flex-col items-center justify-center rounded-[66.6667px] bg-[#FF0E0E] z-10"
                    style={{ width: "8px", height: "8px", left: "32px", top: "0px", padding: "3.08px", gap: "3.08px" }}
                  />
                </button>

                {/* Gift */}
                <button className="relative flex h-[40px] w-[40px] flex-none flex-row items-center justify-center rounded-[6px] bg-[#173EAD] isolation-isolate transition-colors hover:opacity-90 cursor-pointer" style={{ padding: "10px 12px", gap: "10px" }}>
                  <Gift size={16} className="text-[#D2DCF7] z-0" fill="#D2DCF7" />
                  <span 
                    className="absolute flex flex-col items-center justify-center rounded-[66.6667px] bg-[#FF0E0E] z-10"
                    style={{ width: "8px", height: "8px", left: "32px", top: "0px", padding: "3.08px", gap: "3.08px" }}
                  />
                </button>
              </div>

              {/* User Profile */}
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
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] flex w-40 flex-col overflow-hidden rounded-lg bg-[#112F82] shadow-xl">
                    <div className="px-4 py-3 border-b border-[#173EAD]">
                      <p className="text-sm font-bold text-white truncate">{user?.name || "Player"}</p>
                      <p className="text-xs text-[#BBCAF3] truncate">{user?.email || "player@example.com"}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#BBCAF3] transition-colors hover:bg-[#173EAD] hover:text-white cursor-pointer"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="flex h-[40px] w-[199px] items-center gap-[10px]">
              <button 
                onClick={() => {
                  dispatch(setAuthModalView("login"));
                  dispatch(openModal("auth"));
                }}
                className="flex h-[40px] w-[99px] items-center justify-center gap-[10px] rounded-[8px] bg-[#1463FF] px-[30px] py-[10px] font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600 cursor-pointer"
              >
                Login
              </button>

              <button 
                onClick={() => {
                  dispatch(setAuthModalView("register"));
                  dispatch(openModal("auth"));
                }}
                className="flex h-[40px] w-[90px] items-center justify-center gap-[10px] rounded-[8px] bg-[#FFC83D] px-[30px] py-[10px] font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404] transition-colors hover:bg-yellow-400 cursor-pointer"
              >
                Join
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
