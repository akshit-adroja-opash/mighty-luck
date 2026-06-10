import SectionHeader from "@/components/ui/SectionHeader";

const winners = [
  {
    game: "Sweet Bonanza Super Scatter",
    username: "User123",
    time: "8:15 PM",
    payout: "$126",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "Honey Money Multiplier",
    username: "User123",
    time: "8:15 PM",
    payout: "$126",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "Dragon Tiger",
    username: "User123",
    time: "8:15 PM",
    payout: "$126",
    payoutColor: "text-[#7795E8]",
  },
  {
    game: "Eleven Fortune",
    username: "User123",
    time: "8:15 PM",
    payout: "$126",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "XO Paradise",
    username: "User123",
    time: "8:15 PM",
    payout: "$126",
    payoutColor: "text-[#00DD29]",
  },
];

export default function RecentWinners() {
  return (
    <section className="flex w-full flex-col gap-[20px]">
      <SectionHeader 
        title="RECENT WINNERS" 
        icon={<span className="text-xl">🏆</span>} 
        showViewAll={false}
        showPagination={false}
      />

      <div className="flex flex-col gap-[12px] w-[1136px]">
        {/* Header Row */}
        <div className="flex h-[52px] w-[1136px] items-center gap-[20px] rounded-[12px] bg-[#091741] px-[24px]">
          <div className="w-[356px] font-manrope text-[14px] font-semibold text-white">
            Game
          </div>
          <div className="w-[356px] font-manrope text-[14px] font-semibold text-white">
            User
          </div>
          <div className="w-[156px] font-manrope text-[14px] font-semibold text-white">
            Time
          </div>
          <div className="w-[156px] text-right font-manrope text-[14px] font-semibold text-white">
            Payout
          </div>
        </div>

        {/* Winner Rows */}
        {winners.map((winner, index) => (
          <div
            key={index}
            className="flex h-[58px] w-[1136px] items-center gap-[20px] rounded-[12px] bg-[#0C1F56] px-[24px] transition-colors hover:bg-[#112F82]"
          >
            {/* Game Info */}
            <div className="flex w-[356px] items-center gap-[12px]">
              <div className="h-[26px] w-[20px] flex-none rounded-[1.8px] bg-slate-400 bg-cover bg-center" style={{ backgroundImage: "url('/games/1.png')" }} />
              <div className="truncate font-manrope text-[14px] font-semibold text-white">
                {winner.game}
              </div>
            </div>

            {/* User Info */}
            <div className="w-[356px] truncate font-manrope text-[14px] font-semibold text-white">
              {winner.username}
            </div>

            {/* Time */}
            <div className="w-[156px] font-manrope text-[14px] font-semibold text-white">
              {winner.time}
            </div>

            {/* Payout */}
            <div className={`w-[156px] text-right font-manrope text-[14px] font-semibold ${winner.payoutColor}`}>
              {winner.payout}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}