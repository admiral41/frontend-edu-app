"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Search,
  MoreVertical,
  Eye,
  Check,
  X,
  Star,
  StarOff,
  Trash2,
  Users,
  IndianRupee,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";

// Mock data
const coursesData = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    thumbnail: "/api/placeholder/160/90",
    instructor: { id: 1, name: "Ramesh Kumar" },
    status: "published",
    isFeatured: true,
    price: 2999,
    students: 156,
    revenue: 467844,
    createdAt: new Date("2024-01-15"),
    category: "Web Development",
  },
  {
    id: 2,
    title: "React.js Masterclass - From Zero to Hero",
    thumbnail: "/api/placeholder/160/90",
    instructor: { id: 2, name: "Sunita Adhikari" },
    status: "pending",
    isFeatured: false,
    price: 1999,
    students: 0,
    revenue: 0,
    createdAt: new Date("2024-03-10"),
    category: "Web Development",
  },
  {
    id: 3,
    title: "Python for Data Science",
    thumbnail: "/api/placeholder/160/90",
    instructor: { id: 1, name: "Ramesh Kumar" },
    status: "published",
    isFeatured: false,
    price: 2499,
    students: 89,
    revenue: 222411,
    createdAt: new Date("2024-02-01"),
    category: "Data Science",
  },
  {
    id: 4,
    title: "Flutter Mobile App Development",
    thumbnail: "/api/placeholder/160/90",
    instructor: { id: 3, name: "Prakash Shrestha" },
    status: "pending",
    isFeatured: false,
    price: 1799,
    students: 0,
    revenue: 0,
    createdAt: new Date("2024-03-12"),
    category: "Mobile Development",
  },
  {
    id: 5,
    title: "Node.js Backend Development",
    thumbnail: "/api/placeholder/160/90",
    instructor: { id: 1, name: "Ramesh Kumar" },
    status: "rejected",
    isFeatured: false,
    price: 2499,
    students: 0,
    revenue: 0,
    createdAt: new Date("2024-03-05"),
    category: "Web Development",
    rejectionReason: "Content quality does not meet platform standards.",
  },
  {
    id: 6,
    title: "Machine Learning Fundamentals",
    thumbnail: "/api/placeholder/160/90",
    instructor: { id: 2, name: "Sunita Adhikari" },
    status: "published",
    isFeatured: true,
    price: 3499,
    students: 67,
    revenue: 234433,
    createdAt: new Date("2024-01-20"),
    category: "Data Science",
  },
];

export default function CoursesPage() {
  const { showAlert } = useAlertDialog();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [courseToReject, setCourseToReject] = useState(null);

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && course.status === "pending") ||
      (activeTab === "published" && course.status === "published") ||
      (activeTab === "featured" && course.isFeatured) ||
      (activeTab === "rejected" && course.status === "rejected");
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleApprove = (courseId) => {
    toast.success("Course approved and published!");
  };

  const openRejectDialog = (course) => {
    setCourseToReject(course);
    setIsRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }
    toast.success("Course rejected. Instructor will be notified.");
    setIsRejectDialogOpen(false);
    setRejectReason("");
    setCourseToReject(null);
  };

  const handleFeature = (courseId) => {
    toast.success("Course featured!");
  };

  const handleUnfeature = (courseId) => {
    toast.success("Course removed from featured.");
  };

  const handleDelete = (course) => {
    showAlert({
      title: "Delete Course",
      description: `Are you sure you want to delete "${course.title}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        toast.success("Course deleted.");
      },
    });
  };

  const getStatusBadge = (status, isFeatured) => {
    if (isFeatured) {
      return (
        <Badge className="bg-yellow-500">
          <Star className="h-3 w-3 mr-1" />
          Featured
        </Badge>
      );
    }
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const categories = [...new Set(coursesData.map((c) => c.category))];
  const pendingCount = coursesData.filter((c) => c.status === "pending").length;
  const publishedCount = coursesData.filter((c) => c.status === "published").length;
  const featuredCount = coursesData.filter((c) => c.isFeatured).length;
  const rejectedCount = coursesData.filter((c) => c.status === "rejected").length;

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Course Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Review, approve, and manage all platform courses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{coursesData.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
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
              <p className="text-2xl font-bold text-yellow-500">{featuredCount}</p>
              <p className="text-sm text-muted-foreground">Featured</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="all">All ({coursesData.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="published">Published ({publishedCount})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({featuredCount})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or instructor..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="hidden md:table-cell">Instructor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Students</TableHead>
                  <TableHead className="hidden lg:table-cell">Revenue</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 bg-muted rounded overflow-hidden shrink-0">
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[200px]">
                            {course.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Rs. {course.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Link
                        href={`/admin-dashboard/users/${course.instructor.id}`}
                        className="hover:underline"
                      >
                        {course.instructor.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(course.status, course.isFeatured)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {course.students}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        {course.revenue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin-dashboard/courses/${course.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>

                          {course.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleApprove(course.id)}
                                className="text-green-600"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openRejectDialog(course)}
                                className="text-red-600"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}

                          {course.status === "published" && (
                            <>
                              <DropdownMenuSeparator />
                              {course.isFeatured ? (
                                <DropdownMenuItem
                                  onClick={() => handleUnfeature(course.id)}
                                >
                                  <StarOff className="h-4 w-4 mr-2" />
                                  Remove from Featured
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleFeature(course.id)}
                                  className="text-yellow-600"
                                >
                                  <Star className="h-4 w-4 mr-2" />
                                  Feature Course
                                </DropdownMenuItem>
                              )}
                            </>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(course)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {courseToReject && (
                <p className="text-sm">
                  Rejecting: <strong>{courseToReject.title}</strong>
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Please provide a reason for rejection. The instructor will be
                notified via email.
              </p>
              <div className="space-y-2">
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter the reason for rejection..."
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleReject}
                >
                  Reject Course
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
