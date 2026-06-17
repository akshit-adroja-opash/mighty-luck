import Image from "next/image";

const features = [
  {
    image: "/images/features/fast.svg",
    alt: "Fast Withdrawals",
  },
  {
    image: "/images/features/big.svg",
    alt: "Big Winners Welcome",
  },
  {
    image: "/images/features/weekly.svg",
    alt: "Weekly 10% Cashback",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="flex flex-col items-start gap-[14.81px] md:gap-[28px] w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center justify-between w-full h-[23px] md:h-[30px]">
        <div className="flex flex-row items-center gap-[7.2px] md:gap-[12px]">
          <div className="w-[18px] h-[18px] md:w-[30px] md:h-[30px] flex items-center justify-center shrink-0">
            <img src="/games/game-icons/why.svg" alt="Why Join" className="w-[18px] h-[18px] md:w-[30px] md:h-[30px] object-contain" />
          </div>
          <span className="font-jost text-[16px] md:text-[20px] font-extrabold leading-[23px] md:leading-[30px] tracking-[0.01em] text-white uppercase whitespace-nowrap">
            WHY JOIN MIGHTY LUCK?
          </span>
        </div>
      </div>

      <div className="flex md:grid flex-row md:grid-cols-3 gap-[8.63px] md:gap-[12px] w-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
        {features.map((item, index) => (
          <div
            key={index}
            className="relative w-[266px] md:w-full h-[158px] md:h-auto md:aspect-[370/220] shrink-0 rounded-[11.5px] md:rounded-[16px] overflow-hidden group snap-start"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 266px, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
