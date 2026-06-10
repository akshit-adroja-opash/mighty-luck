import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  showViewAll?: boolean;
  viewAllLink?: string;
  showPagination?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function SectionHeader({
  title,
  icon,
  showViewAll = true,
  viewAllLink = "#",
  showPagination = true,
  onPrev,
  onNext,
}: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      {/* Title & Icon Area */}
      <div className="flex items-center gap-[12px]">
        {/* Icon Block */}
        <div className="flex h-[30px] w-[30px] items-center justify-center bg-[#FFC83D]">
          {icon}
        </div>
        
        {/* Title */}
        <h2 className="font-jost text-[20px] font-extrabold uppercase leading-[29px] tracking-[0.01em] text-white">
          {title}
        </h2>
      </div>

      {/* Right Controls Area */}
      <div className="flex items-center gap-[20px]">
        {showViewAll && (
          <Link
            href={viewAllLink}
            className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#D2DCF7] hover:text-white"
          >
            View all
          </Link>
        )}

        {showPagination && (
          <div className="flex items-center gap-[8px]">
            {/* Left Arrow */}
            <button 
              onClick={onPrev}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] bg-[#112F82] opacity-80 transition-opacity hover:opacity-100 active:scale-95"
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
            {/* Right Arrow */}
            <button 
              onClick={onNext}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] bg-[#112F82] opacity-80 transition-opacity hover:opacity-100 active:scale-95"
            >
              <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
