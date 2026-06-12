import re
import os

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Base Modal Overlay & Close Button
code = code.replace(
    '<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0C1733]/70 backdrop-blur-[8px]">',
    '<div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#0C1733]/70 backdrop-blur-[8px] p-0 sm:p-4">'
)

code = code.replace(
    'className="absolute -right-[36px] top-0 z-50 flex h-6 w-6 items-center justify-center text-white hover:text-[#FFC83D] transition-colors cursor-pointer"',
    'className="absolute right-4 sm:-right-[36px] top-4 sm:top-0 z-50 flex h-6 w-6 items-center justify-center text-white hover:text-[#FFC83D] transition-colors cursor-pointer"'
)

# 2. Outer wrapper sizing
code = code.replace(
    'className="relative transition-all duration-300" \n        style={{ \n          width: "500px", \n          height: modalHeight \n        }}',
    'className="relative transition-all duration-300 w-full sm:w-[500px] h-full sm:h-auto max-h-[95vh] sm:max-h-none overflow-y-auto sm:overflow-visible rounded-t-[24px] sm:rounded-none" \n        style={{ \n          height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : modalHeight \n        }}'
)

# 3. Inner Content Boxes (w-[460px], w-[428px], etc.)
def make_width_responsive(match):
    val = int(match.group(1))
    # We want to replace w-[XYZpx] with w-full sm:w-[XYZpx] if XYZ >= 120
    if val >= 120:
        return f'w-full sm:w-[{val}px]'
    return match.group(0)

# Apply general width fixes for classes
code = re.sub(r'w-\[(\d+)px\]', make_width_responsive, code)

# 4. Fix specific flex rows that need to stack on mobile
# - Credit Card Expiry & CVC row
code = code.replace(
    'className="flex items-center gap-[8px] w-full sm:w-[428px] h-[40px]"',
    'className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px]"'
)
# - The container for card number + expiry (h-[92px] -> h-auto)
code = code.replace(
    'className="flex flex-col gap-[12px] w-full sm:w-[428px] h-[92px]"',
    'className="flex flex-col gap-[12px] w-full sm:w-[428px] h-auto sm:h-[92px]"'
)

# 5. Fix Amount buttons row (w-[101px])
# Let's find the container of the 4 amount buttons
code = code.replace(
    'className="flex flex-row items-center gap-[8px] w-full sm:w-[428px] h-[36px]"',
    'className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[36px]"'
)
code = code.replace(
    'className={`flex items-center justify-center rounded-[8px] bg-[#112F82] w-[101px] h-[36px]',
    'className={`flex items-center justify-center rounded-[8px] bg-[#112F82] w-full sm:w-[101px] h-[44px] sm:h-[36px]'
)
code = code.replace(
    'className="flex flex-col items-center justify-center w-[101px] h-[36px]"',
    'className="flex flex-col items-center justify-center w-full sm:w-[101px] h-[44px] sm:h-[36px]"'
)

# 6. Inputs height for comfortable touch targets
code = code.replace(
    'h-[40px] px-[16px] py-[10px]',
    'h-[44px] sm:h-[40px] px-[16px] py-[10px]'
)

# 7. Other general height fixes that cause overflow
code = code.replace('h-[57px]', 'h-auto sm:h-[57px]')
code = code.replace('h-[146px]', 'h-auto sm:h-[146px]')
code = code.replace('h-[251px]', 'h-auto sm:h-[251px]')
code = code.replace('h-[331px]', 'h-auto sm:h-[331px]')
code = code.replace('h-[205px]', 'h-auto sm:h-[205px]')
code = code.replace('h-[120px]', 'h-auto sm:h-[120px]')
code = code.replace('h-[64px]', 'h-auto sm:h-[64px]')
code = code.replace('h-[212px]', 'h-auto sm:h-[212px]')
code = code.replace('h-[144px]', 'h-auto sm:h-[144px]')

# 8. Address fields (First Name + Last Name row, City + Postal row)
# Usually they are inside w-[428px] flex rows
code = code.replace(
    'className="flex items-center gap-[8px] w-full sm:w-[428px]"',
    'className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px]"'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Replacement complete")
