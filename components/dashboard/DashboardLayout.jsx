"use client";

import { DesktopSidebar, MobileSidebar } from "./DashboardSidebar";
import { ProtectedRoute } from "@/components/auth";
import { NotificationBell } from "@/components/notifications";
import { useAuth } from "@/lib/providers/AuthProvider";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["LEARNER", "LECTURER", "ADMIN", "SUPERADMIN"]}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <MobileSidebar />
              </div>
              <h1 className="text-lg font-bold text-primary">PadhaiHub</h1>
            </div>

            {/* Right side - Notifications & User */}
            <div className="flex items-center gap-4">
              <NotificationBell />
              {user && (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {user.firstname?.[0]}{user.lastname?.[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
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
