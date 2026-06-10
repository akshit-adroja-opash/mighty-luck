export default function TopPromoCards() {
  return (
    <div className="flex h-[134px] w-[232px] flex-none flex-col items-start gap-[10px] rounded-[16px] bg-[#0C1F56] p-[16px]">
      
      <div className="flex w-[200px] flex-none flex-col items-start gap-[8px]">
        
        {/* Top Two Cards Row */}
        <div className="flex h-[44px] w-[200px] flex-none flex-row items-center gap-[4px]">
          
          {/* Refer Friend */}
          <div className="relative isolate flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#3B005F] px-[8px] py-[6px]">
            {/* Blur Effect (Contained) */}
            <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
              <div className="absolute -left-[43px] -top-[15px] h-[97px] w-[97px] rounded-full bg-[#A92BF5] blur-[25px]" />
            </div>
            
            <div className="relative z-[1] flex h-[24px] w-[24px] flex-none items-center justify-center">
              <div 
                className="absolute -left-[26px] -top-[5px] h-[39.33px] w-[59px] bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Роскошный мегафон казино с золотыми монетами.png')" }}
              />
            </div>
            
            <div className="relative z-[2] flex h-[22px] w-[52px] flex-none flex-col justify-center">
              <p className="font-['Jost'] text-[11px] font-bold leading-[100%] text-white">
                REFER <br /> A FRIEND
              </p>
            </div>
          </div>

          {/* VIP Transfer */}
          <div className="relative isolate flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#500039] px-[8px] py-[6px]">
            {/* Blur Effect (Contained) */}
            <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
              <div className="absolute -left-[40px] -top-[5px] h-[97px] w-[97px] rounded-full bg-[#FF3981] blur-[25px]" />
            </div>
            
            <div className="relative z-[1] flex h-[24px] w-[24px] flex-none items-center justify-center">
              <div 
                className="absolute -left-[32.36px] -top-[13.7px] h-[33.01px] w-[64px] bg-contain bg-center bg-no-repeat"
                style={{ transform: "rotate(11.84deg)", backgroundImage: "url('/Роскошная корона с молнией.png')" }}
              />
            </div>
            
            <div className="relative z-[2] flex h-[22px] w-[57px] flex-none flex-col justify-center">
              <p className="font-['Jost'] text-[11px] font-bold leading-[100%] text-white">
                VIP <br /> TRANSFER
              </p>
            </div>
          </div>

        </div>

        {/* Winter Rush */}
        <div className="relative isolate flex h-[50px] w-[200px] flex-none items-center gap-[10px] rounded-[8px] bg-[#091741] px-[10px] py-[6px]">
          {/* Blur Effect (Contained) */}
          <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
            <div className="absolute -left-[53px] -top-[22px] h-[110px] w-[110px] rounded-full bg-[#1463FF] blur-[25px]" />
          </div>
          
          {/* Spacer Frame */}
          <div className="relative z-[1] flex h-[20px] w-[20px] flex-none items-center justify-center"></div>

          {/* Rectangle (Gold Snowflake) */}
          <div 
            className="absolute -left-[53px] -top-[18px] z-[2] h-[68px] w-[102px] bg-contain bg-center bg-no-repeat"
            style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)", backgroundImage: "url('/Золотая снежинка на прозрачном фоне.png')" }}
          />
          
          {/* Text Container */}
          <div className="relative z-[3] flex h-[30px] w-[138px] flex-none flex-col items-start gap-[2px]">
            <h3 className="h-[14px] w-full whitespace-nowrap font-['Jost'] text-[18px] font-black italic leading-[14px] text-white">
              WINTER RUSH
            </h3>
            <p className="h-[14px] w-full whitespace-nowrap font-['Jost'] text-[12px] font-bold italic leading-[14px] text-white">
              $2,000,000 IN PRIZES
            </p>
          </div>

          {/* image 26 */}
          <div 
            className="absolute -left-[60px] -top-[53px] z-[4] h-[165px] w-[165px] bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/image26.png')" }}
          />
        </div>
        
      </div>
    </div>
  );
}