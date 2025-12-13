"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, X, Eye } from "lucide-react";
import { toast } from "sonner";

// Mock data
const pendingCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Ramesh Kumar",
    category: "Web Development",
    price: 2499,
    submittedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    instructor: "Sunita Adhikari",
    category: "Data Science",
    price: 3999,
    submittedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Flutter App Development",
    instructor: "Prakash Shrestha",
    category: "Mobile Development",
    price: 2999,
    submittedAt: "1 day ago",
  },
];

export default function PendingCourses() {
  const handleApprove = (id) => {
    toast.success("Course approved and published!");
  };

  const handleReject = (id) => {
    toast.success("Course rejected.");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Pending Course Approvals
        </CardTitle>
        <Badge variant="secondary">{pendingCourses.length} pending</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingCourses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No courses pending approval
          </p>
        ) : (
          <>
            {pendingCourses.map((course) => (
              <div
                key={course.id}
                className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{course.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      by {course.instructor}
                    </p>
                  </div>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Rs. {course.price.toLocaleString()}</span>
                  <span>Submitted {course.submittedAt}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin-dashboard/courses/${course.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleApprove(course.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleReject(course.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Link href="/admin-dashboard/courses?status=pending">
              <Button variant="outline" className="w-full" size="sm">
                View All Pending Courses
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
