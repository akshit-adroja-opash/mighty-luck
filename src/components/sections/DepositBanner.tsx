import {
  Bitcoin,
  Coins,
  CircleDollarSign,
  Wallet,
  Gem,
  Hexagon,
  Boxes,
  Circle,
  Activity,
  Triangle,
  Zap
} from "lucide-react";

export default function DepositBanner() {
  return (
    <section className="relative flex h-[100px] w-full items-center justify-between overflow-hidden rounded-[16px] bg-[#0C1F56] px-[40px]">
      
      {/* Background Blur */}
      <div className="absolute left-1/2 top-[60px] h-[534px] w-[534px] -translate-x-1/2 rounded-full bg-[#1463FF] opacity-60 blur-[50px]" />

      {/* Text */}
      <h2 className="relative z-10 font-sans text-[20px] font-extrabold text-white leading-[29px]">
        Want to play? Deposit Now
      </h2>

      {/* Crypto Logos (Placeholders) */}
      <div className="relative z-10 hidden items-center gap-[28px] text-white lg:flex">
        <Bitcoin size={20} />
        <Gem size={20} />
        <CircleDollarSign size={20} />
        <Triangle size={20} />
        <Activity size={20} />
        <Hexagon size={20} />
        <Coins size={20} />
        <Wallet size={20} />
        <Circle size={20} />
        <Boxes size={20} />
        <Zap size={20} />
      </div>

      {/* Button */}
      <button className="relative z-10 flex h-[40px] w-[148px] items-center justify-center rounded-[8px] bg-[#FFC83D] transition-colors hover:bg-yellow-400">
        <span className="font-sans text-[14px] font-bold tracking-[0.02em] text-[#1A1404]">
          Deposit Now
        </span>
      </button>

    </section>
  );
}