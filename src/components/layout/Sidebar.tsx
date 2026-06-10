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

import TopPromoCards from "@/components/sections/TopPromoCards";

const menuItems = [
  {
    name: "Promotions",
    icon: Gift,
  },
  {
    name: "VIP Program",
    icon: Crown,
  },
  {
    name: "Tournaments",
    icon: Trophy,
  },
  {
    name: "Casino",
    icon: Dice5,
    isPrimary: true, // blue bg
    iconColor: "text-[#FFB800]", // yellow icon
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
  },
  {
    name: "Live Support",
    icon: Headphones,
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Casino: true, // Keep Casino open by default
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-full flex-shrink-0">
      {/* Promo Cards */}
      <TopPromoCards />

      {/* Menu Container */}
      <div className="mt-4 flex w-full flex-col rounded-[16px] bg-[#0C1F56] p-4">
        
        <div className="flex w-full flex-col gap-[16px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenus[item.name];

            const bgClass = item.isPrimary ? "bg-[#1463FF]" : "bg-[#112F82]";
            const textClass = item.isPrimary ? "text-white" : "text-[#D2DCF7]";
            const hoverClass = item.isPrimary ? "hover:bg-blue-600" : "hover:bg-[#1463FF] hover:text-white";
            const iconColor = item.iconColor || "text-[#D2DCF7]";

            return (
              <div key={item.name} className="flex flex-col">
                <button
                  onClick={() => item.subItems ? toggleMenu(item.name) : null}
                  className={`flex h-[44px] w-full items-center justify-between rounded-lg px-3 text-sm font-semibold transition-all ${bgClass} ${textClass} ${hoverClass} ${
                    item.subItems && isOpen ? "rounded-b-none" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={iconColor} />
                    <span className="font-sans font-semibold tracking-wide">{item.name}</span>
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
                  <div className="flex flex-col gap-[20px] rounded-b-lg bg-[#112F82] px-[16px] pb-[20px] pt-[20px]">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subItem.name}
                          className="flex items-center gap-3 text-sm font-semibold text-[#D2DCF7] transition-colors hover:text-white"
                        >
                          <SubIcon size={18} />
                          <span className="font-sans font-semibold tracking-wide">{subItem.name}</span>
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