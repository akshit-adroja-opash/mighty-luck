"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, QrCode, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/uiSlice";
import { toast } from "sonner";

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

const USFlagIcon = () => (
  <div className="w-[20px] h-[20px] relative flex-none">
    <img src="/images/america.svg" alt="United States" className="w-[20px] h-[20px] absolute left-0 top-0" />
  </div>
);

export default function WalletModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.modals["wallet"]);

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

  useEffect(() => {
    const slider = bonusSliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0 && Math.abs(e.deltaX) === 0) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [activeTab]);

  const onBonusScroll = () => {
    if (!bonusSliderRef.current) return;
    const scrollLeft = bonusSliderRef.current.scrollLeft;
    // Card width is 300px + 8px gap = 308px
    const index = Math.round(scrollLeft / 308);
    setBonusSlideIndex(index);
  };

  const scrollToBonusIndex = (idx: number) => {
    if (!bonusSliderRef.current) return;
    bonusSliderRef.current.scrollTo({ left: idx * 308, behavior: 'smooth' });
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
      setIsBtcSubmitted(true);
      toast.success("Deposit transaction submitted! Awaiting block confirmation.");
    }
  };

  if (!isOpen) return null;

  // Dynamic sizing based on active tab, payment method, CC step, and BTC submitted state
  const isFixedSizeTab = activeTab === "bonuses" || activeTab === "withdraw" || activeTab === "transactions";

  const modalHeight = isBtcSubmitted 
    ? "532px" 
    : (isFixedSizeTab
        ? "518px"
        : (paymentMethod === "btc" ? "604px" : (ccStep === "address" ? "633px" : "647px")));
    
  const innerHeight = isBtcSubmitted 
    ? "386px" 
    : (isFixedSizeTab
        ? "462px"
        : (paymentMethod === "btc" ? "474px" : (ccStep === "address" ? "503px" : "517px")));
    
  const tabViewHeight = isBtcSubmitted 
    ? "287px" 
    : (isFixedSizeTab
        ? "363px"
        : (paymentMethod === "btc" ? "376px" : (ccStep === "address" ? "404px" : "418px")));

  const tabsContentHeight = isBtcSubmitted 
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#091741] sm:bg-[#0C1733]/70 sm:backdrop-blur-[8px] sm:p-4">
      
      {/* Outer absolute position alignment box (dynamic height to avoid jumps) */}
      <div 
        className="relative transition-all duration-300 w-full sm:w-[500px] min-h-[100dvh] sm:min-h-0 sm:max-h-none overflow-y-auto sm:overflow-visible rounded-none sm:rounded-[16px] flex flex-col" 
        style={{ 
          height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : modalHeight 
        }}
      >
        
        {/* Close Button - positioned outside the card on the right */}
        <button
          onClick={() => {
            setIsBtcSubmitted(false);
            dispatch(closeModal("wallet"));
          }}
          className="absolute right-4 sm:-right-[36px] top-4 sm:top-0 z-50 flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#112F82] sm:bg-transparent text-white hover:text-[#FFC83D] transition-colors cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Outer Modal Container */}
        <div 
          className="relative flex flex-col items-center bg-[#091741] rounded-none sm:rounded-[16px] w-full flex-1 min-h-[100dvh] sm:min-h-0 shadow-none sm:shadow-2xl isolation-isolate transition-all duration-300"
          style={{
            padding: typeof window !== "undefined" && window.innerWidth < 640 ? "24px 16px 24px" : "24px 20px 32px",
            gap: "24px",
          }}
        >
          
          {/* Accent Glow Container (clips the glow to the card boundaries) */}
          <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none z-0">
            <div 
              className="absolute rounded-full bg-[#1463FF]"
              style={{
                width: "173px",
                height: "173px",
                left: "calc(50% - 173px/2 + 0.5px)",
                top: isBtcSubmitted ? "-126px" : "-145px",
                filter: "blur(40px)",
                opacity: 0.8,
              }}
            />
          </div>

          {/* Inner Content Box */}
          <div 
            className="relative z-20 flex flex-col items-start w-full sm:w-[460px] gap-[24px] transition-all duration-300 flex-1 sm:flex-none min-h-0"
            style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : innerHeight }}
          >
            
            {/* Header Title Block */}
            <div className="flex flex-row justify-center items-start w-full sm:w-[460px] h-[29px] gap-[12px] relative">
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
              className="flex flex-col items-start w-full sm:w-[460px] gap-[16px] transition-all duration-300 flex-1 sm:flex-none min-h-0 w-full"
              style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : tabsContentHeight }}
            >
              
              {/* Tabs Switcher */}
              <div className="flex flex-row items-center w-full sm:w-[460px] h-[30px] gap-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {(["deposit", "bonuses", "withdraw", "transactions"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  const labelWidths = {
                    deposit: "w-[47px]",
                    bonuses: "w-[52px]",
                    withdraw: "w-[57px]",
                    transactions: "w-[78px]",
                  };
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center justify-center flex-none rounded-[6px] h-[30px] w-[109px] px-[16px] py-[10px] gap-[8px] transition-all cursor-pointer ${
                        isActive 
                          ? "bg-[#1463FF]" 
                          : "bg-[#112F82]"
                      }`}
                    >
                      <span className={`font-manrope text-[12px] leading-[16px] tracking-[0.02em] text-center flex items-center justify-center ${
                        isActive 
                          ? "text-white font-bold" 
                          : "text-[#A5B8EF] font-semibold"
                      } ${labelWidths[tab]}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tab View Container */}
              <div 
                className="flex flex-col items-start gap-[16px] w-full sm:w-[460px] bg-[#0C1F56] rounded-[16px] border border-[#173EAD]/30 overflow-visible transition-all duration-300 flex-1 sm:flex-none min-h-0"
                style={{ 
                  height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : tabViewHeight,
                  padding: isBtcSubmitted ? "20px 16px" : "16px"
                }}
              >
                {activeTab === "deposit" ? (
                  isBtcSubmitted ? (
                    /* Bitcoin Blockchain Pending Confirmation View */
                    <div className="flex flex-col gap-[16px] w-full sm:w-[428px] flex-none">
                      {/* Top Info Text */}
                      <div className="flex flex-row items-center gap-[8px] w-full sm:w-[428px] h-[38px]">
                        <span className="font-manrope text-[14px] font-semibold leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[428px] h-[38px] flex items-center justify-center">
                          Your transaction in progress and pending confirmation from the blockchain.
                        </span>
                      </div>

                      {/* Confirmation Progress (3 icons) */}
                      <div className="flex flex-row justify-center items-center gap-[10px] w-full sm:w-[428px] h-auto sm:h-[120px] flex-none order-1 align-self-stretch">
                        <div className="flex flex-row items-center w-full sm:w-[120px] h-[40px] p-0 flex-none">
                          {/* Frame 2 - Lit Confirmation 1 */}
                          <div className="relative w-[40px] h-[40px] flex-none">
                            <svg 
                              style={{
                                position: "absolute",
                                width: "28.66px",
                                height: "20.9px",
                                left: "calc(50% - 28.66px/2 + 0.5px)",
                                top: "calc(50% - 20.9px/2 - 0.22px)",
                              }}
                              viewBox="0 0 28.66 20.9" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4.66 20.9L24.0 20.9L28.66 7.5L19.16 12.0L14.33 0.0L9.5 12.0L0.0 7.5L4.66 20.9Z" fill="#A5B8EF" />
                              <path d="M16.5 5.5L11.5 12.5H14.5L12.0 18.5L17.5 11.0H14.5L16.5 5.5Z" fill="#FFFFFF" />
                            </svg>
                          </div>
                          {/* Frame 5 - Lit Confirmation 2 */}
                          <div className="relative w-[40px] h-[40px] flex-none">
                            <svg 
                              style={{
                                position: "absolute",
                                width: "28.66px",
                                height: "20.9px",
                                left: "calc(50% - 28.66px/2 + 0.5px)",
                                top: "calc(50% - 20.9px/2 - 0.22px)",
                              }}
                              viewBox="0 0 28.66 20.9" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4.66 20.9L24.0 20.9L28.66 7.5L19.16 12.0L14.33 0.0L9.5 12.0L0.0 7.5L4.66 20.9Z" fill="#A5B8EF" />
                              <path d="M16.5 5.5L11.5 12.5H14.5L12.0 18.5L17.5 11.0H14.5L16.5 5.5Z" fill="#FFFFFF" />
                            </svg>
                          </div>
                          {/* Frame 4 - Unlit Confirmation 3 */}
                          <div className="relative w-[40px] h-[40px] flex-none">
                            <svg 
                              style={{
                                position: "absolute",
                                width: "28.66px",
                                height: "20.9px",
                                left: "calc(50% - 28.66px/2 + 0.5px)",
                                top: "calc(50% - 20.9px/2 - 0.22px)",
                              }}
                              viewBox="0 0 28.66 20.9" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4.66 20.9L24.0 20.9L28.66 7.5L19.16 12.0L14.33 0.0L9.5 12.0L0.0 7.5L4.66 20.9Z" fill="#112F82" />
                              <path d="M16.5 5.5L11.5 12.5H14.5L12.0 18.5L17.5 11.0H14.5L16.5 5.5Z" fill="#FFFFFF" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Info Text with custom yellow click here */}
                      <div className="flex flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[57px]">
                        <span className="font-manrope text-[14px] font-semibold leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[428px] h-auto sm:h-[57px] flex items-center justify-center flex-wrap">
                          1 confirmation is required for deposits to be credited. Want to know how many confirmations this transaction has? Please{" "}
                          <span className="text-[#FFC83D] font-bold cursor-pointer hover:underline inline ml-1" onClick={() => toast.info("Checking transaction confirmations on blockchain explorer...")}>
                            click here
                          </span>
                          .
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                    {/* Step 1: Select a Bonus */}
                    <div className="relative flex flex-col gap-[8px] w-full sm:w-[428px] h-auto sm:h-[64px] flex-none">
                      <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-[97px] h-[16px]">
                        1.Select a Bonus
                      </span>
                      <div 
                        onClick={() => {
                          setShowBonusDropdown(!showBonusDropdown);
                          setShowPaymentDropdown(false);
                        }}
                        className={`flex items-center justify-between bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px] cursor-pointer hover:bg-[#153bb0] transition-colors border ${
                          showBonusDropdown ? "border-[#1463FF]" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-[8px] w-full sm:w-[370px] h-[19px]">
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
                          <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white truncate w-full sm:w-[245px] h-[19px]">
                            {selectedBonus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between w-[14px] h-[14px]">
                          <ArrowIcon color="#A5B8EF" />
                        </div>
                      </div>

                      {/* Bonus Dropdown Options */}
                      {showBonusDropdown && (
                        <div 
                          className="absolute left-0 top-[68px] z-50 flex w-full sm:w-[428px] flex-col rounded-[8px] border border-[#1463FF] bg-[#112F82] overflow-hidden shadow-2xl"
                          style={{ height: "232px" }}
                        >
                          {/* Header */}
                          <div className="flex flex-row items-center h-[44px] sm:h-[40px] px-[16px] py-[10px] bg-[#112F82] border-b border-[#173EAD]/50 flex-none">
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
                                  className={`flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full text-left cursor-pointer transition-all ${
                                    isActive 
                                      ? "bg-[#1463FF]" 
                                      : "bg-[#112F82] hover:bg-[#173EAD]"
                                  } ${option.hasSub ? "h-[52px]" : "h-[36px]"} ${
                                    isLast ? "rounded-b-[8px]" : ""
                                  }`}
                                >
                                  {/* Radio icon */}
                                  <div className="w-[16px] h-[16px] flex items-center justify-center flex-none">
                                    <div 
                                      className={`w-[16px] h-[16px] ${isActive ? 'bg-white' : 'bg-[#A5B8EF]'}`}
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
                                    <span className={`font-manrope text-[12px] font-bold leading-[16px] tracking-[0.02em] ${
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
                      <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-full sm:w-[163px] h-[16px]">
                        2.Select payment method
                      </span>
                      
                      {/* Trigger */}
                      <div 
                        onClick={() => {
                          setShowPaymentDropdown(!showPaymentDropdown);
                          setShowBonusDropdown(false);
                        }}
                        className={`flex items-center justify-between bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px] cursor-pointer hover:bg-[#153bb0] transition-colors border ${
                          showPaymentDropdown ? "border-[#1463FF]" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-[8px] w-full sm:w-[370px] h-[20px]">
                          {paymentMethod === "btc" ? (
                            <>
                              <div className="w-[16px] h-[16px] relative flex-none">
                                <img src="/images/bitcoin.svg" alt="Bitcoin" className="w-[16px] h-[16px] absolute left-0 top-0" />
                              </div>
                              <div className="flex items-center gap-[8px] w-full sm:w-[346px] h-[19px]">
                                <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white w-auto whitespace-nowrap flex-none">
                                  Bitcoin
                                </span>
                                <span className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-auto whitespace-nowrap flex-none">
                                  (Min. Deposit $10)
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-[2px] w-[42px] h-[20px] flex-none">
                                <img src="/images/visa.svg" alt="Credit Card" className="w-[42px] h-[20px]" />
                              </div>
                              <div className="flex items-center gap-[8px] w-full sm:w-[288px] h-[19px]">
                                <span className="font-manrope text-[14px] font-bold leading-[19px] tracking-[0.02em] text-white w-auto whitespace-nowrap flex-none">
                                  Credit Card
                                </span>
                                <span className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-auto whitespace-nowrap flex-none hidden sm:block">
                                  (Min. Deposit $30 - Max. Deposit $2,500)
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center justify-between w-[14px] h-[14px]">
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
                              <img src="/images/visa.svg" alt="Credit Card" className="w-[42px] h-[20px]" />
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
                              <img src="/images/bitcoin.svg" alt="Bitcoin" className="w-[16px] h-[16px] absolute left-0 top-0" />
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
                          <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-[112px] h-[16px]">
                            Enter your address
                          </span>

                          {/* Warning Info */}
                          <div className="flex items-start gap-[8px] w-full sm:w-[428px] h-[28px]">
                            <WarningIcon />
                            <p className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-full sm:w-[408px] h-[28px]">
                              Please fill up your address details before completing your deposit. This information is required for credit card deposits.
                            </p>
                          </div>

                          {/* Address Inputs Block */}
                          <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[144px]">
                            {/* Street */}
                            <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                              <input 
                                type="text" 
                                placeholder="Street" 
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full sm:w-[396px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                              />
                            </div>

                            {/* City & Postal Code */}
                            <div className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px]">
                              <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[210px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="City" 
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>
                              <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[210px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="Postal Code" 
                                  value={postalCode}
                                  onChange={(e) => setPostalCode(e.target.value)}
                                  className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>
                            </div>

                            {/* State & Country */}
                            <div className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px] relative">
                              <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[210px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="State" 
                                  value={stateName}
                                  onChange={(e) => setStateName(e.target.value)}
                                  className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>
                              
                              <div 
                                onClick={() => {
                                  setShowCountryDropdown(!showCountryDropdown);
                                  setShowBonusDropdown(false);
                                }}
                                className="flex items-center justify-between bg-[#112F82] rounded-[8px] w-full sm:w-[210px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[10px] cursor-pointer hover:bg-[#153bb0] transition-colors"
                              >
                                <div className="flex items-center gap-[8px]">
                                  {selectedCountry === "United States" ? <USFlagIcon /> : <span className="text-[14px]">🇨🇦</span>}
                                  <span className="font-manrope text-[12px] font-bold leading-[16px] tracking-[0.02em] text-white w-full sm:w-[124px] h-[16px] flex items-center">
                                    {selectedCountry}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between w-[14px] h-[14px]">
                                  <ArrowIcon color="#A5B8EF" />
                                </div>
                              </div>

                              {showCountryDropdown && (
                                <div className="absolute right-0 top-[48px] z-50 flex w-full sm:w-[210px] flex-col rounded-[8px] bg-[#112F82] border border-[#173EAD] overflow-hidden shadow-2xl">
                                  {["United States", "Canada"].map((country) => (
                                    <button
                                      key={country}
                                      onClick={() => {
                                        setSelectedCountry(country);
                                        setShowCountryDropdown(false);
                                      }}
                                      className="flex items-center gap-[8px] px-[16px] py-[10px] hover:bg-[#173EAD] transition-colors text-left w-full cursor-pointer text-white font-manrope text-[14px]"
                                    >
                                      {country === "United States" ? <USFlagIcon /> : <span className="text-[14px]">🇨🇦</span>}
                                      <span>{country}</span>
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
                            <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-[105px] h-[16px]">
                              Select an amount
                            </span>
                            
                            <div className="flex flex-row items-center w-full sm:w-[428px] h-[40px] gap-[8px]">
                              {["20", "30", "100"].map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setSelectedAmountOption(opt as any)}
                                  className={`flex items-center justify-center rounded-[8px] h-[40px] w-[101px] px-[16px] py-[10px] gap-[8px] transition-all cursor-pointer flex-grow ${
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
                                className={`flex items-center justify-center rounded-[8px] h-[40px] w-[101px] px-[16px] py-[10px] gap-[8px] transition-all cursor-pointer flex-grow ${
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
                                    className="w-[68px] h-[19px] bg-transparent text-center text-white font-manrope text-[14px] font-bold outline-none placeholder:text-[#A5B8EF]/60"
                                    autoFocus
                                  />
                                ) : (
                                  <span className="font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-[#A5B8EF] w-[68px] text-center">
                                    Custom...
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Step 4: Enter payment details */}
                          <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[146px] flex-none">
                            <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-full sm:w-[160px] h-[16px]">
                              Enter your payment details
                            </span>

                            <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[92px]">
                              {/* Card Number */}
                              <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[428px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                <input 
                                  type="text" 
                                  placeholder="Card Number" 
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  className="w-full sm:w-[396px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                />
                              </div>

                              {/* Expiry & CVC */}
                              <div className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px]">
                                <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[210px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                  <input 
                                    type="text" 
                                    placeholder="Expiry Date (MM/YY)" 
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                  />
                                </div>
                                <div className="flex items-center bg-[#112F82] rounded-[8px] w-full sm:w-[210px] h-[44px] sm:h-[40px] px-[16px] py-[10px] gap-[12px]">
                                  <input 
                                    type="text" 
                                    placeholder="CVC" 
                                    value={cardCVC}
                                    onChange={(e) => setCardCVC(e.target.value)}
                                    className="w-full sm:w-[178px] h-[19px] bg-transparent font-manrope text-[14px] font-semibold leading-[19px] tracking-[0.02em] text-white outline-none placeholder:text-[#A5B8EF]"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Warning Message Row */}
                            <div className="flex items-center gap-[8px] w-full sm:w-[428px] h-[14px]">
                              <div className="w-[12px] h-[12px] bg-[#7795E8] rounded-full flex items-center justify-center text-[#0C1F56] text-[8px] font-bold">
                                !
                              </div>
                              <span className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8] w-full sm:w-[408px] h-[14px] truncate">
                                A 2.5% processing fee applies to credit card deposits. Funds are credited instantly.
                              </span>
                            </div>
                          </div>
                        </>
                      )
                    ) : (
                      /* Bitcoin Form View */
                      <div className="flex flex-col gap-[16px] w-full sm:w-[428px] flex-none">
                        
                        {/* Warning row */}
                        <div className="flex items-start gap-[8px] w-full sm:w-[428px]">
                          <div className="flex-none pt-0.5 text-[#A06BC0]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="6" cy="6" r="5" stroke="#A06BC0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 8V6" stroke="#A06BC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 4.2H6.005" stroke="#A06BC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#A06BC0]">
                            Only deposit BC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                          </p>
                        </div>

                        {/* Calculate amount */}
                        <div className="flex flex-col gap-[8px] w-full sm:w-[428px]">
                          <span className="font-manrope text-[12px] font-semibold tracking-[0.02em] text-[#BBCAF3] w-[259px] h-[16px]">
                            3.Calculate the amount you want to deposit
                          </span>
                          <div className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px]">
                            
                            {/* USD input */}
                            <div className="flex items-center gap-[12px] bg-[#112F82] rounded-[8px] w-full sm:w-[186px] h-[44px] sm:h-[40px] px-[16px] py-[10px]">
                              <div className="flex items-center gap-[8px] w-full sm:w-[154px] h-[19px]">
                                <div className="w-[16px] h-[16px] relative flex-none">
                                  <img src="/images/doller.svg" alt="USD" className="w-[16px] h-[16px] absolute left-0 top-0" />
                                </div>
                                <input 
                                  type="text" 
                                  value={usdAmount}
                                  onChange={(e) => handleUsdChange(e.target.value)}
                                  className="w-full sm:w-[130px] h-[19px] bg-transparent font-manrope text-[12px] font-bold leading-[19px] tracking-[0.02em] text-white outline-none p-0"
                                />
                              </div>
                            </div>

                            {/* Swap Icon */}
                            <div className="flex flex-none items-center justify-center bg-[#112F82] rounded-[8px] w-[40px] h-[40px]">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Top arrow (left to right) */}
                                <path d="M10.5 2.5L13 5L10.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.5 5H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                {/* Bottom arrow (right to left) */}
                                <path d="M3.5 11.5L1 9L3.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.5 9H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>

                            {/* BTC input */}
                            <div className="flex items-center gap-[12px] bg-[#112F82] rounded-[8px] w-full sm:w-[186px] h-[44px] sm:h-[40px] px-[16px] py-[10px]">
                              <div className="flex items-center gap-[8px] w-full sm:w-[154px] h-[19px]">
                                <div className="w-[16px] h-[16px] relative flex-none">
                                  <img src="/images/bitcoin.svg" alt="BTC" className="w-[16px] h-[16px] absolute left-0 top-0" />
                                </div>
                                <input 
                                  type="text" 
                                  value={btcAmount}
                                  onChange={(e) => handleBtcChange(e.target.value)}
                                  className="w-full sm:w-[130px] h-[19px] bg-transparent font-manrope text-[12px] font-bold leading-[19px] tracking-[0.02em] text-white outline-none p-0"
                                />
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Deposit Address */}
                        <div className="flex flex-col gap-[8px] w-full sm:w-[428px]">
                          <span className="font-manrope text-[12px] font-semibold tracking-[0.02em] text-[#BBCAF3] w-[135px] h-[16px]">
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
                  <div className="flex flex-col gap-[8px] w-full sm:w-[428px] h-auto sm:h-[64px] flex-none">
                    <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[236px] h-[16px]">
                      If you have a Bonus Code — enter it here
                    </span>
                    <div className="flex flex-row items-start gap-[8px] w-full sm:w-[428px] h-[40px]">
                      {/* Input Box wrapper */}
                      <div className="flex flex-row items-center bg-[#112F82] rounded-[8px] px-[16px] py-[10px] gap-[12px] flex-1 sm:flex-none sm:w-[311px] h-[40px] min-w-0 justify-between">
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
                        className="flex flex-row justify-center items-center bg-[#FFC83D] hover:bg-[#ebd048] rounded-[8px] px-[30px] py-[10px] gap-[10px] w-[109px] h-[40px] flex-none transition-colors cursor-pointer"
                      >
                        <span className="font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] select-none">
                          {isPromoApplied ? "Cancel" : "Apply"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Available Bonuses Slider Block */}
                  <div className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[251px] flex-none relative">
                    <span className="font-manrope text-[12px] font-semibold leading-[16px] tracking-[0.02em] text-[#BBCAF3] w-full sm:w-[151px] h-[16px]">
                      Available bonuses for you
                    </span>

                    {/* Slider Window */}
                    <div 
                      ref={bonusSliderRef}
                      className="w-full sm:w-[428px] h-auto sm:h-[205px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                      onMouseDown={onBonusMouseDown}
                      onMouseMove={onBonusMouseMove}
                      onMouseUp={onBonusMouseUpOrLeave}
                      onMouseLeave={onBonusMouseUpOrLeave}
                      onScroll={onBonusScroll}
                    >
                      <div 
                        className="flex flex-row gap-[8px] h-auto sm:h-[205px] w-max"
                      >
                        {availableBonuses.map((bonus, idx) => (
                          <div 
                            key={idx}
                            className="flex flex-col justify-center items-start bg-[#112F82] rounded-[12px] p-[20px] gap-[12px] w-[300px] sm:w-[300px] h-auto sm:h-[205px] flex-none snap-start select-none"
                          >
                            {/* Title */}
                            <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white w-full sm:w-[260px] h-[20px] truncate">
                              {bonus.title}
                            </span>

                            {/* Spec Grid */}
                            <div className="flex flex-col gap-[9px] w-full sm:w-[260px] h-[81px]">
                              {/* Row 1 */}
                              <div className="flex flex-row gap-[12px] w-full sm:w-[260px] h-[36px]">
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Min. Deposit
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white">
                                    {bonus.minDeposit}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Max. Cashout
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white">
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
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white">
                                    {bonus.maxAmount}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-[2px] w-full sm:w-[124px] h-[36px] flex-grow">
                                  <span className="font-manrope font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                                    Wager (dep. + bonus)
                                  </span>
                                  <span className="font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white">
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
                      <div className="flex flex-row justify-center items-center gap-[4px] w-[32px] h-[6px]">
                        {availableBonuses.map((_, idx) => {
                          const isSlideActive = idx === bonusSlideIndex;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => scrollToBonusIndex(idx)}
                              className={`h-[6px] rounded-[150px] transition-all cursor-pointer ${
                                isSlideActive ? "w-[12px] bg-[#BBCAF3]" : "w-[6px] bg-[#BBCAF3]/50"
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
                <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-[428px] h-full sm:h-full flex-1">
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
              className="flex flex-col items-center gap-[12px] w-full sm:w-[460px] flex-none z-10"
              style={{ height: isBtcSubmitted ? "66px" : "50px" }}
            >
              <button
                onClick={handleActionClick}
                className={`flex items-center justify-center rounded-[8px] bg-[#FFC83D] font-manrope font-bold tracking-[0.02em] text-[#1A1404] transition-all hover:bg-yellow-400 cursor-pointer ${
                  isBtcSubmitted 
                    ? "w-full sm:w-[350px] h-[40px] text-[14px]" 
                    : "w-full sm:w-[300px] h-[50px] text-[14px]"
                }`}
              >
                <span className="text-center truncate">
                  {bottomButtonLabel}
                </span>
              </button>

              {isBtcSubmitted && (
                <div className="flex flex-row justify-center items-center gap-[8px] w-full sm:w-[460px] h-[14px]">
                  <div className="w-[12px] h-[12px] flex items-center justify-center text-[#7795E8]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="5" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.5 4.5C4.5 3.67 5.17 3 6 3C6.83 3 7.5 3.67 7.5 4.5C7.5 5.33 6.83 6 6 6V7" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="6" cy="8.5" r="0.6" fill="#7795E8"/>
                    </svg>
                  </div>
                  <span className="font-manrope text-[10px] font-medium leading-[14px] tracking-[0.02em] text-[#7795E8]">
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
