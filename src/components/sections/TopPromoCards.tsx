export default function TopPromoCards() {
  return (
    <div className="flex h-auto lg:h-[134px] w-full max-w-[374px] mx-auto md:max-w-full lg:max-w-none lg:mx-0 lg:w-[232px] flex-none flex-col items-start gap-[10px] rounded-none lg:rounded-[16px] bg-transparent lg:bg-[#0C1F56] p-0 lg:p-[16px]">
      
      {/* ── MOBILE RESPONSIVE MODEL (Proportional SVGs) ── */}
      <div className="flex lg:hidden w-full flex-none flex-col md:flex-row md:items-center gap-[8px]">
        
        {/* Top Two Cards Row */}
        <div className="flex w-full md:flex-[11] h-auto flex-none flex-row items-center gap-[8px]">
          <img src="/games/sider/friends.svg" alt="Refer A Friend" className="flex-1 min-w-0 h-auto cursor-pointer hover:opacity-90 transition-opacity" />
          <img src="/games/sider/vip.svg" alt="VIP Transfer" className="flex-1 min-w-0 h-auto cursor-pointer hover:opacity-90 transition-opacity" />
        </div>

        {/* Winter Rush */}
        <div className="flex w-full md:flex-[10] h-auto flex-none items-center">
          <img src="/games/sider/winter.svg" alt="Winter Rush" className="w-full h-auto flex-none cursor-pointer hover:opacity-90 transition-opacity" />
        </div>
        
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
