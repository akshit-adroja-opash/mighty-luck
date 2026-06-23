"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, QrCode, ArrowLeft, Bell, Gift, Wallet as WalletIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/uiSlice";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";

// Custom SVG Icons for pixel-perfect match

const GiftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
    <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#FFC83D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VisaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
    <path d="M19.5 7.5L21 16.5H23.5L22 7.5H19.5Z" fill="#A5B8EF"/>
    <path d="M12.5 7.5L10.5 13.5L9.5 8.5L8.5 7.5H5L4.8 8L7 16.5H9.5L13.5 7.5H12.5Z" fill="#A5B8EF"/>
    <path d="M15.5 7.5H13L11.5 16.5H14L14.5 13.5H17.5C18.5 13.5 19.5 12.5 19.5 11.5V9.5C19.5 8.5 18.5 7.5 17.5 7.5H15.5ZM14.8 11.5L15.2 9.5H16.8V11.5H14.8Z" fill="#A5B8EF"/>
  </svg>
);

const MastercardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
    <circle cx="8" cy="12" r="6" fill="#A5B8EF" fillOpacity="0.8"/>
    <circle cx="16" cy="12" r="6" fill="#A5B8EF" fillOpacity="0.8"/>
  </svg>
);

const ArrowIcon = ({ color }: { color: string }) => (
  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
    <path d="M1 1L3.5 3L6 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
    <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="#7795E8" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 8V6" stroke="#091741" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 4.2H6.005" stroke="#091741" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const countryList = [
  { name: "United States", iso: "us" },
  { name: "Canada", iso: "ca" },
  { name: "United Kingdom", iso: "gb" },
  { name: "Ukraine", iso: "ua" },
  { name: "India", iso: "in" },
  { name: "Australia", iso: "au" },
  { name: "Germany", iso: "de" },
  { name: "France", iso: "fr" },
  { name: "Brazil", iso: "br" },
  { name: "Japan", iso: "jp" },
  { name: "South Korea", iso: "kr" },
  { name: "Spain", iso: "es" },
  { name: "Italy", iso: "it" },
];

