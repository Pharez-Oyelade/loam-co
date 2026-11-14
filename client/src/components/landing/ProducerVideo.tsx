"use client";

import { useEffect, useRef } from "react";

export default function ProducerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/coffee-landscape.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/coffee-landscape.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <h1 className="max-w-xl text-5xl text-white">
          We go beyond the label so you can taste the place.
        </h1>

        <p className="mt-6 max-w-sm text-white/80">
          We work with producers who care as much about quality and people as we
          do
        </p>

        <a href="/producers" className="mt-10 inline-block text-white">
          MEET OUR PRODUCERS
        </a>
      </div>
    </section>
  );
}
