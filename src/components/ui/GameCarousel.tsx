"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useScrollState } from "@/hooks/useScrollState";

interface GameCarouselProps {
  title: string;
  icon: React.ReactNode;
  iconBg?: string;
  titleWidth?: string;
  children: React.ReactNode;
}

export default function GameCarousel({ title, icon, iconBg = "bg-transparent", titleWidth, children }: GameCarouselProps) {
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
    <section className="flex w-full flex-none flex-col items-start gap-[12px] md:gap-5 overflow-hidden">
      <SectionHeader 
        title={title}
        titleWidth={titleWidth}
        icon={icon} 
        iconBg={iconBg}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full gap-[8px] md:gap-[12px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {children}
      </div>
    </section>
  );
}
