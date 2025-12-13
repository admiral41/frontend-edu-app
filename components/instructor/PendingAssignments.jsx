"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Clock, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data - will be replaced with API data
const pendingSubmissions = [
  {
    id: 1,
    assignmentTitle: "Build a Todo App",
    courseName: "Complete Web Development Bootcamp",
    submissionsCount: 12,
    pendingGrading: 8,
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 2,
    assignmentTitle: "Create a Custom Hook",
    courseName: "React.js Masterclass",
    submissionsCount: 5,
    pendingGrading: 5,
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    assignmentTitle: "REST API Project",
    courseName: "Node.js Backend Development",
    submissionsCount: 3,
    pendingGrading: 3,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
];

export default function PendingAssignments() {
  const totalPending = pendingSubmissions.reduce(
    (sum, a) => sum + a.pendingGrading,
    0
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold">Pending Grading</CardTitle>
          {totalPending > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {totalPending}
            </Badge>
          )}
        </div>
        <Link href="/instructor-dashboard/assignments">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingSubmissions.map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardList className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">
                {assignment.assignmentTitle}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {assignment.courseName}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {assignment.submissionsCount} submissions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {assignment.dueDate > new Date()
                    ? `Due ${formatDistanceToNow(assignment.dueDate, { addSuffix: true })}`
                    : `Overdue ${formatDistanceToNow(assignment.dueDate, { addSuffix: false })}`}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <Badge variant="secondary" className="mb-1">
                {assignment.pendingGrading} to grade
              </Badge>
              <Link href={`/instructor-dashboard/assignments/${assignment.id}`}>
                <Button size="sm" variant="outline" className="w-full">
                  Grade
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
