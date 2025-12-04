"use client";

import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { platformStats } from "@/lib/constants/data";

function CountUp({ end, duration = 2000, suffix = "", isVisible }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, hasAnimated, isVisible]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Fallback: trigger animation after component mounts
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const isActive = isVisible || shouldAnimate;

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-secondary relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Join Thousands of Successful Students
          </h2>
          <p className="text-white/80 text-lg">
            Making education accessible across Nepal
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {platformStats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 text-center hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300 group"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s ease-out ${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-white drop-shadow-lg">
                  <CountUp end={stat.value} suffix={stat.suffix} isVisible={isActive} />
                </div>
                <div className="text-sm md:text-base text-white/90 font-semibold uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
