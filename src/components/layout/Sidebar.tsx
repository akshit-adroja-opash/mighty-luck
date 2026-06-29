"use client";


import TopPromoCards from "@/components/sections/TopPromoCards";
import SidebarMenu from "./SidebarMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Sidebar() {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  return (
    <aside className={`flex flex-shrink-0 flex-col gap-[10px] transition-all duration-300 ${sidebarOpen ? 'w-[232px]' : 'w-[72px]'}`}>
      {/* Promo Cards */}
      <div className={`overflow-hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
        <TopPromoCards />
      </div>

      {/* Menu Container */}
      <div className={`flex flex-none flex-col rounded-[16px] bg-[#0C1F56] p-[12px] transition-all duration-300 ${sidebarOpen ? 'w-[232px]' : 'w-[72px]'}`}>
        <SidebarMenu isCollapsed={!sidebarOpen} />
      </div>
    </aside>
  );
}
