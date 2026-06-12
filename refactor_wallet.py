import re
import os

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Make outer wrapper responsive
code = code.replace(
    '<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0C1733]/70 backdrop-blur-[8px]">',
    '<div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#0C1733]/70 backdrop-blur-[8px] p-0 sm:p-4">'
)

code = code.replace(
    'className="relative transition-all duration-300" \n        style={{ \n          width: "500px", \n          height: modalHeight \n        }}',
    'className="relative transition-all duration-300 w-full sm:w-[500px] h-auto max-h-[90vh] sm:max-h-none overflow-y-auto sm:overflow-visible rounded-t-[24px] sm:rounded-none" \n        style={{ \n          height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : modalHeight \n        }}'
)

code = code.replace(
    'className="absolute -right-[36px] top-0 z-50 flex h-6 w-6 items-center justify-center text-white hover:text-[#FFC83D] transition-colors cursor-pointer"',
    'className="absolute right-4 sm:-right-[36px] top-4 sm:top-0 z-50 flex h-6 w-6 items-center justify-center text-white hover:text-[#FFC83D] transition-colors cursor-pointer"'
)

def replace_w(m):
    val = int(m.group(1))
    if val >= 120:
        return f'w-full sm:w-[{val}px]'
    return m.group(0)

code = re.sub(r'w-\[(\d+)px\]', replace_w, code)

# Make row flex containers responsive
# e.g. <div className="flex flex-row gap-[16px] w-full sm:w-[428px]"> => <div className="flex flex-col sm:flex-row gap-[16px] w-full sm:w-[428px]">
code = code.replace('flex-row', 'flex-col sm:flex-row')

# But we only want flex-col sm:flex-row on certain elements!
# Actually, changing all flex-row to flex-col sm:flex-row might break headers!
# Header: <div className="flex flex-col sm:flex-row justify-center items-start w-[460px] h-[29px] gap-[12px] relative">
# The header title needs to stay flex-row.
# Tabs need to stay flex-row.

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
