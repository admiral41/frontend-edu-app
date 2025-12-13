"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, AlertCircle, Info, Megaphone, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock data
const initialAnnouncements = [
  {
    id: 1,
    type: "urgent",
    title: "Assignment Deadline Extended",
    message: "The deadline for 'Build a Todo App' has been extended to Dec 20.",
    date: "Today",
    course: "Complete Web Development Bootcamp",
    icon: AlertCircle,
    variant: "destructive",
  },
  {
    id: 2,
    type: "notice",
    title: "Live Session Rescheduled",
    message: "Tomorrow's React Hooks session moved to 4 PM NST.",
    date: "Yesterday",
    course: "React.js Masterclass",
    icon: Bell,
    variant: "secondary",
  },
  {
    id: 3,
    type: "announcement",
    title: "New Resources Added",
    message: "Added 5 new practice exercises to the JavaScript module.",
    date: "2 days ago",
    course: "Complete Web Development Bootcamp",
    icon: Megaphone,
    variant: "default",
  },
];

const courses = [
  { id: "1", name: "Complete Web Development Bootcamp" },
  { id: "2", name: "React.js Masterclass" },
  { id: "all", name: "All Courses" },
];

export default function InstructorAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "notice",
    courseId: "",
  });

  const handleCreate = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      type: formData.type,
      title: formData.title,
      message: formData.message,
      date: "Just now",
      course: courses.find((c) => c.id === formData.courseId)?.name || "All Courses",
      icon: formData.type === "urgent" ? AlertCircle : formData.type === "notice" ? Bell : Megaphone,
      variant: formData.type === "urgent" ? "destructive" : formData.type === "notice" ? "secondary" : "default",
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    toast.success("Announcement created successfully!");
    setIsCreateOpen(false);
    setFormData({ title: "", message: "", type: "notice", courseId: "" });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    toast.success("Announcement deleted");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Announcements
          </CardTitle>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Announcement title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Announcement details..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="notice">Notice</SelectItem>
                        <SelectItem value="announcement">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Select
                      value={formData.courseId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, courseId: value })
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
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Megaphone className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No announcements yet</p>
            <p className="text-xs">Create one to notify your students</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 shrink-0 ${
                        item.variant === "destructive"
                          ? "text-destructive"
                          : item.variant === "default"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm line-clamp-1">
                          {item.title}
                        </h4>
                        <Badge variant={item.variant} className="text-xs shrink-0">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {item.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {item.course} · {item.date}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
