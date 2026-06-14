"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useScrollState } from "@/hooks/useScrollState";


interface CollectionItem {
  name: string;
  image: string;
  ellipseWidth: string;
  ellipseHeight: string;
  imageStyle: React.CSSProperties;
}

const baseCollections: CollectionItem[] = [
  {
    name: "MYTHOLOGY",
    image: "/games/collections/Frame 1.png",
    ellipseWidth: "53px",
    ellipseHeight: "53px",
    imageStyle: {
      width: "71px",
      height: "67px",
      left: "2px",
      top: "5px",
    },
  },
  {
    name: "FRUITS",
    image: "/games/collections/Frame 2.png",
    ellipseWidth: "40px",
    ellipseHeight: "40px",
    imageStyle: {
      width: "77px",
      height: "73px",
      left: "-1px",
      top: "2px",
    },
  },
  {
    name: "ANIMALS",
    image: "/games/collections/Frame 3.png",
    ellipseWidth: "51px",
    ellipseHeight: "51px",
    imageStyle: {
      width: "77px",
      height: "73px",
      right: "0px",
      top: "2px",
    },
  },
  {
    name: "ASIA",
    image: "/games/collections/Frame 4.png",
    ellipseWidth: "40px",
    ellipseHeight: "40px",
    imageStyle: {
      width: "68px",
      height: "60px",
      left: "4px",
      top: "8px",
    },
  },
];

// Replicate collections array to match the requested 17 items count
const collections = Array.from(
  { length: 17 },
  (_, i) => baseCollections[i % baseCollections.length]
);

export default function CollectionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, checkScroll } = useScrollState(scrollRef);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -328, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 328, behavior: "smooth" });
    }
  };

  return (
    <section className="flex w-full flex-none flex-col gap-5 overflow-hidden">
      <SectionHeader 
        title="COLLECTIONS (17)" 
        titleWidth="189px"
        icon={<img src="/games/game-icons/collections.svg" alt="Collections" className="w-[20px] h-[20px]" />} 
        iconBg="bg-transparent"
        onPrev={scrollLeft}
        onNext={scrollRight}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />

      {/* Card row */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {collections.map((item, index) => (
          <div
            key={index}
            className="group relative flex h-[100px] w-[316px] flex-shrink-0 cursor-pointer items-center gap-[12px] rounded-[12px] bg-[#0C1F56] p-[12px_24px_12px_12px] transition-colors duration-300 hover:bg-[#173EAD] snap-start"
          >
            {/* Left decorative frame */}
            <div className="relative flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#0E1B3D] overflow-visible">
              {/* Blue Glow (Ellipse 7) */}
              <div className="absolute h-[70px] w-[70px] rounded-full bg-[#1463FF] opacity-90 blur-[21.875px] z-0" />
              
              {/* Yellow Ellipse (Ellipse 10) - hidden in design */}
              <div 
                className="absolute bg-[#FFC83D] rounded-full invisible pointer-events-none z-0" 
                style={{ width: item.ellipseWidth, height: item.ellipseHeight }}
              />

              {/* Golden object image */}
              <img 
                src={item.image} 
                alt={item.name} 
                className="absolute object-contain z-10 select-none pointer-events-none" 
                style={item.imageStyle} 
              />
            </div>

            {/* Collection Title */}
            <h3 className="flex-1 text-center font-jost text-[22px] font-extrabold tracking-[0.01em] text-white select-none">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
