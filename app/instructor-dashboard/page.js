"use client";

import InstructorDashboardLayout from "@/components/instructor/InstructorDashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import InstructorCoursesList from "@/components/instructor/InstructorCoursesList";
import RecentEnrollments from "@/components/instructor/RecentEnrollments";
import UpcomingClasses from "@/components/instructor/UpcomingClasses";
import PendingAssignments from "@/components/instructor/PendingAssignments";
import InstructorAnnouncements from "@/components/instructor/InstructorAnnouncements";
import { BookOpen, Users, DollarSign, Star } from "lucide-react";
import { useUser } from "@/lib/hooks/useAuth";

export default function InstructorDashboard() {
  const { data: user } = useUser();
  const firstName = user?.firstname || "Instructor";

  return (
    <InstructorDashboardLayout>
      {/* Main Content */}
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your courses and track student progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatsCard
            icon={BookOpen}
            label="Total Courses"
            value="3"
            trend="+1"
          />
          <StatsCard
            icon={Users}
            label="Total Students"
            value="245"
            trend="+12"
          />
          <StatsCard
            icon={DollarSign}
            label="Revenue"
            value="Rs. 73,500"
            trend="+Rs. 8,500"
          />
          <StatsCard
            icon={Star}
            label="Avg. Rating"
            value="4.7"
            trend="+0.2"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Takes 2/3 on large screens */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <InstructorCoursesList />
            <PendingAssignments />
            <UpcomingClasses />
          </div>

          {/* Right Column - Takes 1/3 on large screens */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <InstructorAnnouncements />
            <RecentEnrollments />
          </div>
        </div>
      </div>
    </InstructorDashboardLayout>
  );
}
