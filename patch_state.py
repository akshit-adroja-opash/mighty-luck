import re

with open('src/components/wallet/WalletModal.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix the State and Country row to stack on mobile
code = code.replace(
    'className="flex items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px] relative"',
    'className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px] relative"'
)
code = code.replace(
    'className="flex items-center gap-[8px] w-full sm:w-[428px] h-[40px] relative"',
    'className="flex flex-col sm:flex-row items-center gap-[8px] w-full sm:w-[428px] h-auto sm:h-[40px] relative"'
)

# And fix the children w-[210px] -> w-full sm:w-[210px] just in case
def make_210_responsive(match):
    return 'w-full sm:w-[210px]'

code = re.sub(r'w-\[210px\]', make_210_responsive, code)

with open('src/components/wallet/WalletModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Row fixed")
