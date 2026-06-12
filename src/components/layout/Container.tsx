import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-hidden bg-[#091741] pb-10 px-4 sm:px-6 lg:px-6 pt-6">
      {children}
    </div>
  );
}
