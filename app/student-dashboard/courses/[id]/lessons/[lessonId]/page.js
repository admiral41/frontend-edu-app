"use client";

import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { id: courseId, lessonId } = params;

  // Mock data - would come from API
  const lesson = {
    id: lessonId,
    title: "What is Algebra?",
    courseTitle: "Mathematics - Algebra",
    week: 1,
    completed: false,
    content: {
      type: "text", // text, video, pdf
      text: `
        <h2>Introduction to Algebra</h2>
        <p>Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations. It's a powerful tool that helps us solve problems and understand relationships between different values.</p>

        <h3>Why Learn Algebra?</h3>
        <ul>
          <li>Algebra helps develop logical thinking and problem-solving skills</li>
          <li>It's essential for advanced mathematics and sciences</li>
          <li>Used in everyday life: budgeting, cooking, construction, etc.</li>
          <li>Required for many careers in STEM fields</li>
        </ul>

        <h3>Key Concepts</h3>
        <p><strong>Variables:</strong> Letters (like x, y, z) that represent unknown numbers</p>
        <p><strong>Constants:</strong> Fixed numbers that don't change (like 5, 10, 100)</p>
        <p><strong>Expressions:</strong> Combinations of variables and constants (like 2x + 5)</p>
        <p><strong>Equations:</strong> Mathematical statements showing equality (like 2x + 5 = 15)</p>

        <h3>Simple Example</h3>
        <p>If you have x apples and buy 3 more, you now have x + 3 apples. If the total is 10, we can write:</p>
        <p style="text-align: center; font-size: 1.2em; margin: 20px 0;"><strong>x + 3 = 10</strong></p>
        <p>Solving this: x = 7. You originally had 7 apples!</p>
      `,
    },
    resources: [
      {
        id: 1,
        name: "Algebra Basics Worksheet",
        type: "pdf",
        size: "1.2 MB",
        url: "#",
      },
      {
        id: 2,
        name: "Practice Problems",
        type: "pdf",
        size: "800 KB",
        url: "#",
      },
    ],
    navigation: {
      hasPrevious: false,
      hasNext: true,
      previousLessonId: null,
      nextLessonId: 2,
    },
  };

  const handleMarkComplete = () => {
    // API call to mark lesson as complete
    console.log("Marking lesson as complete");
  };

  const handleNext = () => {
    if (!lesson.completed) {
      toast.error("Please complete this lesson first", {
        description: "Mark the lesson as complete before moving to the next one.",
      });
      return;
    }

    if (lesson.navigation.hasNext) {
      router.push(
        `/student-dashboard/courses/${courseId}/lessons/${lesson.navigation.nextLessonId}`
      );
    }
  };

  const handlePrevious = () => {
    if (lesson.navigation.hasPrevious) {
      router.push(
        `/student-dashboard/courses/${courseId}/lessons/${lesson.navigation.previousLessonId}`
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/student-dashboard/courses/${courseId}`)}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <Badge variant="outline" className="mb-2">
                Week {lesson.week}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {lesson.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {lesson.courseTitle}
              </p>
            </div>
            {lesson.completed && (
              <Badge className="bg-success text-success-foreground shrink-0">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <Card className="mb-6">
          <CardContent className="p-6 sm:p-8">
            <div
              className="prose prose-sm sm:prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content.text }}
            />
          </CardContent>
        </Card>

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-3">
                Lesson Resources
              </h3>
              <div className="space-y-2">
                {lesson.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between py-2.5 px-2 hover:bg-accent/30 rounded transition-colors"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {resource.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {resource.type.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="shrink-0 ml-2 h-8 text-xs"
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation & Actions */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!lesson.navigation.hasPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Lesson
          </Button>

          <div className="flex gap-2">
            {!lesson.completed && (
              <Button onClick={handleMarkComplete}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!lesson.navigation.hasNext}
          >
            Next Lesson
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
