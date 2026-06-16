"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export default function ReferAFriendPage() {
  const [sliderValue, setSliderValue] = useState(5);
  const [email, setEmail] = useState("");
  
  const calculateEarnings = (friends: number) => {
    return friends * 50;
  };

  return (
    <main className="flex w-full flex-none flex-col gap-[40px]">

            {/* HERO BANNER SECTION */}
            <section 
              className="relative flex w-full h-auto aspect-auto lg:aspect-[1136/533] flex-col items-start gap-[20px] rounded-[16px] overflow-hidden p-4 sm:p-[32px_40px]"
              style={{ backgroundColor: "#2A0B3E" }}
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/games/refrels/refer.png" 
                  alt="Refer A Friend" 
                  fill 
                  className="object-cover object-center" 
                  priority
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%)" }}
                />
              </div>

              <div className="relative z-10 flex w-full flex-col lg:flex-row justify-between items-center min-h-[345px] gap-8 lg:gap-[24px] mt-8 lg:mt-0">
                {/* Left side text */}
                <div className="flex flex-col w-full lg:w-[350px] flex-none gap-[4px] text-center lg:text-left">
                  <span className="font-jost text-[24px] sm:text-[28px] font-medium leading-[1.2] lg:leading-[40px] text-white">Get <span className="text-[#FFC83D]">PAID</span> every time</span>
                  <h1 className="font-jost text-[36px] sm:text-[48px] font-extrabold leading-[100%] text-white">YOUR FRIEND PLAYS!</h1>
                </div>

                {/* Right side calculator */}
                <div className="flex flex-col items-center p-[20px] gap-[24px] w-full lg:w-[430px] h-auto sm:h-[345px] bg-[#091741] rounded-[16px] overflow-hidden relative isolation-isolate mt-8 lg:mt-0 flex-none">
                  {/* Background Glow */}
                  <div className="absolute top-[-118px] left-[calc(50%_-_173px/2_-_0.5px)] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full z-0 pointer-events-none" />
                  
                  {/* Inner Content Wrapper */}
                  <div className="flex flex-col items-start w-full sm:w-[390px] h-auto sm:h-[305px] gap-[12px] z-10 flex-none relative">
                    
                    {/* Header Title */}
                    <div className="flex flex-row justify-center items-start w-full sm:w-[390px] h-auto sm:h-[58px] gap-[12px] flex-none">
                      <h2 className="w-full sm:w-[300px] h-auto sm:h-[58px] text-center font-jost text-[20px] font-extrabold leading-[29px] tracking-[0.01em] text-white">
                        How much can you earn with Mighty Luck?
                      </h2>
                    </div>

                    {/* Bottom Form Frame */}
                    <div className="flex flex-col items-start w-full sm:w-[390px] h-auto sm:h-[235px] gap-[16px] flex-none">
                      
                      {/* Slider Block */}
                      <div className="flex flex-col items-start w-full sm:w-[390px] h-[64px] gap-[8px] flex-none">
                        <div className="flex flex-row items-center w-full sm:w-[390px] h-[16px] gap-[8px] flex-none">
                          <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-[88px] h-[16px]">
                            Invited Friends
                          </span>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full sm:w-[390px] h-[40px] gap-[2px] isolation-isolate flex-none relative">
                          <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            value={sliderValue}
                            onChange={(e) => setSliderValue(Number(e.target.value))}
                            className="w-full h-[6px] rounded-[100px] appearance-none outline-none z-0 relative cursor-pointer bg-[#112F82] flex-none"
                            style={{
                              background: `linear-gradient(to right, #1463FF ${((sliderValue - 1) / 49) * 100}%, transparent ${((sliderValue - 1) / 49) * 100}%)`,
                              backgroundColor: "#112F82"
                            }}
                          />
                          <div 
                            className="absolute top-[5px] flex flex-row items-center justify-center p-[4px_12px] gap-[4px] w-[54px] h-[30px] bg-[#1463FF] rounded-[100px] pointer-events-none z-10"
                            style={{ left: `calc(${((sliderValue - 1) / 49) * 100}% - 27px)` }}
                          >
                            <div className="flex-none w-[16px] h-[16px] flex items-center justify-center">
                              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3333 9.33333C11.3333 10.0406 10.7607 10.6133 10.0533 10.6133H1.94667C1.23933 10.6133 0.666667 10.0406 0.666667 9.33333C0.666667 7.86067 1.86067 6.66667 3.33333 6.66667H8.66667C10.1393 6.66667 11.3333 7.86067 11.3333 9.33333ZM8.66667 3.33333C8.66667 4.806 7.47267 6 6 6C4.52733 6 3.33333 4.806 3.33333 3.33333C3.33333 1.86067 4.52733 0.666667 6 0.666667C7.47267 0.666667 8.66667 1.86067 8.66667 3.33333ZM15.3333 9.33333C15.3333 10.0406 14.7607 10.6133 14.0533 10.6133H12.2133C12.482 10.222 12.6667 9.754 12.6667 9.33333C12.6667 7.49267 11.174 6 9.33333 6C9.102 6 8.878 6.03667 8.66667 6.082C9.48 6.55133 10 7.424 10 8.4V9.33333H14.0533C14.7607 9.33333 15.3333 9.906 15.3333 10.6133V9.33333ZM12.6667 3.33333C12.6667 4.806 11.4727 6 10 6C9.84533 6 9.69667 5.98667 9.552 5.952C10.0467 5.25933 10.2707 4.39867 10.082 3.522C9.91933 2.766 9.40067 2.128 8.66667 1.80267C8.98667 1.54133 9.38067 1.39067 9.80533 1.35333C11.3067 1.22133 12.6667 2.45067 12.6667 3.96V3.33333Z" fill="white"/>
                              </svg>
                            </div>
                            <span className="font-manrope font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white w-[10px] h-[22px] flex-none">
                              {sliderValue}
                            </span>
                          </div>
                          <style dangerouslySetInnerHTML={{__html: `
                            input[type=range]::-webkit-slider-thumb {
                              appearance: none;
                              width: 54px;
                              height: 30px;
                              background: transparent;
                              cursor: pointer;
                            }
                            input[type=range]::-moz-range-thumb {
                              width: 54px;
                              height: 30px;
                              background: transparent;
                              border: none;
                              cursor: pointer;
                            }
                          `}} />
                        </div>
                      </div>

                      {/* Earnings Result Block */}
                      <div className="flex flex-col items-start w-full sm:w-[390px] h-auto sm:h-[99px] gap-[8px] flex-none">
                        <div className="flex flex-col items-start w-full sm:w-[390px] h-[60px] gap-[12px] flex-1">
                          <div className="flex flex-row items-center justify-center p-[10px_16px] gap-[12px] w-full sm:w-[390px] h-[60px] bg-[#112F82] rounded-[8px] flex-none">
                            <div className="flex flex-row items-center justify-center gap-[8px] w-full sm:w-[358px] h-[33px] flex-1">
                              <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white w-auto sm:w-[164px] h-[19px] flex-none">
                                Your monthly earnings:
                              </span>
                              <span className="font-manrope text-[24px] font-bold leading-[33px] tracking-[0.02em] text-white w-auto sm:w-[61px] h-[33px] flex-none">
                                ${calculateEarnings(sliderValue)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-full sm:w-[390px] h-[28px] text-left flex-none">
                          * Calculations are based on average player activity and may vary in individual cases
                        </span>
                      </div>

                      {/* Invite Input Block */}
                      <div className="flex flex-col sm:flex-row items-start w-full sm:w-[390px] h-auto sm:h-[40px] gap-[8px] flex-none">
                        <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-full sm:w-[260px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
                          <input 
                            type="email" 
                            placeholder="Enter email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white placeholder-[#7795E8] w-[228px] h-[19px]"
                          />
                        </div>
                        <button className="flex flex-row justify-center items-center px-[10px] gap-[10px] w-full sm:w-[122px] h-[40px] bg-[#FFC83D] rounded-[8px] transition-opacity hover:opacity-90 flex-none">
                          <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap">
                            Send Invite
                          </span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center p-4 lg:p-[20px_24px] w-full h-auto lg:h-[104px] bg-[#091741] rounded-[16px] gap-[8px] mt-8 lg:mt-auto">
                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Referrals</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <img src="/images/icons/doller.svg" alt="Dollar Icon" className="w-[20px] h-[20px] shrink-0" />
                    <span className="font-manrope text-[16px] font-bold text-white">12</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Deposits</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <img src="/images/icons/doller.svg" alt="Dollar Icon" className="w-[20px] h-[20px] shrink-0" />
                    <span className="font-manrope text-[16px] font-bold text-white">$5000.00</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Total Earnings</span>
                  <div className="flex flex-row items-center p-[10px_16px] gap-[12px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <img src="/images/icons/doller.svg" alt="Dollar Icon" className="w-[20px] h-[20px] shrink-0" />
                    <span className="font-manrope text-[16px] font-bold text-white">$500.00</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-[8px] w-full">
                  <span className="font-manrope text-[12px] font-semibold text-[#BBCAF3]">Pending Income</span>
                  <div className="flex flex-row items-center justify-between p-[10px_16px] bg-[#112F82] rounded-[8px] h-[40px]">
                    <div className="flex flex-row items-center gap-[8px]">
                      <img src="/images/icons/doller.svg" alt="Dollar Icon" className="w-[20px] h-[20px] shrink-0" />
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
            <section className="flex flex-col lg:flex-row gap-[12px] w-full">
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] flex-1 bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">$2.5 K</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF] text-center">Claim By the Most Active Referrer</span>
              </div>
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] flex-1 bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">500+</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF] text-center">Players are already earning with us</span>
              </div>
              <div className="flex flex-col items-center justify-center p-[24px] gap-[8px] flex-1 bg-[#0C1F56] rounded-[16px]">
                <span className="font-jost text-[40px] font-extrabold text-white leading-[58px] tracking-[0.01em]">19,000</span>
                <span className="font-manrope text-[16px] font-semibold text-[#A5B8EF] text-center">Free Spins received by friends</span>
              </div>
            </section>

            {/* WHAT YOU GET & WHAT YOUR FRIEND GETS */}
            <section className="flex flex-col lg:flex-row gap-[12px] w-full">
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

            {/* HOW REFERRAL PROGRAM WORKS */}
            <section className="flex flex-col gap-[32px] w-full">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="w-[30px] h-[30px] relative flex-none">
                  <Image src="/images/referral/how-referral.svg" alt="How Referral Works" fill className="object-contain" />
                </div>
                <h3 className="font-jost text-[20px] font-extrabold text-white uppercase tracking-[0.01em]">HOW REFERRAL PROGRAM WORKS</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-[12px] w-full">
                <div className="relative flex-1 w-full rounded-[12px] overflow-hidden aspect-[370/220]">
                  <Image src="/games/refrels/r1.png" alt="Step 1" fill className="object-cover" />
                </div>
                <div className="relative flex-1 w-full rounded-[12px] overflow-hidden aspect-[370/220]">
                  <Image src="/games/refrels/r2.png" alt="Step 2" fill className="object-cover" />
                </div>
                <div className="relative flex-1 w-full rounded-[12px] overflow-hidden aspect-[370/220]">
                  <Image src="/games/refrels/r3.png" alt="Step 3" fill className="object-cover" />
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="flex flex-col gap-[20px] w-full mt-[20px]">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="w-[30px] h-[30px] relative flex-none">
                  <Image src="/images/referral/invite-friends.svg" alt="FAQs" fill className="object-contain" />
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
    </main>
  );
}
