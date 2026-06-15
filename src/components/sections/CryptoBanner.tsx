
export default function CryptoBanner() {
  return (
    <div className="relative flex h-[80px] sm:h-[100px] w-[calc(100%_+_32px)] sm:w-[calc(100%_+_48px)] lg:w-full -ml-4 sm:-ml-6 lg:ml-0 items-center overflow-hidden border-b border-[#112F82]">
      
      {/* Background Blur Overlay */}
      <div className="absolute left-[calc(50%-195px)] top-[77px] z-0 h-[390px] w-[390px] rounded-full bg-[#1463FF] blur-[50px]" />
      
      {/* Crypto Icons Row */}
      <div className="relative z-10 flex w-full items-center justify-start sm:justify-center gap-[20px] sm:gap-[28px] overflow-x-auto snap-x px-4 sm:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <img src="/games/deposite-icon/d1.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d2.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d3.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d4.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d5.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d6.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d7.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d8.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d9.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d10.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
        <img src="/games/deposite-icon/d11.svg" alt="deposit icon" className="w-5 h-5 object-contain flex-none snap-center" />
      </div>
      
    </div>
  );
}
