import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(
    '<div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#0C1733]/70 backdrop-blur-[8px] p-0 sm:p-4">',
    '<div className="fixed inset-0 z-[100] flex flex-col justify-end sm:items-center sm:justify-center bg-[#0C1733]/70 backdrop-blur-[8px] p-0 sm:p-4">'
)

code = code.replace(
    'className="relative transition-all duration-300 w-full sm:w-[500px] h-full sm:h-auto max-h-[95vh] sm:max-h-none overflow-y-auto sm:overflow-visible rounded-t-[24px] sm:rounded-none" \n        style={{ \n          height: typeof window !== "undefined" && window.innerWidth < 640 ? "auto" : modalHeight \n        }}',
    'className="relative transition-all duration-300 w-full sm:w-[500px] h-[92vh] sm:h-auto overflow-hidden sm:overflow-visible rounded-t-[24px] sm:rounded-[16px] flex flex-col" \n        style={{ \n          height: typeof window !== "undefined" && window.innerWidth < 640 ? undefined : modalHeight \n        }}'
)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('Wrapper fixed')
