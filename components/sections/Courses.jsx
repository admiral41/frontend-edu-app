"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { courses } from "@/lib/constants/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function CourseCard({ course, index }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl">📖</div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            )}
          />
        </button>

        {/* Discount Badge */}
        {course.discount > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-destructive text-destructive-foreground">
              {course.discount}% OFF
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-grow pb-3">
        <Badge variant="secondary" className="w-fit mb-1 text-xs">
          {course.category}
        </Badge>
        <CardTitle className="text-base md:text-lg line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-3">
        {/* Level */}
        <Badge variant="outline" className="text-xs">
          {course.level}
        </Badge>
      </CardContent>

      <CardFooter className="flex flex-col gap-2.5 pt-3 border-t">
        {/* Pricing */}
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-xl font-bold text-primary">
              NPR {course.price.toLocaleString()}
            </div>
            {course.originalPrice > course.price && (
              <div className="text-xs text-muted-foreground line-through">
                NPR {course.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Enroll Button */}
        <Button
          className="w-full"
          size="sm"
          onClick={() =>
            toast.info("Coming Soon!", {
              description: "Enrollments will open soon. Stay tuned!",
            })
          }
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Courses() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="courses" className="py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our wide range of courses designed for SEE and +2
            students
          </p>
        </div>

        {/* Course Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors shadow-lg hidden md:flex items-center justify-center"
            aria-label="Previous courses"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors shadow-lg hidden md:flex items-center justify-center"
            aria-label="Next courses"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
              >
                <CourseCard course={course} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              toast.info("Coming Soon!", {
                description: "More courses will be available soon!",
              })
            }
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
