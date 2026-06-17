import { useRef, useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const winners = [
  { game: "Sweet Bonanza Super Scatter", image: "/games/slots/slot-1.png", username: "Alb****", time: "14:16 PM", payout: "$126.1", payoutColor: "text-[#00DD29]" },
  { game: "Honey Money Multiplier", image: "/games/slots/slot-2.png", username: "Tra****", time: "14:16 PM", payout: "$15.2", payoutColor: "text-[#00DD29]" },
  { game: "Dragon Tiger", image: "/games/table/table-1.png", username: "Hid******", time: "14:15 PM", payout: "$77.08", payoutColor: "text-[#00DD29]" },
  { game: "Eleven Fortune", image: "/games/slots/slot-3.png", username: "Gin***", time: "14:15 PM", payout: "$0.00", payoutColor: "text-[#7795E8]" },
  { game: "Honey Money Multiplier", image: "/games/slots/slot-2.png", username: "Tra****", time: "14:15 PM", payout: "$11.23", payoutColor: "text-[#00DD29]" },
  { game: "XO Paradise", image: "/games/slots/slot-4.png", username: "Amr******", time: "14:15 PM", payout: "$67.88", payoutColor: "text-[#00DD29]" },
];

export default function RecentWinners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <section className="flex w-full flex-none flex-col gap-5 items-start overflow-hidden">
      <SectionHeader
        title="RECENT WINNERS"
        icon={<img src="/games/game-icons/recent.svg" alt="Recent Winners" className="w-[30px] h-[30px]" />}
        iconBg="bg-transparent"
        showViewAll={false}
        showPagination={false}
      />

      {/* Custom Mobile Scrollbar (Group 21) */}
      <div className="md:hidden relative w-full h-[12px] flex items-center -mt-[8px]">
        <div className="absolute w-full h-[10.29px] bg-[#D2DCF7] rounded-full" />
        <div 
          className="absolute h-[12px] bg-[#1463FF] rounded-full transition-all duration-100 ease-out" 
          style={{ 
            width: "50%", // roughly matching the thumb proportion
            left: `${scrollProgress * 50}%` 
          }} 
        />
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto no-scrollbar pb-1 md:pb-0"
      >
        <div className="flex flex-col w-[610px] md:w-full gap-[8px] md:gap-2">
          
          {/* Header Row */}
          <div className="flex h-[14px] md:h-[20px] w-full flex-none flex-row items-center px-[12px] md:px-6 gap-[40px] md:gap-0 md:justify-between">
            <div className="flex w-[220px] md:w-[40%] items-center">
              <span className="font-jost text-[10px] md:text-[14px] font-bold uppercase tracking-[0.02em] text-white">Game</span>
            </div>
            <div className="flex w-[326px] md:w-[60%] flex-none flex-row items-center gap-[8.41px] md:gap-3">
              <span className="w-[189px] md:flex-1 font-jost text-[9.81px] md:text-[14px] font-bold uppercase tracking-[0.02em] text-white">Username</span>
              <span className="w-[60px] md:w-[120px] font-jost text-[9.81px] md:text-[14px] font-bold uppercase tracking-[0.02em] text-white">Time</span>
              <span className="w-[60px] md:w-[100px] text-right font-jost text-[9.81px] md:text-[14px] font-bold uppercase tracking-[0.02em] text-white">Payout</span>
            </div>
          </div>

          {/* Winner Rows */}
          {winners.map((winner, index) => (
            <div
              key={index}
              className="flex flex-row w-full flex-none items-center px-[12px] md:px-6 h-[42px] md:h-[60px] bg-[#0C1F56] rounded-[5.61px] md:rounded-[8px] transition-colors duration-300 hover:bg-[#112F82] gap-[40px] md:gap-0 md:justify-between"
            >
              {/* Game Info */}
              <div className="flex w-[220px] md:w-[40%] items-center gap-[8.41px] md:gap-3">
                <div
                  className="h-[21.03px] md:h-[30px] w-[15.42px] md:w-[22px] flex-none rounded-[1.26px] md:rounded-[1.8px] bg-cover bg-center bg-[#CDCDCD]"
                  style={{ backgroundImage: `url('${winner.image}')` }}
                />
                <span className="w-[176px] md:w-auto truncate font-manrope text-[12px] md:text-[14px] font-semibold leading-[16px] tracking-[0.02em] text-white">
                  {winner.game}
                </span>
              </div>

              {/* Metadata */}
              <div className="flex w-[326px] md:w-[60%] flex-none flex-row items-center gap-[8.41px] md:gap-3">
                <span className="w-[189.18px] md:flex-1 truncate font-manrope text-[12px] md:text-[14px] font-semibold leading-[16px] tracking-[0.02em] text-white">
                  {winner.username}
                </span>
                <span className="w-[60px] md:w-[120px] font-manrope text-[12px] md:text-[14px] font-semibold leading-[16px] tracking-[0.02em] text-white">
                  {winner.time}
                </span>
                <span className={`w-[60px] md:w-[100px] text-right font-manrope text-[12px] md:text-[14px] font-semibold leading-[16px] tracking-[0.02em] ${winner.payoutColor}`}>
                  {winner.payout}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
