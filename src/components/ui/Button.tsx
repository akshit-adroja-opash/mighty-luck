import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-lg bg-[#FFC83D] px-6 py-3 text-sm font-bold text-[#1A1404] transition-all hover:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}