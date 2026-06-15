import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-hidden bg-[#091741] pt-[24px] pl-[24px] pr-0 pb-[40px]">
      {children}
    </div>
  );
}
