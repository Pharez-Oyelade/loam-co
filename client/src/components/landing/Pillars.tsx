export default function Pillars() {
  return (
    <section className="py-16 sm:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mt-2">
            Three Pillars in Every Box.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="text-center flex flex-col items-center gap-5">
            <img
              src="/images/origin-transparency.svg"
              alt=""
              className="w-24 h-24"
            />
            <h3 className="font-bold text-xl">Origin Transparency</h3>
            <p>We share what we know, from the farm to the flavor</p>
          </div>

          {/* Pillar 2 */}
          <div className="text-center flex flex-col items-center gap-5">
            <img
              src="/images/small-batch-integrity.svg"
              alt=""
              className="w-24 h-24"
            />
            <h3 className="font-bold text-xl">Small-batch Integrity</h3>
            <p>
              Thoughtfully sourced, carefully roasted and consistently excellent
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="text-center flex flex-col items-center gap-5">
            <img
              src="/images/unhuried-ritual.svg"
              alt=""
              className="w-24 h-24"
            />
            <h3 className="font-bold text-xl">Unhuried Ritual</h3>
            <p>Coffee worth slowing down for, delivered on your own terms</p>
          </div>
        </div>
      </div>
    </section>
  );
}
