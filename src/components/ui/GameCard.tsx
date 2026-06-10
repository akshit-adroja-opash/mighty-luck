import Image from "next/image";
import { Play, Heart } from "lucide-react";

interface GameCardProps {
  image: string;
  title: string;
}

export default function GameCard({
  image,
  title,
}: GameCardProps) {
  return (
    <div className="group relative w-[152px] h-[200px] cursor-pointer overflow-hidden rounded-[12px]">

      {/* Image Container matches full card size */}
      <div className="relative h-full w-full overflow-hidden rounded-[12px]">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 rounded-[12px] bg-black/0 transition-all duration-300 group-hover:bg-black/50 group-hover:backdrop-blur-[5px]" />

        {/* Favorite */}
        <button className="absolute right-3 top-3 z-10 rounded-full bg-black/30 p-2 opacity-0 transition group-hover:opacity-100">
          <Heart
            size={16}
            className="text-white"
          />
        </button>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">

          <button className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#FFC83D] shadow-lg">

            <Play
              size={24}
              fill="#0C1F56"
              className="ml-1 text-[#0C1F56]"
            />

          </button>

        </div>

        {/* Title Text (appears on hover) */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 px-2 text-center">
          <span className="font-sans text-[14px] font-extrabold text-white uppercase tracking-wider">{title}</span>
        </div>

      </div>

    </div>
  );
}