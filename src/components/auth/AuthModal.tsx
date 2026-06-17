"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal, setAuthModalView } from "@/store/slices/uiSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals["auth"]);
  const modalView = useSelector((state: RootState) => state.ui.authModalView);

  const [view, setView] = useState<"login" | "register">("register");

  useEffect(() => {
    setView(modalView);
  }, [modalView, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full min-h-[100dvh] bg-[#091741] md:bg-[#0C1733]/70 md:backdrop-blur-[8px] flex items-start md:items-center justify-center z-[100] mx-auto overflow-y-auto md:py-8">
      {/* Mobile Layout Container */}
      <div className="flex md:hidden flex-col w-full min-h-[100dvh] relative">
        
        {/* Mobile Header */}
        <div className="flex flex-row items-center px-[20px] pt-[12px] pb-[30px] gap-[20px] w-full h-[92px] flex-none">
          <button onClick={() => dispatch(closeModal("auth"))} className="flex justify-center items-center w-[30px] h-[30px] cursor-pointer">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 8H1M1 8L8 15M1 8L8 1" stroke="#D2DCF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex flex-row items-center gap-[8px] flex-1 h-[50px]">
            <button
              onClick={() => { dispatch(setAuthModalView("register")); setView("register"); }}
              className={`flex justify-center items-center px-[30px] py-[10px] gap-[10px] flex-1 h-[50px] rounded-[8px] ${view === 'register' ? 'bg-[#FFC83D] text-[#000000]' : 'bg-[#1463FF] text-[#FFFFFF]'} font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] cursor-pointer transition-colors`}
            >
              Join Now
            </button>
            <button
              onClick={() => { dispatch(setAuthModalView("login")); setView("login"); }}
              className={`flex justify-center items-center px-[30px] py-[10px] gap-[10px] flex-1 h-[50px] rounded-[8px] ${view === 'login' ? 'bg-[#FFC83D] text-[#000000]' : 'bg-[#1463FF] text-[#FFFFFF]'} font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] cursor-pointer transition-colors`}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="relative w-full h-[170px] bg-cover bg-center rounded-t-[12px] overflow-hidden flex-none" style={{ backgroundImage: "url('/games/lion.png')" }}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute rounded-full bg-[#0051F1]" style={{ width: "281px", height: "281px", left: "calc(50% - 281px/2 + 0.5px)", top: "calc(50% - 281px/2 + 6.5px)", filter: "blur(62.3947px)", opacity: 0.8 }} />
          
          <div className="absolute flex flex-col items-center gap-[12px] w-[220.13px] h-[119px] left-[calc(50%-110.06px)] top-[calc(50%-59.5px)] z-10">
            <div className="font-jost font-extrabold text-[44px] leading-[64px] text-center tracking-[0.01em] text-white h-[31px] flex items-center justify-center">
              350%
            </div>
            <div className="flex flex-row justify-center items-center px-[17px] py-[8.6px] bg-[#2BEA51] rounded-[86px] h-[32px] w-fit whitespace-nowrap">
              <span className="font-jost font-extrabold text-[10px] leading-[14px] text-center text-[#051D09]">
                WELCOME PACKAGE
              </span>
            </div>
            <div className="font-manrope font-bold text-[12px] leading-[16px] text-center tracking-[0.01em] text-white w-[200px]">
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </div>
          </div>
        </div>

        {/* Mobile Form Area */}
        <div className="w-full flex-1 bg-[#091741] px-[20px] py-[20px] pb-[40px] flex flex-col relative z-20">
          {view === "login" ? (
            <LoginForm setView={setView} />
          ) : (
            <RegisterForm setView={setView} />
          )}
        </div>
      </div>

      {/* Desktop Modal Container */}
      <div className="hidden md:flex relative w-full md:w-[95%] max-w-none md:max-w-[730px] h-[100dvh] md:h-[546px] rounded-none md:rounded-[16px] shadow-none md:shadow-2xl shrink-0 overflow-hidden md:my-auto">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeModal("auth"))}
          className="absolute right-4 top-4 z-50 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#112F82] md:bg-[#112F82]/80 text-white md:text-white/80 transition-all hover:bg-red-500 hover:text-white shadow-lg cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Left Column - Promo (hidden on mobile) */}
        <div className="hidden md:flex relative h-[546px] w-[340px] flex-col items-center overflow-hidden rounded-l-[16px] bg-[#000C24] flex-none">
          <div
            className="absolute bg-cover bg-center"
            style={{
              backgroundImage: "url('/games/lion.png')",
              width: "343px", height: "483px", left: "-3px", top: "-29px"
            }}
          />
          <div
            className="absolute"
            style={{
              width: "340px", height: "219px", left: "0px", top: "327px",
              background: "linear-gradient(180deg, rgba(0, 12, 36, 0) 6.85%, #000C24 45.66%)"
            }}
          />
          <div
            className="absolute rounded-full bg-[#1463FF]"
            style={{ width: "173px", height: "173px", left: "calc(50% - 173px/2 - 0.5px)", bottom: "-129px", filter: "blur(40px)" }}
          />
          <div
            className="absolute flex flex-col items-center gap-5"
            style={{ width: "300px", height: "160px", left: "calc(50% - 300px/2)", top: "359px" }}
          >
            <div className="flex flex-col items-center w-[167px] h-[112px]">
              <div className="font-jost font-extrabold text-white text-center" style={{ fontSize: "52px", lineHeight: "75px", letterSpacing: "0.01em" }}>
                350%
              </div>
              <div className="flex items-center justify-center bg-[#2BEA51] rounded-[100px]" style={{ width: "167px", height: "37px", padding: "10px 20px" }}>
                <span className="font-jost font-extrabold text-[#051D09] text-center" style={{ fontSize: "12px", lineHeight: "17px" }}>
                  WELCOME PACKAGE
                </span>
              </div>
            </div>
            <p className="font-manrope font-bold text-white text-center w-[200px]" style={{ fontSize: "10px", lineHeight: "14px", letterSpacing: "0.01em" }}>
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </p>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="relative w-full md:w-[390px] min-h-[100dvh] md:min-h-[546px] bg-[#091741] rounded-none md:rounded-l-none md:rounded-r-[16px] flex flex-col justify-center md:justify-start items-center md:items-start px-0 md:px-[20px] py-[40px] md:py-[24px] shrink-0 overflow-y-auto md:overflow-hidden">
          <div
            className="absolute rounded-full bg-[#1463FF]"
            style={{ width: "173px", height: "173px", left: "calc(50% - 173px/2 - 0.5px)", top: "-145px", filter: "blur(40px)", opacity: 0.8 }}
          />
          {view === "login" ? (
            <LoginForm setView={setView} />
          ) : (
            <RegisterForm setView={setView} />
          )}
        </div>
      </div>
    </div>
  );
}
