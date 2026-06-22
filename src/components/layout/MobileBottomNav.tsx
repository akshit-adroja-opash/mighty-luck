import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openModal, closeModal, setActiveCategory } from "@/store/slices/uiSlice";

interface MobileBottomNavProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function MobileBottomNav({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileBottomNavProps) {
  const dispatch = useDispatch();
  const isLobbyOpen = useSelector((state: RootState) => state.ui.modals?.lobby);
  const isWalletOpen = useSelector((state: RootState) => state.ui.modals?.wallet);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[110] lg:hidden flex flex-row justify-between items-center px-5 py-[10px] h-[64px] bg-[#0C1F56] ${(!isLobbyOpen && !isMobileMenuOpen && !isWalletOpen) ? 'rounded-t-[16px]' : ''}`}>
      <button onClick={() => { if (isLobbyOpen) dispatch(closeModal("lobby")); setIsMobileMenuOpen(!isMobileMenuOpen); }} className="flex flex-col justify-center items-center gap-[2px] w-[39px] h-[44px] transition-colors hover:opacity-80">
        <div className="flex justify-center items-center w-[24px] h-[24px]">
          <div 
            className={`flex-none transition-colors hover:opacity-80 ${isMobileMenuOpen ? "bg-[#FFBF1F]" : "bg-[#D2DCF7]"}`}
            style={{
              width: "16px", height: "10.67px",
              maskImage: `url(/images/Vector.png)`,
              WebkitMaskImage: `url(/images/Vector.png)`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>
        <span className={`font-manrope font-bold text-[11px] leading-[15px] tracking-[0.02em] ${isMobileMenuOpen ? "text-[#FFBF1F]" : "text-[#D2DCF7]"}`}>Menu</span>
      </button>

      <button 
        onClick={() => {
          if (isLobbyOpen) {
            dispatch(closeModal("lobby"));
          } else {
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            dispatch(setActiveCategory("Lobby"));
            dispatch(openModal("lobby"));
          }
        }}
        className="flex flex-col justify-center items-center gap-[2px] w-[50px] h-[44px] transition-colors hover:opacity-80"
      >
        <div className="flex justify-center items-center w-[24px] h-[24px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isLobbyOpen ? "#FFBF1F" : "#D2DCF7"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="11" cy="11" r="8"></circle>
             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <span className={`font-manrope font-bold text-[11px] leading-[15px] tracking-[0.02em] ${isLobbyOpen ? "text-[#FFBF1F]" : "text-[#D2DCF7]"}`}>Search</span>
      </button>

      <button onClick={() => { if (isLobbyOpen) dispatch(closeModal("lobby")); if (isMobileMenuOpen) setIsMobileMenuOpen(false); }} className="flex flex-col justify-center items-center gap-[2px] w-[43px] h-[44px] transition-colors hover:opacity-80">
        <div className="flex justify-center items-center w-[24px] h-[24px]">
           <div 
            className="w-[18px] h-[18px] bg-[#D2DCF7] flex-none"
            style={{
              maskImage: `url(/games/side-icon/pro.svg)`,
              WebkitMaskImage: `url(/games/side-icon/pro.svg)`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>
        <span className="font-manrope font-bold text-[11px] leading-[15px] tracking-[0.02em] text-[#D2DCF7]">Offers</span>
      </button>

      <button onClick={() => { if (isLobbyOpen) dispatch(closeModal("lobby")); if (isMobileMenuOpen) setIsMobileMenuOpen(false); }} className="flex flex-col justify-center items-center gap-[2px] w-[30px] h-[44px] transition-colors hover:opacity-80">
        <div className="flex justify-center items-center w-[24px] h-[24px]">
          <div 
            className="w-[18px] h-[17px] bg-[#D2DCF7] flex-none"
            style={{
              maskImage: `url(/games/side-icon/vip.svg)`,
              WebkitMaskImage: `url(/games/side-icon/vip.svg)`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>
        <span className="font-manrope font-bold text-[11px] leading-[15px] tracking-[0.02em] text-[#D2DCF7]">VIP</span>
      </button>

      <button onClick={() => { if (isLobbyOpen) dispatch(closeModal("lobby")); if (isMobileMenuOpen) setIsMobileMenuOpen(false); }} className="flex flex-col justify-center items-center gap-[2px] w-[65px] h-[44px] transition-colors hover:opacity-80">
        <div className="flex justify-center items-center w-[24px] h-[24px]">
          <div 
            className="w-[18px] h-[18px] bg-[#D2DCF7] flex-none"
            style={{
              maskImage: `url(/games/side-icon/tour.svg)`,
              WebkitMaskImage: `url(/games/side-icon/tour.svg)`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>
        <span className="font-manrope font-bold text-[11px] leading-[15px] tracking-[0.02em] text-[#D2DCF7]">Tourneys</span>
      </button>
    </div>
  );
}
