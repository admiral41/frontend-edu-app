"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  User,
  PlayCircle,
  FileText,
  Download,
  CheckCircle2,
  Lock,
  Image as ImageIcon,
  Youtube,
  ExternalLink,
  MessageSquare,
  Star,
} from "lucide-react";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id;

  // Mock data - would come from API
  const course = {
    id: courseId,
    title: "Mathematics - Algebra",
    instructor: "Ram Sharma",
    instructorImage: "",
    progress: 65,
    totalWeeks: 8,
    completedWeeks: 5,
    totalLessons: 24,
    completedLessons: 16,
  };

  const modules = [
    {
      week: 1,
      title: "Introduction to Algebra",
      lessons: [
        { id: 1, title: "What is Algebra?", duration: "15 min", completed: true },
        { id: 2, title: "Variables and Constants", duration: "20 min", completed: true },
        { id: 3, title: "Basic Operations", duration: "18 min", completed: true },
      ],
    },
    {
      week: 2,
      title: "Linear Equations",
      lessons: [
        { id: 4, title: "Solving Simple Equations", duration: "25 min", completed: true },
        { id: 5, title: "Multi-step Equations", duration: "30 min", completed: false },
        { id: 6, title: "Word Problems", duration: "22 min", completed: false },
      ],
    },
    {
      week: 3,
      title: "Quadratic Equations",
      lessons: [
        { id: 7, title: "Introduction to Quadratics", duration: "20 min", completed: false },
        { id: 8, title: "Factoring Methods", duration: "28 min", completed: false, locked: true },
        { id: 9, title: "Quadratic Formula", duration: "25 min", completed: false, locked: true },
      ],
    },
  ];

  const resources = [
    { id: 1, name: "Algebra Formula Sheet", size: "2.3 MB", type: "pdf", url: "#" },
    { id: 2, name: "Practice Problems Set 1", size: "1.8 MB", type: "pdf", url: "#" },
    { id: 3, name: "Algebra Concept Map", size: "450 KB", type: "image", url: "#" },
    { id: 4, name: "Introduction to Algebra", type: "youtube", url: "https://youtube.com/watch?v=example" },
    { id: 5, name: "Khan Academy - Algebra", type: "link", url: "https://khanacademy.org" },
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "image":
        return ImageIcon;
      case "youtube":
        return Youtube;
      case "link":
        return ExternalLink;
      default:
        return FileText;
    }
  };

  const getResourceAction = (type) => {
    switch (type) {
      case "pdf":
      case "image":
        return { label: "Download", icon: Download };
      case "youtube":
      case "link":
        return { label: "Open", icon: ExternalLink };
      default:
        return { label: "View", icon: ExternalLink };
    }
  };

  const quizzes = [
    {
      id: 1,
      week: 1,
      title: "Introduction to Algebra Quiz",
      totalMarks: 20,
      passingMarks: 12,
      completed: true,
      score: 18,
      attempts: 1,
    },
    {
      id: 2,
      week: 2,
      title: "Linear Equations Quiz",
      totalMarks: 25,
      passingMarks: 15,
      completed: true,
      score: 20,
      attempts: 2,
    },
    {
      id: 3,
      week: 3,
      title: "Quadratic Equations Quiz",
      totalMarks: 30,
      passingMarks: 18,
      completed: false,
      locked: false,
    },
    {
      id: 4,
      week: 4,
      title: "Factorization Quiz",
      totalMarks: 20,
      passingMarks: 12,
      completed: false,
      locked: true,
    },
  ];

  const feedbacks = [
    {
      id: 1,
      teacher: "Ram Sharma",
      date: "Dec 2, 2025",
      rating: 4.5,
      message: "Great progress on linear equations! You've shown excellent understanding of the fundamentals. Keep practicing word problems to build more confidence.",
    },
    {
      id: 2,
      teacher: "Ram Sharma",
      date: "Nov 28, 2025",
      rating: 4,
      message: "Good work on the first week's assignments. Your solutions are correct, but remember to show all working steps clearly.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Course Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {course.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {course.progress}%
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="font-semibold">{course.progress}% Complete</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="exam">Exam</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  {modules.map((module, index) => (
                    <AccordionItem key={module.week} value={`item-${index + 1}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="font-semibold">
                            Week {module.week}: {module.title}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pt-1">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between py-2.5 px-2 hover:bg-accent/30 rounded transition-colors"
                            >
                              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                {lesson.locked ? (
                                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                                ) : lesson.completed ? (
                                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                                ) : (
                                  <PlayCircle className="h-4 w-4 text-primary shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm line-clamp-1">
                                    {lesson.title}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={lesson.completed ? "ghost" : "default"}
                                disabled={lesson.locked}
                                className={`shrink-0 ml-2 h-8 text-xs ${
                                  lesson.completed ? "text-success hover:text-success hover:bg-success/10" : ""
                                }`}
                                onClick={() => {
                                  if (!lesson.locked) {
                                    window.location.href = `/student-dashboard/courses/${courseId}/lessons/${lesson.id}`;
                                  }
                                }}
                              >
                                {lesson.locked
                                  ? "Locked"
                                  : lesson.completed
                                    ? "Completed"
                                    : "Start"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-3">Course Resources</h3>
                <div className="space-y-1">
                  {resources.map((resource) => {
                    const ResourceIcon = getResourceIcon(resource.type);
                    const action = getResourceAction(resource.type);
                    const ActionIcon = action.icon;

                    return (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between py-2.5 px-2 hover:bg-accent/30 rounded transition-colors"
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <ResourceIcon className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1">
                              {resource.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {resource.type.toUpperCase()}
                              {resource.size && ` • ${resource.size}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="shrink-0 ml-2 h-8 text-xs"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ActionIcon className="h-3.5 w-3.5 mr-1.5" />
                          {action.label}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other Tabs - Placeholder */}
          <TabsContent value="assignments" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No assignments yet</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-3">Quizzes</h3>
                {quizzes.length > 0 ? (
                  <div className="space-y-3">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="p-4 border rounded-lg hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                Week {quiz.week}
                              </Badge>
                              {quiz.completed && (
                                <Badge
                                  variant={
                                    quiz.score >= quiz.passingMarks
                                      ? "default"
                                      : "destructive"
                                  }
                                  className={`text-xs ${
                                    quiz.score >= quiz.passingMarks
                                      ? "bg-success text-success-foreground hover:bg-success"
                                      : ""
                                  }`}
                                >
                                  {quiz.score >= quiz.passingMarks
                                    ? "Passed"
                                    : "Failed"}
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-semibold text-sm sm:text-base mb-1">
                              {quiz.title}
                            </h4>
                            {quiz.completed ? (
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>
                                  Score:{" "}
                                  <span className="font-bold text-foreground">
                                    {quiz.score}/{quiz.totalMarks}
                                  </span>
                                </span>
                                <span>Attempts: {quiz.attempts}</span>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                {quiz.totalMarks} marks • Passing: {quiz.passingMarks}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant={quiz.completed ? "outline" : "default"}
                            disabled={quiz.locked}
                            className="shrink-0"
                            onClick={() => {
                              if (!quiz.locked) {
                                window.location.href = `/student-dashboard/courses/${courseId}/quizzes/${quiz.id}`;
                              }
                            }}
                          >
                            {quiz.locked
                              ? "Locked"
                              : quiz.completed
                                ? "Retake"
                                : "Start Quiz"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No quizzes yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exam" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Exam not available yet</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Teacher Feedback
                </h3>
                {feedbacks.length > 0 ? (
                  <div className="space-y-4">
                    {feedbacks.map((feedback) => (
                      <div
                        key={feedback.id}
                        className="p-4 border rounded-lg bg-muted/30"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm">
                              {feedback.teacher}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {feedback.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-semibold">
                              {feedback.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {feedback.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No feedback yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
