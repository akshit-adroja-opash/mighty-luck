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
    <header className="sticky top-0 z-50 w-full bg-[#0C1F56]" style={{ height: "60px" }}>
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-[24px] py-[10px] isolation-isolate">
        
        {/* Blue Glow Ellipse Container (overflow-hidden to prevent spill) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute rounded-full bg-[#1463FF]"
            style={{
              width: "143px",
              height: "143px",
              left: "114px",
              top: "37px",
              filter: "blur(25px)",
              opacity: 0.9,
            }}
          />
        </div>

        {/* Left Side: Menu, Logo & Search (Figma spec: Flat flex container, width 596px, height 40px, gap 51px) */}
        <div className="relative z-10 flex h-[40px] w-[596px] items-center gap-[51px] flex-none">
          
          {/* Menu Button */}
          <button className="flex h-[24px] w-[24px] items-center justify-center text-white transition-colors hover:text-[#D2DCF7] cursor-pointer">
            {/* Custom Menu Icon matching design */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H14M4 18H20M14 12L18 8M14 12L18 16" stroke="white" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex h-[34.66px] w-[190px] items-center gap-1 cursor-pointer">
            <span className="text-2xl text-[#FFC83D]">👑</span>
            <span className="text-xl font-black uppercase tracking-wide text-white font-jost">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex h-[40px] w-[280px] flex-none items-center gap-[10px] rounded-[8px] bg-[#112F82] px-[20px] py-[10px]">
            <div className="flex h-[15.99px] w-[16px] flex-none flex-col items-start p-0">
              <Search size={16} className="text-white" />
            </div>
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="h-[19px] w-[169px] flex-none bg-transparent font-['Manrope'] text-[14px] font-semibold leading-[19px] text-[#BBCAF3] outline-none placeholder:text-[#BBCAF3]"
            />
          </div>

        </div>

        {/* Right Side: Auth Buttons (Figma spec: width 390px, height 40px, gap 16px, justify end) */}
        <div className="relative z-10 flex h-[40px] w-[390px] items-center justify-end gap-[16px]">
          {isAuthenticated ? (
            <div className="flex items-center gap-[16px]">
              
              {/* Balance & Deposit */}
              <div className="flex h-[40px] w-[230px] items-center gap-[4px]">
                {/* Balance */}
                <div className="flex h-[40px] w-[116px] items-center justify-center rounded-[8px] bg-[#112F82] px-[30px] py-[10px]">
                  <span className="font-['Manrope'] text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white">$105,98</span>
                </div>
                {/* Deposit */}
                <button 
                  onClick={() => dispatch(openModal("wallet"))}
                  className="flex h-[40px] w-[110px] items-center justify-center gap-[8px] rounded-[8px] bg-[#FFC83D] px-[16px] py-[10px] transition-colors hover:bg-yellow-400 cursor-pointer text-[#1A1404] font-['Manrope'] text-[14px] font-semibold leading-[19px] tracking-[0.02em]"
                >
                  <Wallet size={16} className="text-[#1A1404]" fill="#1A1404" />
                  <span>Deposit</span>
                </button>
              </div>

              {/* Action Icons */}
              <div className="flex h-[40px] w-[88px] items-center gap-[8px]">
                {/* Notification */}
                <button className="relative flex h-[40px] w-[40px] items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:bg-blue-700 cursor-pointer">
                  <Bell size={18} className="text-[#D2DCF7]" fill="#D2DCF7" />
                  <span 
                    className="absolute rounded-full bg-[#FF0E0E]"
                    style={{
                      width: "8px",
                      height: "8px",
                      left: "32px",
                      top: "0px",
                    }}
                  />
                </button>

                {/* Gift */}
                <button className="relative flex h-[40px] w-[40px] items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:bg-blue-700 cursor-pointer">
                  <Gift size={18} className="text-[#D2DCF7]" fill="#D2DCF7" />
                  <span 
                    className="absolute rounded-full bg-[#FF0E0E]"
                    style={{
                      width: "8px",
                      height: "8px",
                      left: "32px",
                      top: "0px",
                    }}
                  />
                </button>
              </div>

              {/* User Profile */}
              <div className="relative">
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
                className="flex h-[40px] w-[99px] items-center justify-center gap-[10px] rounded-[8px] bg-[#1463FF] px-[30px] py-[10px] font-['Manrope'] text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600 cursor-pointer"
              >
                Login
              </button>

              <button 
                onClick={() => {
                  dispatch(setAuthModalView("register"));
                  dispatch(openModal("auth"));
                }}
                className="flex h-[40px] w-[90px] items-center justify-center gap-[10px] rounded-[8px] bg-[#FFC83D] px-[30px] py-[10px] font-['Manrope'] text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404] transition-colors hover:bg-yellow-400 cursor-pointer"
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