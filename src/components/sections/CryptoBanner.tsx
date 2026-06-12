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
    <div className="relative flex h-[80px] sm:h-[100px] w-full items-center justify-between overflow-hidden border-b border-[#112F82] px-4 sm:px-10">
      
      {/* Background Blur Overlay */}
      <div className="absolute left-[calc(50%-195px)] top-[77px] z-0 h-[390px] w-[390px] rounded-full bg-[#1463FF] blur-[50px]" />
      
      {/* Crypto Icons Row */}
      <div className="relative z-10 mx-auto flex w-full items-center justify-center gap-[28px] text-white/50">
        <Bitcoin size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Gem size={20} className="cursor-pointer transition-colors hover:text-white" />
        <CircleDollarSign size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Triangle size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Activity size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Hexagon size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Coins size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Wallet size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Circle size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Boxes size={20} className="cursor-pointer transition-colors hover:text-white" />
        <Zap size={20} className="cursor-pointer transition-colors hover:text-white" />
      </div>
      
    </div>
  );
}
