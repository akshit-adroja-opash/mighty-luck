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
    <div className="fixed inset-0 z-[100] flex flex-col sm:flex-row items-center justify-center bg-[#091741] sm:bg-[#0C1733]/70 sm:backdrop-blur-[8px] p-0 sm:p-4 overflow-y-auto sm:overflow-hidden">

      {/* Modal Container */}
      <div className="relative flex w-full min-h-[100dvh] sm:min-h-0 sm:h-auto sm:w-auto max-w-none sm:max-w-[400px] md:max-w-none flex-col md:flex-row rounded-none sm:rounded-[16px] shadow-none sm:shadow-2xl bg-[#091741] overflow-hidden sm:max-h-[90dvh] sm:overflow-visible">

        {/* Close Button */}
        <button
          onClick={() => dispatch(closeModal("auth"))}
          className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-[#112F82]/80 text-white/80 transition-all hover:bg-red-500 hover:text-white shadow-lg cursor-pointer"
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
              <div className="flex items-center justify-center bg-[#FFC83D] rounded-[100px]" style={{ width: "167px", height: "37px", padding: "10px 20px" }}>
                <span className="font-jost font-extrabold text-[#1A1404] text-center" style={{ fontSize: "12px", lineHeight: "17px" }}>
                  WELCOME PACKAGE
                </span>
              </div>
            </div>
            <p className="font-manrope font-bold text-white text-center" style={{ fontSize: "10px", lineHeight: "14px", letterSpacing: "0.01em" }}>
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </p>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="relative flex w-full flex-1 sm:flex-none md:w-[390px] md:h-[546px] flex-col items-start overflow-hidden rounded-none sm:rounded-r-[16px] bg-[#091741]">
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
