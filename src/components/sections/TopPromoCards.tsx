export default function TopPromoCards() {
  return (
    <div className="flex h-auto lg:h-[134px] w-full lg:w-[232px] flex-none flex-col items-start gap-[10px] rounded-none lg:rounded-[16px] bg-transparent lg:bg-[#0C1F56] p-0 lg:p-[16px]">
      
      {/* ── MOBILE RESPONSIVE MODEL (Proportional SVGs) ── */}
      <div className="flex lg:hidden w-full flex-none flex-col items-start gap-[8px]">
        
        {/* Top Two Cards Row */}
        <div className="flex w-full h-auto flex-none flex-row items-center gap-[8px]">
          <img src="/games/sider/friends.svg" alt="Refer A Friend" className="w-[calc(50%-4px)] h-auto flex-none cursor-pointer hover:opacity-90 transition-opacity" />
          <img src="/games/sider/vip.svg" alt="VIP Transfer" className="w-[calc(50%-4px)] h-auto flex-none cursor-pointer hover:opacity-90 transition-opacity" />
        </div>

        {/* Winter Rush */}
        <img src="/games/sider/winter.svg" alt="Winter Rush" className="w-full h-auto flex-none cursor-pointer hover:opacity-90 transition-opacity" />
        
      </div>

      {/* ── DESKTOP EXACT PIXEL MODEL (New SVGs) ── */}
      <div className="hidden lg:flex w-[200px] flex-none flex-col items-start gap-[8px]">
        
        {/* Top Two Cards Row */}
        <div className="flex h-[44px] w-[200px] flex-none flex-row items-center gap-[4px]">
          <img src="/games/sider/friends.svg" alt="Refer A Friend" className="w-[98px] h-[44px] flex-none cursor-pointer hover:opacity-90 transition-opacity" />
          <img src="/games/sider/vip.svg" alt="VIP Transfer" className="w-[98px] h-[44px] flex-none cursor-pointer hover:opacity-90 transition-opacity" />
        </div>

        {/* Winter Rush */}
        <img src="/games/sider/winter.svg" alt="Winter Rush" className="w-[200px] h-[50px] flex-none cursor-pointer hover:opacity-90 transition-opacity" />
        
      </div>

    </div>
  );
}
