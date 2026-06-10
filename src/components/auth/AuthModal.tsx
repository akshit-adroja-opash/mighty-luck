"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/uiSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals["auth"]);
  
  const [view, setView] = useState<"login" | "register">("register");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div className="relative flex w-[730px] h-[546px] rounded-[16px] shadow-2xl bg-[#091741]">
        
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeModal("auth"))}
          className="absolute -right-4 -top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-[#112F82] text-white transition-colors hover:bg-red-500 shadow-lg"
        >
          <X size={18} />
        </button>

        {/* Left Column - Promo */}
        <div className="relative flex h-[546px] w-[340px] flex-col items-center overflow-hidden rounded-l-[16px] bg-[#000C24]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/lion_promo.png')" }}
          />

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 h-[219px] w-full bg-gradient-to-t from-[#000C24] to-transparent" />

          {/* Glowing Blue Blur */}
          <div className="absolute -bottom-[129px] h-[173px] w-[173px] rounded-full bg-[#1463FF] opacity-60 blur-[40px]" />

          {/* Content Area */}
          <div className="absolute top-[359px] flex w-[300px] flex-col items-center gap-[20px]">
            {/* 350% text */}
            <div className="font-jost text-[52px] font-extrabold leading-[75px] tracking-[0.01em] text-white">
              350%
            </div>
            
            {/* Welcome Package Pill */}
            <div className="flex h-[37px] items-center justify-center rounded-full bg-[#FFC83D] px-[20px] py-[10px]">
              <span className="font-jost text-[12px] font-extrabold leading-[17px] text-[#1A1404]">
                WELCOME PACKAGE
              </span>
            </div>

            {/* Subtitle */}
            <p className="w-[200px] text-center font-manrope text-[10px] font-bold leading-[14px] tracking-[0.01em] text-white">
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </p>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="relative flex h-[546px] w-[390px] flex-col items-start gap-[32px] overflow-hidden rounded-r-[16px] bg-[#091741] p-[24px_20px]">
          
          {/* Top Blue Glow */}
          <div className="absolute -top-[145px] left-1/2 h-[173px] w-[173px] -translate-x-1/2 rounded-full bg-[#1463FF] opacity-30 blur-[40px]" />

          <div className="relative z-10 flex w-full flex-col gap-[16px]">
            {/* Header with Logo and Close (Logo handled via tabs below) */}
            <div className="flex w-full items-center justify-center pb-2">
               <div className="flex items-center gap-1">
                 <span className="text-xl text-[#FFC83D]">👑</span>
                 <span className="text-lg font-black uppercase tracking-wide text-white">
                   MIGHTY <span className="text-[#FFC83D]">LUCK</span>
                 </span>
               </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex w-full h-[40px] items-center gap-[8px]">
              <button 
                onClick={() => setView("register")}
                className={`flex flex-1 h-full items-center justify-center rounded-[8px] font-manrope text-[14px] font-bold tracking-[0.02em] transition-colors ${
                  view === "register" 
                    ? "bg-[#FFC83D] text-[#000000]" 
                    : "bg-[#1463FF] text-[#FFFFFF] hover:bg-blue-600"
                }`}
              >
                Join Now
              </button>
              <button 
                onClick={() => setView("login")}
                className={`flex flex-1 h-full items-center justify-center rounded-[8px] font-manrope text-[14px] font-bold tracking-[0.02em] transition-colors ${
                  view === "login" 
                    ? "bg-[#FFC83D] text-[#000000]" 
                    : "bg-[#1463FF] text-[#FFFFFF] hover:bg-blue-600"
                }`}
              >
                Log In
              </button>
            </div>

            {/* Form Container */}
            <div className="flex w-full flex-col">
              {view === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
            
          </div>

        </div>

      </div>
    </div>
  );
}
