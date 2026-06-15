"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal, setActiveCategory } from "@/store/slices/uiSlice";

const SvgIconWrapper = (src: string) => {
  const IconComponent = ({ size, className }: { size?: number | string; className?: string }) => (
    <img src={src} alt="" width={size} height={size} className={className} />
  );
  IconComponent.displayName = `SvgIcon(${src})`;
  return IconComponent;
};

export const menuItems = [
  {
    name: "Promotions",
    icon: SvgIconWrapper("/games/side-icon/pro.svg"),
    fontSize: "text-[16px]",
    lineHeight: "leading-[22px]",
    fontWeight: "font-semibold",
  },
  {
    name: "VIP Program",
    icon: SvgIconWrapper("/games/side-icon/vip.svg"),
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-semibold",
  },
  {
    name: "Tournaments",
    icon: SvgIconWrapper("/games/side-icon/tour.svg"),
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-semibold",
  },
  {
    name: "Casino",
    icon: SvgIconWrapper("/games/side-icon/casino.svg"),
    isPrimary: true, // blue bg
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-bold",
    subItems: [
      { name: "All Games", icon: SvgIconWrapper("/games/side-icon/all.svg") },
      { name: "New Games", icon: SvgIconWrapper("/games/side-icon/new.svg") },
      { name: "Popular Games", icon: SvgIconWrapper("/games/side-icon/popular.svg") },
      { name: "Original Games", icon: SvgIconWrapper("/games/side-icon/original.svg") },
      { name: "Crash Games", icon: SvgIconWrapper("/games/side-icon/crash.svg") },
    ],
  },
  {
    name: "Live Casino",
    icon: SvgIconWrapper("/games/side-icon/live.svg"),
    isPrimary: true, // blue bg
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-bold",
  },
  {
    name: "Live Support",
    icon: SvgIconWrapper("/games/side-icon/live-support.svg"),
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-semibold",
  },
];

export default function SidebarMenu({ onItemClick, isCollapsed = false }: { onItemClick?: () => void, isCollapsed?: boolean }) {
  const dispatch = useDispatch();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Casino: true, // Keep Casino open by default
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-none flex-col gap-[16px] w-full">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isOpen = openMenus[item.name];

        const bgClass = item.isPrimary ? "bg-[#1463FF]" : "bg-[#112F82]";
        const textClass = item.isPrimary ? "text-white" : "text-[#D2DCF7]";
        const hoverClass = item.isPrimary ? "hover:bg-blue-600" : "hover:bg-[#1463FF] hover:text-white";

        return (
          <div key={item.name} className={`flex w-full flex-col ${isOpen && item.subItems && !isCollapsed ? 'rounded-[8px] bg-[#112F82]' : ''}`}>
            <button
              onClick={() => {
                if (item.subItems) {
                  toggleMenu(item.name);
                } else if (onItemClick) {
                  onItemClick();
                }
              }}
              title={isCollapsed ? item.name : undefined}
              className={`flex h-[44px] w-full items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-[10px]'} rounded-[8px] py-0 transition-all cursor-pointer ${bgClass} ${textClass} ${hoverClass}`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-[8px]'}`}>
                <div className="flex-none flex items-center justify-center">
                  <Icon size={20} />
                </div>
                {!isCollapsed && <span className={`font-manrope ${item.fontSize} ${item.fontWeight} ${item.lineHeight} tracking-[0.02em] whitespace-nowrap`}>{item.name}</span>}
              </div>

              {!isCollapsed && item.subItems && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 flex-none ${isOpen ? "rotate-180" : ""}`}
                />
              )}
              {!isCollapsed && !item.subItems && item.isPrimary && (
                <ChevronDown
                  size={16}
                  className="opacity-50 flex-none"
                />
              )}
            </button>

            {/* Sub Menu */}
            {item.subItems && isOpen && !isCollapsed && (
              <div className="flex w-full flex-none flex-col items-start justify-center gap-[20px] rounded-b-[8px] px-[16px] py-[20px]">
                {item.subItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  return (
                    <button
                      key={subItem.name}
                      onClick={() => {
                        if (subItem.name === "Popular Games" || subItem.name === "All Games") {
                          dispatch(setActiveCategory("Lobby"));
                          dispatch(openModal("lobby"));
                        }
                        if (onItemClick) onItemClick();
                      }}
                      className="flex h-[20px] items-center gap-[12px] text-[#D2DCF7] transition-colors hover:text-white cursor-pointer"
                    >
                      <div className="flex h-[20px] w-[20px] items-center justify-center flex-none">
                        <SubIcon size={18} />
                      </div>
                      <span className="font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] whitespace-nowrap">{subItem.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
