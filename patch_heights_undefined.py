import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Change height overrides to undefined so flex-1 works correctly
code = code.replace(
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : innerHeight }}',
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : innerHeight }}'
)

code = code.replace(
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : tabsContentHeight }}',
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : tabsContentHeight }}'
)

code = code.replace(
    'height: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : tabViewHeight,',
    'height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : tabViewHeight,'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Heights changed to undefined")
