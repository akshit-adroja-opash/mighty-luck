import Image from "next/image";
import { Trophy } from "lucide-react";

const features = [
  {
    title: "FAST WITHDRAWALS",
    description: "Don't miss a beat! Enjoy fast withdrawals and celebrate your winnings in record time.",
    image: "/images/promo-stopwatch.png",
    descClass: "h-[88px] font-medium leading-[140%]",
    ellipse9: { right: "-61px", top: "32px" },
    imgClassName: "w-[160px] sm:w-[210px] h-[122px] sm:h-[160px] -right-[40px] sm:-right-[63px] top-[40px] sm:top-[31px] rotate-[10deg]",
  },
  {
    title: "BIG WINNERS WELCOME",
    description: "Win big on 4000+ casino games,high betting limits & the best sports action.",
    image: "/images/trophy.png",
    descClass: "h-[66px] font-medium leading-[140%]",
    ellipse9: { right: "-66px", top: "20px" },
    imgClassName: "w-[220px] sm:w-[312px] h-[146px] sm:h-[208px] -right-[60px] sm:-right-[115px] top-[20px] sm:top-[3px] rotate-[12deg]",
  },
  {
    title: "WEEKLY 10% CASHBACK",
    description: "Get 10% cashback from Samba Slots every Monday. No wagering. No worries.",
    image: "/images/promo-10percent.png",
    descClass: "h-[88px] font-semibold leading-[22px]",
    ellipse9: { right: "-65px", top: "27px" },
    imgClassName: "w-[180px] sm:w-[237px] h-[131px] sm:h-[173px] -right-[40px] sm:-right-[61px] top-[50px] sm:top-[41px] -rotate-[1deg]",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="flex w-full flex-none flex-col items-start gap-5 md:gap-7">

      {/* Header */}
      <div className="flex items-center justify-between w-full min-h-[30px] shrink-0 overflow-hidden">
        <div className="flex items-center min-h-[30px] gap-[12px] shrink-0 flex-1 min-w-0">
          <Trophy className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} />
          <span className="flex-1 min-w-0 truncate font-['Jost'] text-[16px] sm:text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase">WHY JOIN MIGHTY LUCK?</span>
        </div>
      </div>

      {/* Cards row */}
      <div className="flex w-full flex-col sm:flex-row items-stretch gap-3 md:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {features.map((item, index) => (
          <div
            key={index}
            className="relative h-[200px] sm:h-[220px] w-full sm:w-[calc(33.333%-8px)] sm:flex-none overflow-hidden rounded-[12px]"
          >
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-center gap-4 rounded-[16px] bg-[#0C1F56] p-6 isolation-isolate">

              <div
                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                style={{ width: "160px", height: "160px", left: "-85px", top: "-80px", filter: "blur(50px)", zIndex: 0 }}
              />

              <h3
                className="relative w-[200px] flex-none font-jost text-lg sm:text-[24px] font-extrabold leading-[26px] tracking-[0.01em] text-white uppercase"
                style={{ zIndex: 1 }}
              >
                {item.title}
              </h3>

              <p
                className={`relative w-[200px] flex-none font-manrope text-sm sm:text-[16px] tracking-[0.02em] text-[#E8EDFB] ${item.descClass}`}
                style={{ zIndex: 2 }}
              >
                {item.description}
              </p>

              <div
                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                style={{
                  width: "200px", height: "200px",
                  right: item.ellipse9.right, top: item.ellipse9.top,
                  filter: "blur(50px)", zIndex: 3
                }}
              />

              <div
                className={`pointer-events-none absolute ${item.imgClassName}`}
                style={{ zIndex: 10 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
