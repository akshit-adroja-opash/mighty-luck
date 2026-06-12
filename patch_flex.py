import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Inner Content Box
# Current: style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : innerHeight }}
# Change to: style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : innerHeight }} -> We will use CSS classes instead, or change "auto" to "100%". 
# Actually, if we want it to be flex-1 on mobile, we can add `sm:flex-none flex-1 min-h-0` to className, and set style height to `undefined` on mobile.
code = code.replace(
    'className="relative z-10 flex flex-col items-start w-full sm:w-[460px] gap-[24px] transition-all duration-300"',
    'className="relative z-10 flex flex-col items-start w-full sm:w-[460px] gap-[24px] transition-all duration-300 flex-1 sm:flex-none min-h-0"'
)
code = code.replace(
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : innerHeight }}',
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : innerHeight }}'
)

# 2. Tab container / Form content area
code = code.replace(
    'className="flex flex-col items-start w-full sm:w-[460px] gap-[16px] transition-all duration-300"',
    'className="flex flex-col items-start w-full sm:w-[460px] gap-[16px] transition-all duration-300 flex-1 sm:flex-none min-h-0 w-full"'
)
code = code.replace(
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : tabsContentHeight }}',
    'style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : tabsContentHeight }}'
)

# 3. Tab View Container
code = code.replace(
    'className="flex flex-col items-start gap-[16px] w-full sm:w-[460px] bg-[#0C1F56] rounded-[16px] border border-[#173EAD]/30 overflow-y-auto no-scrollbar transition-all duration-300"',
    'className="flex flex-col items-start gap-[16px] w-full sm:w-[460px] bg-[#0C1F56] rounded-[16px] border border-[#173EAD]/30 overflow-y-auto no-scrollbar transition-all duration-300 flex-1 sm:flex-none min-h-0"'
)
code = code.replace(
    'height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : tabViewHeight,',
    'height: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : tabViewHeight,'
)

# 4. Fix outer wrapper's max-h
# We set `max-h-[95vh]` previously, but we want the modal to be nicely positioned.
# On mobile, we want `h-full max-h-[90vh]` so it leaves a bit of space at the top.
# And `rounded-t-[24px]` is good.
# Let's ensure the `Outer Modal Container` has `h-full`. It already does: `w-full h-full`.

# Wait! The `Bottom Complete Button` is sticky at the bottom?
# Let's add padding-bottom to the modal on mobile so the button has some breathing room.
code = code.replace(
    'padding: "24px 20px 32px",',
    'padding: typeof window !== "undefined" && window.innerWidth < 640 ? "24px 16px 24px" : "24px 20px 32px",'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Flex fixes applied!")
