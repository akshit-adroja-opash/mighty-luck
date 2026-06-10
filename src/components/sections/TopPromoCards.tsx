export default function TopPromoCards() {
  return (
    <div className="flex w-full flex-col gap-4">

      {/* Container */}
      <div className="flex w-full flex-col rounded-[16px] bg-[#0C1F56] p-4">

        {/* Top Two Cards */}
        <div className="flex w-full flex-col gap-[8px]">
          
          <div className="flex gap-[4px] h-[44px]">
            {/* Refer Friend */}
            <div className="relative flex flex-1 items-center gap-1 overflow-hidden rounded-lg bg-[#3B005F] px-2 py-1">
              {/* Blur Effect */}
              <div className="absolute -left-5 -top-3 h-16 w-16 rounded-full bg-[#A92BF5] opacity-80 blur-[25px]" />
              
              <div className="relative z-10 flex items-center justify-center h-6 w-6">
                <span className="text-lg">📢</span>
              </div>
              
              <p className="relative z-10 text-[11px] font-bold leading-tight text-white uppercase font-sans">
                REFER <br />
                A FRIEND
              </p>
            </div>

            {/* VIP Transfer */}
            <div className="relative flex flex-1 items-center gap-1 overflow-hidden rounded-lg bg-[#500039] px-2 py-1">
              {/* Blur Effect */}
              <div className="absolute -left-5 -top-3 h-16 w-16 rounded-full bg-[#FF3981] opacity-80 blur-[25px]" />
              
              <div className="relative z-10 flex items-center justify-center h-6 w-6">
                <span className="text-lg">👑</span>
              </div>
              
              <p className="relative z-10 text-[11px] font-bold leading-tight text-white uppercase font-sans">
                VIP <br />
                TRANSFER
              </p>
            </div>
          </div>

          {/* Winter Rush */}
          <div className="relative flex h-[50px] w-full items-center gap-2 overflow-hidden rounded-lg bg-[#091741] px-2">
            {/* Blur Effect */}
            <div className="absolute -left-6 -top-4 h-24 w-24 rounded-full bg-[#1463FF] opacity-70 blur-[25px]" />
            
            <div className="relative z-10 flex items-center justify-center h-6 w-6 ml-1">
              <span className="text-xl">❄️</span>
            </div>
            
            <div className="relative z-10 flex flex-col justify-center gap-0">
              <h3 className="text-[18px] font-black italic leading-[14px] text-white font-sans uppercase">
                WINTER RUSH
              </h3>
              <p className="text-[12px] font-bold italic leading-[14px] text-white font-sans uppercase mt-1">
                $2,000,000 IN PRIZES
              </p>
            </div>
          </div>
          
        </div>

      </div>

    </div>
  );
}