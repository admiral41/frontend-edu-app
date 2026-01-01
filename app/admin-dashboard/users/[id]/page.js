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
import { Skeleton } from "@/components/ui/skeleton";
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
  AlertCircle,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";
import {
  useUser,
  useSuspendUser,
  useActivateUser,
  useDeleteUser,
  useResetUserPassword,
  useUpdateUser,
} from "@/lib/hooks/useAdmin";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showConfirmation } = useAlertDialog();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data
  const { data: userResponse, isLoading, error } = useUser(params.id);
  const userData = userResponse?.data?.user;

  // Mutations
  const suspendMutation = useSuspendUser();
  const activateMutation = useActivateUser();
  const deleteMutation = useDeleteUser();
  const resetPasswordMutation = useResetUserPassword();
  const updateMutation = useUpdateUser();

  // Transform user data
  const user = userData ? {
    id: userData._id,
    name: `${userData.firstname || ""} ${userData.lastname || ""}`.trim() || "Unknown",
    firstname: userData.firstname || "",
    lastname: userData.lastname || "",
    email: userData.email || "",
    phone: userData.phone || "",
    role: userData.roles?.includes("LECTURER") ? "instructor" : "student",
    status: userData.isSuspended ? "suspended" : "active",
    joinedAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
    lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : null,
    avatar: userData.userImage || null,
    address: userData.address || "",
    dateOfBirth: userData.dateOfBirth || "",
    enrolledCourses: userData.enrolledCourses || [],
    payments: userData.payments || [],
  } : null;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  // Update form data when user data loads
  if (user && formData.email === "" && user.email) {
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  }

  const handleSave = () => {
    updateMutation.mutate(
      { userId: params.id, userData: formData },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleSuspend = async () => {
    const confirmed = await showConfirmation({
      title: "Suspend User",
      description: `Are you sure you want to suspend ${user?.name}? They will not be able to access their account.`,
      confirmText: "Suspend",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      suspendMutation.mutate({ userId: params.id, reason: "Suspended by admin" });
    }
  };

  const handleActivate = () => {
    activateMutation.mutate(params.id);
  };

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: "Delete User",
      description: `Are you sure you want to permanently delete ${user?.name}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      deleteMutation.mutate(params.id, {
        onSuccess: () => {
          router.push("/admin-dashboard/users");
        },
      });
    }
  };

  const handleResetPassword = () => {
    resetPasswordMutation.mutate(params.id);
  };

  // Loading state
  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 py-6 sm:py-8">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-10 w-10" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96 lg:col-span-2" />
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 py-6 sm:py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to load user</h3>
              <p className="text-muted-foreground mb-4">{error?.message || "User not found"}</p>
              <Link href="/admin-dashboard/users">
                <Button>Back to Users</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    );
  }

  const isActionPending = suspendMutation.isPending || activateMutation.isPending || deleteMutation.isPending;

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
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={
                        user.role === "instructor"
                          ? "border-primary text-primary"
                          : ""
                      }
                    >
                      {user.role === "student" ? (
                        <GraduationCap className="h-3 w-3 mr-1" />
                      ) : (
                        <UserCog className="h-3 w-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                    <Badge
                      className={
                        user.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {format(user.joinedAt, "MMM d, yyyy")}</span>
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
                    disabled={resetPasswordMutation.isPending}
                  >
                    {resetPasswordMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Key className="h-4 w-4 mr-2" />
                    )}
                    Reset Password
                  </Button>
                  {user.status === "active" ? (
                    <Button
                      variant="outline"
                      className="w-full text-orange-600 hover:text-orange-700"
                      onClick={handleSuspend}
                      disabled={isActionPending}
                    >
                      {suspendMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Ban className="h-4 w-4 mr-2" />
                      )}
                      Suspend User
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full text-green-600 hover:text-green-700"
                      onClick={handleActivate}
                      disabled={isActionPending}
                    >
                      {activateMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Activate User
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive"
                    onClick={handleDelete}
                    disabled={isActionPending}
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
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
                  Courses ({user.enrolledCourses?.length || 0})
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
                    {user.enrolledCourses?.length > 0 ? (
                      user.enrolledCourses.map((course) => (
                        <div
                          key={course._id || course.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium">{course.title || course.courseId?.title || "Untitled Course"}</h4>
                            <p className="text-sm text-muted-foreground">
                              Enrolled {course.enrolledAt ? format(new Date(course.enrolledAt), "MMM d, yyyy") : "N/A"}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${course.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {course.progress || 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No enrolled courses</p>
                      </div>
                    )}
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
                    {user.payments?.length > 0 ? (
                      user.payments.map((payment) => (
                        <div
                          key={payment._id || payment.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{payment.course || payment.courseId?.title || "Course Payment"}</h4>
                            <p className="text-sm text-muted-foreground">
                              {payment.date ? format(new Date(payment.date), "MMM d, yyyy") : "N/A"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              Rs. {(payment.amount || 0).toLocaleString()}
                            </p>
                            <Badge className="bg-green-500">{payment.status || "completed"}</Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No payment history</p>
                      </div>
                    )}
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
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Activity log not available</p>
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
