import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-hidden bg-[#091741] pt-6 pl-6 pr-6 pb-10">
      {children}
    </div>
  );
}
