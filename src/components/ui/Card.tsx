type Props = {
  image: string;
  title: string;
};

export default function Card({
  image,
  title,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl">
      <img
        src={image}
        alt={title}
        className="h-[200px] w-[152px] object-cover"
      />
    </div>
  );
}