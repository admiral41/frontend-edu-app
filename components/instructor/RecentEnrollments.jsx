"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

// Mock data - will be replaced with API data
const enrollments = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    studentAvatar: null,
    courseName: "Complete Web Development Bootcamp",
    enrolledAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    amount: "Rs. 2,999",
  },
  {
    id: 2,
    studentName: "Priya Thapa",
    studentAvatar: null,
    courseName: "React.js Masterclass",
    enrolledAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    amount: "Rs. 1,999",
  },
  {
    id: 3,
    studentName: "Bikash Gurung",
    studentAvatar: null,
    courseName: "Complete Web Development Bootcamp",
    enrolledAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    amount: "Rs. 2,999",
  },
  {
    id: 4,
    studentName: "Sita Rai",
    studentAvatar: null,
    courseName: "React.js Masterclass",
    enrolledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    amount: "Rs. 1,999",
  },
];

export default function RecentEnrollments() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={enrollment.studentAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {enrollment.studentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {enrollment.studentName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {enrollment.courseName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium text-primary">
                {enrollment.amount}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(enrollment.enrolledAt, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
