"use client";

import Link from "next/link";
import { Menu, Search, User as UserIcon, LogOut, Bell, Gift, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openModal } from "@/store/slices/uiSlice";
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
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between overflow-hidden px-6">
        
        {/* Blue Glow Ellipse - exact Figma position */}
        <div
          className="pointer-events-none absolute rounded-full bg-[#1463FF]"
          style={{
            width: "143px",
            height: "143px",
            left: "114px",
            top: "37px",
            filter: "blur(25px)",
            opacity: 0.9,
            zIndex: 0,
          }}
        />

        
        {/* Left Side: Menu, Logo & Search */}
        <div className="flex flex-1 items-center gap-10">
          
          <div className="relative z-10 flex items-center gap-6">

            <button className="flex h-[24px] w-[24px] items-center justify-center text-white transition-colors hover:text-[#D2DCF7]">
              {/* Custom Menu Icon matching design */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H14M4 18H20M14 12L18 8M14 12L18 16" stroke="white" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <Link href="/" className="relative z-10 flex h-[34.66px] w-[190px] items-center gap-1">
              <span className="text-2xl text-[#FFC83D]">👑</span>
              <span className="text-xl font-black uppercase tracking-wide text-white">
                MIGHTY <span className="text-[#FFC83D]">LUCK</span>
              </span>
            </Link>
          </div>

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

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-[10px]">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              
              {/* Balance & Deposit */}
              <div className="flex items-center gap-1">
                {/* Balance */}
                <div className="flex h-10 w-[116px] items-center justify-center rounded-lg bg-[#112F82]">
                  <span className="text-sm font-bold tracking-[0.02em] text-white">$105,98</span>
                </div>
                {/* Deposit */}
                <button className="flex h-10 w-[110px] items-center justify-center gap-2 rounded-lg bg-[#FFC83D] transition-colors hover:bg-yellow-400">
                  <Wallet size={16} className="text-[#1A1404]" fill="#1A1404" />
                  <span className="text-sm font-semibold tracking-[0.02em] text-[#1A1404]">Deposit</span>
                </button>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2">
                {/* Notification */}
                <button className="relative flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:bg-blue-700">
                  <Bell size={18} className="text-[#D2DCF7]" fill="#D2DCF7" />
                  <span className="absolute -top-[2px] -right-[2px] h-2.5 w-2.5 rounded-full border-2 border-[#173EAD] bg-[#FF0E0E]"></span>
                </button>

                {/* Gift */}
                <button className="relative flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#173EAD] transition-colors hover:bg-blue-700">
                  <Gift size={18} className="text-[#D2DCF7]" fill="#D2DCF7" />
                  <span className="absolute -top-[2px] -right-[2px] h-2.5 w-2.5 rounded-full border-2 border-[#173EAD] bg-[#FF0E0E]"></span>
                </button>
              </div>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-transparent bg-[#173EAD] transition-colors hover:border-[#FFC83D]"
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
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#BBCAF3] transition-colors hover:bg-[#173EAD] hover:text-white"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="z-[2] flex h-[40px] w-[199px] items-center gap-[10px]">
              <button 
                onClick={() => dispatch(openModal("auth"))}
                className="flex h-[40px] w-[99px] items-center justify-center gap-[10px] rounded-[8px] bg-[#1463FF] px-[30px] py-[10px] font-['Manrope'] text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600"
              >
                Login
              </button>

              <button 
                onClick={() => dispatch(openModal("auth"))}
                className="flex h-[40px] w-[90px] items-center justify-center gap-[10px] rounded-[8px] bg-[#FFC83D] px-[30px] py-[10px] font-['Manrope'] text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404] transition-colors hover:bg-yellow-400"
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