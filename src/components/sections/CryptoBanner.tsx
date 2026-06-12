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

export default function CryptoBanner() {
  return (
    <div className="relative flex h-[80px] sm:h-[100px] w-[calc(100%_+_32px)] sm:w-[calc(100%_+_48px)] lg:w-full -ml-4 sm:-ml-6 lg:ml-0 items-center overflow-hidden border-b border-[#112F82]">
      
      {/* Background Blur Overlay */}
      <div className="absolute left-[calc(50%-195px)] top-[77px] z-0 h-[390px] w-[390px] rounded-full bg-[#1463FF] blur-[50px]" />
      
      {/* Crypto Icons Row */}
      <div className="relative z-10 flex w-full items-center justify-start sm:justify-center gap-[20px] sm:gap-[28px] text-white/50 overflow-x-auto snap-x px-4 sm:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Bitcoin size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Gem size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <CircleDollarSign size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Triangle size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Activity size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Hexagon size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Coins size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Wallet size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Circle size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Boxes size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
        <Zap size={20} className="cursor-pointer flex-none transition-colors hover:text-white snap-center" />
      </div>
      
    </div>
  );
}
