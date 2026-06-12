import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the slider transform
code = code.replace(
    'style={{ transform: `translateX(-${bonusSlideIndex * 308}px)` }}',
    'style={{ transform: typeof window !== "undefined" && window.innerWidth < 640 ? `translateX(calc(-${bonusSlideIndex} * (100vw - 56px)))` : `translateX(-${bonusSlideIndex * 308}px)` }}'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Slider fixed")
