"use client";

import Image from "next/image";
import { Play, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { openModal } from "@/store/slices/uiSlice";

interface GameCardProps {
  image: string;
  title: string;
  onClick?: () => void;
  fluid?: boolean;
}

export default function GameCard({
  image,
  title,
  onClick,
  fluid = false,
}: GameCardProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isAuthenticated) {
      dispatch(openModal("auth"));
    } else {
      if (onClick) onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative cursor-pointer overflow-hidden rounded-[9.43px] md:rounded-[12px] ${
        fluid 
          ? "w-full aspect-[152/200] h-auto" 
          : "w-[119.43px] md:w-[152px] h-[157.14px] md:h-[200px]"
      }`}
    >

      {/* Image Container matches full card size */}
      <div className="relative h-full w-full overflow-hidden rounded-[9.43px] md:rounded-[12px]">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 rounded-[9.43px] md:rounded-[12px] bg-black/0 transition-all duration-300 group-hover:bg-black/50 group-hover:backdrop-blur-[4px]" />

        {/* Favorite */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Optional: like game logic here
          }}
          className="absolute right-[11.2px] md:right-3 top-[9.6px] md:top-3 z-10 opacity-0 transition group-hover:opacity-100 hover:scale-110"
        >
          <Heart
            className="text-white w-[19.2px] h-[19.2px] md:w-[24px] md:h-[24px]"
            strokeWidth={2}
          />
        </button>

        {/* Play Button Container (Appears on Hover) */}
        <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* Ellipse 5 */}
          <button 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-[38.4px] w-[38.4px] md:h-[48px] md:w-[48px] items-center justify-center rounded-[50%] bg-[#FFC83D] transition-transform hover:scale-105"
            aria-label="Play Game"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 w-[9.6px] h-[11.2px] md:w-[18px] md:h-[20px]">
              <path d="M1.38576 0.817296C0.575043 0.334114 0 0.803706 0 1.7451V18.2549C0 19.199 0.570659 19.6644 1.38576 19.1827L17.1517 9.85191C17.962 9.37346 17.9546 8.62002 17.1517 8.14809L1.38576 0.817296Z" fill="#0C1F56"/>
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
}
