"use client";

import { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  IndianRupee,
  Download,
  Calendar,
  GraduationCap,
  UserCog,
  Star,
  Eye,
} from "lucide-react";

// Mock data
const userGrowthData = [
  { month: "Jan", students: 120, instructors: 5 },
  { month: "Feb", students: 180, instructors: 8 },
  { month: "Mar", students: 250, instructors: 10 },
  { month: "Apr", students: 320, instructors: 12 },
  { month: "May", students: 410, instructors: 15 },
  { month: "Jun", students: 520, instructors: 18 },
];

const revenueData = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 220000 },
  { month: "Apr", revenue: 195000 },
  { month: "May", revenue: 280000 },
  { month: "Jun", revenue: 340000 },
];

const enrollmentData = [
  { month: "Jan", enrollments: 85 },
  { month: "Feb", enrollments: 120 },
  { month: "Mar", enrollments: 150 },
  { month: "Apr", enrollments: 135 },
  { month: "May", enrollments: 190 },
  { month: "Jun", enrollments: 225 },
];

const topCourses = [
  { id: 1, title: "Complete Web Development Bootcamp", students: 156, revenue: 467844, rating: 4.7 },
  { id: 2, title: "Machine Learning Fundamentals", students: 89, revenue: 311411, rating: 4.8 },
  { id: 3, title: "React.js Masterclass", students: 78, revenue: 155922, rating: 4.6 },
  { id: 4, title: "Python for Data Science", students: 67, revenue: 167433, rating: 4.5 },
  { id: 5, title: "Flutter Mobile App Development", students: 45, revenue: 80955, rating: 4.4 },
];

const topInstructors = [
  { id: 1, name: "Ramesh Kumar", courses: 5, students: 312, earnings: 485000, rating: 4.7 },
  { id: 2, name: "Sunita Adhikari", courses: 3, students: 156, earnings: 280000, rating: 4.8 },
  { id: 3, name: "Prakash Shrestha", courses: 2, students: 89, earnings: 145000, rating: 4.5 },
];

const categoryStats = [
  { name: "Web Development", courses: 12, students: 450, revenue: 890000 },
  { name: "Data Science", courses: 8, students: 280, revenue: 620000 },
  { name: "Mobile Development", courses: 5, students: 120, revenue: 215000 },
  { name: "Design", courses: 4, students: 85, revenue: 127500 },
  { name: "Business", courses: 3, students: 65, revenue: 97500 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("6months");

  const maxUserGrowth = Math.max(...userGrowthData.map((d) => d.students + d.instructors));
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
  const maxEnrollments = Math.max(...enrollmentData.map((d) => d.enrollments));

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalStudents = userGrowthData[userGrowthData.length - 1].students;
  const totalInstructors = userGrowthData[userGrowthData.length - 1].instructors;
  const totalEnrollments = enrollmentData.reduce((sum, d) => sum + d.enrollments, 0);

  const handleExport = (type) => {
    console.log(`Exporting ${type} report...`);
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Platform performance and insights
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => handleExport("full")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +24%
                </div>
              </div>
              <p className="text-2xl font-bold">{totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <UserCog className="h-5 w-5 text-purple-500" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </div>
              </div>
              <p className="text-2xl font-bold">{totalInstructors}</p>
              <p className="text-sm text-muted-foreground">Instructors</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +18%
                </div>
              </div>
              <p className="text-2xl font-bold">{totalEnrollments}</p>
              <p className="text-sm text-muted-foreground">Enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <IndianRupee className="h-5 w-5 text-green-500" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  +32%
                </div>
              </div>
              <p className="text-2xl font-bold">
                Rs. {(totalRevenue / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* User Growth Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-primary rounded" />
                    <span className="text-muted-foreground">Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded" />
                    <span className="text-muted-foreground">Instructors</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-56 flex items-end justify-between gap-2">
                {userGrowthData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col gap-1" style={{ height: "200px" }}>
                      <div
                        className="w-full bg-primary rounded-t relative group cursor-pointer hover:bg-primary/80 transition-colors"
                        style={{
                          height: `${(item.students / maxUserGrowth) * 100}%`,
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {item.students} students
                        </div>
                      </div>
                      <div
                        className="w-full bg-purple-500 rounded-b relative group cursor-pointer hover:bg-purple-400 transition-colors"
                        style={{
                          height: `${(item.instructors / maxUserGrowth) * 100}%`,
                          minHeight: "4px",
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56 flex items-end justify-between gap-2">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-500 rounded-t relative group cursor-pointer hover:bg-green-400 transition-colors"
                      style={{
                        height: `${(item.revenue / maxRevenue) * 100}%`,
                        minHeight: "20px",
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Rs. {(item.revenue / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Trend */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Course Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end justify-between gap-4">
              {enrollmentData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-orange-500 rounded-t relative group cursor-pointer hover:bg-orange-400 transition-colors"
                    style={{
                      height: `${(item.enrollments / maxEnrollments) * 100}%`,
                      minHeight: "20px",
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.enrollments} enrollments
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Top Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Top Performing Courses</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{course.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      Rs. {(course.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Instructors */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Top Instructors</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topInstructors.map((instructor, index) => (
                <div key={instructor.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center font-semibold text-purple-500">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{instructor.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{instructor.courses} courses</span>
                      <span>{instructor.students} students</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {instructor.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      Rs. {(instructor.earnings / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category) => {
                const maxCategoryRevenue = Math.max(...categoryStats.map((c) => c.revenue));
                const percentage = (category.revenue / maxCategoryRevenue) * 100;
                return (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.courses} courses
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {category.students} students
                        </span>
                        <span className="font-semibold text-green-600">
                          Rs. {(category.revenue / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
