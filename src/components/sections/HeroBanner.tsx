"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function HeroBanner() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center gap-[8px] md:gap-[20px] w-full">
      {/* Main Banner */}
      <div className="relative isolate h-[170px] md:h-auto md:min-h-[356px] w-full overflow-hidden rounded-[10px] md:rounded-[20px] pb-0 bg-[#0C1F56] md:bg-transparent">

        {/* Tablet Background Image — left-aligned */}
        <div
          className="hidden md:block lg:hidden absolute inset-0 z-0 h-full w-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/images/layout/hero.jpg')`, backgroundPosition: 'left center' }}
        />

        {/* Desktop Background Image — left-aligned */}
        <div
          className="hidden lg:block absolute inset-0 z-0 h-full w-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/images/layout/hero.jpg')`, backgroundPosition: 'left center' }}
        />

        {/* Mobile Background Image (Figma exact positioning) */}
        <div
          className="md:hidden absolute z-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('/images/layout/hero.jpg')`,
            width: '547.18px',
            height: '170.03px',
            left: 'calc(50% - 547.18px/2 + 71.59px)',
            top: 'calc(50% - 170.03px/2 + 0.02px)'
          }}
        />

        {/* Tablet Left Gradient — reduced opacity for less shadow */}
        <div
          className="hidden md:block lg:hidden absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(90deg, rgba(6,16,43,0.80) 20%, rgba(6,16,43,0.45) 50%, rgba(6,16,43,0) 75%)' }}
        />

        {/* Ellipse 7 — mobile & desktop only, hidden at tablet */}
        <div className="absolute -left-[50px] -top-[38px] md:hidden lg:block lg:-left-[161px] lg:-top-[102px] z-[1] h-[226px] w-[226px] lg:h-[575px] lg:w-[575px] rounded-full bg-[#03123C] lg:bg-[#06102B] opacity-50 lg:opacity-50 blur-[29.26px] lg:blur-[75px]" />

        {/* Ellipse 8 — black shadow bottom right */}
        <div className="absolute left-[501.42px] top-[130.53px] md:left-auto md:top-auto md:-right-[20px] md:-bottom-[20px] lg:-right-[34px] lg:-bottom-[44px] z-[1] h-[62.14px] w-[62.14px] md:h-[100px] md:w-[100px] lg:h-[129px] lg:w-[129px] rounded-full bg-[#010A25] opacity-50 md:opacity-50 lg:opacity-50 blur-[12.04px] md:blur-[20px] lg:blur-[25px]" />


        {/* Content Box */}
        <div className="absolute md:relative z-10 flex flex-col items-start gap-[16px] md:gap-[24px] left-[19.27px] top-[28.76px] md:translate-y-0 md:left-auto md:top-auto px-0 md:pl-[40px] md:pr-0 pt-0 md:pt-[80px] lg:pt-[101px] pb-0 md:pb-[40px] lg:pb-0 w-[220.13px] md:w-full md:max-w-[420px] lg:max-w-[497px] h-[112.47px] md:h-auto">

          <div className="flex flex-col items-start gap-[1.93px] md:gap-2 w-full md:w-auto">
            <h2 className="font-jost text-[14px] md:text-[20px] lg:text-[28px] font-medium leading-[20px] md:leading-[28px] lg:leading-[40px] text-white">
              Get <span className="font-bold text-[#FFBF1F]">LUCKY</span> with our exclusive
            </h2>
            <h1 className="font-jost text-[20px] md:text-[36px] lg:text-[48px] font-extrabold leading-[22px] md:leading-[42px] lg:leading-[48px] text-white w-full">
              250% WELCOME BONUS!
            </h1>
          </div>

          <button className="flex h-[34.55px] md:h-[44px] lg:h-[40px] w-[95px] md:w-auto md:min-w-[120px] flex-none flex-row items-center justify-center gap-[8.64px] md:gap-[10px] rounded-[6px] md:rounded-[8px] bg-[#FFBF1F] px-[20.73px] md:px-[28px] lg:px-[24px] py-[8.64px] md:py-[12px] lg:py-[10px] transition-colors hover:bg-yellow-400 mt-auto md:mt-0">
            <span className="whitespace-nowrap font-manrope text-[12.09px] md:text-[15px] lg:text-[14px] font-bold leading-[17px] md:leading-[20px] lg:leading-[19px] tracking-[0.02em] text-[#1A1404]">
              Join
            </span>
          </button>

        </div>
      </div>

      {/* Pagination Dots */}
      {isAuthenticated && (
        <div className="flex flex-col items-center w-full h-[6px]">
          <div className="flex flex-row justify-center items-center gap-[8px] w-[40px] h-[6px]">
            <div className="w-[12px] h-[6px] bg-[#D2DCF7] rounded-[150px]"></div>
            <div className="w-[6px] h-[6px] bg-[#D2DCF7] rounded-[150px]"></div>
            <div className="w-[6px] h-[6px] bg-[#D2DCF7] rounded-[150px]"></div>
          </div>
        </div>
      )}

    </div>
  );
}
