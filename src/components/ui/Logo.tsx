import React from "react";
import Link from "next/link";

interface LogoProps {
  /** Root container classes */
  className?: string;
  /** Image icon classes (e.g., width, height, margins) */
  iconClassName?: string;
  /** Text classes (e.g., font size, tracking, leading) */
  textClassName?: string;
  /** Orientation of the logo */
  orientation?: "horizontal" | "vertical";
  /** If true, wraps the logo in a next/link to the homepage */
  isLink?: boolean;
  /** If true, hides the text on mobile (sm breakpoint) */
  hideTextOnMobile?: boolean;
}

export default function Logo({
  className = "",
  iconClassName = "",
  textClassName = "",
  orientation = "horizontal",
  isLink = false,
  hideTextOnMobile = false,
}: LogoProps) {
  const content = (
    <>
      <img
        src="/images/logo.svg"
        alt="Mighty Luck"
        className={`flex-none ${iconClassName}`}
      />
      <span
        className={`font-black uppercase text-white font-jost whitespace-nowrap ${textClassName} ${
          hideTextOnMobile ? "hidden sm:inline-block" : ""
        }`}
      >
        MIGHTY{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #FFD85A 12%, #FFB800 86.68%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LUCK
        </span>
      </span>
    </>
  );

  const containerClasses =
    orientation === "vertical"
      ? `flex flex-col items-center justify-between ${className}`
      : `flex items-center ${className}`;

  if (isLink) {
    return (
      <Link href="/" className={containerClasses}>
        {content}
      </Link>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
