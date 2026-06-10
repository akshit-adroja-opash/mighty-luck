import SectionHeader from "@/components/ui/SectionHeader";

export default function WhyChooseUs() {
  const features = [
    {
      title: "FAST WITHDRAWALS",
      description:
        "Don't miss a beat! Enjoy fast withdrawals and celebrate your winnings in record time.",
      image: "/features/withdrawal.png",
    },
    {
      title: "BIG WINNERS WELCOME",
      description:
        "Win big on 4000+ casino games, high betting limits & the best sports action.",
      image: "/features/trophy.png",
    },
    {
      title: "WEEKLY 10% CASHBACK",
      description:
        "Get 10% cashback every Monday. No wagering. No worries.",
      image: "/features/cashback.png",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-[28px]">
      <SectionHeader 
        title="WHY JOIN MIGHTY LUCK?" 
        icon={<span className="text-xl">🏆</span>} 
        showViewAll={false}
        showPagination={false}
      />

      <div className="flex w-full items-center justify-between">
        {features.map((item) => (
          <div
            key={item.title}
            className="group relative flex h-[220px] w-[370px] flex-col items-start justify-center overflow-hidden rounded-[16px] bg-[#0C1F56] p-[24px]"
          >
            {/* Top Left Blur */}
            <div className="absolute -left-[85px] -top-[80px] z-0 h-[160px] w-[160px] rounded-full bg-[#1463FF] blur-[50px]" />

            {/* Right Blur */}
            <div className="absolute -right-[61px] top-[32px] z-0 h-[200px] w-[200px] rounded-full bg-[#1463FF] blur-[50px]" />

            <div className="relative z-10 flex flex-col gap-[16px]">
              <h3 className="w-[200px] font-jost text-[24px] font-extrabold leading-[26px] tracking-[0.01em] text-white">
                {item.title}
              </h3>

              <p className="w-[200px] font-manrope text-[16px] font-medium leading-[140%] tracking-[0.02em] text-[#E8EDFB]">
                {item.description}
              </p>
            </div>

            <div className="absolute right-0 top-[18px] z-10 flex h-[163px] w-[245px] items-center justify-center transition-transform group-hover:scale-105">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}