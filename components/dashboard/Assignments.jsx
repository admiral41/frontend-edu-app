"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      subject: "Mathematics",
      dueDate: "Dec 8, 2025",
      daysLeft: 4,
      status: "pending",
      description: "Complete exercises 1-15 from Chapter 3. Show all working steps and verify your answers.",
      totalMarks: 20,
      instructions: [
        "Solve all 15 problems",
        "Show complete working",
        "Submit before deadline",
      ],
    },
    {
      id: 2,
      title: "Newton's Laws Essay",
      subject: "Physics",
      dueDate: "Dec 6, 2025",
      daysLeft: 2,
      status: "due-soon",
      description: "Write a 500-word essay explaining Newton's three laws of motion with real-world examples.",
      totalMarks: 25,
      instructions: [
        "Minimum 500 words",
        "Include 3 examples for each law",
        "Cite sources properly",
      ],
    },
    {
      id: 3,
      title: "Photosynthesis Lab Report",
      subject: "Biology",
      dueDate: "Dec 10, 2025",
      daysLeft: 6,
      status: "pending",
      description: "Submit lab report based on last week's photosynthesis experiment.",
      totalMarks: 30,
      instructions: [
        "Include hypothesis and methodology",
        "Present data in tables/graphs",
        "Write conclusion based on results",
      ],
    },
  ];

  const getStatusBadge = (status, daysLeft) => {
    if (status === "due-soon") {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Due in {daysLeft}d
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        {daysLeft} days left
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
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {assignment.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {assignment.subject} • {assignment.totalMarks} marks
                  </p>
                </div>
                {getStatusBadge(assignment.status, assignment.daysLeft)}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{assignment.dueDate}</span>
              </div>

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
      <Dialog
        open={!!selectedAssignment}
        onOpenChange={() => setSelectedAssignment(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {selectedAssignment?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedAssignment?.subject} • {selectedAssignment?.totalMarks}{" "}
              marks
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Due Date Info */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {selectedAssignment?.dueDate}</span>
                </div>
                {selectedAssignment &&
                  getStatusBadge(
                    selectedAssignment.status,
                    selectedAssignment.daysLeft
                  )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {selectedAssignment?.description}
              </p>
            </div>

            {/* Instructions */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Instructions</h4>
              <ul className="space-y-1.5">
                {selectedAssignment?.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button className="flex-1">Start Assignment</Button>
              <Button variant="outline" className="flex-1">
                Download Resources
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
