export default function HeroBanner() {
  return (
    <div className="relative h-[356px] w-[1136px] flex-none overflow-hidden rounded-[20px]">
      
      {/* Background Image */}
      <div 
        className="absolute left-0 top-[2.5px] z-0 h-[353px] w-[1136px] rounded-[16px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero-banner.png')` }}
      />

      {/* Ellipse 7 */}
      <div className="absolute -left-[161px] -top-[102px] z-[1] h-[575px] w-[575px] rounded-full bg-[#06102B] blur-[75px]" />
      
      {/* Ellipse 9 */}
      <div className="absolute left-[198px] top-[224px] z-[1] h-[194px] w-[194px] rounded-full bg-[#103686] blur-[25px]" />
      
      {/* Ellipse 8 */}
      <div className="absolute left-[1041px] top-[271px] z-[1] h-[129px] w-[129px] rounded-full bg-[#010A25] blur-[25px]" />

      {/* Content Box */}
      <div className="absolute left-[40px] top-[101px] z-10 flex h-[204px] w-[457px] flex-none flex-col items-start gap-[24px]">
        
        <div className="flex h-[140px] w-[457px] flex-none flex-col items-start gap-[4px] p-0">
          <h2 className="h-[40px] w-[457px] flex-none font-jost text-[28px] font-medium leading-[40px] text-white">
            Get <span className="font-bold text-[#FFBF1F]">LUCKY</span> with our exclusive
          </h2>
          <h1 className="h-[96px] w-[457px] flex-none whitespace-normal font-jost text-[48px] font-extrabold leading-[100%] text-white">
            250% WELCOME BONUS!
          </h1>
        </div>

        <button className="flex h-[40px] w-[110px] flex-none flex-row items-center justify-center gap-[10px] rounded-[8px] bg-[#FFBF1F] px-[24px] py-[10px] transition-colors hover:bg-yellow-400">
          <span className="whitespace-nowrap font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404]">
            Join Now
          </span>
        </button>

      </div>

    </div>
  );
}
