import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Remove transform from parent
code = code.replace(
    'className="flex flex-row gap-[8px] transition-transform duration-300 ease-out h-auto sm:h-[205px]"\n                        style={{ transform: typeof window !== "undefined" && window.innerWidth < 640 ? `translateX(calc(-${bonusSlideIndex} * (100vw - 56px)))` : `translateX(-${bonusSlideIndex * 308}px)` }}',
    'className="flex flex-row gap-[8px] h-auto sm:h-[205px]"'
)

# In case it failed, try matching the exact string from my previous patch
code = code.replace(
    'className="flex flex-row gap-[8px] transition-transform duration-300 ease-out h-auto sm:h-[205px]"\n                        style={{ transform: typeof window !== "undefined" && window.innerWidth < 640 ? `translateX(calc(-${bonusSlideIndex} * (100vw - 56px)))` : `translateX(-${bonusSlideIndex * 308}px)` }}',
    'className="flex flex-row gap-[8px] h-auto sm:h-[205px]"'
)

# Add transform to child
code = code.replace(
    'className="flex flex-col justify-center items-start bg-[#112F82] rounded-[12px] p-[20px] gap-[12px] w-full sm:w-[300px] h-auto sm:h-[205px] flex-none"',
    'className="flex flex-col justify-center items-start bg-[#112F82] rounded-[12px] p-[20px] gap-[12px] w-full sm:w-[300px] h-auto sm:h-[205px] flex-none transition-transform duration-300 ease-out"\n                            style={{ transform: `translateX(calc(-${bonusSlideIndex * 100}% - ${bonusSlideIndex * 8}px))` }}'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Child transform applied")
