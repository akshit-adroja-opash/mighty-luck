import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-hidden bg-[#091741] pt-[12px] md:pt-[24px] px-[20px] lg:px-[24px] pb-[40px]">
      {children}
    </div>
  );
}
