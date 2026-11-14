"use client";

import { useState } from "react";

export default function Pricing() {
  const [subscribeToggle, setSubscribeToggle] = useState<
    "subscribe" | "one-time"
  >("subscribe");

  return (
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col justify-center items-center text-center w-full">
          <h2 className="text-center text-3xl font-serif font-bold mb-3">
            Choose your plan
          </h2>

          <div
            role="group"
            aria-label="Purchase type"
            className="border border-border rounded-full flex justify-between items-center gap-2 text-sm"
          >
            <button
              type="button"
              aria-pressed={subscribeToggle === "subscribe"}
              onClick={() => setSubscribeToggle("subscribe")}
              className={`${subscribeToggle === "subscribe" ? "bg-green-700 text-white" : ""} px-3 py-2 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700`}
            >
              SUBSCRIBE
            </button>
            <button
              type="button"
              aria-pressed={subscribeToggle === "one-time"}
              onClick={() => setSubscribeToggle("one-time")}
              className={`${subscribeToggle === "one-time" ? "bg-green-700 text-white" : ""} px-3 py-2 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700`}
            >
              ONE-TIME
            </button>
          </div>
        </div>

        {/* pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-0 sm:mt-8">
          {/* Tier 1: Taster */}
          <div className="border py-5 px-3 rounded-2xl flex flex-col justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-center">Taster</h3>
              <p className="text-center text-sm text-muted mb-4">
                For the occasional coffee drinker
              </p>
            </div>

            <p className="text-primary text-lg font-bold">$18 / shipment</p>

            <p className="text-sm text-muted text-center">
              8oz bag of seasonal coffee, shipped every 2 weeks
            </p>

            <div className="text-center">
              <p>1 bag every 2 weeks</p>
              <p>Pause or cancel anytime</p>
            </div>

            <button className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Tier 2: Everyday */}
          <div className="border border-primary py-5 px-3 rounded-2xl flex flex-col justify-between items-center gap-4 relative">
            <div className="absolute top-0 right-1/2 translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-b-lg">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-center">Everyday</h3>
              <p className="text-center text-sm text-muted mb-4">
                For the daily coffee enthusiast
              </p>
            </div>

            <p className="text-primary text-lg font-bold">$32 / shipment</p>

            <p className="text-sm text-muted text-center">
              12oz bag of seasonal coffee, shipped every 4 weeks
            </p>

            <div className="text-center">
              <p>2 bags every 4 weeks</p>
              <p>Free shipping</p>
            </div>

            <button className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Tier 3: Household */}
          <div className="border py-5 px-3 rounded-2xl flex flex-col justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-center">Household</h3>
              <p className="text-center text-sm text-muted mb-4">
                For the serious coffee connoisseur
              </p>
            </div>

            <p className="text-primary text-lg font-bold">$48 / shipment</p>

            <p className="text-sm text-muted text-center">
              12oz bag of seasonal coffee, shipped every 4 weeks
            </p>

            <div className="text-center">
              <p>3 bags every 4 weeks</p>
              <p>Free shipping + priority access</p>
            </div>

            <button className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
