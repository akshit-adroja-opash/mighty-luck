import Image from "next/image";
import { Play, Heart } from "lucide-react";

interface GameCardProps {
  image: string;
  title: string;
  onClick?: () => void;
}

export default function GameCard({
  image,
  title,
  onClick,
}: GameCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative w-[152px] h-[200px] cursor-pointer overflow-hidden rounded-[12px]"
    >

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
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Optional: like game logic here
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/30 p-2 opacity-0 transition group-hover:opacity-100 hover:bg-black/50"
        >
          <Heart
            size={16}
            className="text-white"
          />
        </button>

        {/* Play Button Container (Appears on Hover) */}
        <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* Ellipse 5 */}
          <button 
            className="absolute left-[calc(50%-24px)] top-[calc(50%-24px)] flex h-[48px] w-[48px] items-center justify-center rounded-[50%] bg-[#FFC83D] transition-transform hover:scale-105"
            aria-label="Play Game"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M1.38576 0.817296C0.575043 0.334114 0 0.803706 0 1.7451V18.2549C0 19.199 0.570659 19.6644 1.38576 19.1827L17.1517 9.85191C17.962 9.37346 17.9546 8.62002 17.1517 8.14809L1.38576 0.817296Z" fill="#0C1F56"/>
            </svg>
          </button>
        </div>



      </div>

    </div>
  );
}
