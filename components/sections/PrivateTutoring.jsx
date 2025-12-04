"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

const tutoringBenefits = [
  {
    id: 1,
    icon: "🎯",
    title: "100% Personalized Curriculum",
    description:
      "Learning plan designed specifically for your child's needs and pace",
  },
  {
    id: 2,
    icon: "⏰",
    title: "Flexible Timing",
    description:
      "Choose class times that suit your schedule - morning, evening, or weekends",
  },
  {
    id: 3,
    icon: "👨‍🏫",
    title: "Expert Teachers",
    description:
      "Experienced tutors with proven track records and subject expertise",
  },
  {
    id: 4,
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Regular assessments and detailed progress reports for parents",
  },
  {
    id: 5,
    icon: "🔄",
    title: "Instant Doubt Clearing",
    description: "Ask questions anytime during class, no waiting for your turn",
  },
];

const tutoringFeatures = [
  "One-on-one live video sessions",
  "Personalized study material",
  "Flexible scheduling",
  "Weekly progress reports",
  "WhatsApp doubt support",
  "Free demo class available",
];

export default function PrivateTutoring() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="tutoring"
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-secondary relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tutoring-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="11" cy="11" r="7" fill="white" fillOpacity="0.3" />
              <circle cx="59" cy="43" r="7" fill="white" fillOpacity="0.3" />
              <circle cx="16" cy="36" r="3" fill="white" fillOpacity="0.3" />
              <circle cx="79" cy="67" r="3" fill="white" fillOpacity="0.3" />
              <circle cx="34" cy="90" r="3" fill="white" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tutoring-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-950 border-yellow-500/30 hover:from-yellow-300 hover:to-yellow-500 shadow-lg shadow-yellow-500/20 font-semibold">
            Premium Service
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            One-to-One Private Tutoring
          </h2>
          <p className="text-lg text-white/90">
            Personalized attention with dedicated teachers. Perfect for students
            who need extra help or want to excel beyond the classroom.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Benefits List */}
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why Choose{" "}
              <span className="text-yellow-300">Private Tutoring?</span>
            </h3>

            <div className="space-y-4">
              {tutoringBenefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="flex items-start gap-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    transition: `all 0.5s ease-out ${(index + 1) * 100}ms`,
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 text-xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            )}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-50 text-red-600 hover:bg-red-100">
                  ✨ Most Effective
                </Badge>
              </div>

              <CardContent className="pt-12 pb-8 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  1:1 Live Tutoring
                </h3>
                <p className="text-muted-foreground mb-6">
                  Personal teacher for your child
                </p>

                <div className="mb-6">
                  <div className="text-5xl font-extrabold text-primary">
                    Rs. 1,500
                  </div>
                  <span className="text-muted-foreground">/hour</span>
                </div>

                <div className="space-y-3 mb-8 text-left">
                  {tutoringFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Free Demo Class →
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Package discounts available for 10+ hours/month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
    </section>
  );
}
