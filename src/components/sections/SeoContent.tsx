import { ChevronDown } from "lucide-react";

export default function SeoContent() {
  return (
    <section className="relative flex w-full flex-col items-center gap-[32px] overflow-hidden pt-4 pb-[80px]">
      {/* Block 1 */}
      <div className="flex w-[800px] flex-col items-start gap-[24px]">
        <h2 className="w-full font-jost text-[32px] font-bold leading-[120%] tracking-[-0.02em] text-white">
          Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair
          and Secure
        </h2>
        <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
          Step into a next-generation gaming experience where every spin, bet,
          and hand is powered by blockchain technology. At Mighty Luck Casino,
          you can explore more than 9,000 crypto casino games across slots,
          table games, live dealer games, and crash-style favorites. As one of
          the top crypto casinos online, Mighty Luck gives players instant
          withdrawals, enhanced privacy, and a secure gambling environment
          without the friction of traditional payment methods. Whether you're
          here to play table games, explore Bitcoin casino games, or try the
          latest provably fair slots, Mighty Luck delivers one of the most
          complete online casino experiences available today. Ready to play
          games and win real crypto? Start playing crypto casino games at Mighty
          Luck Casino
        </p>
      </div>

      {/* Block 2 */}
      <div className="flex w-[800px] flex-col items-start gap-[16px]">
        <h3 className="w-full font-jost text-[24px] font-bold leading-[35px] text-white">
          Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
        </h3>
        <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
          Mighty Luck Casino offers the perfect blend of crypto gambling
          convenience, online casino entertainment, and world-class security.
          Compared to traditional online casinos, Mighty Luck delivers
          significantly faster payouts, more generous bonuses, and an unmatched
          selection of various games.
        </p>
      </div>

      {/* Block 3 */}
      <div className="flex w-[800px] flex-col items-start gap-[16px]">
        <h3 className="w-full font-jost text-[24px] font-bold leading-[35px] text-white">
          Massive Game Variety
        </h3>
        <p className="w-full font-manrope text-[16px] font-medium leading-[160%] text-[#D2DCF7]">
          With more than 9,000 casino games, Mighty Luck outshines many crypto
          casinos and traditional casinos alike. You’ll find:
        </p>
      </div>

      {/* Read More Gradient Overlay */}
      <div 
        className="absolute bottom-0 left-[calc(50%-400px)] flex h-[200px] w-[800px] flex-col items-center justify-end px-[10px] pb-[24px]"
        style={{ background: "linear-gradient(0deg, #091741 0%, rgba(9, 23, 65, 0) 100%)" }}
      >
        <button className="flex cursor-pointer items-center gap-[4px] transition-opacity hover:opacity-80">
          <span className="font-manrope text-[14px] font-semibold tracking-[0.01em] text-[#FFBF1F]">
            Read more
          </span>
          <ChevronDown size={16} className="text-[#FFBF1F]" />
        </button>
      </div>
    </section>
  );
}