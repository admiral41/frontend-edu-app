"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Users, Star } from "lucide-react";
import { courses } from "@/lib/constants/data";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function CourseCard({ course, index }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Card
      ref={ref}
      className={cn(
        "overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">📖</div>
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
              isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
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

      <CardHeader className="flex-grow">
        <Badge variant="secondary" className="w-fit mb-2">
          {course.category}
        </Badge>
        <CardTitle className="text-lg md:text-xl line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating} ({course.reviews})</span>
          </div>
        </div>

        {/* Instructor */}
        <div className="text-sm">
          <span className="text-muted-foreground">Instructor: </span>
          <span className="font-medium">{course.instructor}</span>
        </div>

        {/* Level */}
        <div>
          <Badge variant="outline">{course.level}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-4 border-t">
        {/* Pricing */}
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-2xl font-bold text-primary">
              NPR {course.price.toLocaleString()}
            </div>
            {course.originalPrice > course.price && (
              <div className="text-sm text-muted-foreground line-through">
                NPR {course.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Enroll Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={() => toast.info("Coming Soon!", {
            description: "Enrollments will open soon. Stay tuned!"
          })}
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Courses() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="courses" className="py-16 md:py-24 bg-secondary/5">
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
            Popular Courses
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our wide range of courses designed for SEE and +2 students
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => toast.info("Coming Soon!", {
              description: "More courses will be available soon!"
            })}
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
