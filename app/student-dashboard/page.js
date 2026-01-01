"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import EnrolledModules from "@/components/dashboard/EnrolledModules";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Announcements from "@/components/dashboard/Announcements";
import LiveClasses from "@/components/dashboard/LiveClasses";
import Assignments from "@/components/dashboard/Assignments";
import { BookOpen, Clock, Trophy, TrendingUp } from "lucide-react";
import { useUser } from "@/lib/hooks/useAuth";

export default function StudentDashboard() {
  const { data: user } = useUser();
  const firstName = user?.firstname || "Student";

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your progress and continue learning
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatsCard
            icon={BookOpen}
            label="Enrolled Courses"
            value="3"
            trend="+1"
          />
          <StatsCard
            icon={Clock}
            label="Study Hours"
            value="24.5"
            trend="+2.5"
          />
          <StatsCard
            icon={Trophy}
            label="Achievements"
            value="12"
            trend="+3"
          />
          <StatsCard
            icon={TrendingUp}
            label="Avg. Progress"
            value="62%"
            trend="+5%"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Takes 2/3 on large screens */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <LiveClasses />
            <Assignments />
            <EnrolledModules />
          </div>

          {/* Right Column - Takes 1/3 on large screens */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <Announcements />
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
