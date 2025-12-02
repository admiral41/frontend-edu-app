"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants/data";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

function TestimonialCard({ testimonial, index }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Card
      ref={ref}
      className={cn(
        "hover:shadow-lg transition-all duration-300 h-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="pt-6 space-y-4">
        {/* Quote Icon */}
        <div className="text-primary/20">
          <Quote className="h-10 w-10" />
        </div>

        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-muted-foreground italic">
          "{testimonial.text}"
        </p>

        {/* Course Taken */}
        <div className="text-sm text-primary font-medium">
          {testimonial.course}
        </div>

        {/* Student Info */}
        <div className="flex items-center gap-3 pt-4 border-t">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl font-bold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/5">
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
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our students who achieved their academic goals with PadhaiHub
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
