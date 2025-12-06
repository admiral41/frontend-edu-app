"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AssignmentDetailsDialog from "./AssignmentDetailsDialog";
import { FileText, Calendar, AlertCircle, Clock, MessageSquare } from "lucide-react";

export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Mock assignments matching the course module structure
  const assignments = [
    {
      id: 1,
      courseId: 1,
      courseName: "Mathematics - Algebra",
      week: 1,
      title: "Practice: Variables and Constants",
      description: `<p>Complete the following exercises to practice identifying and working with variables and constants:</p>
        <ol>
          <li>Identify variables and constants in the given expressions</li>
          <li>Evaluate expressions for given variable values</li>
          <li>Write expressions for word problems</li>
        </ol>`,
      dueDate: "Dec 15, 2025",
      totalMarks: 20,
      submitted: true,
      submittedDate: "Dec 10, 2025",
      feedback: {
        reviewed: true,
        marks: 18,
        comment: "Excellent work! Your solutions are clear and well-explained.",
        reviewedBy: "Ram Sharma",
        reviewedDate: "Dec 12, 2025"
      }
    },
    {
      id: 2,
      courseId: 1,
      courseName: "Mathematics - Algebra",
      week: 1,
      title: "Assignment: Basic Operations",
      description: `<p>Practice basic algebraic operations with the following problems:</p>
        <ol>
          <li>Simplify the given expressions</li>
          <li>Solve basic equations</li>
          <li>Apply order of operations (BODMAS)</li>
        </ol>`,
      dueDate: "Dec 18, 2025",
      totalMarks: 15,
      submitted: false,
      feedback: null
    },
    {
      id: 3,
      courseId: 1,
      courseName: "Mathematics - Algebra",
      week: 2,
      title: "Solving Linear Equations",
      description: `<p>Solve the following linear equations and verify your answers:</p>
        <ol>
          <li>One-step equations (5 problems)</li>
          <li>Two-step equations (5 problems)</li>
          <li>Multi-step equations (5 problems)</li>
        </ol>`,
      dueDate: "Dec 22, 2025",
      totalMarks: 25,
      submitted: true,
      submittedDate: "Dec 20, 2025",
      feedback: {
        reviewed: false,
        comment: null
      }
    },
  ];

  const getStatusBadge = (assignment) => {
    if (assignment.submitted) {
      if (assignment.feedback?.reviewed) {
        return (
          <Badge className="flex items-center gap-1 text-xs bg-success text-success-foreground hover:bg-success">
            Graded: {assignment.feedback.marks}/{assignment.totalMarks}
          </Badge>
        );
      }
      return (
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          Pending Review
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="flex items-center gap-1 text-xs">
        <Clock className="h-3 w-3" />
        Not Submitted
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Upcoming Assignments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-3">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
                    {assignment.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {assignment.courseName} • Week {assignment.week}
                  </p>
                </div>
                {getStatusBadge(assignment)}
              </div>

              <div className="flex items-center justify-between text-xs mb-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                <span className="text-muted-foreground">{assignment.totalMarks} marks</span>
              </div>

              {assignment.submitted && assignment.feedback?.reviewed && (
                <div className="mb-2.5 p-2 bg-muted/30 rounded text-xs">
                  <p className="flex items-center gap-1 text-muted-foreground mb-1">
                    <MessageSquare className="h-3 w-3" />
                    <span className="font-medium">Teacher Feedback</span>
                  </p>
                  <p className="text-foreground line-clamp-2">{assignment.feedback.comment}</p>
                </div>
              )}

              {assignment.submitted && !assignment.feedback?.reviewed && (
                <div className="mb-2.5 p-2 bg-info/10 rounded text-xs flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-info shrink-0" />
                  <span className="text-foreground">Awaiting teacher review</span>
                </div>
              )}

              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs h-8"
                onClick={() => setSelectedAssignment(assignment)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Assignment Details Dialog */}
      <AssignmentDetailsDialog
        assignment={selectedAssignment}
        open={!!selectedAssignment}
        onOpenChange={(open) => !open && setSelectedAssignment(null)}
        dashboardMode={true}
      />
    </Card>
  );
}
