"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { Users, Coins, TrendingUp, Check, ChevronDown, Award, HelpCircle } from "lucide-react";

export default function ReferAFriendPage() {
  const [sliderValue, setSliderValue] = useState(5);
  const [email, setEmail] = useState("");
  
  const calculateEarnings = (friends: number) => {
    return friends * 50;
  };

  return (
    <Container>
      <div className="flex w-full flex-row">
        <div className="w-[232px] flex-none">
          <Sidebar />
        </div>

        <div className="flex w-[1184px] flex-none flex-col px-[24px]">
          <main className="flex w-[1136px] flex-none flex-col gap-[40px] pt-[20px]">
            {/* HERO BANNER SECTION */}
            <section 
              className="relative flex w-[1136px] h-[533px] flex-col items-start gap-[20px] rounded-[16px] overflow-hidden p-[32px_40px]"
              style={{ background: "linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), #2A0B3E" }}
            >
              <div className="absolute inset-0 z-0 mix-blend-screen opacity-60">
                <Image 
                  src="/images/hero_banner_lion.png" 
                  alt="Mighty Luck Lion" 
                  fill 
                  className="object-cover object-right" 
                  priority
                />
              </div>

              <div className="relative z-10 flex w-full flex-row justify-between items-center h-[345px]">
                {/* Left side text */}
                <div className="flex flex-col w-[457px] gap-[4px] mt-[-80px]">
                  <span className="font-jost text-[28px] font-medium leading-[40px] text-white">Get PAID every time</span>
                  <h1 className="font-jost text-[48px] font-extrabold leading-[100%] text-white">YOUR FRIEND PLAYS!</h1>
                </div>

                {/* Right side calculator */}
                <div className="flex w-[430px] h-[345px] flex-col items-center p-[20px] gap-[24px] rounded-[16px] bg-[#091741] relative isolation-isolate border border-[#173EAD]">
                  <div className="absolute top-[-118px] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full z-0 pointer-events-none opacity-40" />
                  
                  <div className="relative z-10 flex flex-col w-[390px] gap-[12px] h-full justify-between">
                    <h2 className="w-full text-center font-jost text-[20px] font-extrabold leading-[29px] tracking-[0.01em] text-white">
                      How much can you earn with Mighty Luck?
                    </h2>

                    <div className="flex flex-col gap-[16px] w-[390px]">
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
                          <div className="absolute top-[-5px] flex items-center justify-center bg-[#1463FF] rounded-full h-[30px] min-w-[54px] pointer-events-none text-white font-manrope text-[16px] font-bold shadow-lg transform -translate-y-full"
                            style={{ left: `calc(${(sliderValue/50)*100}% - 27px)` }}
                          >
                            {sliderValue}
                          </div>
                          {/* Slider thumb styling via CSS would go here, using a hidden thumb for custom one above */}
                          <style dangerouslySetInnerHTML={{__html: `
                            input[type=range]::-webkit-slider-thumb {
                              appearance: none;
                              width: 16px;
                              height: 16px;
                              background: #FFFFFF;
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
                        <button className="h-[40px] bg-[#FFC83D] px-[30px] flex items-center justify-center font-manrope text-[14px] font-bold text-[#1A1404] hover:opacity-90 transition-opacity">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="relative z-10 flex flex-row items-center p-[20px_24px] w-[1056px] h-[104px] bg-[#091741] rounded-[16px] gap-[8px] mx-auto mt-auto border border-[#173EAD]">
                <div className="flex flex-col flex-1 gap-[8px]">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Referrals</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                      <Users size={12} className="text-[#1A1404]" />
                    </div>
                    <span className="font-manrope text-[16px] font-bold text-white">12</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px]">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Deposits</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                      <Coins size={12} className="text-[#1A1404]" />
                    </div>
                    <span className="font-manrope text-[16px] font-bold text-white">$5000.00</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px]">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Earnings</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center">
                      <TrendingUp size={12} className="text-[#1A1404]" />
                    </div>
                    <span className="font-manrope text-[16px] font-bold text-white">$500.00</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px]">
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
            <section className="flex flex-row gap-[12px] w-[1136px] h-[136px]">
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] w-[370.67px] bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">$2.5 K</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF]">Claim By the Most Active Referrer</span>
              </div>
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] w-[370.67px] bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">500+</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF]">Players are already earning with us</span>
              </div>
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] w-[370.67px] bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">19,000</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF]">Free Spins received by friends</span>
              </div>
            </section>

            {/* WHAT YOU GET & WHAT YOUR FRIEND GETS */}
            <section className="flex flex-row gap-[12px] w-[1136px]">
              {/* WHAT YOU GET */}
              <div className="flex flex-col p-[32px_40px] gap-[24px] w-[562px] h-[391px] bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolation-isolate">
                <div className="absolute top-[-97px] left-[-40px] w-[182px] h-[182px] bg-[#57FF3D] blur-[60px] rounded-full z-0 opacity-10 pointer-events-none" />
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em] z-10">WHAT YOU GET</h3>
                <div className="flex flex-col gap-[20px] z-10">
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] bg-[#57FF3D] rounded-full flex items-center justify-center shrink-0 mt-[2px]">
                      <Check size={14} className="text-[#0C1F56] font-bold" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Lifetime earnings from each deposit</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">You get a percentage of every deposit your friends complete.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] bg-[#57FF3D] rounded-full flex items-center justify-center shrink-0 mt-[2px]">
                      <Check size={14} className="text-[#0C1F56] font-bold" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Instant crediting</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your income is credited a few minutes after your friend’s deposit is completed.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] bg-[#57FF3D] rounded-full flex items-center justify-center shrink-0 mt-[2px]">
                      <Check size={14} className="text-[#0C1F56] font-bold" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">No limits for earnings</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your earnings are not capped. Sky (and your friend’s wallet) is the limit!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHAT YOUR FRIEND GETS */}
              <div className="flex flex-col p-[32px_40px] gap-[24px] w-[562px] h-[391px] bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolation-isolate">
                <div className="absolute top-[-97px] left-[-40px] w-[182px] h-[182px] bg-[#1463FF] blur-[60px] rounded-full z-0 opacity-20 pointer-events-none" />
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em] z-10">WHAT YOUR FRIEND GETS</h3>
                <div className="flex flex-col gap-[20px] z-10">
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] bg-[#2365FF] rounded-full flex items-center justify-center shrink-0 mt-[2px]">
                      <Check size={14} className="text-[#FFFFFF] font-bold" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Lifetime earnings from each deposit</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">You get a percentage of every deposit your friends complete.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] bg-[#2365FF] rounded-full flex items-center justify-center shrink-0 mt-[2px]">
                      <Check size={14} className="text-[#FFFFFF] font-bold" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">Instant crediting</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your income is credited a few minutes after your friend’s deposit is completed.</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[16px]">
                    <div className="w-[20px] h-[20px] bg-[#2365FF] rounded-full flex items-center justify-center shrink-0 mt-[2px]">
                      <Check size={14} className="text-[#FFFFFF] font-bold" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-manrope text-[16px] font-bold text-white">No limits for earnings</span>
                      <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">Your earnings are not capped. Sky (and your friend’s wallet) is the limit!</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW REFERRAL PROGRAM WORKS */}
            <section className="flex flex-col gap-[32px] w-[1136px]">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#FFC83D]">
                  <Award size={18} className="text-[#1A1404]" fill="#1A1404" />
                </div>
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em]">HOW REFERRAL PROGRAM WORKS</h3>
              </div>
              <div className="flex flex-row gap-[12px]">
                <div className="flex flex-col justify-end p-[24px] gap-[16px] w-[370px] h-[220px] rounded-[16px] relative overflow-hidden" style={{ background: "linear-gradient(180deg, #2A0B3E 0%, #15051F 100%)" }}>
                  <div className="absolute top-[16px] right-[16px] w-[40px] h-[40px] flex items-center justify-center bg-[#55167B] rounded-[8px] z-10">
                    <span className="font-jost text-[18px] font-extrabold text-white">1</span>
                  </div>
                  <h4 className="font-jost text-[20px] font-extrabold text-white leading-[120%] z-10 w-[240px]">Share invitation link with your friend</h4>
                  {/* Decorative background element could go here */}
                  <div className="absolute inset-0 bg-[#FFC83D] opacity-5 mix-blend-overlay rounded-[16px]"></div>
                </div>
                <div className="flex flex-col justify-end p-[24px] gap-[16px] w-[370px] h-[220px] rounded-[16px] relative overflow-hidden" style={{ background: "linear-gradient(180deg, #2A0B3E 0%, #15051F 100%)" }}>
                  <div className="absolute top-[16px] right-[16px] w-[40px] h-[40px] flex items-center justify-center bg-[#55167B] rounded-[8px] z-10">
                    <span className="font-jost text-[18px] font-extrabold text-white">2</span>
                  </div>
                  <h4 className="font-jost text-[20px] font-extrabold text-white leading-[120%] z-10 w-[260px]">Your friend joins & receives 50 Free Spins to get started</h4>
                  <div className="absolute inset-0 bg-[#1463FF] opacity-5 mix-blend-overlay rounded-[16px]"></div>
                </div>
                <div className="flex flex-col justify-end p-[24px] gap-[16px] w-[370px] h-[220px] rounded-[16px] relative overflow-hidden" style={{ background: "linear-gradient(180deg, #2A0B3E 0%, #15051F 100%)" }}>
                  <div className="absolute top-[16px] right-[16px] w-[40px] h-[40px] flex items-center justify-center bg-[#55167B] rounded-[8px] z-10">
                    <span className="font-jost text-[18px] font-extrabold text-white">3</span>
                  </div>
                  <h4 className="font-jost text-[20px] font-extrabold text-white leading-[120%] z-10 w-[260px]">Now, you'll get paid every time your friend deposits & play</h4>
                  <div className="absolute inset-0 bg-[#57FF3D] opacity-5 mix-blend-overlay rounded-[16px]"></div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="flex flex-col gap-[20px] w-[1136px] mt-[20px]">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="w-[30px] h-[30px] bg-[#FFC83D] flex items-center justify-center rounded-full text-[#1A1404]">
                  <HelpCircle size={18} className="text-[#1A1404]" fill="#1A1404" />
                </div>
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em]">FAQs</h3>
              </div>
              <div className="flex flex-col gap-[16px]">
                {/* Active FAQ Item */}
                <div className="flex flex-col p-[32px_40px] gap-[16px] w-full bg-[#0C1F56] rounded-[8px] border border-[#173EAD]">
                  <div className="flex flex-row justify-between items-center cursor-pointer">
                    <h4 className="font-jost text-[20px] font-extrabold text-white">How do I invite a friend?</h4>
                    <ChevronDown size={20} className="text-white transform rotate-180 transition-transform" />
                  </div>
                  <p className="font-manrope text-[16px] font-medium text-[#A5B8EF] leading-[160%]">
                    In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Mighty Luck and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.
                  </p>
                </div>
                {/* Inactive FAQ Items */}
                <div className="flex flex-row justify-between items-center p-[32px_40px] w-full h-[100px] bg-[#0C1F56] rounded-[8px] cursor-pointer hover:bg-[#112F82] transition-colors border border-transparent">
                  <h4 className="font-jost text-[20px] font-extrabold text-white">When do I get my earnings?</h4>
                  <ChevronDown size={20} className="text-[#A5B8EF] transition-transform" />
                </div>
                <div className="flex flex-row justify-between items-center p-[32px_40px] w-full h-[100px] bg-[#0C1F56] rounded-[8px] cursor-pointer hover:bg-[#112F82] transition-colors border border-transparent">
                  <h4 className="font-jost text-[20px] font-extrabold text-white">Is there a limit on how many friends I can invite?</h4>
                  <ChevronDown size={20} className="text-[#A5B8EF] transition-transform" />
                </div>
              </div>
            </section>

            {/* Footer / SEO Content */}
            <section className="flex flex-col gap-[24px] w-[800px] py-[40px] mx-auto mt-[20px] text-center">
              <h2 className="font-jost text-[32px] font-bold text-white leading-[120%] tracking-[-0.02em]">
                Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
              </h2>
              <p className="font-manrope text-[16px] font-medium text-[#D2DCF7] leading-[160%] text-left">
                Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods. Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today. Ready to play games and win real crypto? Start playing crypto casino games at Mighty Luck Casino.
              </p>
            </section>

            <Footer />
          </main>
        </div>
      </div>
    </Container>
  );
}
