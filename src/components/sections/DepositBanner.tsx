"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setActiveCategory } from "@/store/slices/uiSlice";
import {
  Bitcoin,
  Coins,
  CircleDollarSign,
  Wallet,
  Gem,
  Hexagon,
  Boxes,
  Circle,
  Activity,
  Triangle,
  Zap,
  Home,
  Cherry,
  Rocket,
  Gamepad2,
  Dices,
  Library
} from "lucide-react";

export default function DepositBanner() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);

  if (isAuthenticated) {
    const categories = [
      { name: "Lobby", icon: Home },
      { name: "Slots", icon: Cherry },
      { name: "Originals", icon: Zap },
      { name: "Crash Games", icon: Rocket },
      { name: "Providers", icon: Gamepad2 },
      { name: "Table Games", icon: Dices },
      { name: "Bonus Buys", icon: CircleDollarSign },
      { name: "Collection", icon: Library },
    ];

    return (
      <div className="flex w-full items-center gap-2 h-[50px] overflow-x-auto no-scrollbar">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.name === activeCategory;
          return (
            <button
              key={category.name}
              onClick={() => dispatch(setActiveCategory(category.name))}
              className={`flex h-full flex-1 min-w-[110px] sm:min-w-[135px] items-center justify-center gap-2 rounded-[6px] px-3 sm:px-4 py-2.5 transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#1463FF]"
                  : "bg-[#0C1F56] hover:bg-[#112F82]"
              }`}
            >
              <Icon 
                size={20} 
                className={isActive ? "text-[#FFB800]" : "text-[#D2DCF7]"} 
                fill={isActive ? "#FFB800" : "transparent"} 
              />
              <span 
                className={`font-sans text-[14px] font-semibold tracking-[0.02em] whitespace-nowrap ${
                  isActive ? "text-white" : "text-[#D2DCF7]"
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section className="relative isolate flex h-auto min-h-[80px] w-full flex-none flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden rounded-[16px] bg-[#0C1F56] p-5 sm:px-8 sm:py-0">
      
      {/* Background Blur */}
      <div className="absolute left-1/2 top-[60px] z-0 h-[534px] w-[534px] -translate-x-1/2 rounded-full bg-[#1463FF] blur-[50px]" />

      {/* Text */}
      <h2 className="z-[1] flex flex-none items-center text-center font-jost text-base sm:text-[20px] font-extrabold leading-[29px] text-white whitespace-nowrap">
        Want to play? Deposit Now
      </h2>

      {/* Crypto Logos */}
      <div className="z-[2] hidden flex-none items-center justify-center gap-[28px] text-white lg:flex">
        <Bitcoin size={18} />
        <Gem size={18} />
        <CircleDollarSign size={18} />
        <Triangle size={18} />
        <Activity size={18} />
        <Hexagon size={18} />
        <Coins size={18} />
        <Wallet size={18} />
        <Circle size={18} />
        <Boxes size={18} />
        <Zap size={18} />
      </div>

      {/* Button */}
      <button className="z-[3] flex h-[44px] flex-none flex-row items-center justify-center gap-[10px] rounded-[8px] bg-[#FFC83D] px-[30px] py-[10px] transition-colors hover:bg-yellow-400">
        <span className="flex-none whitespace-nowrap text-center font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404]">
          Deposit Now
        </span>
      </button>

    </section>
  );
}
