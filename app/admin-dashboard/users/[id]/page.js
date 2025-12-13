"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Save,
  Ban,
  CheckCircle,
  Trash2,
  Key,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  CreditCard,
  Activity,
  GraduationCap,
  UserCog,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";

// Mock user data
const mockUser = {
  id: 1,
  name: "Aarav Sharma",
  email: "aarav.sharma@email.com",
  phone: "9841234567",
  role: "student",
  status: "active",
  joinedAt: new Date("2024-01-15"),
  lastLogin: new Date("2024-03-12"),
  avatar: null,
  address: "Kathmandu, Nepal",
  dateOfBirth: "2000-05-15",
  enrolledCourses: [
    { id: 1, title: "Complete Web Development Bootcamp", progress: 75, enrolledAt: new Date("2024-01-20") },
    { id: 2, title: "React.js Masterclass", progress: 45, enrolledAt: new Date("2024-02-15") },
    { id: 3, title: "Node.js Backend Development", progress: 20, enrolledAt: new Date("2024-03-01") },
  ],
  payments: [
    { id: 1, course: "Complete Web Development Bootcamp", amount: 2999, date: new Date("2024-01-20"), status: "completed" },
    { id: 2, course: "React.js Masterclass", amount: 1999, date: new Date("2024-02-15"), status: "completed" },
    { id: 3, course: "Node.js Backend Development", amount: 2499, date: new Date("2024-03-01"), status: "completed" },
  ],
  activityLog: [
    { id: 1, action: "Completed lesson: JavaScript Basics", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 2, action: "Started course: Node.js Backend Development", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: 3, action: "Submitted assignment: React Todo App", timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000) },
    { id: 4, action: "Logged in", timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000) },
  ],
};

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showAlert } = useAlertDialog();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    address: mockUser.address,
    dateOfBirth: mockUser.dateOfBirth,
  });

  const handleSave = () => {
    toast.success("User updated successfully!");
    setIsEditing(false);
  };

  const handleSuspend = () => {
    showAlert({
      title: "Suspend User",
      description: "Are you sure you want to suspend this user? They will not be able to access their account.",
      confirmText: "Suspend",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        toast.success("User suspended.");
      },
    });
  };

  const handleActivate = () => {
    toast.success("User activated.");
  };

  const handleDelete = () => {
    showAlert({
      title: "Delete User",
      description: "Are you sure you want to delete this user? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        toast.success("User deleted.");
        router.push("/admin-dashboard/users");
      },
    });
  };

  const handleResetPassword = () => {
    toast.success("Password reset email sent to user.");
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin-dashboard/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">User Details</h1>
            <p className="text-sm text-muted-foreground">
              View and manage user information
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{mockUser.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={
                        mockUser.role === "instructor"
                          ? "border-primary text-primary"
                          : ""
                      }
                    >
                      {mockUser.role === "student" ? (
                        <GraduationCap className="h-3 w-3 mr-1" />
                      ) : (
                        <UserCog className="h-3 w-3 mr-1" />
                      )}
                      {mockUser.role}
                    </Badge>
                    <Badge
                      className={
                        mockUser.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {mockUser.status}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {format(mockUser.joinedAt, "MMM d, yyyy")}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResetPassword}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Reset Password
                  </Button>
                  {mockUser.status === "active" ? (
                    <Button
                      variant="outline"
                      className="w-full text-orange-600 hover:text-orange-700"
                      onClick={handleSuspend}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend User
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full text-green-600 hover:text-green-700"
                      onClick={handleActivate}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate User
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="courses">
              <TabsList className="mb-4">
                <TabsTrigger value="courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses ({mockUser.enrolledCourses.length})
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockUser.enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Enrolled {format(course.enrolledAt, "MMM d, yyyy")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockUser.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{payment.course}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(payment.date, "MMM d, yyyy")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            Rs. {payment.amount.toLocaleString()}
                          </p>
                          <Badge className="bg-green-500">{payment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUser.activityLog.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 pb-4 border-b last:border-0"
                        >
                          <div className="mt-1 p-1.5 rounded-full bg-primary/10">
                            <Activity className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
