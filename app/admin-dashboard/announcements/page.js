"use client";

import { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
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
  Megaphone,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Users,
  GraduationCap,
  UserCog,
  Calendar,
  Clock,
  Send,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";

// Mock data
const announcementsData = [
  {
    id: 1,
    title: "Platform Maintenance Scheduled",
    content: "We will be performing scheduled maintenance on our servers this Saturday from 2 AM to 6 AM NPT. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.",
    audience: "all",
    status: "published",
    priority: "high",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    views: 342,
  },
  {
    id: 2,
    title: "New Courses Available This Month",
    content: "We're excited to announce 5 new courses launching this month! Topics include Advanced React Patterns, Python for Finance, and more. Check out the course catalog for details.",
    audience: "students",
    status: "published",
    priority: "normal",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    views: 567,
  },
  {
    id: 3,
    title: "Instructor Payout Schedule Update",
    content: "Starting next month, instructor payouts will be processed bi-weekly instead of monthly. Please ensure your bank details are up to date in your profile settings.",
    audience: "instructors",
    status: "published",
    priority: "normal",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    views: 45,
  },
  {
    id: 4,
    title: "Dashain Holiday Notice",
    content: "Wishing all our users a happy Dashain! Our support team will have limited availability from October 15-25. For urgent issues, please email support@padhaihub.com.",
    audience: "all",
    status: "draft",
    priority: "normal",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    views: 0,
  },
  {
    id: 5,
    title: "Course Creation Guidelines Updated",
    content: "We've updated our course creation guidelines to ensure higher quality content. Please review the new guidelines in your instructor dashboard before submitting new courses.",
    audience: "instructors",
    status: "published",
    priority: "high",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    views: 38,
  },
];

export default function AnnouncementsPage() {
  const { showAlert } = useAlertDialog();
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    audience: "all",
    priority: "normal",
    scheduleFor: "",
  });

  const filteredAnnouncements = announcementsData.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience =
      audienceFilter === "all" || announcement.audience === audienceFilter;
    const matchesStatus =
      statusFilter === "all" || announcement.status === statusFilter;
    return matchesSearch && matchesAudience && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (editingAnnouncement) {
      toast.success("Announcement updated successfully!");
    } else {
      toast.success("Announcement created successfully!");
    }
    setIsCreateOpen(false);
    setEditingAnnouncement(null);
    setFormData({
      title: "",
      content: "",
      audience: "all",
      priority: "normal",
      scheduleFor: "",
    });
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      audience: announcement.audience,
      priority: announcement.priority,
      scheduleFor: "",
    });
    setIsCreateOpen(true);
  };

  const handleDelete = (announcement) => {
    showAlert({
      title: "Delete Announcement",
      description: `Are you sure you want to delete "${announcement.title}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        toast.success("Announcement deleted.");
      },
    });
  };

  const handleTogglePublish = (announcement) => {
    if (announcement.status === "published") {
      toast.success("Announcement unpublished.");
    } else {
      toast.success("Announcement published!");
    }
  };

  const getAudienceBadge = (audience) => {
    switch (audience) {
      case "all":
        return (
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            Everyone
          </Badge>
        );
      case "students":
        return (
          <Badge variant="outline" className="gap-1 border-blue-500 text-blue-500">
            <GraduationCap className="h-3 w-3" />
            Students
          </Badge>
        );
      case "instructors":
        return (
          <Badge variant="outline" className="gap-1 border-purple-500 text-purple-500">
            <UserCog className="h-3 w-3" />
            Instructors
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority === "high") {
      return <Badge variant="destructive">High Priority</Badge>;
    }
    return null;
  };

  const publishedCount = announcementsData.filter((a) => a.status === "published").length;
  const draftCount = announcementsData.filter((a) => a.status === "draft").length;

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Announcements</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create and manage platform-wide announcements
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) {
              setEditingAnnouncement(null);
              setFormData({
                title: "",
                content: "",
                audience: "all",
                priority: "normal",
                scheduleFor: "",
              });
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter announcement title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    rows={4}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Enter announcement content..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select
                      value={formData.audience}
                      onValueChange={(value) =>
                        setFormData({ ...formData, audience: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Everyone</SelectItem>
                        <SelectItem value="students">Students Only</SelectItem>
                        <SelectItem value="instructors">Instructors Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule (Optional)</Label>
                  <Input
                    id="schedule"
                    type="datetime-local"
                    value={formData.scheduleFor}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduleFor: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to publish immediately
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    {editingAnnouncement ? "Update" : "Publish"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{announcementsData.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{publishedCount}</p>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{draftCount}</p>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={audienceFilter} onValueChange={setAudienceFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="instructors">Instructors</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Megaphone className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || audienceFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first announcement"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{announcement.title}</h3>
                        {getPriorityBadge(announcement.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {announcement.content}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        {getAudienceBadge(announcement.audience)}
                        {getStatusBadge(announcement.status)}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(announcement.createdAt, {
                            addSuffix: true,
                          })}
                        </span>
                        {announcement.status === "published" && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {announcement.views} views
                          </span>
                        )}
                        {announcement.scheduledFor && (
                          <span className="text-xs text-blue-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Scheduled: {format(announcement.scheduledFor, "MMM d, h:mm a")}
                          </span>
                        )}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(announcement)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleTogglePublish(announcement)}
                        >
                          {announcement.status === "published" ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(announcement)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
