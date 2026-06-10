import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-[1440px] flex-none overflow-hidden bg-[#091741] pb-[40px] pl-[24px] pt-[24px]">
      {children}
    </div>
  );
}