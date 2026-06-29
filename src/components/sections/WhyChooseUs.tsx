import Image from "next/image";

const features = [
  {
    title: "FAST WITHDRAWALS",
    desc: (
      <>
        Don’t miss a beat! Enjoy<br />
        fast withdrawals and<br />
        celebrate your winnings<br />
        in record time.
      </>
    ),
    img: "/images/features/why-1.png",
    imgClass: "w-[120px] md:w-[150px] lg:w-[220px] xl:w-[240px] -right-[5px] md:-right-[10px] lg:-right-[35px] xl:-right-[21px] top-[10px] md:top-[5px] xl:top-[10px] rotate-[10.6deg]",
  },
  {
    title: "BIG WINNERS WELCOME",
    desc: (
      <>
        Win big on 4000+ casino<br />
        games, high betting limits<br />
        & the best sports action.
      </>
    ),
    img: "/images/features/why-2.png",
    imgClass: "w-[180px] md:w-[230px] lg:w-[250px] xl:w-[360px] -right-[5px] md:-right-[5px] lg:-right-[40px] xl:-right-[5px] top-[0px] md:top-[-5px] xl:top-[5px]",
  },
  {
    title: "WEEKLY 10% CASHBACK",
    desc: (
      <>
        Get 10% cashback from<br />
        Samba Slots every<br />
        Monday. No wagering.<br />
        No worries.
      </>
    ),
    img: "/images/features/why-3.png",
    imgClass: "w-[140px] md:w-[170px] lg:w-[220px] xl:w-[260px] -right-[5px] md:-right-[5px] lg:-right-[25px] xl:-right-[2px] top-[20px] md:top-[25px] xl:top-[50px] -rotate-[1.3deg]",
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

      {/* Cards */}
      <div className="flex flex-row gap-[8.63px] md:gap-[16px] w-full overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory">
        {features.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-center items-start p-[16px] md:p-[24px] gap-[12px] md:gap-[16px] bg-[#0C1F56] w-[266px] md:w-[320px] lg:w-full lg:flex-1 h-[158px] md:h-auto md:aspect-[370/220] shrink-0 rounded-[12px] md:rounded-[16px] overflow-hidden snap-start isolate"
          >
            {/* Blurs */}
            <div className="absolute w-[100px] h-[100px] md:w-[160px] md:h-[160px] -left-[40px] -top-[40px] md:-left-[85px] md:-top-[80px] bg-[#1463FF] blur-[35px] md:blur-[50px] z-0" />
            <div className="absolute w-[120px] h-[120px] md:w-[200px] md:h-[200px] -right-[40px] top-[20px] md:-right-[61px] md:top-[32px] bg-[#1463FF] blur-[35px] md:blur-[50px] z-0" />
            
            {/* Image */}
            <img 
              src={item.img} 
              alt={item.title} 
              className={`absolute z-[1] object-contain ${item.imgClass}`}
            />

            {/* Content */}
            <h3 className="w-full max-w-[140px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[280px] font-jost font-extrabold text-[14px] md:text-[20px] lg:text-[24px] xl:text-[30px] leading-[16px] md:leading-[22px] lg:leading-[26px] xl:leading-[32px] tracking-[0.01em] text-white z-10 uppercase">
              {item.title}
            </h3>
            
            <p className="w-full font-manrope font-medium text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-[14px] md:leading-[140%] tracking-[0.02em] text-[#E8EDFB] z-10">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
