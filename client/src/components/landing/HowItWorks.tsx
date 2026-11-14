import {
  SquareChartGantt,
  Groceries,
  Truck,
  FaceSlightlySmilingPlus,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Choose Your Plan",
    description: "Pick your cadence and preferences",
    icon: <SquareChartGantt className="w-8 h-8" />,
  },
  {
    id: "02",
    title: "Curated Selections",
    description: "We source and roast in small batches",
    icon: <Groceries className="w-8 h-8" />,
  },
  {
    id: "03",
    title: "Delivered to You",
    description: "Fresh coffee delivered to your door",
    icon: <Truck className="w-8 h-8" />,
  },
  {
    id: "04",
    title: "Savor & Enjoy",
    description: "Brew, sip, pause and make it yours",
    icon: <FaceSlightlySmilingPlus className="w-8 h-8" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              className="text-center flex flex-col items-center gap-2"
              key={step.id}
            >
              {/* icon */}
              <div className="text-white/50">{step.icon}</div>
              <span className="text-sm font-serif">{step.id}</span>
              {/* text */}
              <p className="text-lg">{step.title}</p>
              <p className="text-white/50">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
