"use client";

import { useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const promos = [
  {
    id: 1,
    title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
    cta: "Claim Now",
    bg: "/images/promotions/promotion 1.png",
    gradient: "linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%)",
  },
  {
    id: 2,
    title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
    cta: "Claim Now",
    bg: "/images/promotions/promotion 2.png",
    gradient: "linear-gradient(90deg, #060B4D 39.55%, rgba(6, 11, 77, 0) 50%)",
  },
  {
    id: 3,
    title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
    cta: "Claim Now",
    bg: "/images/promotions/promotion 1.png",
    gradient: "linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%)",
  },
];

export default function PromotionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 278;
    const gap = 8;
    scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 278;
    const gap = 8;
    scrollRef.current.scrollBy({ left: (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-start gap-[14.81px] md:gap-5 w-full flex-none overflow-hidden">

      <SectionHeader
        title="PROMOTIONS"
        iconBg="bg-transparent"
        icon={
          <img src="/games/game-icons/promotions.svg" alt="Promotions" className="w-[18px] h-[18px] md:w-[30px] md:h-[30px]" />
        }
        showViewAll={false}
        onPrev={scrollLeft}
        onNext={scrollRight}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />

      {/* Cards Row */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row items-center gap-[8px] md:gap-3 w-full h-[163px] md:h-[220px] flex-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
      >
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="relative w-[278px] sm:w-[400px] md:w-[560px] h-[163px] md:h-[220px] rounded-[8px] md:rounded-[16px] flex-none overflow-hidden snap-start"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-right bg-no-repeat rounded-[10px] md:rounded-[16px]"
              style={{ backgroundImage: `url('${promo.bg}')` }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 rounded-[10px] md:rounded-[16px]"
              style={{ background: promo.gradient }}
            />

            {/* Blue glow ellipse */}
            <div
              className="absolute w-[118.52px] md:w-[160px] h-[118.52px] md:h-[160px] rounded-full pointer-events-none"
              style={{
                left: "-55.56px",
                top: "-57.48px",
                background: "#1463FF",
                filter: "blur(37px)",
                opacity: 0.7,
              }}
            />

            {/* Content */}
            <div className="relative z-[2] flex flex-col items-start justify-center gap-[12px] md:gap-[16px] p-[17.78px] md:p-[24px] w-full h-full">
              
              {/* Optional hidden text paragraph would go here with hidden md:block */}

              <h3
                className="font-jost font-extrabold text-[14px] md:text-[24px] leading-[120%] tracking-[0.01em] text-white w-[141px] md:w-[290px]"
                style={{ whiteSpace: "pre-line" }}
              >
                {promo.title}
              </h3>
              
              <button className="flex flex-row items-center justify-center gap-[8.64px] px-[20.73px] py-[8.64px] min-w-[95px] w-max h-[34.55px] md:h-[40px] bg-[#FFBF1F] md:bg-[#FFC83D] hover:bg-[#FFD966] rounded-[6px] md:rounded-[8px] transition-colors cursor-pointer flex-none">
                <span className="font-manrope font-bold text-[12.09px] md:text-[14px] leading-[17px] md:leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap">
                  {promo.cta}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
