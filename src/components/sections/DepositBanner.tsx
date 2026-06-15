"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setActiveCategory } from "@/store/slices/uiSlice";
import {
  CircleDollarSign,
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
const SvgIconWrapper = (src: string) => {
  const IconComponent = ({ size, className, isActive, ...props }: any) => (
    <div 
      style={{ 
        width: size, 
        height: size, 
        WebkitMaskImage: `url(${src})`, 
        WebkitMaskSize: 'contain', 
        WebkitMaskRepeat: 'no-repeat', 
        WebkitMaskPosition: 'center',
        maskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center'
      }} 
      className={`flex-none ${isActive ? 'bg-[#FFB800]' : 'bg-[#D2DCF7]'} ${className || ''}`}
    />
  );
  IconComponent.displayName = `SvgIcon(${src})`;
  return IconComponent;
};

// ... inside the component
    const categories = [
      { name: "Lobby", icon: ({ size, className, fill }: any) => <Home size={size} className={className} fill={fill} /> },
      { name: "Slots", icon: SvgIconWrapper("/games/game-icons/slot.svg") },
      { name: "Originals", icon: SvgIconWrapper("/games/game-icons/originals.svg") },
      { name: "Crash Games", icon: SvgIconWrapper("/games/game-icons/crash.svg") },
      { name: "Providers", icon: SvgIconWrapper("/games/game-icons/game.svg") },
      { name: "Table Games", icon: SvgIconWrapper("/games/game-icons/table.svg") },
      { name: "Bonus Buys", icon: SvgIconWrapper("/games/game-icons/bonus.svg") },
      { name: "Collection", icon: SvgIconWrapper("/games/game-icons/collections.svg") },
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
                isActive={isActive}
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
    <section className="relative isolate flex w-full flex-col sm:flex-row items-center justify-between gap-6 sm:gap-[79px] overflow-hidden rounded-[16px] bg-[#0C1F56] p-5 sm:px-[40px] sm:h-[100px]">
      
      {/* Background Blur */}
      <div className="absolute left-1/2 top-[60px] z-[-1] h-[534px] w-[534px] -translate-x-1/2 rounded-full bg-[#1463FF] blur-[50px]" />

      {/* Text */}
      <h2 className="z-[1] flex-none text-center font-jost text-[20px] font-extrabold leading-[29px] text-white">
        Want to play? Deposit Now
      </h2>

      {/* Crypto Logos */}
      <div className="z-[2] hidden flex-1 items-center justify-center gap-[28px] text-white lg:flex">
        <img src="/games/deposite-icon/d1.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d2.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d3.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d4.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d5.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d6.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d7.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d8.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d9.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d10.svg" alt="deposit icon" className="shrink-0" />
        <img src="/games/deposite-icon/d11.svg" alt="deposit icon" className="shrink-0" />
      </div>

      {/* Button */}
      <button className="z-[3] flex h-[40px] w-[148px] flex-none items-center justify-center rounded-[8px] bg-[#FFC83D] transition-colors hover:bg-yellow-400">
        <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404]">
          Deposit Now
        </span>
      </button>

    </section>
  );
}