export default function WalletModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals["wallet"]);
  const { user } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<"deposit" | "bonuses" | "withdraw" | "transactions">("deposit");
  const [usdAmount, setUsdAmount] = useState<string>("100");
  const [btcAmount, setBtcAmount] = useState<string>("0.00954");
  
  // Payment Method state
  const [paymentMethod, setPaymentMethod] = useState<"btc" | "cc">("cc");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  // Bonus Selection state
  const [selectedBonus, setSelectedBonus] = useState("150% Reload Bonus + 30 Free Spins");
  const [showBonusDropdown, setShowBonusDropdown] = useState(false);

  // CC wizard step: 'address' or 'payment'
  const [ccStep, setCcStep] = useState<"address" | "payment">("address");
  const [isBtcSubmitted, setIsBtcSubmitted] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (isBtcSubmitted) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            return 3;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isBtcSubmitted]);

  // Address Form states
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Credit Card Payment details states
  const [selectedAmountOption, setSelectedAmountOption] = useState<"20" | "30" | "100" | "custom">("30");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  // Mouse Drag to Scroll for bonuses
  const [bonusSlideIndex, setBonusSlideIndex] = useState(0);
  const bonusSliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingBonus, setIsDraggingBonus] = useState(false);
  const [bonusStartX, setBonusStartX] = useState(0);
  const [bonusScrollLeft, setBonusScrollLeft] = useState(0);

  const onBonusMouseDown = (e: React.MouseEvent) => {
    setIsDraggingBonus(true);
    if (!bonusSliderRef.current) return;
    setBonusStartX(e.pageX - bonusSliderRef.current.offsetLeft);
    setBonusScrollLeft(bonusSliderRef.current.scrollLeft);
  };

  const onBonusMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingBonus || !bonusSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - bonusSliderRef.current.offsetLeft;
    const walk = (x - bonusStartX) * 2; // scroll fast
    bonusSliderRef.current.scrollLeft = bonusScrollLeft - walk;
  };

  const onBonusMouseUpOrLeave = () => {
    setIsDraggingBonus(false);
  };

  // Mobile drag-to-close modal state
  const [modalDragY, setModalDragY] = useState(0);
  const [isDraggingModal, setIsDraggingModal] = useState(false);
  const [modalStartY, setModalStartY] = useState(0);

  const handleModalTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth >= 640) return;
    setIsDraggingModal(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setModalStartY(clientY);
  };

  const handleModalTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingModal) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const deltaY = clientY - modalStartY;
    if (deltaY > 0) {
      setModalDragY(deltaY);
    }
  };

  const closeModalSmoothly = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setModalDragY(window.innerHeight || 1000);
      setTimeout(() => {
        setIsBtcSubmitted(false);
        dispatch(closeModal("wallet"));
        setModalDragY(0);
      }, 300);
    } else {
      setIsBtcSubmitted(false);
      dispatch(closeModal("wallet"));
    }
  };

  const handleModalTouchEnd = () => {
    if (!isDraggingModal) return;
    setIsDraggingModal(false);
    if (modalDragY > 50) {
      // Threshold passed, close modal smoothly
      closeModalSmoothly();
    } else {
      // Snap back
      setModalDragY(0);
    }
  };

  const currentIndexRef = useRef(bonusSlideIndex);
  useEffect(() => {
    currentIndexRef.current = bonusSlideIndex;
  }, [bonusSlideIndex]);

  useEffect(() => {
    const slider = bonusSliderRef.current;
    if (!slider) return;

    let isWheelScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0 && Math.abs(e.deltaX) === 0) {
        e.preventDefault();
        
        if (isWheelScrolling) return;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextIndex = Math.max(0, currentIndexRef.current + direction);
        
        const card = slider.children[0]?.children[0] as HTMLElement;
        const cardWidth = card ? card.offsetWidth + 8 : 308;
        
        isWheelScrolling = true;
        slider.scrollTo({ left: nextIndex * cardWidth, behavior: 'smooth' });
        
        setTimeout(() => {
          isWheelScrolling = false;
        }, 600);
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [activeTab]);

  const onBonusScroll = () => {
    if (!bonusSliderRef.current) return;
    const slider = bonusSliderRef.current;
    const scrollLeft = slider.scrollLeft;
    const card = slider.children[0]?.children[0] as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 8 : 308;
    const index = Math.round(scrollLeft / cardWidth);
    setBonusSlideIndex(index);
  };

  const scrollToBonusIndex = (idx: number) => {
    if (!bonusSliderRef.current) return;
    const slider = bonusSliderRef.current;
    const card = slider.children[0]?.children[0] as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 8 : 308;
    slider.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
  };

  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Conversion rate: 1 USD = 0.0000954 BTC
  const CONVERSION_RATE = 0.0000954;

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      setBtcAmount((parsed * CONVERSION_RATE).toFixed(5));
    } else {
      setBtcAmount("");
    }
  };

  const handleBtcChange = (val: string) => {
    setBtcAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      setUsdAmount((parsed / CONVERSION_RATE).toFixed(2));
    } else {
      setUsdAmount("");
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("bc1q7ndh47hf93rdhuhef873hheufhe447...");
    toast.success("Deposit address copied to clipboard!");
  };

  const handleActionClick = () => {
    if (isBtcSubmitted) {
      // Complete state: go back or close
      setIsBtcSubmitted(false);
      dispatch(closeModal("wallet"));
      return;
    }

    if (paymentMethod === "cc") {
      if (ccStep === "address") {
        // Validation for Step 1 Address
        if (!street || !city || !postalCode || !stateName) {
          toast.error("Please fill in all address details before continuing.");
          return;
        }
        setCcStep("payment");
      } else {
        // Validation for Step 2 Payment
        const currentAmount = selectedAmountOption === "custom" ? customAmount : selectedAmountOption;
        if (!currentAmount || isNaN(parseFloat(currentAmount))) {
          toast.error("Please enter or select a valid amount.");
          return;
        }
        if (!cardNumber || !cardExpiry || !cardCVC) {
          toast.error("Please enter your complete payment details.");
          return;
        }
        toast.success(`Deposit of $${currentAmount} submitted! Processing transaction securely...`);
        // Reset state after success
        setCcStep("address");
        setStreet("");
        setCity("");
        setPostalCode("");
        setStateName("");
        setCardNumber("");
        setCardExpiry("");
        setCardCVC("");
        dispatch(closeModal("wallet"));
      }
    } else {
      // BTC deposit
      setLoadingStep(0);
      setIsBtcSubmitted(true);
      toast.success("Deposit transaction submitted! Awaiting block confirmation.");
    }
  };

  if (!isOpen) return null;

  // Dynamic sizing based on active tab, payment method, CC step, and BTC submitted state
  const isFixedSizeTab = activeTab === "bonuses" || activeTab === "withdraw" || activeTab === "transactions";
  const showSubmittedState = isBtcSubmitted && activeTab === "deposit";

  const modalHeight = showSubmittedState 
    ? "532px" 
    : (isFixedSizeTab
        ? "518px"
        : (paymentMethod === "btc" ? "604px" : (ccStep === "address" ? "633px" : "647px")));
    
  const innerHeight = showSubmittedState 
    ? "386px" 
    : (isFixedSizeTab
        ? "462px"
        : (paymentMethod === "btc" ? "474px" : (ccStep === "address" ? "503px" : "517px")));
    
  const tabViewHeight = showSubmittedState 
    ? "287px" 
    : (isFixedSizeTab
        ? "363px"
        : (paymentMethod === "btc" ? "376px" : (ccStep === "address" ? "404px" : "418px")));

  const tabsContentHeight = showSubmittedState 
    ? "333px" 
    : (isFixedSizeTab
        ? "409px"
        : (paymentMethod === "btc" ? "428px" : (ccStep === "address" ? "450px" : "464px")));

  const activeAmount = selectedAmountOption === "custom" ? customAmount : selectedAmountOption;
  const bottomButtonLabel = isBtcSubmitted 
    ? "Go to games" 
    : (paymentMethod === "btc" 
        ? "I've completed my deposit" 
        : (ccStep === "address" 
            ? "Continue" 
            : (activeAmount ? `Deposit $${activeAmount}` : "I've completed my deposit")));

  const availableBonuses = [
    {
      title: "150% Reload Bonus + 30 Free Spins",
      minDeposit: "$30",
      maxCashout: "40x",
      maxAmount: "$30",
      wager: "10x",
    },
    {
      title: "200% Welcome Package + 50 Free Spins",
      minDeposit: "$50",
      maxCashout: "35x",
      maxAmount: "$100",
      wager: "15x",
    },
    {
      title: "50% Weekend Cashback up to $200",
      minDeposit: "$20",
      maxCashout: "Unlimited",
      maxAmount: "$200",
      wager: "5x",
    },
  ];

  return (
    <div className="fixed top-[50px] sm:top-0 inset-x-0 bottom-0 z-[130] flex flex-col items-center justify-start sm:justify-center bg-[#0C1F56] sm:bg-[#0C1733]/70 sm:backdrop-blur-[8px] sm:p-4 overflow-y-auto">
      
      {/* Outer absolute position alignment box (dynamic height to avoid jumps) */}
      <div 
        className={`relative transition-all duration-300 w-full sm:w-[500px] overflow-y-auto sm:overflow-visible rounded-none sm:rounded-[16px] flex flex-col mt-auto sm:mt-0 pb-0 sm:pb-0 h-auto sm:h-[var(--modal-height)]`}
        style={{ 
          '--modal-height': modalHeight,
          transform: `translateY(${modalDragY}px)`,
          transition: isDraggingModal ? 'none' : 'transform 0.3s ease-out'
        } as React.CSSProperties}
      >
        
        {/* Close Button - positioned outside the card on the right */}
        <button
          onClick={closeModalSmoothly}
          className="absolute right-4 sm:-right-[36px] top-4 sm:top-0 z-50 hidden sm:flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#112F82] sm:bg-transparent text-white hover:text-[#FFC83D] transition-colors cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Outer Modal Container */}
        <div 
          className={`relative flex flex-col items-center bg-[#091741] rounded-[30px_30px_0px_0px] sm:rounded-[16px] w-full shadow-none sm:shadow-2xl isolation-isolate transition-all duration-300 pt-[16px] px-[20px] ${activeTab === 'deposit' ? 'pb-0' : 'pb-[40px]'} sm:p-[24px_20px_32px] gap-[16px] sm:gap-[24px]`}
        >
          
          {/* Accent Glow Container (clips the glow to the card boundaries) */}
          <div className="absolute inset-0 rounded-[30px_30px_0px_0px] sm:rounded-[16px] overflow-hidden pointer-events-none z-0">
            <div 
              className="absolute rounded-full bg-[#1463FF] blur-[40px] opacity-100 w-[174px] sm:w-[173px] h-[176px] sm:h-[173px] left-[calc(50%-174px/2-165px)] sm:left-[calc(50%-173px/2+0.5px)] top-[-125px] sm:top-[-145px]"
            />
          </div>

          {/* Mobile Drag-to-Close Hit Area */}
          <div 
            className="absolute top-0 inset-x-0 h-[48px] z-50 sm:hidden cursor-pointer"
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
            onTouchEnd={handleModalTouchEnd}
            onMouseDown={handleModalTouchStart}
            onMouseMove={handleModalTouchMove}
            onMouseUp={handleModalTouchEnd}
            onMouseLeave={handleModalTouchEnd}
            onClick={() => {
              if (modalDragY < 10) {
                closeModalSmoothly();
              }
            }}
          />

          {/* Bottom Sheet Handle (Mobile Only) */}
          <div className="w-[70px] h-[6px] bg-[#112F82] rounded-[100px] flex-none z-10 block sm:hidden pointer-events-none" />

          {/* Inner Content Box */}
          <div 
            className={`relative z-20 flex flex-col items-start w-full sm:w-[460px] gap-[24px] transition-all duration-300 h-auto sm:h-[var(--inner-height)]`}
            style={{ '--inner-height': innerHeight } as React.CSSProperties}
          >
            
            {/* Header Title Block */}
            <div className="flex flex-row justify-start sm:justify-center items-center w-[374px] sm:w-[460px] h-[29px] gap-[12px] relative">
              {/* Back Button for CC Payment step */}
              {paymentMethod === "cc" && ccStep === "payment" && (
                <button
                  onClick={() => setCcStep("address")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#A5B8EF] hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              )}

              {/* Icon & Label Box */}
              <div className="flex flex-row items-center w-[94px] h-[29px] gap-[12px]">
                <div className="w-[20px] h-[20px] flex items-center justify-center relative flex-none">
                  <div 
                    className="absolute w-[20px] h-[17.96px] bg-[#FFC83D]"
                    style={{
                      left: 'calc(50% - 20px/2)',
                      top: 'calc(50% - 17.96px/2 + 0.23px)',
                      maskImage: `url(/games/wallet.svg)`,
                      WebkitMaskImage: `url(/games/wallet.svg)`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center'
                    }}
                  />
                </div>
                <span className="font-jost font-extrabold text-[20px] leading-[29px] text-white tracking-[0.01em] w-[62px] h-[29px] flex items-center">
                  Wallet
                </span>
              </div>
            </div>

            {/* Tab container / Form content area */}
            <div 
              className={`flex flex-col items-start w-full sm:w-[460px] gap-[16px] transition-all duration-300 h-auto sm:h-[var(--tabs-content-height)]`}
              style={{ '--tabs-content-height': tabsContentHeight } as React.CSSProperties}
            >
              
              {/* Tabs Switcher */}
              <div className="flex flex-row items-center w-full sm:w-[460px] h-[30px] gap-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {(["deposit", "bonuses", "withdraw", "transactions"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center justify-center flex-1 sm:flex-none rounded-[6px] h-[30px] sm:w-[109px] px-[2px] sm:px-[16px] transition-all cursor-pointer ${
                        isActive 
                          ? "bg-[#1463FF]" 
                          : "bg-[#112F82]"
                      }`}
                    >
                      <span className={`font-manrope text-[12px] leading-[16px] tracking-[0.02em] text-center flex items-center justify-center ${
                        isActive 
                          ? "text-white font-bold" 
                          : "text-[#A5B8EF] font-semibold"
                      }`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tab View Container */}
              <div 
                className={`flex flex-col items-start gap-[16px] w-full sm:w-[460px] bg-[#0C1F56] rounded-[16px] overflow-visible transition-all duration-300 h-auto sm:h-[var(--tab-view-height)] ${
                  showSubmittedState ? "p-[20px_16px]" : "p-[16px]"
                }`}
                style={{ '--tab-view-height': tabViewHeight } as React.CSSProperties}
              >
                {activeTab === "deposit" ? (
                  isBtcSubmitted ? (
                    /* Bitcoin Blockchain Pending Confirmation View */
                    <div className="flex flex-col gap-[16px] w-full sm:w-[428px] flex-none">
                      {/* Top Info Text */}
                      <div className="flex flex-row items-center justify-center gap-[8px] w-full sm:w-[428px] h-[38px]">
                        <span className="font-manrope text-[14px] font-semibold leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[428px] h-[38px] flex items-center justify-center">
                          Your transaction in progress and pending confirmation from the blockchain.
                        </span>
                      </div>

                      {/* Confirmation Progress Ring */}
                      <div className="flex flex-row justify-center items-center gap-[10px] w-full sm:w-[428px] h-[120px] flex-none">
                        <div className="relative w-[120px] h-[120px] flex-none flex items-center justify-center">
                          {/* Background Ring */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                            <style>{`
                              @keyframes fillRingSmooth {
                                0% { stroke-dashoffset: 351.86; }
                                100% { stroke-dashoffset: 0; }
                              }
                            `}</style>
                            <circle
                              cx="60"
                              cy="60"
                              r="56"
                              fill="none"
                              stroke="#112F82"
                              strokeWidth="4"
                            />
                            {/* Animated Yellow Ring */}
                            <circle
                              cx="60"
                              cy="60"
                              r="56"
                              fill="none"
                              stroke="#FFC83D"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeDasharray="351.86"
                              style={{ animation: 'fillRingSmooth 1.5s linear forwards' }}
                            />
                          </svg>
                          
                          {/* Logo */}
                          <div className="relative w-[54px] h-[40px] flex items-center justify-center">
                            <img src="/images/layout/logo.svg" alt="Mighty Luck" className="w-full h-full object-contain" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Info Text with custom yellow click here */}
                      <div className="flex flex-row items-center justify-center gap-[8px] w-full sm:w-[428px] h-[95px] sm:h-[57px]">
                        <span className="font-manrope text-[14px] font-semibold leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[428px] h-[95px] sm:h-[57px] flex flex-col items-center justify-center">
                          <span className="w-full text-center">1 confirmation is required for deposits to be credited.</span>
                          <span className="w-full text-center">
                            Want to know how many confirmations this transaction has? Please{" "}
                            <span className="text-[#FFC83D] font-bold cursor-pointer hover:underline inline ml-1" onClick={() => toast.info("Checking transaction confirmations on blockchain explorer...")}>
                              click here
                            </span>
                            .
                          </span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                    {/* Step 1: Select a Bonus */}
                    <div className="relative flex flex-col gap-[8px] w-full sm:w-[428px] h-auto sm:h-[64px] flex-none">
                      <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-auto h-[16px]">
                        Select a Bonus
                      </span>
                      <div 
                        onClick={() => {
                          setShowBonusDropdown(!showBonusDropdown);
                          setShowPaymentDropdown(false);
                        }}
                        className={`flex items-center justify-between bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px] cursor-pointer hover:bg-[#153bb0] transition-colors border ${
                          showBonusDropdown ? "border-[#1463FF]" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-[8px] flex-1 min-w-0 sm:w-[370px] h-[19px]">
                          <div className="w-[16px] h-[16px] relative flex-none">
                            <div 
                              className="w-[16px] h-[16px] absolute left-0 top-0 bg-[#FFC83D]"
                              style={{
                                maskImage: `url(${[
                                  { name: "150% Reload Bonus + 30 Free Spins", icon: "/games/deposite-cashback/150.svg" },
                                  { name: "350% Welcome Bonus", icon: "/games/deposite-cashback/350.svg" },
                                  { name: "500% Crypto Bonus", icon: "/games/deposite-cashback/500.svg" },
                                  { name: "I will deposit without bonus", icon: "/games/deposite-cashback/i.svg" }
                                ].find(b => b.name === selectedBonus)?.icon || "/games/deposite-cashback/150.svg"})`,
                                WebkitMaskImage: `url(${[
                                  { name: "150% Reload Bonus + 30 Free Spins", icon: "/games/deposite-cashback/150.svg" },
                                  { name: "350% Welcome Bonus", icon: "/games/deposite-cashback/350.svg" },
                                  { name: "500% Crypto Bonus", icon: "/games/deposite-cashback/500.svg" },
                                  { name: "I will deposit without bonus", icon: "/games/deposite-cashback/i.svg" }
                                ].find(b => b.name === selectedBonus)?.icon || "/games/deposite-cashback/150.svg"})`,
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskPosition: 'center'
                              }}
                            />
                          </div>
                          <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white truncate flex-1 min-w-0 h-[19px]">
                            {selectedBonus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between w-[14px] h-[14px] flex-none">
                          <ArrowIcon color="#A5B8EF" />
                        </div>
                      </div>

                      {/* Bonus Dropdown Options */}
                      {showBonusDropdown && (
                        <div 
                          className="absolute left-0 top-[80px] z-50 flex w-full sm:w-[428px] flex-col rounded-[8px] border border-[#1463FF] bg-[#112F82] overflow-hidden shadow-2xl"
                          style={{ height: "244px" }}
                        >
                          {/* Header */}
                          <div className="flex flex-row items-center h-[40px] px-[16px] py-[10px] bg-[#112F82] flex-none">
                            <span className="font-manrope text-[12px] font-bold leading-[16px] tracking-[0.02em] text-white">
                              Choose one bonus on next deposits
                            </span>
                          </div>

                          {/* Options List */}
                          <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
                            {[
                              {
                                name: "150% Reload Bonus + 30 Free Spins",
                                subtext: "(Min. Deposit $10)",
                                hasSub: true,
                                icon: "/games/deposite-cashback/150.svg"
                              },
                              {
                                name: "350% Welcome Bonus",
                                subtext: "45x PT - Min. Dep. $20",
                                hasSub: true,
                                icon: "/games/deposite-cashback/350.svg"
                              },
                              {
                                name: "500% Crypto Bonus",
                                subtext: "45x PT - Min. Dep. $20",
                                hasSub: true,
                                icon: "/games/deposite-cashback/500.svg"
                              },
                              {
                                name: "I will deposit without bonus",
                                subtext: "",
                                hasSub: false,
                                icon: "/games/deposite-cashback/i.svg"
                              }
                            ].map((option, idx, arr) => {
                              const isActive = selectedBonus === option.name;
                              const isLast = idx === arr.length - 1;
                              return (
                                <button
                                  key={option.name}
                                  type="button"
                                  onClick={() => {
                                    setSelectedBonus(option.name);
                                    setShowBonusDropdown(false);
                                  }}
                                  className={`flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full text-left cursor-pointer transition-all flex-none ${
                                    isActive 
                                      ? "bg-[#1463FF]" 
                                      : "bg-[#112F82] hover:bg-[#173EAD]"
                                  } ${option.hasSub ? "h-[55px]" : "h-[39px]"} ${
                                    isLast ? "rounded-b-[8px]" : ""
                                  }`}
                                >
                                  {/* Radio icon */}
                                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                                    <div 
                                      className={`w-[16px] h-[16px] ${isActive ? 'bg-[#FFC83D]' : 'bg-[#A5B8EF]'}`}
                                      style={{
                                        maskImage: `url(${option.icon})`,
                                        WebkitMaskImage: `url(${option.icon})`,
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center'
                                      }}
                                    />
                                  </div>

                                  {/* Text container */}
                                  <div className="flex flex-col justify-center items-start gap-[2px]">
                                    <span className={`font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] ${
                                      isActive ? "text-white" : "text-[#A5B8EF]"
                                    }`}>
                                      {option.name}
                                    </span>
                                    {option.hasSub && (
                                      <span className={`font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] ${
                                        isActive ? "text-white" : "text-[#A5B8EF]"
                                      }`}>
                                        {option.subtext}
                                      </span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 2: Select Payment Method */}
                    <div className="relative flex flex-col gap-[8px] w-full sm:w-[428px] h-auto sm:h-[64px] flex-none">
                      <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-auto h-[16px]">
                        Select a payment method
                      </span>
                      
                      {/* Trigger */}
                      <div 
                        onClick={() => {
                          setShowPaymentDropdown(!showPaymentDropdown);
                          setShowBonusDropdown(false);
                        }}
                        className={`flex items-center justify-between bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px] cursor-pointer hover:bg-[#153bb0] transition-colors border ${
                          showPaymentDropdown ? "border-[#1463FF]" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-[8px] flex-1 min-w-0 sm:w-[370px] h-[20px]">
                          {paymentMethod === "btc" ? (
                            <>
                              <div className="w-[16px] h-[16px] relative flex-none">
                                <div 
                                  className="w-[16px] h-[16px] absolute left-0 top-0 bg-[#FFC83D]"
                                  style={{ maskImage: 'url(/images/icons/bitcoin.svg)', WebkitMaskImage: 'url(/images/icons/bitcoin.svg)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
                                />
                              </div>
                              <div className="flex items-center gap-[8px] flex-1 min-w-0 sm:w-[346px] h-[19px]">
                                <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white w-auto whitespace-nowrap flex-none">
                                  Bitcoin
                                </span>
                                <span className="font-manrope text-[11px] sm:text-[12px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-auto whitespace-nowrap flex-none truncate">
                                  (Min. $10)
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start items-start gap-[2px] sm:gap-[8px] flex-1 min-w-0 sm:w-[338px] h-[36px] sm:h-[20px]">
                                <div className="flex flex-row items-center gap-[8px] w-auto h-[20px] flex-none">
                                  <div className="flex items-center gap-[2px] w-[42px] h-[20px] flex-none">
                                    <div 
                                      className="w-[42px] h-[20px] bg-[#FFC83D]"
                                      style={{ maskImage: 'url(/images/icons/visa.svg)', WebkitMaskImage: 'url(/images/icons/visa.svg)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
                                    />
                                  </div>
                                  <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white w-auto whitespace-nowrap flex-none">
                                    Credit Card
                                  </span>
                                </div>
                                <span className="font-manrope text-[11px] sm:text-[12px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] flex-1 min-w-0 truncate sm:ml-1">
                                  (Min. $30 - Max. $2,500)
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center justify-between w-[14px] h-[14px] flex-none">
                          <ArrowIcon color="#A5B8EF" />
                        </div>
                      </div>

                      {/* Dropdown Options */}
                      {showPaymentDropdown && (
                        <div className="absolute left-0 top-[68px] z-50 flex w-full flex-col rounded-[8px] bg-[#112F82] border border-[#173EAD] overflow-hidden shadow-2xl">
                          <button
                            onClick={() => {
                              setPaymentMethod("cc");
                              setCcStep("address");
                              setShowPaymentDropdown(false);
                            }}
                            className="flex items-center gap-[8px] px-[16px] py-[10px] hover:bg-[#173EAD] transition-colors text-left w-full cursor-pointer text-white font-manrope text-[14px]"
                          >
                            <div className="flex items-center gap-[2px] w-[42px] h-[20px] flex-none">
                              <div 
                                className={`w-[42px] h-[20px] ${paymentMethod === 'cc' ? 'bg-[#FFC83D]' : 'bg-[#A5B8EF]'}`}
                                style={{ maskImage: 'url(/images/icons/visa.svg)', WebkitMaskImage: 'url(/images/icons/visa.svg)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
                              />
                            </div>
                            <span className="whitespace-nowrap">Credit Card</span>
                          </button>
                          <button
                            onClick={() => {
                              setPaymentMethod("btc");
                              setShowPaymentDropdown(false);
                            }}
                            className="flex items-center gap-[8px] px-[16px] py-[10px] hover:bg-[#173EAD] transition-colors text-left w-full cursor-pointer text-white font-manrope text-[14px]"
                          >
                            <div className="w-[16px] h-[16px] relative flex-none">
                              <div 
                                className={`w-[16px] h-[16px] absolute left-0 top-0 ${paymentMethod === 'btc' ? 'bg-[#FFC83D]' : 'bg-[#A5B8EF]'}`}
                                style={{ maskImage: 'url(/images/icons/bitcoin.svg)', WebkitMaskImage: 'url(/images/icons/bitcoin.svg)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
                              />
                            </div>
                            <span className="whitespace-nowrap">Bitcoin (BTC)</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Conditional Form Body based on payment method */}
                    {paymentMethod === "cc" ? (
                      ccStep === "address" ? (
                        /* CC Step 1: Address Form */
                        <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[212px] flex-none">
                          <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-full h-auto">
                            Enter your address
                          </span>

                          {/* Warning Info */}
                          <div className="flex flex-row items-start gap-[8px] w-full sm:w-[428px] h-auto sm:h-[28px] p-0 flex-none">
                            <div className="w-[12px] h-[12px] flex-none relative">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
                                <path d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#7795E8"/>
                                <path d="M6 3C5.72386 3 5.5 3.22386 5.5 3.5C5.5 3.77614 5.72386 4 6 4C6.27614 4 6.5 3.77614 6.5 3.5C6.5 3.22386 6.27614 3 6 3ZM5.5 5.5V9H6.5V5.5H5.5Z" fill="#091741"/>
                              </svg>
                            </div>
                            <span className="font-manrope text-[11px] font-medium leading-[16px] tracking-[0.02em] text-[#7795E8] flex-1 sm:w-[408px] h-auto sm:h-[28px]">
                              Please fill up your address details before completing your deposit. This information is required for credit card deposits.
                            </span>
                          </div>

                          {/* Address Inputs Block */}
                          <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[144px]">
                            {/* Street */}
                            <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                              <input 
                                type="text" 
                                placeholder="Street" 
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full sm:w-[396px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                              />
                            </div>

                            {/* City & Postal Code */}
                            <div className="flex flex-row items-center gap-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px]">
                              <div className="flex items-center bg-[#112F82] rounded-[8px] flex-1 min-w-0 sm:flex-none sm:w-[210px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="City" 
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  className="w-full min-w-0 h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>
                              <div className="flex items-center bg-[#112F82] rounded-[8px] flex-1 min-w-0 sm:flex-none sm:w-[210px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="Postal Code" 
                                  value={postalCode}
                                  onChange={(e) => setPostalCode(e.target.value)}
                                  className="w-full min-w-0 h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>
                            </div>

                            {/* State & Country */}
                            <div className="flex flex-col gap-[8px] w-full sm:w-[428px] relative">
                              <div className="flex flex-row items-center gap-[8px] w-full h-[50px] sm:h-[40px]">
                                <div className="flex items-center bg-[#112F82] rounded-[8px] flex-1 min-w-0 sm:flex-none sm:w-[210px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                  <input 
                                    type="text" 
                                    placeholder="State" 
                                    value={stateName}
                                    onChange={(e) => setStateName(e.target.value)}
                                    className="w-full min-w-0 h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                  />
                                </div>
                                
                                <div 
                                  onClick={() => {
                                    setShowCountryDropdown(!showCountryDropdown);
                                    setShowBonusDropdown(false);
                                  }}
                                  className="flex items-center justify-between bg-[#112F82] rounded-[8px] flex-1 min-w-0 sm:flex-none sm:w-[210px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[10px] cursor-pointer hover:bg-[#153bb0] transition-colors"
                                >
                                  <div className="flex items-center gap-[8px] flex-1 min-w-0">
                                    <span 
                                      className={`fi fi-${countryList.find(c => c.name === selectedCountry)?.iso || "us"} fis !rounded-full !w-[20px] !h-[20px] overflow-hidden flex-none bg-cover bg-center`}
                                    ></span>
                                    <span className="font-manrope text-[12px] font-bold leading-[16px] tracking-[0.02em] text-white truncate flex-1 min-w-0 h-[16px] flex items-center">
                                      {selectedCountry}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between w-[14px] h-[14px] flex-none">
                                    <ArrowIcon color="#A5B8EF" />
                                  </div>
                                </div>
                              </div>

                              {showCountryDropdown && (
                                <div className="static sm:absolute sm:right-0 sm:top-[48px] z-50 flex w-full sm:w-[210px] flex-col rounded-[8px] bg-[#112F82] border border-[#173EAD] overflow-y-auto max-h-[130px] shadow-2xl [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-[#1463FF] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent mt-[4px] sm:mt-0">
                                  {countryList.map((country) => (
                                    <button
                                      key={country.name}
                                      onClick={() => {
                                        setSelectedCountry(country.name);
                                        setShowCountryDropdown(false);
                                      }}
                                      className="flex items-center gap-[8px] px-[16px] py-[10px] hover:bg-[#173EAD] transition-colors text-left w-full cursor-pointer text-white font-manrope text-[14px]"
                                    >
                                      <span 
                                        className={`fi fi-${country.iso} fis !rounded-full !w-[20px] !h-[20px] overflow-hidden flex-none bg-cover bg-center`}
                                      ></span>
                                      <span>{country.name}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* CC Step 2: Payment Details Form */
                        <>
                          {/* Step 3: Select an amount */}
                          <div className="flex flex-col gap-[8px] w-full sm:w-[428px] h-auto sm:h-[64px] flex-none">
                            <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-full h-auto">
                              Select an amount
                            </span>
                            
                            <div className="flex flex-row items-center w-full sm:w-[428px] h-[50px] sm:h-[40px] gap-[8px]">
                              {["20", "30", "100"].map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setSelectedAmountOption(opt as any)}
                                  className={`flex items-center justify-center rounded-[8px] h-[50px] sm:h-[40px] w-full sm:w-[101px] px-[16px] py-[10px] gap-[8px] transition-all cursor-pointer flex-1 sm:flex-grow ${
                                    selectedAmountOption === opt
                                      ? "bg-[#173EAD] border-2 border-[#1463FF]"
                                      : "bg-[#112F82]"
                                  }`}
                                >
                                  <span className={`font-manrope text-[14px] leading-[19px] tracking-[0.02em] text-center ${
                                    selectedAmountOption === opt ? "text-white font-bold" : "text-[#A5B8EF] font-semibold"
                                  }`}>
                                    ${opt}
                                  </span>
                                </button>
                              ))}

                              {/* Custom amount */}
                              <div
                                onClick={() => setSelectedAmountOption("custom")}
                                className={`flex items-center justify-center rounded-[8px] h-[50px] sm:h-[40px] w-full sm:w-[101px] px-[16px] py-[10px] gap-[8px] transition-all cursor-pointer flex-1 sm:flex-grow ${
                                  selectedAmountOption === "custom"
                                    ? "bg-[#173EAD] border-2 border-[#1463FF]"
                                    : "bg-[#112F82]"
                                }`}
                              >
                                {selectedAmountOption === "custom" ? (
                                  <input
                                    type="text"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="Amount"
                                    className="w-full sm:w-[68px] h-[19px] bg-transparent text-center text-white font-manrope text-[14px] font-bold outline-none placeholder:text-[#A5B8EF]/60"
                                    autoFocus
                                  />
                                ) : (
                                  <span className="font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[68px] text-center">
                                    Custom...
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Step 4: Enter payment details */}
                          <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto flex-none">
                            <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-full h-auto">
                              Enter your payment details
                            </span>

                            <div className="flex flex-col gap-[8px] w-full sm:w-[428px] h-auto">
                              {/* Card Number */}
                              <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="Credit Card Number" 
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  className="w-full sm:w-[396px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>

                              {/* Expiry & CVC */}
                              <div className="flex flex-row items-center gap-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px]">
                                <div className="flex items-center bg-[#112F82] rounded-[8px] flex-1 sm:w-[210px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                  <input 
                                    type="text" 
                                    placeholder="Exp." 
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                  />
                                </div>
                                <div className="flex items-center bg-[#112F82] rounded-[8px] flex-1 sm:w-[210px] h-[50px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                  <input 
                                    type="text" 
                                    placeholder="CCV" 
                                    value={cardCVC}
                                    onChange={(e) => setCardCVC(e.target.value)}
                                    className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Warning Message Row */}
                            <div className="flex items-start gap-[8px] w-full sm:w-[428px] h-auto">
                              <div className="w-[12px] h-[12px] relative flex-none pt-0.5">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="6" cy="6" r="5" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M6 8V6" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M6 4.2H6.005" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-full sm:w-[408px]">
                                Warning message about fees or anything else relevant at this stage.
                              </span>
                            </div>
                          </div>
                        </>
                      )
                    ) : (
                      /* Bitcoin Form View */
                      <div className="flex flex-col gap-[16px] w-full sm:w-[428px] flex-none">
                        
                        {/* Warning row */}
                        <div className="flex flex-row items-start gap-[8px] w-full sm:w-[428px] h-auto sm:h-[28px] p-0 flex-none">
                          <div className="w-[12px] h-[12px] flex-none relative">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
                              <circle cx="6" cy="6" r="5" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 8V6" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 4.2H6.005" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="font-manrope text-[11px] font-medium leading-[16px] tracking-[0.02em] text-[#7795E8] flex-1 sm:w-[408px] h-auto sm:h-[28px]">
                            Only deposit BC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                          </span>
                        </div>

                        {/* Calculate amount */}
                        <div className="flex flex-col gap-[8px] w-full sm:w-[428px]">
                          <span className="font-manrope text-[12px] font-semibold tracking-[0.02em] text-[#BBCAF3] w-full h-auto">
                            3.Calculate the amount you want to deposit
                          </span>
                          <div className="flex flex-row items-center justify-center sm:justify-start gap-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px]">
                            
                            {/* USD input */}
                            <div className="flex items-center gap-[12px] bg-[#112F82] rounded-[8px] w-[138px] sm:w-[186px] h-[50px] sm:h-[40px] px-[16px] py-[10px]">
                              <div className="flex items-center gap-[8px] w-full h-[19px]">
                                <div className="w-[16px] h-[16px] relative flex-none">
                                  <img src="/images/icons/doller.svg" alt="USD" className="w-[16px] h-[16px] absolute left-0 top-0" />
                                </div>
                                <input 
                                  type="text" 
                                  value={usdAmount}
                                  onChange={(e) => handleUsdChange(e.target.value)}
                                  className="w-full h-[19px] bg-transparent font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white outline-none p-0"
                                />
                              </div>
                            </div>

                            {/* Swap Icon */}
                            <div className="flex flex-col flex-none justify-center items-center p-0 gap-[2px] w-[40px] h-[40px] bg-[#1463FF] rounded-[8px]">
                              {/* Top arrow (pointing right) */}
                              <img src="/games/side-icon/swap.svg" alt="swap right" className="w-[14px] h-[8px] scale-x-[-1]" />
                              {/* Bottom arrow (pointing left) */}
                              <img src="/games/side-icon/swap.svg" alt="swap left" className="w-[14px] h-[8px]" />
                            </div>

                            {/* BTC input */}
                            <div className="flex items-center gap-[12px] bg-[#112F82] rounded-[8px] w-[138px] sm:w-[186px] h-[50px] sm:h-[40px] px-[16px] py-[10px]">
                              <div className="flex items-center gap-[8px] w-full h-[19px]">
                                <div className="w-[16px] h-[16px] relative flex-none">
                                  <img src="/images/icons/bitcoin.svg" alt="BTC" className="w-[16px] h-[16px] absolute left-0 top-0" />
                                </div>
                                <input 
                                  type="text" 
                                  value={btcAmount}
                                  onChange={(e) => handleBtcChange(e.target.value)}
                                  className="w-full h-[19px] bg-transparent font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white outline-none p-0"
                                />
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Deposit Address */}
                        <div className="flex flex-col gap-[8px] w-full sm:w-[428px]">
                          <span className="font-manrope text-[12px] font-semibold tracking-[0.02em] text-[#BBCAF3] w-full h-auto">
                            4.BTC Deposit Address
                          </span>
                          <div className="flex items-center justify-between bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[44px] sm:h-[40px] px-[16px] py-[10px]">
                            <span className="font-manrope text-[12px] font-bold tracking-[0.02em] text-[#7795E8] truncate w-full sm:w-[290px]">
                              bc1q7ndh47hf93rdhuhef873hheufhe447...
                            </span>
                            <div className="flex items-center gap-[12px] flex-none">
                              <button 
                                type="button" 
                                onClick={handleCopyAddress}
                                className="text-[#BBCAF3] hover:text-white transition-colors cursor-pointer"
                              >
                                <Copy size={16} />
                              </button>
                              <button 
                                type="button"
                                onClick={() => toast.info("Displaying QR Code...")} 
                                className="text-[#BBCAF3] hover:text-white transition-colors cursor-pointer"
                              >
                                <QrCode size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )
              ) : activeTab === "bonuses" ? (
                /* Custom Bonuses View */
                <div className="flex flex-col items-start gap-[16px] w-full sm:w-[428px] h-auto sm:h-[331px] flex-none">
                  
                  {/* Promo Code Input Block */}
                  <div className="flex flex-col gap-[8px] w-full sm:w-[428px] h-[74px] sm:h-[64px] flex-none">
                    <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-[236px] h-[16px]">
                      If you have a Bonus Code — enter it here
                    </span>
                    <div className="flex flex-row items-start gap-[8px] w-full sm:w-[428px] h-[50px] sm:h-[40px]">
                      {/* Input Box wrapper */}
                      <div className="flex flex-row items-center bg-[#112F82] rounded-[8px] px-[16px] py-[10px] gap-[12px] flex-1 sm:flex-none sm:w-[311px] h-[50px] sm:h-[40px] min-w-0 justify-between">
                        <input 
                          type="text" 
                          placeholder="Promo Code" 
                          value={promoCode}
                          onChange={(e) => {
                            if (!isPromoApplied) {
                              setPromoCode(e.target.value);
                            }
                          }}
                          disabled={isPromoApplied}
                          className="bg-transparent font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#7795E8] outline-none w-full"
                        />
                        {isPromoApplied && (
                          <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="8" cy="8" r="7" stroke="#A5B8EF" strokeWidth="1.5"/>
                              <path d="M8 8V11" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round"/>
                              <circle cx="8" cy="5" r="0.75" fill="#A5B8EF"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Apply / Cancel Button */}
                      <button 
                        type="button"
                        onClick={() => {
                          if (isPromoApplied) {
                            setIsPromoApplied(false);
                            setPromoCode("");
                            toast.info("Promo code removed.");
                          } else {
                            if (promoCode.trim()) {
                              setIsPromoApplied(true);
                              toast.success(`Promo code "${promoCode}" applied!`);
                            } else {
                              toast.error("Please enter a promo code first.");
                            }
                          }
                        }}
                        className="flex flex-row justify-center items-center bg-[#FFC83D] hover:bg-[#ebd048] rounded-[8px] px-[30px] py-[10px] gap-[10px] w-[100px] sm:w-[109px] h-[50px] sm:h-[40px] flex-none transition-colors cursor-pointer"
                      >
                        <span className="font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] select-none">
                          {isPromoApplied ? "Cancel" : "Apply"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Available Bonuses Slider Block */}
                  <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-[251px] sm:h-[251px] flex-none relative">
                    <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-[151px] h-[16px] flex-none">
                      Available bonuses for you
                    </span>

                    {/* Slider Window */}
                    <div 
                      ref={bonusSliderRef}
                      className="w-full sm:w-[428px] h-[205px] sm:h-[205px] flex-none overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                      onMouseDown={onBonusMouseDown}
                      onMouseMove={onBonusMouseMove}
                      onMouseUp={onBonusMouseUpOrLeave}
                      onMouseLeave={onBonusMouseUpOrLeave}
                      onScroll={onBonusScroll}
                    >
                      <div 
                        className="flex flex-row gap-[8px] h-[205px] sm:h-[205px] w-max flex-none"
                      >
                        {availableBonuses.map((bonus, idx) => (
                          <div 
                            key={idx}
                            className="flex flex-col justify-start items-start bg-[#112F82] rounded-[12px] p-[20px] gap-[12px] w-[calc(100vw-72px)] min-[372px]:w-[300px] sm:w-[300px] h-[205px] sm:h-[205px] flex-none snap-start select-none overflow-hidden"
                          >
                            {/* Title */}
                            <span className="block font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white w-full sm:w-[260px] h-[20px] flex-none truncate">
                              {bonus.title}
                            </span>

                            {/* Spec Grid */}
                            <div className="flex flex-col gap-[9px] w-full sm:w-[260px] h-[81px] flex-none">
                              {/* Row 1 */}
                              <div className="flex flex-row gap-[12px] w-full sm:w-[260px] h-[36px]">
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Min. Deposit
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">
                                    {bonus.minDeposit}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Max. Cashout
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">
                                    {bonus.maxCashout}
                                  </span>
                                </div>
                              </div>
                              {/* Row 2 */}
                              <div className="flex flex-row gap-[12px] w-full sm:w-[260px] h-[36px]">
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Max. Amount
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">
                                    {bonus.maxAmount}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Wager (dep. + bonus)
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">
                                    {bonus.wager}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Activate Button */}
                            <button 
                              type="button"
                              onClick={() => toast.success(`Bonus "${bonus.title}" activated!`)}
                              className="flex justify-center items-center bg-[#FFC83D] hover:bg-yellow-400 rounded-[6px] px-[20px] py-[10px] gap-[10px] w-full sm:w-[260px] h-[40px] flex-none transition-colors cursor-pointer"
                            >
                              <span className="font-manrope font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#1A1404]">
                                Activate
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pagination Indicator dots */}
                    <div className="flex flex-col items-center w-full sm:w-[428px] h-[6px] flex-none">
                      <div className="flex flex-row justify-center items-center gap-[4px] w-[32px] h-[6px] flex-none">
                        {availableBonuses.map((_, idx) => {
                          const isSlideActive = idx === bonusSlideIndex;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => scrollToBonusIndex(idx)}
                              className={`h-[6px] rounded-[150px] transition-all cursor-pointer flex-none ${
                                isSlideActive ? "w-[12px] bg-[#BBCAF3]" : "w-[6px] bg-[#BBCAF3]"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                /* Empty states for other tabs (Withdraw, Transactions) */
                <div className="flex flex-col items-center justify-center gap-[16px] w-full sm:w-[428px] h-[331px] flex-none">
                  <span className="text-4xl">🛠️</span>
                  <p className="font-manrope text-[16px] font-bold text-white uppercase tracking-[0.02em]">
                    {activeTab} Feature
                  </p>
                  <p className="font-manrope text-[12px] text-[#A5B8EF] text-center max-w-xs">
                    This section is currently under maintenance. Please use the Deposit or Bonuses tab.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

          {/* Bottom Complete Button & Help Container */}
          {activeTab === "deposit" && (
            <div 
              className="sticky sm:static bottom-0 flex flex-col items-center gap-[12px] w-[calc(100%+40px)] sm:w-[460px] flex-none z-[100] sm:z-10 bg-[#091741] sm:bg-transparent pb-[16px] sm:pb-0 pt-[16px] sm:pt-0 sm:mb-0 -mx-[20px] sm:mx-0 px-[20px] sm:px-0 border-t border-[#112F82] sm:border-transparent shadow-[0_-10px_30px_rgba(9,23,65,0.8)] sm:shadow-none"
              style={{ height: isBtcSubmitted ? (typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : "66px") : (typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : "50px") }}
            >
              <button
                onClick={handleActionClick}
                disabled={isBtcSubmitted && loadingStep < 3}
                className={`flex flex-row items-center justify-center px-[30px] py-[10px] gap-[10px] rounded-[8px] bg-[#FFC83D] font-manrope font-bold tracking-[0.02em] text-[#1A1404] transition-all ${
                  isBtcSubmitted && loadingStep < 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFC83D]/90 cursor-pointer'
                } ${
                  isBtcSubmitted 
                    ? "w-full sm:w-[350px] h-[60px] sm:h-[40px] text-[16px] sm:text-[14px] leading-[22px] sm:leading-[19px]" 
                    : "w-full sm:w-[300px] h-[60px] sm:h-[50px] text-[16px] sm:text-[14px] leading-[22px] sm:leading-[19px]"
                }`}
              >
                <span className="text-center truncate">
                  {bottomButtonLabel}
                </span>
              </button>

              {isBtcSubmitted && (
                <div className="flex flex-row justify-center items-center gap-[8px] w-full sm:w-[460px] h-[16px] sm:h-[14px]">
                  <div className="w-[12px] h-[12px] flex items-center justify-center text-[#7795E8]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="5" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.5 4.5C4.5 3.67 5.17 3 6 3C6.83 3 7.5 3.67 7.5 4.5C7.5 5.33 6.83 6 6 6V7" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="6" cy="8.5" r="0.6" fill="#7795E8"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[12px] sm:text-[10px] font-medium leading-[16px] sm:leading-[14px] tracking-[0.02em] text-[#7795E8]">
                    Having problems? <span className="text-[#FFC83D] cursor-pointer hover:underline inline ml-1" onClick={() => toast.info("Connecting to live support...")}>Contact support</span>
                  </span>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
