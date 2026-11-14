import Image from "next/image";
import { PaperBag, ScrollText, BookHeart, Flame } from "lucide-react";

const items = [
  {
    id: 1,
    icon: <PaperBag className="w-8 h-8" />,
    title: "Seasonally curated specialty coffee",
    description: "Fresh 8oz or 12oz bags of seasonal coffee",
  },
  {
    id: 2,
    icon: <ScrollText className="w-8 h-8" />,
    title: "Tasting notes and brewing guidance",
    description:
      "Custom brew guides and flavor profiles to help you make the perfect cup",
  },
  {
    id: 3,
    icon: <BookHeart className="w-8 h-8" />,
    title: "Stories from the origin",
    description:
      "In-depth booklet about the origin, farmers, landscapes and processing behind each harvest",
  },
  {
    id: 4,
    icon: <Flame className="w-8 h-8" />,
    title: "Always roasted fresh",
    description:
      "Small batched roasted and shipped directly to ensure peak flavor",
  },
];

export default function InTheBox() {
  return (
    <section className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            What's in the box
          </h2>

          <div className="space-y-6 w-full">
            {items.map((item) => (
              <div className="flex gap-5" key={item.id}>
                <div>{item.icon}</div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <Image
            src="/images/whats-in-box.webp"
            alt="what's in the box"
            height={900}
            width={900}
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
