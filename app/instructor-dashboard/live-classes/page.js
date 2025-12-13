"use client";

import { useState } from "react";
import InstructorDashboardLayout from "@/components/instructor/InstructorDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Video,
  Plus,
  Calendar,
  Clock,
  Users,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data
const liveClassesData = [
  {
    id: 1,
    title: "JavaScript Fundamentals - Live Q&A",
    description: "Interactive session to answer questions about JavaScript basics",
    courseName: "Complete Web Development Bootcamp",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    duration: 60,
    registeredStudents: 45,
    maxStudents: 100,
    status: "upcoming",
    meetingUrl: null,
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    description: "Comprehensive walkthrough of all React hooks",
    courseName: "React.js Masterclass",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 90,
    registeredStudents: 32,
    maxStudents: 50,
    status: "scheduled",
    meetingUrl: null,
  },
  {
    id: 3,
    title: "CSS Grid Layout Workshop",
    description: "Hands-on workshop on CSS Grid",
    courseName: "Complete Web Development Bootcamp",
    scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: 120,
    registeredStudents: 38,
    maxStudents: 50,
    status: "completed",
    meetingUrl: "https://zoom.us/recording/123",
  },
];

const courses = [
  { id: "1", name: "Complete Web Development Bootcamp" },
  { id: "2", name: "React.js Masterclass" },
];

export default function LiveClassesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    date: "",
    time: "",
    duration: "60",
    maxStudents: "100",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call will go here
    toast.success("Live class scheduled successfully!");
    setIsCreateOpen(false);
    setFormData({
      title: "",
      description: "",
      courseId: "",
      date: "",
      time: "",
      duration: "60",
      maxStudents: "100",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-orange-500">Starting Soon</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>;
      case "live":
        return <Badge className="bg-red-500">Live Now</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return null;
    }
  };

  const upcomingClasses = liveClassesData.filter(
    (c) => c.status === "upcoming" || c.status === "scheduled"
  );
  const pastClasses = liveClassesData.filter((c) => c.status === "completed");

  return (
    <InstructorDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Live Classes</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Schedule and manage your live sessions
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule Live Class</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., JavaScript Q&A Session"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="What will be covered in this session..."
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select
                    value={formData.courseId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, courseId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, duration: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 mins</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input
                      id="maxStudents"
                      name="maxStudents"
                      type="number"
                      value={formData.maxStudents}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Class</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Upcoming Classes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Upcoming Classes</h2>
          {upcomingClasses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingClasses.map((liveClass) => (
                <Card key={liveClass.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{liveClass.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {liveClass.courseName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(liveClass.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {liveClass.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(liveClass.scheduledAt, "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(liveClass.scheduledAt, "h:mm a")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {liveClass.registeredStudents}/{liveClass.maxStudents}
                      </span>
                    </div>

                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Class
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Video className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming classes</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule a live class to engage with your students
                </p>
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Your First Class
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Past Classes */}
        {pastClasses.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Past Classes</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastClasses.map((liveClass) => (
                <Card key={liveClass.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{liveClass.title}</h3>
                      {getStatusBadge(liveClass.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {liveClass.courseName}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{format(liveClass.scheduledAt, "MMM d, yyyy")}</span>
                      <span>{liveClass.registeredStudents} attended</span>
                    </div>
                    {liveClass.meetingUrl && (
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Recording
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </InstructorDashboardLayout>
  );
}
