"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";

// Mock data - will be replaced with API data
const upcomingClasses = [
  {
    id: 1,
    title: "JavaScript Fundamentals - Live Q&A",
    courseName: "Complete Web Development Bootcamp",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: "1 hour",
    registeredStudents: 45,
    status: "upcoming",
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    courseName: "React.js Masterclass",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: "1.5 hours",
    registeredStudents: 32,
    status: "scheduled",
  },
  {
    id: 3,
    title: "Building REST APIs",
    courseName: "Node.js Backend Development",
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    duration: "2 hours",
    registeredStudents: 28,
    status: "scheduled",
  },
];

export default function UpcomingClasses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Upcoming Live Classes</CardTitle>
        <Link href="/instructor-dashboard/live-classes">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingClasses.map((liveClass) => (
          <div
            key={liveClass.id}
            className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Video className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{liveClass.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {liveClass.courseName}
                  </p>
                </div>
              </div>
              <Badge
                variant={liveClass.status === "upcoming" ? "default" : "secondary"}
                className="shrink-0"
              >
                {liveClass.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(liveClass.scheduledAt, "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(liveClass.scheduledAt, "h:mm a")}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {liveClass.registeredStudents} registered
              </span>
            </div>
            <div className="flex justify-end mt-3">
              <Button size="sm" variant="outline">
                Start Class
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
