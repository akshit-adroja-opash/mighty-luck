import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  {
    title: "FAST WITHDRAWALS",
    description: "Don't miss a beat! Enjoy fast withdrawals and celebrate your winnings in record time.",
    image: "/images/promo-stopwatch.png",
    descClass: "h-[88px] font-medium leading-[140%]",
    // Ellipse 9 (right blur): right-[-61px] top-[32px]
    ellipse9: { right: "-61px", top: "32px" },
    // Image: 210.4×160.82 at left:223.42 top:31 rotate:10.6deg
    imgStyle: { width: "210.4px", height: "160.82px", left: "223.42px", top: "31px", transform: "rotate(10.6deg)" },
  },
  {
    title: "BIG WINNERS WELCOME",
    description: "Win big on 4000+ casino games,high betting limits & the best sports action.",
    image: "/images/promo-trophy.png",
    descClass: "h-[66px] font-medium leading-[140%]",
    // Ellipse 9: right-[-66px] top-[20px]
    ellipse9: { right: "-66px", top: "20px" },
    // Image: 312.37×208.08 at left:126.74 top:3 rotate:12deg
    imgStyle: { width: "312.37px", height: "208.08px", left: "126.74px", top: "3px", transform: "rotate(12deg)" },
  },
  {
    title: "WEEKLY 10% CASHBACK",
    description: "Get 10% cashback from Samba Slots every Monday. No wagering. No worries.",
    image: "/images/promo-10percent.png",
    descClass: "h-[88px] font-semibold leading-[22px]",
    // Ellipse 9: right-[-65px] top-[27px]
    ellipse9: { right: "-65px", top: "27px" },
    // Image: 237.48×173.55 at left:194 top:41.3 rotate:-1.3deg
    imgStyle: { width: "237.48px", height: "173.55px", left: "194px", top: "41.3px", transform: "rotate(-1.3deg)" },
  },
];

export default function WhyChooseUs() {
  return (
    /* Section: w-[1136px] h-[278px] flex-col gap-[28px] */
    <section className="flex h-[278px] w-[1136px] flex-none flex-col items-start gap-[28px]">

      <SectionHeader
        title="WHY JOIN MIGHTY LUCK?"
        titleWidth="272px"
        icon={<span className="text-base leading-none">🏆</span>}
        showViewAll={false}
        showPagination={false}
      />

      {/* Cards row: w-[1136px] h-[220px] flex-row gap-[12px] */}
      <div className="flex h-[220px] w-[1136px] flex-none flex-row items-center gap-[12px]">
        {features.map((item, index) => (
          /* Card outer: w-[370px] h-[220px] rounded-[12px] overflow-hidden */
          <div
            key={index}
            className="relative h-[220px] w-[370px] flex-none overflow-hidden rounded-[12px]"
          >
            {/* Card inner: absolute 370×220 bg-[#0C1F56] rounded-[16px] padding:24px gap:16px isolate */}
            <div className="absolute left-0 top-0 flex h-[220px] w-[370px] flex-col items-start justify-center gap-[16px] rounded-[16px] bg-[#0C1F56] p-[24px] isolation-isolate">

              {/* Ellipse 7 — top-left blur: 160×160 left:-85 top:-80 blur-50 z-0 */}
              <div
                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                style={{ width: "160px", height: "160px", left: "-85px", top: "-80px", filter: "blur(50px)", zIndex: 0 }}
              />

              {/* Title: w-[200px] Jost 800 24px line-height:26px tracking:0.01em #FFF z-1 */}
              <h3
                className="relative w-[200px] flex-none font-['Jost'] text-[24px] font-extrabold leading-[26px] tracking-[0.01em] text-white"
                style={{ zIndex: 1 }}
              >
                {item.title}
              </h3>

              {/* Description: w-[200px] Manrope 16px tracking:0.02em #E8EDFB z-2 */}
              <p
                className={`relative w-[200px] flex-none font-['Manrope'] text-[16px] tracking-[0.02em] text-[#E8EDFB] ${item.descClass}`}
                style={{ zIndex: 2 }}
              >
                {item.description}
              </p>

              {/* Ellipse 9 — right blur: 200×200 z-3, per-card position */}
              <div
                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                style={{
                  width: "200px", height: "200px",
                  right: item.ellipse9.right, top: item.ellipse9.top,
                  filter: "blur(50px)", zIndex: 3
                }}
              />

              {/* 3D Image — absolute, per-card size/position/rotation, z-10 */}
              <div
                className="pointer-events-none absolute"
                style={{ ...item.imgStyle, zIndex: 10 }}
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