export default function HeroBanner() {
  return (
    <div className="relative h-auto min-h-[220px] sm:min-h-[280px] md:min-h-[356px] w-full overflow-hidden rounded-[20px] pb-8 md:pb-0">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/layout/hero.jpg')` }}
      />

      {/* Ellipse 7 */}
      <div className="absolute -left-[100px] -top-[100px] md:-left-[161px] md:-top-[102px] z-[1] h-[250px] w-[250px] md:h-[575px] md:w-[575px] rounded-full bg-[#06102B] bg-opacity-60 md:bg-opacity-100 blur-[50px] md:blur-[75px]" />
      
      
      {/* Ellipse 8 */}
      <div className="absolute -right-[20px] -bottom-[20px] md:-right-[34px] md:-bottom-[44px] z-[1] h-[80px] w-[80px] md:h-[129px] md:w-[129px] rounded-full bg-[#010A25] blur-[25px]" />

      {/* Ellipse 9 */}
      <div className="absolute left-[50px] top-[150px] md:left-[198px] md:top-[224px] z-[1] h-[100px] w-[100px] md:h-[194px] md:w-[194px] rounded-full bg-[#103686] blur-[25px]" />

      {/* Content Box */}
      <div className="relative z-10 flex flex-col items-start gap-4 md:gap-[24px] px-5 md:pl-[40px] md:pr-0 pt-8 sm:pt-12 md:pt-[101px] pb-8 md:pb-0 w-full md:max-w-[497px]">
        
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-jost text-base sm:text-xl md:text-[28px] font-medium leading-snug md:leading-[40px] text-white">
            Get <span className="font-bold text-[#FFBF1F]">LUCKY</span> with our exclusive
          </h2>
          <h1 className="font-jost text-2xl sm:text-3xl md:text-[48px] font-extrabold leading-tight md:leading-[48px] text-white">
            250% WELCOME BONUS!
          </h1>
        </div>

        <button className="flex h-[40px] min-w-[110px] flex-none flex-row items-center justify-center gap-[10px] rounded-[8px] bg-[#FFBF1F] px-[24px] py-[10px] transition-colors hover:bg-yellow-400">
          <span className="whitespace-nowrap font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404]">
            Join Now
          </span>
        </button>

      </div>

    </div>
  );
}
