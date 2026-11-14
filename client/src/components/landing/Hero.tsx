import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Globe, Sprout, Package, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <Image
        src="/images/LoamHero.png"
        alt=""
        priority
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-white flex flex-col flex-1 pt-16 sm:pt-20">
        {/* Hero Content */}
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex-1 flex flex-col justify-center">
          <div className="text-xs text-primary flex items-center gap-2">
            <img
              src="/images/icons8-leaf.svg"
              alt=""
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
            />
            <span className="tracking-widest font-semibold text-[11px] sm:text-xs uppercase">
              SPECIALTY COFFEE. CURATED FOR YOU.
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white leading-[1.08] font-bold mt-4 sm:mt-6">
            Better coffee, <br className="hidden sm:inline" /> delivered.
          </h1>

          <p className="text-sm sm:text-base text-stone-200 mt-3 mb-6 sm:mb-8 max-w-xl leading-relaxed">
            Discover exceptional coffee from independent roasters around the
            world, delivered to your door, every month. Traceable, curated, and
            roasted to perfection.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              GET YOUR BOX
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:text-white"
            >
              HOW IT WORKS
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3 w-full lg:w-4/5 xl:w-2/3 mt-12 sm:mt-16 lg:mt-20">
            <div className="text-center flex flex-col items-center gap-1 px-2 border-r border-primary/40">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1" />
              <p className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                WORLD-CLASS COFFEES
              </p>
              <span className="text-[11px] sm:text-xs text-stone-300">
                Handpicked from the best roasters
              </span>
            </div>

            <div className="text-center flex flex-col items-center gap-1 px-2 lg:border-r lg:border-primary/40">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1" />
              <p className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                FRESH TO YOU
              </p>
              <span className="text-[11px] sm:text-xs text-stone-300">
                Roasted fresh. Shipped fast.
              </span>
            </div>

            <div className="text-center flex flex-col items-center gap-1 px-2 border-r border-primary/40">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1" />
              <p className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                CURATED BOXES
              </p>
              <span className="text-[11px] sm:text-xs text-stone-300">
                Expertly curated. Always seasonal.
              </span>
            </div>

            <div className="text-center flex flex-col items-center gap-1 px-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1" />
              <p className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                MADE BY PEOPLE
              </p>
              <span className="text-[11px] sm:text-xs text-stone-300">
                Supporting roasters and their communities.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
