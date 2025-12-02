"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Clock, Users, BookOpen, TrendingUp } from "lucide-react";
import { whyChooseUs } from "@/lib/constants/data";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

const iconMap = {
  GraduationCap: GraduationCap,
  Award: Award,
  Clock: Clock,
  Users: Users,
  BookOpen: BookOpen,
  TrendingUp: TrendingUp,
};

function FeatureCard({ feature, index }) {
  const [ref, isVisible] = useIntersectionObserver();
  const Icon = iconMap[feature.icon];

  return (
    <Card
      ref={ref}
      className={cn(
        "text-center hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardHeader>
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {Icon && <Icon className="h-8 w-8 text-primary" />}
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
}

export default function WhyChooseUs() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose PadhaiHub?
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide the best learning experience for SEE and +2 students across Nepal
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {whyChooseUs.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
