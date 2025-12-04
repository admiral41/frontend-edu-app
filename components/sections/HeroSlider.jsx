"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { heroSlides } from "@/lib/constants/data";
import { cn } from "@/lib/utils";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const gradients = [
    "bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#4a90d9]",
    "bg-gradient-to-br from-primary via-[#1e3a5f] to-secondary",
    "bg-gradient-to-br from-[#2d5a87] via-[#1e3a5f] to-[#152a45]",
  ];

  const floatingCards = [
    {
      icon: "🎯",
      title: "5000+ Students",
      subtitle: "All over Nepal",
      delay: "0s",
    },
    {
      icon: "⭐",
      title: "95% Pass Rate",
      subtitle: "SEE 2080 Batch",
      delay: "1s",
    },
    {
      icon: "👨‍🏫",
      title: "50+ Teachers",
      subtitle: "Experienced Faculty",
      delay: "2s",
    },
  ];

  const features = [
    "Live Interactive Classes",
    "Expert Nepal Board Teachers",
    "Doubt Clearing Sessions",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen py-24 md:py-32 flex items-center overflow-hidden"
    >
      {/* Dynamic Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-1000",
          gradients[currentSlide]
        )}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"
                fill="white"
                fillOpacity="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-sm md:text-base font-semibold text-white">
                Nepal's #1 Online Learning Platform
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <Button
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-primary hover:bg-primary/90 shadow-lg"
              >
                {heroSlides[currentSlide].cta} →
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                💬 WhatsApp Us
              </Button>
            </div>

            {/* Features */}
            <div className="flex gap-4 md:gap-6 flex-wrap">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/90"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Cards */}
          <div className="relative hidden md:block h-[400px] overflow-hidden">
            {floatingCards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  "absolute bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl",
                  index === 0 && "top-8 right-4 lg:right-20",
                  index === 1 && "top-40 right-0 lg:right-12",
                  index === 2 && "top-64 right-4 lg:right-16"
                )}
                style={{
                  animation: `float 4s ease-in-out infinite`,
                  animationDelay: card.delay,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      {card.title}
                    </h4>
                    <p className="text-sm text-gray-600">{card.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all",
                  currentSlide === index
                    ? "bg-primary w-6 md:w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  );
}
