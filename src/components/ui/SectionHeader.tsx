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
}: SectionHeaderProps) {
  return (
    /* w-[1136px] h-[30px] flex-row justify-between gap-[702px] */
    <div className="flex h-[30px] w-[1136px] flex-none flex-row items-center justify-between">

      {/* Left group: w-auto h-[30px] flex-row gap-[12px] */}
      <div className="flex h-[30px] flex-none flex-row items-center gap-[12px]">

        {/* Icon container: w-[30px] h-[30px] centered */}
        <div className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[2px] ${iconBg || "bg-[#FFC83D]"}`}>
          {icon}
        </div>

        {/* Title: Jost 800 20px #FFFFFF letter-spacing 0.01em — width driven by titleWidth prop */}
        <h2
          className="h-[29px] flex-none whitespace-nowrap font-['Jost'] text-[20px] font-extrabold leading-[29px] tracking-[0.01em] text-white"
          style={{ width: titleWidth }}
        >
          {title}
        </h2>
      </div>

      {/* Right group: w-[133px] h-[30px] flex-row gap-[20px] */}
      <div className="flex h-[30px] w-[133px] flex-none flex-row items-center gap-[20px]">

        {/* "View all": w-[45px] h-[16px] Manrope 600 12px #D2DCF7 */}
        {showViewAll && (
          <Link
            href={viewAllLink}
            className="h-[16px] w-[45px] flex-none font-['Manrope'] text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#D2DCF7] hover:text-white transition-colors"
          >
            View all
          </Link>
        )}

        {/* Pagination: w-[68px] h-[30px] flex-row gap-[8px] */}
        {showPagination && (
          <div className="flex h-[30px] w-[68px] flex-none flex-row items-center gap-[8px]">

            {/* Left arrow: w-[30px] h-[30px] bg-[#112F82] opacity-0.4 border-radius-4px */}
            <button
              onClick={onPrev}
              className="flex h-[30px] w-[30px] flex-none flex-col items-center justify-center rounded-[4px] bg-[#112F82] opacity-40 transition-opacity hover:opacity-100 active:scale-95"
              aria-label="Previous"
            >
              {/* Vector 2: 6×3px border white, rotated to point left */}
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Right arrow: w-[30px] h-[30px] bg-[#112F82] border-radius-4px full opacity */}
            <button
              onClick={onNext}
              className="flex h-[30px] w-[30px] flex-none flex-col items-center justify-center rounded-[4px] bg-[#112F82] transition-opacity hover:opacity-80 active:scale-95"
              aria-label="Next"
            >
              {/* Vector 2: 6×3px border white, rotate(-90deg) = pointing right */}
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>
        )}
      </div>

    </div>
  );
}
