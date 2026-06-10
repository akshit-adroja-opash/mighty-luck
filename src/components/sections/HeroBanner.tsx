export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden rounded-[16px] bg-[#0C1F56]">
      <div 
        className="relative flex h-[356px] w-full items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero_banner_lion.png')` }}
      >
        {/* Background Gradients/Blurs */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06102B]/90 via-[#06102B]/60 to-transparent" />
        
        {/* Figma specific ellipses blurs */}
        <div className="absolute -left-[161px] -top-[102px] h-[575px] w-[575px] rounded-full bg-[#06102B] blur-[75px]" />
        <div className="absolute left-[198px] top-[224px] h-[194px] w-[194px] rounded-full bg-[#103686] blur-[25px]" />
        <div className="absolute left-[1041px] top-[271px] h-[129px] w-[129px] rounded-full bg-[#010A25] blur-[25px]" />

        {/* Content Box */}
        <div className="relative z-10 ml-10 flex w-[457px] flex-col gap-6">
          
          <div className="flex flex-col gap-1">
            <h2 className="font-sans text-[28px] font-medium leading-[40px] text-white">
              Get <span className="text-[#FFBF1F] font-bold">LUCKY</span> with our exclusive
            </h2>
            <h1 className="font-sans text-[48px] font-extrabold leading-none text-white">
              250% WELCOME BONUS!
            </h1>
          </div>

          <button className="flex h-[40px] w-[110px] items-center justify-center rounded-[8px] bg-[#FFBF1F] transition-colors hover:bg-yellow-400">
            <span className="font-sans text-[14px] font-bold tracking-[0.02em] text-[#1A1404]">
              Join Now
            </span>
          </button>

        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 right-32 z-10 flex items-center justify-center gap-2">
          <div className="h-[6px] w-[12px] rounded-full bg-[#D2DCF7]" />
          <div className="h-[6px] w-[6px] rounded-full bg-[#D2DCF7]" />
          <div className="h-[6px] w-[6px] rounded-full bg-[#D2DCF7]" />
        </div>

      </div>
    </section>
  );
}