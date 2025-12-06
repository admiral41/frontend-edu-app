"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AssignmentDetailsDialog from "@/components/dashboard/AssignmentDetailsDialog";
import { getProgressColor } from "@/lib/utils/progress";
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
  Clock,
  Upload,
  AlertCircle,
} from "lucide-react";

export default function CoursePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.id;
  const tabParam = searchParams.get('tab');

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

  const assignments = [
    {
      week: 1,
      title: "Introduction to Algebra Assignments",
      items: [
        {
          id: 1,
          title: "Practice: Variables and Constants",
          description: `<p>Complete the following exercises to practice identifying and working with variables and constants:</p>
            <ol>
              <li>Identify variables and constants in the given expressions</li>
              <li>Evaluate expressions for given variable values</li>
              <li>Write expressions for word problems</li>
            </ol>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Show all your working</li>
              <li>Write clear explanations for each step</li>
              <li>Submit as PDF or images</li>
            </ul>`,
          dueDate: "Dec 15, 2025",
          totalMarks: 20,
          submitted: true,
          submittedDate: "Dec 10, 2025",
          feedback: {
            reviewed: true,
            marks: 18,
            comment: "Excellent work! Your solutions are clear and well-explained. Minor calculation error in question 3.",
            reviewedBy: "Ram Sharma",
            reviewedDate: "Dec 12, 2025"
          }
        },
        {
          id: 2,
          title: "Assignment: Basic Operations",
          description: `<p>Practice basic algebraic operations with the following problems:</p>
            <ol>
              <li>Simplify the given expressions</li>
              <li>Solve basic equations</li>
              <li>Apply order of operations (BODMAS)</li>
            </ol>
            <p><strong>Note:</strong> This assignment covers fundamental concepts that will be used throughout the course.</p>`,
          dueDate: "Dec 18, 2025",
          totalMarks: 15,
          submitted: false,
          feedback: null
        }
      ]
    },
    {
      week: 2,
      title: "Linear Equations Assignments",
      items: [
        {
          id: 3,
          title: "Solving Linear Equations",
          description: `<p>Solve the following linear equations and verify your answers:</p>
            <ol>
              <li>One-step equations (5 problems)</li>
              <li>Two-step equations (5 problems)</li>
              <li>Multi-step equations (5 problems)</li>
            </ol>
            <p><strong>Submission Requirements:</strong></p>
            <ul>
              <li>Show complete working for each problem</li>
              <li>Verify your answers by substitution</li>
              <li>Explain your approach for at least 3 problems</li>
            </ul>`,
          dueDate: "Dec 22, 2025",
          totalMarks: 25,
          submitted: true,
          submittedDate: "Dec 20, 2025",
          feedback: {
            reviewed: false,
            comment: null
          }
        },
        {
          id: 4,
          title: "Word Problems Practice",
          description: `<p>Solve real-world problems using linear equations:</p>
            <ol>
              <li>Age-related problems</li>
              <li>Distance and speed problems</li>
              <li>Money and percentage problems</li>
              <li>Mixture problems</li>
            </ol>
            <p>For each problem, write the equation and show all steps clearly.</p>`,
          dueDate: "Dec 25, 2025",
          totalMarks: 20,
          submitted: false,
          feedback: null
        }
      ]
    },
    {
      week: 3,
      title: "Quadratic Equations Assignments",
      items: [
        {
          id: 5,
          title: "Factoring Practice",
          description: `<p>Practice factoring quadratic expressions and solving quadratic equations:</p>
            <ol>
              <li>Factor simple quadratic expressions</li>
              <li>Solve equations by factoring</li>
              <li>Identify special products (difference of squares, perfect squares)</li>
            </ol>`,
          dueDate: "Dec 30, 2025",
          totalMarks: 30,
          submitted: false,
          locked: true,
          feedback: null
        }
      ]
    }
  ];

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [activeTab, setActiveTab] = useState("modules");

  // Handle tab from URL parameter
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

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
                className={`h-full ${getProgressColor(course.progress)} transition-all duration-300`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                                className={`shrink-0 ml-2 h-8 text-xs ${lesson.completed ? "text-success hover:text-success hover:bg-success/10" : ""
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

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-3">Course Assignments</h3>
                <Accordion type="single" collapsible className="w-full">
                  {assignments.map((weekGroup, index) => (
                    <AccordionItem key={weekGroup.week} value={`week-${index + 1}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="font-semibold">
                            Week {weekGroup.week}: {weekGroup.title}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {weekGroup.items.filter(a => a.submitted).length}/{weekGroup.items.length} Submitted
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-1">
                          {weekGroup.items.map((assignment) => (
                            <div
                              key={assignment.id}
                              className="p-4 border rounded-lg hover:bg-accent/30 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <h4 className="font-semibold text-sm sm:text-base">
                                      {assignment.title}
                                    </h4>
                                    {assignment.submitted && (
                                      <Badge
                                        variant={assignment.feedback?.reviewed ? "default" : "secondary"}
                                        className={`text-xs ${assignment.feedback?.reviewed
                                          ? "bg-success text-success-foreground hover:bg-success"
                                          : ""
                                          }`}
                                      >
                                        {assignment.feedback?.reviewed
                                          ? `Graded: ${assignment.feedback.marks}/${assignment.totalMarks}`
                                          : "Pending Review"}
                                      </Badge>
                                    )}
                                    {assignment.locked && (
                                      <Badge variant="outline" className="text-xs">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Locked
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      Due: {assignment.dueDate}
                                    </span>
                                    <span>Marks: {assignment.totalMarks}</span>
                                    {assignment.submitted && (
                                      <span className="text-success">
                                        ✓ Submitted on {assignment.submittedDate}
                                      </span>
                                    )}
                                  </div>

                                  {assignment.submitted && assignment.feedback?.reviewed && (
                                    <div className="mt-2 p-3 bg-muted/50 rounded border-l-4 border-success">
                                      <p className="text-xs font-semibold mb-1 flex items-center gap-1.5">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        Teacher Feedback
                                      </p>
                                      <p className="text-sm text-foreground">{assignment.feedback.comment}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        - {assignment.feedback.reviewedBy} • {assignment.feedback.reviewedDate}
                                      </p>
                                    </div>
                                  )}

                                  {assignment.submitted && !assignment.feedback?.reviewed && (
                                    <div className="mt-2 p-3 bg-muted/30 rounded border-l-4 border-primary">
                                      <p className="text-xs flex items-center gap-1.5 text-muted-foreground">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        Not reviewed yet. Your teacher will provide feedback soon.
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <Button
                                  size="sm"
                                  variant={assignment.submitted ? "outline" : "default"}
                                  disabled={assignment.locked}
                                  className="shrink-0"
                                  onClick={() => setSelectedAssignment(assignment)}
                                >
                                  {assignment.locked
                                    ? "Locked"
                                    : assignment.submitted
                                      ? "View Details"
                                      : "Start Assignment"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {assignments.length === 0 && (
                  <div className="py-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No assignments yet</p>
                  </div>
                )}
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
                                  className={`text-xs ${quiz.score >= quiz.passingMarks
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

        {/* Assignment Details Dialog */}
        <AssignmentDetailsDialog
          assignment={selectedAssignment}
          open={!!selectedAssignment}
          onOpenChange={(open) => !open && setSelectedAssignment(null)}
        />
      </div>
    </DashboardLayout>
  );
}
