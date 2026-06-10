import SectionHeader from "@/components/ui/SectionHeader";

const TrophyIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 2H6C4.9 2 4 2.9 4 4V7C4 8.5 4.9 9.8 6.2 10.3C6.7 11.8 7.9 13 9.4 13.7C9.8 15.2 10.8 16.5 12 16.9V20H9C8.4 20 8 20.4 8 21C8 21.6 8.4 22 9 22H15C15.6 22 16 21.6 16 21C16 20.4 15.6 20 15 20H12V16.9C13.2 16.5 14.2 15.2 14.6 13.7C16.1 13 17.3 11.8 17.8 10.3C19.1 9.8 20 8.5 20 7V4C20 2.9 19.1 2 18 2ZM6 8C5.4 8 5 7.6 5 7V4C5 3.4 5.4 3 6 3H7.5V8.3C6.7 8.3 6.1 8.2 6 8ZM18 7C18 7.6 17.6 8 17 8C16.9 8 16.3 8.3 15.5 8.3V3H17C17.6 3 18 3.4 18 4V7Z" 
      fill="#FFC83D"
    />
  </svg>
);

const winners = [
  {
    game: "Sweet Bonanza Super Scatter",
    image: "/games/1.png",
    username: "Alb****",
    time: "14:16 PM",
    payout: "$126.1",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "Honey Money Multiplier",
    image: "/games/2.png",
    username: "Tra****",
    time: "14:16 PM",
    payout: "$15.2",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "Dragon Tiger",
    image: "/games/3.png",
    username: "Hid******",
    time: "14:15 PM",
    payout: "$77.08",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "Eleven Fortune",
    image: "/games/4.png",
    username: "Gin***",
    time: "14:15 PM",
    payout: "$0.00",
    payoutColor: "text-[#7795E8]",
  },
  {
    game: "Honey Money Multiplier",
    image: "/games/2.png",
    username: "Tra****",
    time: "14:15 PM",
    payout: "$11.23",
    payoutColor: "text-[#00DD29]",
  },
  {
    game: "XO Paradise",
    image: "/games/5.png",
    username: "Amr******",
    time: "14:15 PM",
    payout: "$67.88",
    payoutColor: "text-[#00DD29]",
  },
];

export default function RecentWinners() {
  return (
    <section className="flex w-[1136px] h-[478px] flex-none flex-col gap-[20px] items-start">
      <SectionHeader 
        title="RECENT WINNERS" 
        titleWidth="189px"
        icon={<TrophyIcon />} 
        iconBg="bg-transparent"
        showViewAll={false}
        showPagination={false}
      />

      <div className="flex flex-col w-[1136px] h-[428px] gap-[8px]">
        {/* Header Row */}
        <div className="flex h-[20px] w-[1136px] flex-none flex-row justify-between items-center px-[24px]">
          {/* Game Title Header */}
          <div className="flex w-[239px] items-center">
            <span className="font-['Jost'] text-[14px] font-bold uppercase tracking-[0.02em] text-white">
              Game
            </span>
          </div>
          
          {/* Metadata Headers */}
          <div className="flex w-[624px] flex-none flex-row items-center gap-[12px] h-[20px]">
            <span className="w-[300px] font-['Jost'] text-[14px] font-bold uppercase tracking-[0.02em] text-white">
              Username
            </span>
            <span className="w-[150px] font-['Jost'] text-[14px] font-bold uppercase tracking-[0.02em] text-white">
              Time
            </span>
            <span className="w-[150px] text-right font-['Jost'] text-[14px] font-bold uppercase tracking-[0.02em] text-white">
              Payout
            </span>
          </div>
        </div>

        {/* Winner Rows */}
        {winners.map((winner, index) => (
          <div
            key={index}
            className="flex h-[60px] w-[1136px] flex-none flex-row justify-between items-center px-[24px] bg-[#0C1F56] rounded-[8px] transition-colors duration-300 hover:bg-[#112F82]"
          >
            {/* Game Info Column */}
            <div className="flex w-[239px] items-center gap-[12px]">
              <div 
                className="h-[30px] w-[22px] flex-none rounded-[1.8px] bg-cover bg-center bg-[#CDCDCD]" 
                style={{ backgroundImage: `url('${winner.image}')` }} 
              />
              <span className="truncate font-['Manrope'] text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.game}
              </span>
            </div>

            {/* Metadata Info Column */}
            <div className="flex w-[624px] flex-none flex-row items-center gap-[12px]">
              <span className="w-[300px] truncate font-['Manrope'] text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.username}
              </span>
              <span className="w-[150px] font-['Manrope'] text-[14px] font-semibold tracking-[0.02em] text-white">
                {winner.time}
              </span>
              <span className={`w-[150px] text-right font-['Manrope'] text-[14px] font-semibold tracking-[0.02em] ${winner.payoutColor}`}>
                {winner.payout}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}