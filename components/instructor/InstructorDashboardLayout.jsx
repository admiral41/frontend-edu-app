"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DesktopInstructorSidebar, MobileInstructorSidebar } from "./InstructorSidebar";
import { ProtectedRoute } from "@/components/auth";
import { useAuth } from "@/lib/providers/AuthProvider";
import { Loader2 } from "lucide-react";

export default function InstructorDashboardLayout({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Admins/Superadmins can access instructor dashboard regardless of lecturer status
      if (user.roles?.includes('ADMIN') || user.roles?.includes('SUPERADMIN')) {
        return;
      }

      // For lecturers, check their approval status
      if (user.roles?.includes('LECTURER')) {
        if (user.lecturerStatus === 'pending') {
          router.push('/instructor-dashboard/pending');
        } else if (user.lecturerStatus === 'rejected') {
          router.push('/instructor-dashboard/rejected');
        }
      }
    }
  }, [isLoading, user, router]);

  // Show loading while checking status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render dashboard for pending/rejected lecturers (redirect will happen)
  if (user?.roles?.includes('LECTURER') &&
      !user?.roles?.includes('ADMIN') &&
      !user?.roles?.includes('SUPERADMIN') &&
      user?.lecturerStatus !== 'approved') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["LECTURER", "ADMIN", "SUPERADMIN"]}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <DesktopInstructorSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b bg-background">
            <MobileInstructorSidebar />
            <h1 className="text-lg font-bold text-primary">PadhaiHub</h1>
          </header>

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
