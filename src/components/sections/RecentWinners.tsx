import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useScrollState } from "@/hooks/useScrollState";


const winners = [
  { game: "Sweet Bonanza Super Scatter", image: "/games/1.png", username: "Alb****", time: "14:16 PM", payout: "$126.1", payoutColor: "text-[#00DD29]" },
  { game: "Honey Money Multiplier", image: "/games/2.png", username: "Tra****", time: "14:16 PM", payout: "$15.2", payoutColor: "text-[#00DD29]" },
  { game: "Dragon Tiger", image: "/games/3.png", username: "Hid******", time: "14:15 PM", payout: "$77.08", payoutColor: "text-[#00DD29]" },
  { game: "Eleven Fortune", image: "/games/4.png", username: "Gin***", time: "14:15 PM", payout: "$0.00", payoutColor: "text-[#7795E8]" },
  { game: "Honey Money Multiplier", image: "/games/2.png", username: "Tra****", time: "14:15 PM", payout: "$11.23", payoutColor: "text-[#00DD29]" },
  { game: "XO Paradise", image: "/games/5.png", username: "Amr******", time: "14:15 PM", payout: "$67.88", payoutColor: "text-[#00DD29]" },
];

export default function RecentWinners() {
  return (
    <section className="flex w-full flex-none flex-col gap-5 items-start">
      <SectionHeader
        title="RECENT WINNERS"
        icon={<img src="/games/game-icons/recent.svg" alt="Recent Winners" className="w-[20px] h-[20px]" />}
        iconBg="bg-transparent"
        showViewAll={false}
        showPagination={false}
      />

      <div className="flex flex-col w-full gap-2">
        {/* Header Row — hidden on mobile */}
        <div className="hidden md:flex h-[20px] w-full flex-none flex-row justify-between items-center px-6">
          <div className="flex w-[40%] items-center">
            <span className="font-jost text-[14px] font-bold uppercase tracking-[0.02em] text-white">Game</span>
          </div>
          <div className="flex w-[60%] flex-none flex-row items-center gap-3">
            <span className="flex-1 font-jost text-[14px] font-bold uppercase tracking-[0.02em] text-white">Username</span>
            <span className="w-[120px] font-jost text-[14px] font-bold uppercase tracking-[0.02em] text-white">Time</span>
            <span className="w-[100px] text-right font-jost text-[14px] font-bold uppercase tracking-[0.02em] text-white">Payout</span>
          </div>
        </div>

        {/* Winner Rows */}
        {winners.map((winner, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row w-full flex-none sm:justify-between sm:items-center px-4 sm:px-6 py-3 sm:py-0 sm:h-[60px] bg-[#0C1F56] rounded-[8px] transition-colors duration-300 hover:bg-[#112F82] gap-2 sm:gap-0"
          >
            {/* Game Info */}
            <div className="flex w-full sm:w-[40%] items-center gap-3">
              <div
                className="h-[30px] w-[22px] flex-none rounded-[1.8px] bg-cover bg-center bg-[#CDCDCD]"
                style={{ backgroundImage: `url('${winner.image}')` }}
              />
              <span className="truncate font-manrope text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.game}
              </span>
            </div>

            {/* Metadata */}
            <div className="flex w-full sm:w-[60%] flex-none flex-row items-center gap-3">
              <span className="flex-1 truncate font-manrope text-[13px] sm:text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.username}
              </span>
              <span className="w-[80px] sm:w-[120px] font-manrope text-[13px] sm:text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.time}
              </span>
              <span className={`w-[70px] sm:w-[100px] text-right font-manrope text-[13px] sm:text-[14px] font-semibold tracking-[0.02em] ${winner.payoutColor}`}>
                {winner.payout}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
