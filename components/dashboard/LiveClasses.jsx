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
import { Video, Clock, User, Copy, ExternalLink, Info } from "lucide-react";
import { toast } from "sonner";

export default function LiveClasses() {
  const [selectedClass, setSelectedClass] = useState(null);
  const liveClasses = [
    {
      id: 1,
      subject: "Mathematics - Trigonometry",
      instructor: "Ram Sharma",
      startTime: "2:00 PM",
      date: "Today",
      duration: "1 hour",
      status: "live",
      meetingLink: "https://zoom.us/j/123456789",
      meetingId: "123 456 789",
      password: "math2024",
    },
    {
      id: 2,
      subject: "Physics - Electricity",
      instructor: "Sita Poudel",
      startTime: "4:30 PM",
      date: "Today",
      duration: "1.5 hours",
      status: "upcoming",
      meetingLink: "https://zoom.us/j/987654321",
      meetingId: "987 654 321",
      password: "physics123",
    },
    {
      id: 3,
      subject: "English - Essay Writing",
      instructor: "John Adhikari",
      startTime: "10:00 AM",
      date: "Tomorrow",
      duration: "1 hour",
      status: "scheduled",
      meetingLink: "https://zoom.us/j/456789123",
      meetingId: "456 789 123",
      password: "english@99",
    },
  ];

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const getStatusBadge = (status) => {
    if (status === "live") {
      return (
        <Badge className="bg-red-600 text-white animate-pulse">
          🔴 Live Now
        </Badge>
      );
    }
    if (status === "upcoming") {
      return (
        <Badge variant="secondary" className="bg-green-600 text-white">
          Starting Soon
        </Badge>
      );
    }
    return <Badge variant="outline">Scheduled</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Live Classes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-3">
          {liveClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="p-3 sm:p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-sm sm:text-base line-clamp-1 flex-1">
                  {classItem.subject}
                </h4>
                {getStatusBadge(classItem.status)}
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{classItem.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {classItem.date} at {classItem.startTime} ({classItem.duration})
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full"
                variant={classItem.status === "live" ? "default" : "outline"}
                disabled={classItem.status === "scheduled"}
                onClick={() => setSelectedClass(classItem)}
              >
                <Video className="h-4 w-4 mr-2" />
                {classItem.status === "live"
                  ? "Join Now"
                  : classItem.status === "upcoming"
                  ? "View Details"
                  : "Not Started"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Meeting Details Dialog */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              {selectedClass?.subject}
            </DialogTitle>
            <DialogDescription>
              Zoom meeting details for {selectedClass?.instructor}'s class
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Meeting ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting ID</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm">
                  {selectedClass?.meetingId}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      selectedClass?.meetingId.replace(/\s/g, ""),
                      "Meeting ID"
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm">
                  {selectedClass?.password}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(selectedClass?.password, "Password")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Class Info */}
            <div className="pt-2 space-y-1 text-sm text-muted-foreground">
              <p>
                <Clock className="h-4 w-4 inline mr-2" />
                {selectedClass?.date} at {selectedClass?.startTime}
              </p>
              <p>
                <User className="h-4 w-4 inline mr-2" />
                {selectedClass?.instructor}
              </p>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <p className="text-blue-900 dark:text-blue-100">
                  Please join <span className="font-semibold">10 minutes earlier</span> to ensure you don't miss the beginning of the class.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <Button
              className="w-full"
              onClick={() => {
                window.open(selectedClass?.meetingLink, "_blank");
                toast.success("Opening Zoom meeting...");
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Zoom
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
