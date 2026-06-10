"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const baseCollections = [
  { name: "MYTHOLOGY", bg: "bg-[#0C1F56]" },
  { name: "FRUITS", bg: "bg-[#173EAD]" },
  { name: "ANIMALS", bg: "bg-[#0C1F56]" },
  { name: "ASIA", bg: "bg-[#0C1F56]" },
];

const collections = Array.from({ length: 20 }, (_, i) => baseCollections[i % baseCollections.length]);

export default function CollectionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="flex w-full flex-col gap-[20px]">
      <SectionHeader 
        title="COLLECTIONS (17)" 
        icon={<span className="text-xl">📚</span>} 
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        className="flex gap-[12px] overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {collections.map((item, index) => (
          <div
            key={index}
            className={`group relative flex h-[100px] w-[316px] flex-shrink-0 cursor-pointer items-center justify-between overflow-hidden rounded-[12px] snap-start ${item.bg} p-[12px] transition-all hover:opacity-90`}
          >
            {/* Left square block (decorative) */}
            <div className="relative flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#0E1B3D]">
              <div className="absolute h-[70px] w-[70px] rounded-full bg-[#1463FF] blur-[21px]" />
              <div className="absolute h-[40px] w-[40px] rounded-full bg-[#FFC83D] opacity-0" />
            </div>

            {/* Title */}
            <h3 className="flex-1 text-center font-jost text-[22px] font-extrabold tracking-[0.01em] text-white">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}