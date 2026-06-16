import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  titleWidth?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  showPagination?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  iconBg?: string;
}

export default function SectionHeader({
  title,
  icon,
  titleWidth = "144px",
  showViewAll = true,
  viewAllLink = "#",
  showPagination = true,
  onPrev,
  onNext,
  iconBg,
  canScrollLeft = false,
  canScrollRight = true,
}: SectionHeaderProps & { canScrollLeft?: boolean; canScrollRight?: boolean }) {
  return (
    /* w-[1136px] h-[30px] flex-row justify-between gap-[702px] */
    <div className="flex min-h-[30px] w-full flex-none flex-row items-center justify-between gap-2 overflow-hidden">

      {/* Left group: w-auto h-[30px] flex-row gap-[12px] */}
      <div className="flex min-h-[30px] flex-1 min-w-0 flex-row items-center gap-[12px]">

        {/* Icon container: w-[30px] h-[30px] centered */}
        <div className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[2px] ${iconBg || "bg-[#FFC83D]"}`}>
          {icon}
        </div>

        {/* Title: Jost 800 20px #FFFFFF letter-spacing 0.01em */}
        <h2
          className="flex-1 min-w-0 truncate font-jost text-[20px] font-extrabold leading-[29px] tracking-[0.01em] text-white"
        >
          {title}
        </h2>
      </div>

      {/* Right group */}
      <div className="flex h-[30px] w-auto flex-none flex-row items-center justify-end gap-[12px]">

        {/* "View all": Manrope 600 12px #D2DCF7 */}
        {showViewAll && (
          <Link
            href={viewAllLink}
            className="flex-none whitespace-nowrap font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#D2DCF7] hover:text-white transition-colors"
          >
            View all
          </Link>
        )}

        {/* Pagination: w-[68px] h-[30px] flex-row gap-[8px] */}
        {showPagination && (
          <div className="flex h-[30px] w-[68px] flex-none flex-row items-center gap-[8px]">

            {/* Left arrow: bg-[#112F82] border-radius-4px */}
            <button
              onClick={onPrev}
              disabled={!canScrollLeft}
              className={`flex h-[30px] w-[30px] flex-none flex-col items-center justify-center rounded-[4px] bg-[#112F82] transition-opacity ${canScrollLeft ? "opacity-100 hover:opacity-80 active:scale-95 cursor-pointer" : "opacity-40 cursor-default"}`}
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Right arrow: bg-[#112F82] border-radius-4px */}
            <button
              onClick={onNext}
              disabled={!canScrollRight}
              className={`flex h-[30px] w-[30px] flex-none flex-col items-center justify-center rounded-[4px] bg-[#112F82] transition-opacity ${canScrollRight ? "opacity-100 hover:opacity-80 active:scale-95 cursor-pointer" : "opacity-40 cursor-default"}`}
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>
        )}
      </div>

    </div>
  );
}
