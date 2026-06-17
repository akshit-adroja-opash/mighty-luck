export default function HeroBanner() {
  return (
    <div className="relative isolate h-[170px] md:h-auto md:min-h-[356px] w-full overflow-hidden rounded-[10px] md:rounded-[20px] pb-0 bg-[#0C1F56] md:bg-transparent">
      
      {/* Desktop Background Image */}
      <div 
        className="hidden md:block absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/layout/hero.jpg')` }}
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

      {/* Ellipse 7 */}
      <div className="absolute -left-[50px] -top-[38px] md:-left-[161px] md:-top-[102px] z-[1] h-[226px] w-[226px] md:h-[575px] md:w-[575px] rounded-full bg-[#03123C] md:bg-[#06102B] opacity-100 blur-[29.26px] md:blur-[75px]" />
      
      {/* Ellipse 8 */}
      <div className="absolute left-[501.42px] top-[130.53px] md:-right-[34px] md:-bottom-[44px] md:left-auto md:top-auto z-[1] h-[62.14px] w-[62.14px] md:h-[129px] md:w-[129px] rounded-full bg-[#010A25] blur-[12.04px] md:blur-[25px]" />

      {/* Ellipse 9 (Desktop Only) */}
      <div className="hidden md:block absolute left-[198px] top-[224px] z-[1] h-[194px] w-[194px] rounded-full bg-[#103686] blur-[25px]" />

      {/* Content Box */}
      <div className="absolute md:relative z-10 flex flex-col items-start gap-[16px] md:gap-[24px] left-[19.27px] top-[28.76px] md:translate-y-0 md:left-auto md:top-auto px-0 md:px-5 md:pl-[40px] md:pr-0 pt-0 md:pt-[101px] pb-0 w-[220.13px] md:w-full md:max-w-[497px] h-[112.47px] md:h-auto">
        
        <div className="flex flex-col items-start gap-[1.93px] md:gap-1 w-full md:w-auto">
          <h2 className="font-jost text-[14px] md:text-[28px] font-medium leading-[20px] md:leading-[40px] text-white">
            Get <span className="font-bold text-[#FFBF1F]">LUCKY</span> with our exclusive
          </h2>
          <h1 className="font-jost text-[20px] md:text-[48px] font-extrabold leading-[20px] md:leading-[48px] text-white w-full">
            250% WELCOME BONUS!
          </h1>
        </div>

        <button className="flex h-[34.55px] md:h-[40px] w-[95px] md:w-auto md:min-w-[110px] flex-none flex-row items-center justify-center gap-[8.64px] md:gap-[10px] rounded-[6px] md:rounded-[8px] bg-[#FFBF1F] px-[20.73px] md:px-[24px] py-[8.64px] md:py-[10px] transition-colors hover:bg-yellow-400 mt-auto md:mt-0">
          <span className="whitespace-nowrap font-manrope text-[12.09px] md:text-[14px] font-bold leading-[17px] md:leading-[19px] tracking-[0.02em] text-[#1A1404]">
            Join Now
          </span>
        </button>

      </div>

    </div>
  );
}
