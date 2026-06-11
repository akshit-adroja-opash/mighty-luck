import Card from "@/components/ui/Card";

const games = Array.from({ length: 8 }, (_, i) => ({
  image: `/games/slots/slot-${(i % 7) + 1}.png`,
  title: "Slot Game",
}));

export default function GamesSection() {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">
          SLOTS (1,487)
        </h2>

        <button>View All</button>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {games.map((game, index) => (
          <Card
            key={index}
            image={game.image}
            title={game.title}
          />
        ))}
      </div>
    </section>
  );
}
