"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Video,
  Clock,
  User,
  Copy,
  ExternalLink,
  Info,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function LiveClassesPage() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Helper to get date objects
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const allClasses = [
    {
      id: 1,
      subject: "Mathematics - Trigonometry",
      instructor: "Ram Sharma",
      startTime: "2:00 PM",
      date: today,
      dateLabel: "Today",
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
      date: today,
      dateLabel: "Today",
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
      date: tomorrow,
      dateLabel: "Tomorrow",
      duration: "1 hour",
      status: "upcoming",
      meetingLink: "https://zoom.us/j/456789123",
      meetingId: "456 789 123",
      password: "english@99",
    },
    {
      id: 4,
      subject: "Chemistry - Organic Compounds",
      instructor: "Maya Rai",
      startTime: "3:00 PM",
      date: dayAfterTomorrow,
      dateLabel: dayAfterTomorrow.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      duration: "1 hour",
      status: "upcoming",
      meetingLink: "https://zoom.us/j/789123456",
      meetingId: "789 123 456",
      password: "chem2024",
    },
    {
      id: 5,
      subject: "Mathematics - Calculus",
      instructor: "Ram Sharma",
      startTime: "11:00 AM",
      date: yesterday,
      dateLabel: "Yesterday",
      duration: "1 hour",
      status: "completed",
      meetingLink: "https://zoom.us/j/321654987",
      meetingId: "321 654 987",
      password: "calc123",
    },
    {
      id: 6,
      subject: "Physics - Mechanics",
      instructor: "Sita Poudel",
      startTime: "2:00 PM",
      date: yesterday,
      dateLabel: "Yesterday",
      duration: "1.5 hours",
      status: "completed",
      meetingLink: "https://zoom.us/j/654987321",
      meetingId: "654 987 321",
      password: "mech2024",
    },
  ];

  const filteredClasses =
    activeTab === "all"
      ? allClasses
      : activeTab === "live"
      ? allClasses.filter((c) => c.status === "live")
      : activeTab === "upcoming"
      ? allClasses.filter((c) => c.status === "upcoming")
      : allClasses.filter((c) => c.status === "completed");

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
          Upcoming
        </Badge>
      );
    }
    return <Badge variant="outline">Completed</Badge>;
  };

  const tabs = [
    { id: "all", label: "All Classes", count: allClasses.length },
    {
      id: "live",
      label: "Live Now",
      count: allClasses.filter((c) => c.status === "live").length,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: allClasses.filter((c) => c.status === "upcoming").length,
    },
    {
      id: "completed",
      label: "Past",
      count: allClasses.filter((c) => c.status === "completed").length,
    },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Live Classes</h1>
          <p className="text-muted-foreground">
            Join live classes and interact with your instructors
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0"
            >
              {tab.label}
              <Badge
                variant={activeTab === tab.id ? "secondary" : "outline"}
                className="ml-2"
              >
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Classes Grid */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No {activeTab === "all" ? "" : activeTab} classes available
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((classItem) => (
              <Card key={classItem.id}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base line-clamp-2 flex-1">
                        {classItem.subject}
                      </h3>
                      {getStatusBadge(classItem.status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4 shrink-0" />
                        <span>{classItem.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{classItem.dateLabel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>
                          {classItem.startTime} • {classItem.duration}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      variant={
                        classItem.status === "live" ? "default" : "outline"
                      }
                      disabled={classItem.status === "completed"}
                      onClick={() => setSelectedClass(classItem)}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      {classItem.status === "live"
                        ? "Join Now"
                        : classItem.status === "upcoming"
                        ? "View Details"
                        : "Ended"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

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
                {selectedClass?.dateLabel} at {selectedClass?.startTime}
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
                  Please join{" "}
                  <span className="font-semibold">10 minutes earlier</span> to
                  ensure you don't miss the beginning of the class.
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
    </DashboardLayout>
  );
}
