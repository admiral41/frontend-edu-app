"use client";

import { useState } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Search,
  Download,
  User,
  LogIn,
  LogOut,
  BookOpen,
  CreditCard,
  Settings,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  Filter,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

// Mock data
const activityLogs = [
  {
    id: 1,
    type: "login",
    action: "User logged in",
    user: { id: 1, name: "Aarav Sharma", role: "student" },
    details: "Login from Kathmandu, Nepal",
    ip: "103.XX.XX.XX",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 2,
    type: "course_enrolled",
    action: "Enrolled in course",
    user: { id: 2, name: "Priya Thapa", role: "student" },
    details: "Complete Web Development Bootcamp",
    course: { id: 1, title: "Complete Web Development Bootcamp" },
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 3,
    type: "payment",
    action: "Payment completed",
    user: { id: 2, name: "Priya Thapa", role: "student" },
    details: "Rs. 1,999 via eSewa",
    amount: 1999,
    timestamp: new Date(Date.now() - 16 * 60 * 1000),
  },
  {
    id: 4,
    type: "course_created",
    action: "Course created",
    user: { id: 3, name: "Ramesh Kumar", role: "instructor" },
    details: "Advanced React Patterns",
    course: { id: 5, title: "Advanced React Patterns" },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 5,
    type: "admin_action",
    action: "Course approved",
    user: { id: 100, name: "Admin User", role: "admin" },
    details: "Approved 'Flutter Mobile App Development'",
    target: { type: "course", id: 4, name: "Flutter Mobile App Development" },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 6,
    type: "user_created",
    action: "New user registered",
    user: { id: 5, name: "Bikash Gurung", role: "student" },
    details: "Student registration",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 7,
    type: "logout",
    action: "User logged out",
    user: { id: 3, name: "Ramesh Kumar", role: "instructor" },
    details: "Session ended",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: 8,
    type: "admin_action",
    action: "User suspended",
    user: { id: 100, name: "Admin User", role: "admin" },
    details: "Suspended user: John Doe",
    target: { type: "user", id: 99, name: "John Doe" },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: 9,
    type: "settings_changed",
    action: "Settings updated",
    user: { id: 100, name: "Admin User", role: "admin" },
    details: "Updated platform commission rate",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 10,
    type: "refund",
    action: "Refund processed",
    user: { id: 100, name: "Admin User", role: "admin" },
    details: "Refund of Rs. 2,499 for Sita Rai",
    amount: 2499,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
  },
  {
    id: 11,
    type: "course_deleted",
    action: "Course deleted",
    user: { id: 100, name: "Admin User", role: "admin" },
    details: "Deleted 'Outdated Python Course'",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: 12,
    type: "application_approved",
    action: "Instructor approved",
    user: { id: 100, name: "Admin User", role: "admin" },
    details: "Approved Prakash Shrestha as instructor",
    target: { type: "user", id: 4, name: "Prakash Shrestha" },
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
];

const activityTypes = [
  { value: "all", label: "All Activities" },
  { value: "login", label: "Logins" },
  { value: "logout", label: "Logouts" },
  { value: "course_enrolled", label: "Enrollments" },
  { value: "course_created", label: "Courses Created" },
  { value: "payment", label: "Payments" },
  { value: "refund", label: "Refunds" },
  { value: "admin_action", label: "Admin Actions" },
  { value: "user_created", label: "New Users" },
  { value: "settings_changed", label: "Settings" },
];

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("7days");

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    const matchesRole = roleFilter === "all" || log.user.role === roleFilter;
    return matchesSearch && matchesType && matchesRole;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case "login":
        return <LogIn className="h-4 w-4 text-green-500" />;
      case "logout":
        return <LogOut className="h-4 w-4 text-gray-500" />;
      case "course_enrolled":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "course_created":
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case "course_deleted":
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case "payment":
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case "refund":
        return <CreditCard className="h-4 w-4 text-orange-500" />;
      case "admin_action":
        return <Shield className="h-4 w-4 text-primary" />;
      case "user_created":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "user_suspended":
        return <UserMinus className="h-4 w-4 text-red-500" />;
      case "settings_changed":
        return <Settings className="h-4 w-4 text-gray-500" />;
      case "application_approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "application_rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-primary text-xs">Admin</Badge>
        );
      case "instructor":
        return (
          <Badge variant="outline" className="text-xs border-purple-500 text-purple-500">
            Instructor
          </Badge>
        );
      case "student":
        return (
          <Badge variant="outline" className="text-xs">
            Student
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleExport = () => {
    console.log("Exporting activity logs...");
  };

  const todayCount = activityLogs.filter(
    (log) => log.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
  ).length;
  const adminActionsCount = activityLogs.filter(
    (log) => log.user.role === "admin"
  ).length;
  const loginCount = activityLogs.filter((log) => log.type === "login").length;

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Activity Logs</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monitor all platform activities and events
            </p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{activityLogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{todayCount}</p>
              <p className="text-sm text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{adminActionsCount}</p>
              <p className="text-sm text-muted-foreground">Admin Actions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <LogIn className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{loginCount}</p>
              <p className="text-sm text-muted-foreground">User Logins</p>
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
                  placeholder="Search activities..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[130px]">
                  <SelectValue placeholder="User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[130px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredLogs.map((log, index) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors ${
                      index !== filteredLogs.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="mt-1 p-2 rounded-full bg-muted shrink-0">
                      {getActivityIcon(log.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-medium">{log.action}</span>
                        {getRoleBadge(log.user.role)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {log.details}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Link
                          href={`/admin-dashboard/users/${log.user.id}`}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <User className="h-3 w-3" />
                          {log.user.name}
                        </Link>
                        {log.ip && (
                          <span className="flex items-center gap-1">
                            • IP: {log.ip}
                          </span>
                        )}
                        <span>
                          •{" "}
                          {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-xs text-muted-foreground shrink-0 hidden sm:block">
                      {format(log.timestamp, "MMM d, h:mm a")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredLogs.length > 0 && (
              <div className="mt-6 text-center">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
