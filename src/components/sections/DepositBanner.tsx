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
    <section className="relative isolate flex w-full flex-col md:flex-row items-center justify-between gap-[20px] md:gap-0 overflow-hidden rounded-[10px] md:rounded-[16px] bg-[#0C1F56] p-5 md:py-0 md:px-[40px] h-[165px] md:h-[100px]">
      
      {/* Background Blur */}
      <div 
        className="absolute left-1/2 top-[60px] z-[-1] h-[534px] w-[534px] -translate-x-1/2 rounded-full bg-[#1463FF] blur-[50px] hidden md:block" 
      />
      <div 
        className="absolute z-[-1] rounded-full bg-[#1463FF] md:hidden"
        style={{ 
          width: "416px", 
          height: "416px", 
          left: "calc(50% - 208px)", 
          top: "95px", 
          filter: "blur(38.95px)" 
        }}
      />

      {/* Text */}
      <h2 className="z-[1] flex-none text-center font-jost text-[18px] md:text-[20px] font-extrabold leading-[26px] md:leading-[29px] text-white w-[237px] md:w-auto">
        Want to play? Deposit Now
      </h2>

      {/* Crypto Logos */}
      <div className="z-[2] flex flex-row flex-nowrap items-center justify-between md:justify-center gap-[4px] md:gap-[28px] text-white w-full pb-0 flex-none md:flex-1">
        <img src="/games/deposite-icon/d1.svg" alt="deposit icon" className="w-[13.38px] h-[18.39px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d2.svg" alt="deposit icon" className="w-[11.3px] h-[18.09px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d3.svg" alt="deposit icon" className="w-[19.09px] h-[17.73px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d4.svg" alt="deposit icon" className="w-[18.1px] h-[19.05px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d5.svg" alt="deposit icon" className="w-[21.4px] h-[17.7px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d6.svg" alt="deposit icon" className="w-[18.14px] h-[18.14px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d7.svg" alt="deposit icon" className="w-[15px] h-[16.36px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d8.svg" alt="deposit icon" className="w-[14.09px] h-[17.27px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d9.svg" alt="deposit icon" className="w-[17.09px] h-[18.56px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d10.svg" alt="deposit icon" className="w-[14.2px] h-[17.52px] md:w-auto md:h-auto shrink" />
        <img src="/games/deposite-icon/d11.svg" alt="deposit icon" className="w-[19.89px] h-[17.52px] md:w-auto md:h-auto shrink" />
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
