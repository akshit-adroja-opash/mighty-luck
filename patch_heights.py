import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(
    'style={{ height: innerHeight }}',
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : innerHeight }}'
)

code = code.replace(
    'style={{ height: tabsContentHeight }}',
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : tabsContentHeight }}'
)

code = code.replace(
    'height: tabViewHeight,',
    'height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : tabViewHeight,'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Heights fixed!")
