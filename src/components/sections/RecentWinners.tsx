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

      <div className="flex flex-col gap-[8px]">
        {/* Header Row */}
        <div className="flex w-full items-center justify-between px-[24px] py-[8px]">
          <div className="font-jost text-[14px] font-bold tracking-[0.02em] text-white uppercase">
            Game
          </div>
          
          <div className="flex w-[624px] items-center gap-[12px]">
            <div className="w-[300px] font-jost text-[14px] font-bold tracking-[0.02em] text-white uppercase">
              Username
            </div>
            <div className="w-[150px] font-jost text-[14px] font-bold tracking-[0.02em] text-white uppercase">
              Time
            </div>
            <div className="w-[150px] text-right font-jost text-[14px] font-bold tracking-[0.02em] text-white uppercase">
              Payout
            </div>
          </div>
        </div>

        {/* Winner Rows */}
        {winners.map((winner, index) => (
          <div
            key={index}
            className="flex h-[60px] w-full items-center justify-between rounded-[8px] bg-[#0C1F56] px-[24px] transition-colors hover:bg-[#112F82]"
          >
            {/* Left: Game Info */}
            <div className="flex items-center gap-[12px]">
              <div className="h-[30px] w-[22px] rounded-[1.8px] bg-slate-400 bg-cover bg-center" style={{ backgroundImage: "url('/games/1.png')" }} />
              <div className="w-[200px] truncate font-manrope text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.game}
              </div>
            </div>

            {/* Right: User Info */}
            <div className="flex w-[624px] items-center gap-[12px]">
              <div className="w-[300px] truncate font-manrope text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.username}
              </div>
              <div className="w-[150px] font-manrope text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.time}
              </div>
              <div className={`w-[150px] text-right font-manrope text-[14px] font-semibold tracking-[0.02em] ${winner.payoutColor}`}>
                {winner.payout}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}