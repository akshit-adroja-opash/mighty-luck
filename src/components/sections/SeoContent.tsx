"use client";

import { useState } from "react";

const ArrowIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <div className={`relative flex h-[10px] w-[8px] items-center justify-center transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
    {/* Shaft */}
    <div className="absolute top-[0px] h-[9px] w-[2px] bg-[#FFBF1F]" />
    {/* Arrowhead */}
    <div className="absolute bottom-[-1px] h-[6px] w-[6px] rotate-45 border-b-[2px] border-r-[2px] border-[#FFBF1F]" />
  </div>
);

export default function SeoContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex w-[1136px] flex-none flex-col items-start gap-[40px] overflow-hidden">
      <div 
        className={`relative flex w-[1136px] flex-col items-center isolation-isolate transition-all duration-500 ease-in-out ${
          isExpanded ? "h-auto pb-[60px]" : "h-[708px] overflow-hidden"
        }`}
      >
        {/* Content Blocks Container */}
        <div className="flex w-[1136px] flex-col items-center gap-[32px]">
          
          {/* Block 1 */}
          <div className="flex h-[412px] w-[800px] flex-none flex-col items-start gap-[24px]">
            <h2 className="w-[800px] font-jost text-[32px] font-bold leading-[120%] tracking-[-0.02em] text-white">
              Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
            </h2>
            <div className="flex w-[800px] flex-col gap-[26px]">
              <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
                Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luckgives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods.
              </p>
              <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
                Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today.
              </p>
              <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
                Ready to play games and win real crypto?
              </p>
              <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
                Start playing crypto casino games at Mighty Luck Casino
              </p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex h-[129px] w-[800px] flex-none flex-col items-start gap-[16px] z-10">
            <h3 className="w-[800px] font-jost text-[24px] font-bold leading-[35px] text-white">
              Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
            </h3>
            <p className="w-[800px] font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
              Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex h-[103px] w-[800px] flex-none flex-col items-start gap-[16px] z-20">
            <h3 className="w-[800px] font-jost text-[24px] font-bold leading-[35px] text-white">
              Massive Game Variety
            </h3>
            <p className="w-[800px] font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
              ith more than 9,000 casino games, Wild.io outshines many crypto casinos and traditional casinos alike. You’ll find:
            </p>
          </div>

        </div>

        {/* Read More Gradient Overlay & Button */}
        <div 
          className={`absolute bottom-0 left-[calc(50%-400px)] flex w-[800px] flex-col items-center justify-end px-[10px] pb-[24px] z-30 transition-all duration-300 ${
            isExpanded 
              ? "h-[100px] bg-transparent" 
              : "h-[200px] bg-gradient-to-t from-[#091741] to-transparent"
          }`}
        >
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex cursor-pointer items-center gap-[4px] transition-opacity hover:opacity-85"
          >
            <span className="font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.01em] text-[#FFBF1F]">
              {isExpanded ? "Read less" : "Read more"}
            </span>
            <ArrowIcon isExpanded={isExpanded} />
          </button>
        </div>

      </div>
    </section>
  );
}
