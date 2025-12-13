"use client";

import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentPayments from "@/components/admin/RecentPayments";
import PendingApplications from "@/components/admin/PendingApplications";
import PendingCourses from "@/components/admin/PendingCourses";
import SystemActivityFeed from "@/components/admin/SystemActivityFeed";
import QuickActions from "@/components/admin/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, Activity, TrendingUp, TrendingDown } from "lucide-react";

// Mock revenue data for chart
const revenueData = [
  { day: "Mon", amount: 12500 },
  { day: "Tue", amount: 18200 },
  { day: "Wed", amount: 15800 },
  { day: "Thu", amount: 22000 },
  { day: "Fri", amount: 19500 },
  { day: "Sat", amount: 25000 },
  { day: "Sun", amount: 21000 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.amount));

export default function AdminDashboard() {
  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Platform overview and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatsCard
            icon={Users}
            label="Total Users"
            value="1,245"
            trend="+48"
          />
          <StatsCard
            icon={BookOpen}
            label="Total Courses"
            value="32"
            trend="+3"
          />
          <StatsCard
            icon={DollarSign}
            label="Revenue (Month)"
            value="Rs. 2.4L"
            trend="+18%"
          />
          <StatsCard
            icon={Activity}
            label="Active Today"
            value="156"
            trend="+12"
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Revenue Chart */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Revenue Overview (Last 7 Days)
                  </CardTitle>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+18%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between gap-2">
                  {revenueData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors relative group"
                        style={{
                          height: `${(item.amount / maxRevenue) * 100}%`,
                          minHeight: "20px",
                        }}
                      >
                        <div
                          className="w-full bg-primary rounded-t absolute bottom-0"
                          style={{ height: "100%" }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Rs. {(item.amount / 1000).toFixed(1)}K
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total This Week</p>
                    <p className="text-xl font-bold">Rs. 1,34,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Avg. Per Day</p>
                    <p className="text-xl font-bold">Rs. 19,143</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <RecentPayments />

            {/* Pending Courses */}
            <PendingCourses />
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Actions */}
            <QuickActions />

            {/* Pending Applications */}
            <PendingApplications />

            {/* System Activity Feed */}
            <SystemActivityFeed />
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
