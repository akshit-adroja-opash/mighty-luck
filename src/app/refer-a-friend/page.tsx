"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CryptoBanner from "@/components/sections/CryptoBanner";
import { Users, Coins, TrendingUp, Check, ChevronDown, Award, HelpCircle, Plus, Minus } from "lucide-react";

export default function ReferAFriendPage() {
  const [sliderValue, setSliderValue] = useState(5);
  const [email, setEmail] = useState("");
  
  const calculateEarnings = (friends: number) => {
    return friends * 50;
  };

  return (
    <Container>
      <div className="flex w-full flex-col lg:flex-row relative">
        <div className="hidden lg:block w-[232px] flex-none">
          <Sidebar />
        </div>

        <div className="flex w-full lg:w-[calc(100%_-_232px)] flex-none flex-col px-0 lg:pl-6 lg:pr-0 overflow-hidden">
          <main className="flex w-full flex-none flex-col gap-[40px] pt-[20px]">

            {/* HERO BANNER SECTION */}
            <section 
              className="relative flex w-full max-w-[1136px] h-auto min-h-[533px] flex-col items-start gap-[20px] rounded-[16px] overflow-hidden p-4 sm:p-[32px_40px]"
              style={{ backgroundColor: "#2A0B3E" }}
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/games/refrels/refer.png" 
                  alt="Refer A Friend" 
                  fill 
                  className="object-cover object-right" 
                  priority
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%)" }}
                />
              </div>

              <div className="relative z-10 flex w-full flex-col lg:flex-row justify-between items-center min-h-[345px] gap-8 lg:gap-0 mt-8 lg:mt-0">
                {/* Left side text */}
                <div className="flex flex-col w-full lg:w-[457px] gap-[4px] lg:mt-[-80px] text-center lg:text-left">
                  <span className="font-jost text-[24px] sm:text-[28px] font-medium leading-[1.2] lg:leading-[40px] text-white">Get PAID every time</span>
                  <h1 className="font-jost text-[36px] sm:text-[48px] font-extrabold leading-[100%] text-white">YOUR FRIEND PLAYS!</h1>
                </div>

                {/* Right side calculator */}
                <div className="flex w-full lg:w-[430px] min-h-[345px] flex-col items-center p-4 sm:p-[20px] gap-[24px] rounded-[16px] bg-[#091741] relative isolation-isolate">
                  <div className="absolute top-[-118px] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full z-0 pointer-events-none opacity-40" />
                  
                  <div className="relative z-10 flex flex-col w-full gap-[12px] h-full justify-between">
                    <h2 className="w-full text-center font-jost text-[20px] font-extrabold leading-[29px] tracking-[0.01em] text-white">
                      How much can you earn with Mighty Luck?
                    </h2>

                    <div className="flex flex-col gap-[16px] w-full">
                      {/* Slider section */}
                      <div className="flex flex-col gap-[8px]">
                        <span className="font-manrope text-[12px] font-semibold tracking-[0.02em] text-[#BBCAF3]">Invited Friends</span>
                        <div className="relative flex flex-col justify-center w-full h-[40px]">
                          <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            value={sliderValue}
                            onChange={(e) => setSliderValue(Number(e.target.value))}
                            className="w-full h-[6px] rounded-full appearance-none outline-none z-0 relative cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #1463FF ${(sliderValue/50)*100}%, #112F82 ${(sliderValue/50)*100}%)`
                            }}
                          />
                          <div className="absolute top-[5px] flex items-center justify-center bg-[#1463FF] rounded-full h-[30px] min-w-[54px] px-[12px] pointer-events-none text-white font-manrope text-[16px] font-bold shadow-lg gap-1"
                            style={{ left: `calc(${(sliderValue/50)*100}% - 27px)` }}
                          >
                            <Users size={14} className="text-white" fill="white" />
                            <span>{sliderValue}</span>
                          </div>
                          {/* Slider thumb styling via CSS would go here, using a hidden thumb for custom one above */}
                          <style dangerouslySetInnerHTML={{__html: `
                            input[type=range]::-webkit-slider-thumb {
                              appearance: none;
                              width: 30px;
                              height: 30px;
                              background: transparent;
                              border-radius: 50%;
                              cursor: pointer;
                            }
                          `}} />
                        </div>
                      </div>

                      {/* Earnings Result */}
                      <div className="flex flex-col gap-[8px] mt-[10px]">
                        <div className="flex flex-row items-center justify-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[60px]">
                          <span className="font-manrope text-[14px] font-bold text-white">Your monthly earnings:</span>
                          <span className="font-manrope text-[24px] font-bold text-white">${calculateEarnings(sliderValue)}</span>
                        </div>
                        <p className="font-manrope text-[10px] font-medium leading-[14px] text-[#7795E8] text-center">
                          * Calculations are based on average player activity and may vary in individual cases
                        </p>
                      </div>

                      {/* Invite Input */}
                      <div className="flex flex-row items-center bg-[#112F82] rounded-[8px] h-[40px] overflow-hidden mt-[4px]">
                        <input 
                          type="email" 
                          placeholder="Enter email address" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none pl-[16px] font-manrope text-[14px] font-semibold text-white placeholder-[#7795E8]"
                        />
                        <button className="h-[40px] px-[20px] bg-[#FFC83D] rounded-[8px] flex items-center justify-center font-manrope text-[14px] font-bold text-[#1A1404] hover:opacity-90 transition-opacity whitespace-nowrap">
                          Send Invite
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center p-4 lg:p-[20px_24px] w-full max-w-[1056px] h-auto lg:h-[104px] bg-[#091741] rounded-[16px] gap-[8px] mx-auto mt-8 lg:mt-auto">
                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Referrals</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                      <Users size={12} className="text-[#1A1404]" />
                    </div>
                    <span className="font-manrope text-[16px] font-bold text-white">12</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Deposits</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                      <Coins size={12} className="text-[#1A1404]" />
                    </div>
                    <span className="font-manrope text-[16px] font-bold text-white">$5000.00</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Earnings</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                      <TrendingUp size={12} className="text-[#1A1404]" />
                    </div>
                    <span className="font-manrope text-[16px] font-bold text-white">$500.00</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Pending Income</span>
                  <div className="flex flex-row items-center justify-between p-[10px_16px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="flex flex-row items-center gap-[8px]">
                      <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                        <Coins size={12} className="text-[#1A1404]" />
                      </div>
                      <span className="font-manrope text-[16px] font-bold text-white">$150.00</span>
                    </div>
                    <button className="bg-[#1463FF] px-[12px] py-[4px] rounded-[6px] font-manrope text-[12px] font-semibold text-white hover:opacity-90 transition-opacity">
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 3 STATS CARDS */}
            <section className="flex flex-col lg:flex-row gap-[12px] w-full max-w-[1136px]">
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] flex-1 bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">$2.5 K</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF]">Claim By the Most Active Referrer</span>
              </div>
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] flex-1 bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">500+</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF]">Players are already earning with us</span>
              </div>
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] flex-1 bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">19,000</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF]">Free Spins received by friends</span>
              </div>
            </section>

            {/* HOW REFERRAL PROGRAM WORKS */}
            <section className="flex flex-col gap-[32px] w-full max-w-[1136px]">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#FFC83D]">
                  <Award size={18} className="text-[#1A1404]" fill="#1A1404" />
                </div>
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em]">HOW REFERRAL PROGRAM WORKS</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-[12px] w-full">
                <div className="relative flex-1 min-h-[220px] rounded-[12px] overflow-hidden">
                  <Image src="/games/refrels/r1.png" alt="Step 1" fill className="object-cover" />
                </div>
                <div className="relative flex-1 min-h-[220px] rounded-[12px] overflow-hidden">
                  <Image src="/games/refrels/r2.png" alt="Step 2" fill className="object-cover" />
                </div>
                <div className="relative flex-1 min-h-[220px] rounded-[12px] overflow-hidden">
                  <Image src="/games/refrels/r3.png" alt="Step 3" fill className="object-cover" />
                </div>
              </div>
            </section>

            {/* WHAT YOU GET & WHAT YOUR FRIEND GETS */}
            <section className="flex flex-col lg:flex-row gap-[12px] w-full max-w-[1136px]">
              {/* WHAT YOU GET */}
              <div className="flex flex-col p-[32px_24px] sm:p-[32px_40px] gap-[24px] flex-1 bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolation-isolate">
                <div className="absolute top-[-97px] left-[calc(50%_-_182px/2_-_241px)] w-[182px] h-[182px] bg-[#57FF3D] blur-[60px] rounded-full z-0 pointer-events-none" />
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em] z-10">WHAT YOU GET</h3>
                <div className="flex flex-col gap-[20px] z-10">
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 relative">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" fill="#57FF3D"/>
                        <path d="M11 4H9L6 11H9L9 16L14 9H11L11 4Z" fill="#57FF3D"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Lifetime earnings from each deposit</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">You get a percentage of every deposit your friends complete.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                      <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.92 8H7.92V0L0 12H6V20L13.92 8Z" fill="#57FF3D"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Instant crediting</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your income is credited a few minutes after your friend’s deposit is completed.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 relative">
                      <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 10C16.9853 10 19 7.98528 19 5.5C19 3.01472 16.9853 1 14.5 1C12.7938 1 11.3093 1.94723 10.5332 3.39999L10.0003 4.39768L9.46743 3.39999C8.6913 1.94723 7.20686 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10C7.20686 10 8.6913 9.05277 9.46743 7.60001L10.0003 6.60232L10.5332 7.60001C11.3093 9.05277 12.7938 10 14.5 10ZM5.5 3C6.46276 3 7.32367 3.51351 7.76011 4.33038L8.5323 5.7761L7.76011 7.22182C7.32367 8.03869 6.46276 8.55221 5.5 8.55221C3.73243 8.55221 2.3 7.11978 2.3 5.35221C2.3 3.58464 3.73243 2.15221 5.5 2.15221V3ZM14.5 3C16.2676 3 17.7 4.43243 17.7 6.20001C17.7 7.96758 16.2676 9.4 14.5 9.4C13.5372 9.4 12.6763 8.88649 12.2399 8.06962L11.4677 6.6239L12.2399 5.17818C12.6763 4.36131 13.5372 3.84779 14.5 3.84779V3Z" fill="#57FF3D"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">No limits for earnings</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your earnings are not capped. Sky (and your friend’s wallet) is the limit!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHAT YOUR FRIEND GETS */}
              <div className="flex flex-col p-[32px_24px] sm:p-[32px_40px] gap-[24px] flex-1 bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolation-isolate">
                <div className="absolute top-[-97px] left-[calc(50%_-_182px/2_-_241px)] w-[182px] h-[182px] bg-[#1463FF] blur-[60px] rounded-full z-0 pointer-events-none" />
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em] z-10">WHAT YOUR FRIEND GETS</h3>
                <div className="flex flex-col gap-[20px] z-10">
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 relative">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" fill="#2365FF"/>
                        <path d="M11 4H9L6 11H9L9 16L14 9H11L11 4Z" fill="#2365FF"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Lifetime earnings from each deposit</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">You get a percentage of every deposit your friends complete.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                      <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.92 8H7.92V0L0 12H6V20L13.92 8Z" fill="#2365FF"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Instant crediting</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your income is credited a few minutes after your friend’s deposit is completed.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 relative">
                      <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 10C16.9853 10 19 7.98528 19 5.5C19 3.01472 16.9853 1 14.5 1C12.7938 1 11.3093 1.94723 10.5332 3.39999L10.0003 4.39768L9.46743 3.39999C8.6913 1.94723 7.20686 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10C7.20686 10 8.6913 9.05277 9.46743 7.60001L10.0003 6.60232L10.5332 7.60001C11.3093 9.05277 12.7938 10 14.5 10ZM5.5 3C6.46276 3 7.32367 3.51351 7.76011 4.33038L8.5323 5.7761L7.76011 7.22182C7.32367 8.03869 6.46276 8.55221 5.5 8.55221C3.73243 8.55221 2.3 7.11978 2.3 5.35221C2.3 3.58464 3.73243 2.15221 5.5 2.15221V3ZM14.5 3C16.2676 3 17.7 4.43243 17.7 6.20001C17.7 7.96758 16.2676 9.4 14.5 9.4C13.5372 9.4 12.6763 8.88649 12.2399 8.06962L11.4677 6.6239L12.2399 5.17818C12.6763 4.36131 13.5372 3.84779 14.5 3.84779V3Z" fill="#2365FF"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">No limits for earnings</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your earnings are not capped. Sky (and your friend’s wallet) is the limit!</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="flex flex-col gap-[20px] w-full max-w-[1136px] mt-[20px]">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="w-[30px] h-[30px] bg-[#FFC83D] flex items-center justify-center rounded-full text-[#1A1404]">
                  <HelpCircle size={18} className="text-[#1A1404]" fill="#1A1404" />
                </div>
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em]">FAQs</h3>
              </div>
              <div className="flex flex-col gap-[16px]">
                {/* Active FAQ Item */}
                <div className="flex flex-col p-[24px_20px] sm:p-[32px_40px] gap-[16px] w-full bg-[#0C1F56] rounded-[8px]">
                  <div className="flex flex-row justify-between items-center cursor-pointer">
                    <h4 className="font-jost text-[16px] sm:text-[20px] font-extrabold text-white">How do I invite a friend?</h4>
                    <Minus size={20} className="text-white shrink-0" />
                  </div>
                  <p className="font-manrope text-[14px] sm:text-[16px] font-medium text-[#A5B8EF] leading-[160%]">
                    In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Mighty Luck and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.
                  </p>
                </div>
                {/* Inactive FAQ Items */}
                <div className="flex flex-row justify-between items-center p-[24px_20px] sm:p-[32px_40px] w-full min-h-[80px] sm:h-[100px] bg-[#0C1F56] rounded-[8px] cursor-pointer hover:bg-[#112F82] transition-colors">
                  <h4 className="font-jost text-[16px] sm:text-[20px] font-extrabold text-white">How do I invite a friend?</h4>
                  <Plus size={20} className="text-white shrink-0" />
                </div>
                <div className="flex flex-row justify-between items-center p-[24px_20px] sm:p-[32px_40px] w-full min-h-[80px] sm:h-[100px] bg-[#0C1F56] rounded-[8px] cursor-pointer hover:bg-[#112F82] transition-colors">
                  <h4 className="font-jost text-[16px] sm:text-[20px] font-extrabold text-white">How do I invite a friend?</h4>
                  <Plus size={20} className="text-white shrink-0" />
                </div>
              </div>
            </section>

            {/* Footer / SEO Content */}
            <section className="relative flex flex-col gap-[24px] w-full max-w-[800px] pt-[40px] pb-[100px] mx-auto mt-[20px] px-4 sm:px-0">
              <h2 className="font-jost text-[24px] sm:text-[32px] font-bold text-white leading-[120%] tracking-[-0.02em] text-center">
                Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
              </h2>
              <p className="font-manrope text-[16px] font-medium text-[#D2DCF7] leading-[160%] text-left">
                Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods. Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today. Ready to play games and win real crypto? Start playing crypto casino games at Mighty Luck Casino.
              </p>
              
              <h3 className="font-jost text-[24px] font-bold text-white leading-[35px] mt-[16px] text-left">
                Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
              </h3>
              <p className="font-manrope text-[16px] font-medium text-[#D2DCF7] leading-[160%] text-left">
                Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
              </p>
              
              <h3 className="font-jost text-[24px] font-bold text-white leading-[35px] mt-[16px] text-left">
                Massive Game Variety
              </h3>
              <p className="font-manrope text-[16px] font-medium text-[#D2DCF7] leading-[160%] text-left">
                With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You'll find:
              </p>

              {/* Gradient Overlay & Read More Button */}
              <div className="absolute bottom-0 left-0 right-0 h-[200px] flex flex-col justify-end items-center pb-[24px] pt-[10px]" style={{ background: 'linear-gradient(0deg, #091741 0%, rgba(9, 23, 65, 0) 100%)' }}>
                <button className="flex flex-row items-center gap-[4px] cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFC83D]">Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </section>

            {/* Crypto Banner */}
            <div className="hidden lg:block w-full max-w-[1136px]">
              <CryptoBanner />
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </Container>
  );
}
