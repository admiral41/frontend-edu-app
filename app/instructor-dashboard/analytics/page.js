"use client";

import { useState } from "react";
import InstructorDashboardLayout from "@/components/instructor/InstructorDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data
const statsData = {
  totalStudents: 245,
  studentsChange: 12,
  totalRevenue: 73500,
  revenueChange: 15,
  avgRating: 4.7,
  ratingChange: 0.2,
  totalViews: 1250,
  viewsChange: -5,
};

const coursePerformance = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    students: 156,
    revenue: 45000,
    rating: 4.8,
    completionRate: 68,
  },
  {
    id: 2,
    title: "React.js Masterclass",
    students: 89,
    revenue: 28500,
    rating: 4.6,
    completionRate: 72,
  },
];

const recentEnrollments = [
  { date: "Dec 13", count: 5 },
  { date: "Dec 12", count: 8 },
  { date: "Dec 11", count: 3 },
  { date: "Dec 10", count: 6 },
  { date: "Dec 9", count: 4 },
  { date: "Dec 8", count: 7 },
  { date: "Dec 7", count: 9 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30days");

  const StatCard = ({ title, value, change, icon: Icon, prefix = "" }) => {
    const isPositive = change >= 0;
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(change)}%
            </div>
          </div>
          <p className="text-2xl font-bold">
            {prefix}
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <InstructorDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track your performance and engagement
            </p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Students"
            value={statsData.totalStudents}
            change={statsData.studentsChange}
            icon={Users}
          />
          <StatCard
            title="Total Revenue"
            value={statsData.totalRevenue}
            change={statsData.revenueChange}
            icon={DollarSign}
            prefix="Rs. "
          />
          <StatCard
            title="Avg. Rating"
            value={statsData.avgRating}
            change={statsData.ratingChange}
            icon={Star}
          />
          <StatCard
            title="Course Views"
            value={statsData.totalViews}
            change={statsData.viewsChange}
            icon={Eye}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enrollment Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {recentEnrollments.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors"
                      style={{
                        height: `${(day.count / 10) * 100}%`,
                        minHeight: "20px",
                      }}
                    >
                      <div
                        className="w-full bg-primary rounded-t"
                        style={{ height: `${(day.count / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {day.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Course */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coursePerformance.map((course) => {
                const percentage = Math.round(
                  (course.revenue / statsData.totalRevenue) * 100
                );
                return (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate font-medium">{course.title}</span>
                      <span className="text-muted-foreground">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Rs. {course.revenue.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Course Performance Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Course</th>
                    <th className="text-center py-3 px-4 font-medium">Students</th>
                    <th className="text-center py-3 px-4 font-medium">Revenue</th>
                    <th className="text-center py-3 px-4 font-medium">Rating</th>
                    <th className="text-center py-3 px-4 font-medium">
                      Completion Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coursePerformance.map((course) => (
                    <tr key={course.id} className="border-b last:border-0">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{course.title}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">{course.students}</td>
                      <td className="text-center py-4 px-4">
                        Rs. {course.revenue.toLocaleString()}
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                          <span className="text-sm">{course.completionRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorDashboardLayout>
  );
}
