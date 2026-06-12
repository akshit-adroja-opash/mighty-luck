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
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside className="flex w-[232px] flex-shrink-0 flex-col gap-[10px]">
      {/* Promo Cards */}
      <TopPromoCards />

      {/* Menu Container */}
      <div className="flex w-[232px] flex-none flex-col rounded-[16px] bg-[#0C1F56] p-[16px]">
        <SidebarMenu />
      </div>
    </aside>
  );
}
