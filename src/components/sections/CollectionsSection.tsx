"use client";

import GameCarousel from "@/components/ui/GameCarousel";


interface CollectionItem {
  name: string;
  image: string;
  ellipseWidth: string;
  ellipseHeight: string;
  imageStyle: React.CSSProperties;
  mobileWidthClass: string;
  mobileTextWidthClass: string;
  mobileTextSizeClass: string;
  bgColorClass: string;
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
      left: "calc(50% - 71px/2 - 0.5px)",
      top: "calc(50% - 67px/2 + 0.5px)",
    },
    mobileWidthClass: "w-[183px]",
    mobileTextWidthClass: "w-[108.6px]",
    mobileTextSizeClass: "text-[12px]",
    bgColorClass: "bg-[#0C1F56]",
  },
  {
    name: "FRUITS",
    image: "/games/collections/Frame 2.png",
    ellipseWidth: "40px",
    ellipseHeight: "40px",
    imageStyle: {
      width: "77px",
      height: "73px",
      left: "calc(50% - 77px/2 - 0.5px)",
      top: "calc(50% - 73px/2 + 0.5px)",
    },
    mobileWidthClass: "w-[182px]",
    mobileTextWidthClass: "w-[107.6px]",
    mobileTextSizeClass: "text-[12px]",
    bgColorClass: "bg-[#0C1F56]",
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
      top: "calc(50% - 73px/2 + 0.5px)",
    },
    mobileWidthClass: "w-[189.6px]",
    mobileTextWidthClass: "w-[115.2px]",
    mobileTextSizeClass: "text-[13.2px]",
    bgColorClass: "bg-[#0C1F56]",
  },
  {
    name: "ASIA",
    image: "/games/collections/Frame 4.png",
    ellipseWidth: "40px",
    ellipseHeight: "40px",
    imageStyle: {
      width: "68px",
      height: "60px",
      left: "calc(50% - 68px/2)",
      top: "calc(50% - 60px/2)",
    },
    mobileWidthClass: "w-[189.6px]",
    mobileTextWidthClass: "w-[115.2px]",
    mobileTextSizeClass: "text-[13.2px]",
    bgColorClass: "bg-[#0C1F56]",
  },
];

// Replicate collections array to match the requested 17 items count
const collections = Array.from(
  { length: 17 },
  (_, i) => baseCollections[i % baseCollections.length]
);

export default function CollectionsSection() {
  return (
    <div className="flex flex-col gap-[12px] md:gap-[20px] w-full flex-none overflow-hidden">
      <GameCarousel
        title="COLLECTIONS (17)"
        titleWidth="189px"
        icon={<img src="/games/game-icons/collections.svg" alt="Collections" className="w-[18px] h-[18px] md:w-[30px] md:h-[30px]" />}
      >
        {collections.map((item, index) => (
          <div
            key={index}
            className={`group relative flex h-[60px] md:h-[100px] ${item.mobileWidthClass} md:w-[316px] flex-shrink-0 cursor-pointer items-center gap-[7.2px] md:gap-[12px] rounded-[8px] md:rounded-[12px] ${item.bgColorClass} p-[7.2px_14.4px_7.2px_7.2px] md:p-[12px_24px_12px_12px] transition-colors duration-300 hover:bg-[#173EAD] snap-start`}
          >
            {/* Left decorative frame - Image contains the box design */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="h-[45.6px] w-[45.6px] md:h-[76px] md:w-[76px] flex-shrink-0 rounded-[4.8px] md:rounded-[8px] object-cover select-none pointer-events-none" 
            />

            {/* Collection Title */}
            <div className="flex flex-1 items-center justify-center h-[17px] md:h-[32px]">
              <h3 className={`${item.mobileTextWidthClass} md:w-full text-center font-jost ${item.mobileTextSizeClass} md:text-[22px] font-extrabold leading-[17px] md:leading-[32px] tracking-[0.01em] text-white select-none whitespace-nowrap uppercase`}>
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </GameCarousel>
    </div>
  );
}
