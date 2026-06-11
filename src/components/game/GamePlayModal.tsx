"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal, setSelectedGame } from "@/store/slices/uiSlice";
import { Play, RotateCcw, Volume2, VolumeX, Shield, Info, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function GamePlayModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals.gamePlay);
  const selectedGame = useSelector((state: RootState) => state.ui.selectedGame);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [betAmount, setBetAmount] = useState(1.0);
  const [balance, setBalance] = useState(105.98);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [reels, setReels] = useState(["🍒", "🍋", "🍊"]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadingProgress(0);
      setWinAmount(null);
      
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 20;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen || !selectedGame) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal("gamePlay"));
      dispatch(setSelectedGame(null));
    }
  };

  const handleSpin = () => {
    if (balance < betAmount) {
      toast.error("Insufficient balance!");
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setWinAmount(null);
    setBalance((prev) => parseFloat((prev - betAmount).toFixed(2)));

    const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "⭐", "💎", "👑"];
    
    // Simulate spin rotation tick
    let ticks = 0;
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      ticks++;
      if (ticks > 10) {
        clearInterval(spinInterval);
        
        // Final result
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setReels(finalReels);
        setIsSpinning(false);

        // Calculate win logic
        const uniqueSymbols = new Set(finalReels).size;
        if (uniqueSymbols === 1) {
          // 3 of a kind
          const win = parseFloat((betAmount * 10).toFixed(2));
          setWinAmount(win);
          setBalance((prev) => parseFloat((prev + win).toFixed(2)));
          toast.success(`HUGE WIN! You won $${win}! 🎉`);
        } else if (uniqueSymbols === 2) {
          // 2 of a kind
          const win = parseFloat((betAmount * 1.5).toFixed(2));
          setWinAmount(win);
          setBalance((prev) => parseFloat((prev + win).toFixed(2)));
          toast.success(`Win! You won $${win}!`);
        } else {
          toast.info("No match. Try again!");
        }
      }
    }, 100);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-[960px] h-[600px] bg-[#091741] rounded-[24px] border border-white/10 shadow-2xl flex flex-col overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex flex-row justify-between items-center px-[24px] py-[16px] bg-[#0C1F56] border-b border-white/5">
          <div className="flex items-center gap-[12px]">
            <Shield size={20} className="text-[#FFC83D]" />
            <span className="font-jost font-black text-[18px] tracking-wider uppercase text-white">
              {selectedGame.title}
            </span>
            <div className="bg-[#112F82] px-[8px] py-[2px] rounded text-[10px] text-[#A5B8EF] font-bold">
              PROVABLY FAIR
            </div>
          </div>

          <div className="flex items-center gap-[16px]">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#A5B8EF] hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={() => {
                dispatch(closeModal("gamePlay"));
                dispatch(setSelectedGame(null));
              }}
              className="text-[#A5B8EF] hover:text-white transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Central Display */}
        <div className="flex-1 relative flex items-center justify-center bg-[#071131]">
          {/* Background Poster Image */}
          <img
            src={selectedGame.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-lg pointer-events-none"
          />

          {isLoading ? (
            /* Loading Screen */
            <div className="z-10 flex flex-col items-center gap-[24px] max-w-[320px] w-full text-center">
              <div className="relative w-[180px] h-[240px] rounded-[16px] overflow-hidden border border-white/10 shadow-lg">
                <img src={selectedGame.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <span className="font-jost font-extrabold text-[20px] text-white tracking-wider uppercase">
                  {selectedGame.title}
                </span>
                <span className="font-manrope text-[12px] text-[#A5B8EF] font-semibold">
                  Connecting to Game Server...
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-[6px] bg-[#112F82] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFC83D] transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            /* Slot Reels Container */
            <div className="z-10 flex flex-col items-center gap-[40px]">
              
              {/* Simulated Reels */}
              <div className="flex flex-row gap-[16px] p-[24px] bg-[#0C1F56]/80 rounded-[20px] border border-white/10 shadow-2xl backdrop-blur-md">
                {reels.map((symbol, idx) => (
                  <div
                    key={idx}
                    className={`w-[120px] h-[160px] bg-[#091741] rounded-[16px] flex items-center justify-center text-[64px] border border-white/5 shadow-inner transition-transform ${
                      isSpinning ? "animate-bounce" : ""
                    }`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>

              {/* Status Win indicator */}
              {winAmount !== null && (
                <div className="flex flex-col items-center gap-[4px] animate-bounce">
                  <span className="font-jost font-extrabold text-[28px] text-[#FFC83D] drop-shadow-[0_0_8px_rgba(255,200,61,0.5)]">
                    WIN ${winAmount}!
                  </span>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Dashboard Actions Bar */}
        <div className="px-[24px] py-[20px] bg-[#0C1F56] border-t border-white/5 flex flex-row items-center justify-between gap-[20px] h-[100px] flex-none">
          {/* Bet size selector */}
          <div className="flex flex-row items-center gap-[12px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-manrope text-[10px] font-bold tracking-wider text-[#A5B8EF] uppercase">
                Bet size
              </span>
              <div className="flex flex-row items-center bg-[#091741] rounded-[10px] p-[4px] border border-white/5">
                <button
                  disabled={isSpinning || isLoading}
                  onClick={() => setBetAmount((prev) => Math.max(0.1, parseFloat((prev - 0.1).toFixed(2))))}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#112F82] text-white hover:bg-[#112F82]/80 font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  -
                </button>
                <span className="w-[80px] text-center font-manrope text-[14px] font-extrabold text-white">
                  ${betAmount.toFixed(2)}
                </span>
                <button
                  disabled={isSpinning || isLoading}
                  onClick={() => setBetAmount((prev) => parseFloat((prev + 0.1).toFixed(2)))}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#112F82] text-white hover:bg-[#112F82]/80 font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            {/* Quick buttons */}
            <div className="flex flex-row items-end h-[40px] gap-[6px]">
              <button
                disabled={isSpinning || isLoading}
                onClick={() => setBetAmount(1.0)}
                className="px-[10px] py-[6px] rounded-[6px] bg-[#112F82] hover:bg-blue-600/20 text-[#A5B8EF] hover:text-white font-manrope text-[11px] font-bold transition-all cursor-pointer"
              >
                MIN
              </button>
              <button
                disabled={isSpinning || isLoading}
                onClick={() => setBetAmount(10.0)}
                className="px-[10px] py-[6px] rounded-[6px] bg-[#112F82] hover:bg-blue-600/20 text-[#A5B8EF] hover:text-white font-manrope text-[11px] font-bold transition-all cursor-pointer"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Central spin action button */}
          <button
            disabled={isSpinning || isLoading}
            onClick={handleSpin}
            className="flex flex-row items-center justify-center gap-[10px] w-[200px] h-[52px] bg-[#FFC83D] hover:bg-yellow-400 disabled:bg-yellow-400/50 rounded-[12px] text-[#0C1F56] font-jost font-black text-[16px] tracking-wider uppercase transition-all shadow-[0_4px_14px_rgba(255,200,61,0.3)] hover:shadow-[0_6px_20px_rgba(255,200,61,0.4)] disabled:shadow-none cursor-pointer transform active:scale-95"
          >
            {isSpinning ? (
              <>
                <RotateCcw className="animate-spin" size={18} />
                <span>Spinning...</span>
              </>
            ) : (
              <>
                <Play fill="#0C1F56" size={18} />
                <span>Spin Reels</span>
              </>
            )}
          </button>

          {/* Real-time player balance */}
          <div className="flex flex-row items-center gap-[16px]">
            <div className="flex flex-col items-end gap-[4px]">
              <span className="font-manrope text-[10px] font-bold tracking-wider text-[#A5B8EF] uppercase">
                Your Balance
              </span>
              <div className="h-[40px] bg-[#091741] px-[20px] rounded-[10px] flex items-center justify-center border border-white/5">
                <span className="font-manrope text-[15px] font-black text-white">
                  ${balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
