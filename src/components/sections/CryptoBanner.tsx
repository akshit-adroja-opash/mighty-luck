
export default function CryptoBanner() {
  return (
    <div className="relative flex h-[100px] w-full items-center justify-center overflow-hidden border-b border-[#112F82] px-[20px] md:px-[40px] md:w-[calc(100%_+_48px)] md:-ml-[24px] lg:w-full lg:ml-0">
      
      {/* Background Blur Overlay */}
      <div className="absolute left-1/2 top-[77px] z-0 h-[390px] w-[390px] -translate-x-1/2 rounded-full bg-[#1463FF] blur-[50px]" />
      
      {/* Crypto Icons Row */}
      <div className="relative z-10 flex w-[334px] md:w-full flex-wrap items-center justify-center content-center gap-x-[31px] gap-y-[16px] md:gap-[28px] md:max-w-none">
        <img src="/games/deposite-icon/d1.svg" alt="deposit icon" className="w-[13.38px] h-[18.39px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d2.svg" alt="deposit icon" className="w-[11.3px] h-[18.09px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d3.svg" alt="deposit icon" className="w-[19.09px] h-[17.73px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d4.svg" alt="deposit icon" className="w-[18.1px] h-[19.05px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d5.svg" alt="deposit icon" className="w-[21.4px] h-[17.7px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d6.svg" alt="deposit icon" className="w-[18.14px] h-[18.14px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d7.svg" alt="deposit icon" className="w-[15px] h-[16.36px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d8.svg" alt="deposit icon" className="w-[14.09px] h-[17.27px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d9.svg" alt="deposit icon" className="w-[17.09px] h-[18.56px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d10.svg" alt="deposit icon" className="w-[14.2px] h-[17.52px] md:w-5 md:h-5 object-contain flex-none" />
        <img src="/games/deposite-icon/d11.svg" alt="deposit icon" className="w-[19.89px] h-[17.52px] md:w-5 md:h-5 object-contain flex-none" />
      </div>
      
    </div>
  );
}
