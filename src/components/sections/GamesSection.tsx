import Card from "@/components/ui/Card";

const games = Array(8).fill({
  image: "/games/game1.png",
  title: "Game",
});

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