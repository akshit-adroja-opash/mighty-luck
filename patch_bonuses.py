import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix Promo Code Input width so Apply button is not cut off
code = code.replace(
    'className="flex flex-row items-center bg-[#112F82] rounded-[8px] px-[16px] py-[10px] gap-[12px] w-full sm:w-[311px] h-[40px] flex-none justify-between"',
    'className="flex flex-row items-center bg-[#112F82] rounded-[8px] px-[16px] py-[10px] gap-[12px] flex-1 sm:flex-none sm:w-[311px] h-[40px] min-w-0 justify-between"'
)

# 2. Fix Modal Heights so it shrinks to fit short content but scrolls tall content
# Wrapper: Remove h-[92vh] sm:h-auto
code = code.replace(
    'w-full sm:w-[500px] h-[92vh] sm:h-auto max-h-screen overflow-hidden sm:overflow-visible rounded-t-[24px] sm:rounded-[16px] flex flex-col',
    'w-full sm:w-[500px] max-h-[92vh] sm:max-h-none overflow-hidden sm:overflow-visible rounded-t-[24px] sm:rounded-[16px] flex flex-col'
)

# Outer Modal Container: Replace h-full with flex-1 min-h-0
code = code.replace(
    'className="relative flex flex-col items-center bg-[#091741] rounded-none sm:rounded-[16px] w-full h-full shadow-2xl isolation-isolate transition-all duration-300"',
    'className="relative flex flex-col items-center bg-[#091741] rounded-none sm:rounded-[16px] w-full flex-1 min-h-0 shadow-2xl isolation-isolate transition-all duration-300"'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Fixes applied successfully")
