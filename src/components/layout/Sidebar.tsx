"use client";

import {
  Gift,
  Crown,
  Trophy,
  Dice5,
  Club,
  Headphones,
  ChevronDown,
  Gamepad2,
  Sparkles,
  Flame,
  Star,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/uiSlice";

import TopPromoCards from "@/components/sections/TopPromoCards";

const menuItems = [
  {
    name: "Promotions",
    icon: Gift,
    fontSize: "text-[16px]",
    lineHeight: "leading-[22px]",
    fontWeight: "font-semibold",
  },
  {
    name: "VIP Program",
    icon: Crown,
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-semibold",
  },
  {
    name: "Tournaments",
    icon: Trophy,
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-semibold",
  },
  {
    name: "Casino",
    icon: Dice5,
    isPrimary: true, // blue bg
    iconColor: "text-[#FFB800]", // yellow icon
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-bold",
    subItems: [
      { name: "All Games", icon: Gamepad2 },
      { name: "New Games", icon: Sparkles },
      { name: "Popular Games", icon: Flame },
      { name: "Original Games", icon: Star },
      { name: "Crash Games", icon: Rocket },
    ],
  },
  {
    name: "Live Casino",
    icon: Club,
    isPrimary: true, // blue bg
    iconColor: "text-[#FFB800]", // yellow icon
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-bold",
  },
  {
    name: "Live Support",
    icon: Headphones,
    fontSize: "text-[14px]",
    lineHeight: "leading-[19px]",
    fontWeight: "font-semibold",
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Casino: true, // Keep Casino open by default
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="flex h-[740px] w-[232px] flex-shrink-0 flex-col gap-[10px]">
      {/* Promo Cards */}
      <TopPromoCards />

      {/* Menu Container */}
      <div className="flex h-[596px] w-[232px] flex-none flex-col rounded-[16px] bg-[#0C1F56] p-[16px]">
        
        <div className="flex h-[564px] w-[200px] flex-none flex-col gap-[16px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenus[item.name];

            const bgClass = item.isPrimary ? "bg-[#1463FF]" : "bg-[#112F82]";
            const textClass = item.isPrimary ? "text-white" : "text-[#D2DCF7]";
            const hoverClass = item.isPrimary ? "hover:bg-blue-600" : "hover:bg-[#1463FF] hover:text-white";
            const iconColor = item.iconColor || "text-[#D2DCF7]";

            return (
              <div key={item.name} className={`flex w-[200px] flex-col ${isOpen && item.subItems ? 'rounded-[8px] bg-[#112F82]' : ''}`}>
                <button
                  onClick={() => item.subItems ? toggleMenu(item.name) : null}
                  className={`flex h-[44px] w-[200px] items-center justify-between rounded-[8px] px-[10px] py-0 transition-all ${bgClass} ${textClass} ${hoverClass}`}
                >
                  <div className="flex items-center gap-[8px]">
                    <Icon size={20} className={iconColor} />
                    <span className={`font-['Manrope'] ${item.fontSize} ${item.fontWeight} ${item.lineHeight} tracking-[0.02em]`}>{item.name}</span>
                  </div>

                  {item.subItems && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                  {!item.subItems && item.isPrimary && (
                    <ChevronDown
                      size={16}
                      className="opacity-50"
                    />
                  )}
                </button>

                {/* Sub Menu */}
                {item.subItems && isOpen && (
                  <div className="flex h-[220px] w-[200px] flex-none flex-col items-start justify-center gap-[20px] rounded-b-[8px] px-[16px] py-[20px]">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            if (subItem.name === "Popular Games") {
                              dispatch(openModal("lobby"));
                            }
                          }}
                          className="flex h-[20px] items-center gap-[12px] text-[#D2DCF7] transition-colors hover:text-white cursor-pointer"
                        >
                          <div className="flex h-[20px] w-[20px] items-center justify-center">
                            <SubIcon size={18} />
                          </div>
                          <span className="font-['Manrope'] text-[14px] font-semibold leading-[19px] tracking-[0.02em]">{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}