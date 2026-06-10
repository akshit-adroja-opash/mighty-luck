"use client";

import { useState } from "react";

const ArrowIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <div className={`relative w-[16px] h-[16px] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
    {/* Vector 3 (the vertical shaft of the arrow) */}
    <div 
      className="absolute w-[2px] h-[10px] bg-[#FFBF1F]" 
      style={{ left: "7px", top: "3px" }}
    />
    {/* Vector 4 (the V-shaped arrowhead pointing down) */}
    <div 
      className="absolute w-[8px] h-[8px] border-b-2 border-r-2 border-[#FFBF1F] rotate-45"
      style={{ left: "4px", top: "5px" }}
    />
  </div>
);

export default function SeoContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex w-[1136px] flex-none flex-col gap-[40px] items-start overflow-hidden">
      <div 
        className={`relative flex w-[1136px] flex-col items-center isolation-isolate transition-all duration-500 ease-in-out ${
          isExpanded ? "h-auto pb-[60px]" : "h-[708px] overflow-hidden"
        }`}
      >
        {/* Content Blocks Container */}
        <div className="flex flex-col items-center gap-[32px] w-[1136px]">
          
          {/* Block 1 */}
          <div className="flex w-[800px] h-[412px] flex-none flex-col items-start gap-[24px]">
            <h2 className="w-full font-['Jost'] text-[32px] font-bold leading-[120%] tracking-[-0.02em] text-white">
              Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
            </h2>
            <p className="w-full font-['Manrope'] text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
              Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods. Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today. Ready to play games and win real crypto? Start playing crypto casino games at Mighty Luck Casino
            </p>
          </div>

          {/* Block 2 */}
          <div className="flex w-[800px] h-[129px] flex-none flex-col items-start gap-[16px]">
            <h3 className="w-full font-['Jost'] text-[24px] font-bold leading-[35px] text-white">
              Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
            </h3>
            <p className="w-full font-['Manrope'] text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
              Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex w-[800px] h-[103px] flex-none flex-col items-start gap-[16px]">
            <h3 className="w-full font-['Jost'] text-[24px] font-bold leading-[35px] text-white">
              Massive Game Variety
            </h3>
            <p className="w-full font-['Manrope'] text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
              With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You’ll find:
            </p>
          </div>

        </div>

        {/* Read More Gradient Overlay & Button */}
        <div 
          className={`absolute bottom-0 left-[calc(50%-400px)] flex w-[800px] flex-col items-center justify-end px-[10px] pb-[24px] z-10 transition-all duration-300 ${
            isExpanded 
              ? "h-[100px] bg-transparent" 
              : "h-[200px] bg-gradient-to-t from-[#091741] to-transparent"
          }`}
        >
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex cursor-pointer items-center gap-[4px] transition-opacity hover:opacity-85"
          >
            <span className="font-['Manrope'] text-[14px] font-semibold leading-[19px] tracking-[0.01em] text-[#FFBF1F]">
              {isExpanded ? "Read less" : "Read more"}
            </span>
            <ArrowIcon isExpanded={isExpanded} />
          </button>
        </div>

      </div>
    </section>
  );
}