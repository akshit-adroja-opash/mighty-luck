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
    <div className="fixed inset-0 w-full h-full min-h-[100dvh] bg-[#091741] md:bg-[#0C1733]/70 md:backdrop-blur-[8px] flex items-start md:items-center justify-center z-[150] mx-auto overflow-y-auto md:py-8">
      {/* Mobile Layout Container */}
      <div className="flex md:hidden flex-col w-full min-h-[100dvh] relative">
        
        {/* Mobile Header */}
        <div className="flex flex-row items-center px-[20px] pt-[12px] pb-[30px] gap-[20px] w-full h-[92px] flex-none">
          <button onClick={() => dispatch(closeModal("auth"))} className="flex justify-center items-center w-[30px] h-[30px] cursor-pointer">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 8H1M1 8L8 15M1 8L8 1" stroke="#D2DCF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex flex-row items-center gap-0 flex-1 h-[50px]">
            <button
              onClick={() => { dispatch(setAuthModalView("register")); setView("register"); }}
              className={`flex justify-center items-center px-[10px] sm:px-[30px] py-[10px] gap-[10px] flex-1 h-[50px] rounded-l-[8px] ${view === 'register' ? 'bg-[#1463FF]' : 'bg-[#112F82]'} text-[#FFFFFF] font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] whitespace-nowrap cursor-pointer transition-colors`}
            >
              Join Now
            </button>
            <button
              onClick={() => { dispatch(setAuthModalView("login")); setView("login"); }}
              className={`flex justify-center items-center px-[10px] sm:px-[30px] py-[10px] gap-[10px] flex-1 h-[50px] rounded-r-[8px] ${view === 'login' ? 'bg-[#1463FF]' : 'bg-[#112F82]'} text-[#FFFFFF] font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] whitespace-nowrap cursor-pointer transition-colors`}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="relative w-full h-[170px] bg-cover bg-center rounded-t-[12px] overflow-hidden flex-none" style={{ backgroundImage: "url('/games/lion.png')" }}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute rounded-full bg-[#0051F1]" style={{ width: "281px", height: "281px", left: "calc(50% - 281px/2 + 0.5px)", top: "calc(50% - 281px/2 + 6.5px)", filter: "blur(62.3947px)", opacity: 0.8 }} />
          
          <div className="absolute flex flex-col items-center gap-[12px] w-[220.13px] h-[131px] left-[calc(50%-110.06px)] top-[calc(50%-65.5px)] z-10">
            {/* Top Frame: 350% + Pill */}
            <div className="relative flex flex-col items-center justify-center w-[180px] h-[87px] isolate flex-none">
              {/* 350% */}
              <div className="flex flex-row justify-center items-center gap-[7.5px] w-[180px] h-[87px] z-0 flex-none">
                <span className="font-jost font-extrabold text-[60px] leading-[87px] text-center tracking-[0.01em] text-white">
                  350%
                </span>
              </div>

              {/* WELCOME PACKAGE PILL */}
              <div 
                className="absolute flex flex-row justify-center items-center p-[10px] z-10"
                style={{
                  width: "115px",
                  height: "33px",
                  left: "30.94px",
                  top: "51px",
                  background: "linear-gradient(92.06deg, #F5B607 2.1%, #F2D474 52.48%, #F5B607 64.97%, #FF672C 96.58%)",
                  boxShadow: "0px -2.52616px 12.6308px rgba(61, 44, 0, 0.25)",
                  borderRadius: "75px",
                  transform: "rotate(-6.38deg)"
                }}
              >
                <span className="font-jost font-extrabold text-[9px] leading-[13px] text-center text-[#140F02]">
                  WELCOME PACKAGE
                </span>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="font-manrope font-bold text-[12px] leading-[16px] text-center tracking-[0.01em] text-white w-[200px] h-[32px] flex items-center justify-center flex-none">
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

      {/* Desktop Modal Container Wrapper */}
      <div className="hidden md:flex relative w-full md:w-[95%] max-w-none md:max-w-[730px] h-[100dvh] md:h-[546px] shrink-0 md:my-auto">
        {/* Close Button (Outside for Desktop) */}
        <button
          onClick={() => dispatch(closeModal("auth"))}
          className="absolute -right-[40px] top-0 z-50 hidden lg:flex h-[24px] w-[24px] items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Inner Modal Content */}
        <div className="flex relative w-full h-full rounded-none md:rounded-[16px] shadow-none md:shadow-2xl overflow-hidden">
          {/* Close Button (Inside for Tablet) */}
          <button
            onClick={() => dispatch(closeModal("auth"))}
            className="absolute right-4 top-4 z-50 flex lg:hidden h-[32px] w-[32px] items-center justify-center rounded-full bg-[#112F82] md:bg-[#112F82]/80 text-white md:text-white/80 transition-all hover:bg-red-500 hover:text-white shadow-lg cursor-pointer"
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
            className="absolute flex flex-col items-center gap-[12px]"
            style={{ width: "220.13px", height: "131px", left: "calc(50% - 220.13px/2)", top: "370px" }}
          >
            {/* Top Frame: 350% + Pill */}
            <div className="relative flex flex-col items-center justify-center w-[180px] h-[87px] isolate flex-none">
              {/* 350% */}
              <div className="flex flex-row justify-center items-center gap-[7.5px] w-[180px] h-[87px] z-0 flex-none">
                <span className="font-jost font-extrabold text-[60px] leading-[87px] text-center tracking-[0.01em] text-white">
                  350%
                </span>
              </div>

              {/* WELCOME PACKAGE PILL */}
              <div 
                className="absolute flex flex-row justify-center items-center p-[10px] z-10"
                style={{
                  width: "115px",
                  height: "33px",
                  left: "30.94px",
                  top: "51px",
                  background: "linear-gradient(92.06deg, #F5B607 2.1%, #F2D474 52.48%, #F5B607 64.97%, #FF672C 96.58%)",
                  boxShadow: "0px -2.52616px 12.6308px rgba(61, 44, 0, 0.25)",
                  borderRadius: "75px",
                  transform: "rotate(-6.38deg)"
                }}
              >
                <span className="font-jost font-extrabold text-[9px] leading-[13px] text-center text-[#140F02]">
                  WELCOME PACKAGE
                </span>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="font-manrope font-bold text-[12px] leading-[16px] text-center tracking-[0.01em] text-white w-[200px] h-[32px] flex items-center justify-center flex-none">
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </div>
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
    </div>
  );
}
