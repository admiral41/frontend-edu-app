"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

export default function MyCoursesPage() {
  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      title: "Mathematics - Algebra",
      category: "SEE",
      instructor: "Prof. Ram Sharma",
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      lastAccessed: "2 hours ago",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Physics - Mechanics",
      category: "SEE",
      instructor: "Dr. Sita Thapa",
      progress: 45,
      totalLessons: 40,
      completedLessons: 18,
      lastAccessed: "1 day ago",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Chemistry - Organic Chemistry",
      category: "+2",
      instructor: "Prof. Hari Gautam",
      progress: 100,
      totalLessons: 38,
      completedLessons: 38,
      lastAccessed: "3 days ago",
      status: "completed",
    },
  ];

  const inProgressCourses = enrolledCourses.filter(
    (c) => c.status === "in-progress"
  );
  const completedCourses = enrolledCourses.filter(
    (c) => c.status === "completed"
  );

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Track your learning progress and continue where you left off
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <PlayCircle className="h-4 w-4 text-info" />
                <span className="text-xs text-muted-foreground">
                  In Progress
                </span>
              </div>
              <div className="text-2xl font-bold">
                {inProgressCourses.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              <div className="text-2xl font-bold">
                {completedCourses.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
            <div className="grid gap-3">
              {inProgressCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {course.instructor}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {course.category}
                        </Badge>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {course.completedLessons}/{course.totalLessons}{" "}
                            Lessons
                          </span>
                          <span className="font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" colorByProgress />
                      </div>

                      {/* Action */}
                      <div>
                        <Link href={`/student-dashboard/courses/${course.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Continue Learning
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Completed Courses</h2>
            <div className="grid gap-3">
              {completedCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base">
                              {course.title}
                            </h3>
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {course.instructor}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {course.category}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {course.totalLessons} Lessons
                        </span>
                        <span className="text-success font-medium">
                          100% Complete
                        </span>
                      </div>

                      {/* Action */}
                      <div>
                        <Link href={`/student-dashboard/courses/${course.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            Review Course
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
