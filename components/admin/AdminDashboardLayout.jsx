"use client";

import { DesktopAdminSidebar, MobileAdminSidebar } from "./AdminSidebar";
import { Shield } from "lucide-react";
import { ProtectedRoute } from "@/components/auth";
import { NotificationBell } from "@/components/notifications";
import { useAuth } from "@/lib/providers/AuthProvider";

export default function AdminDashboardLayout({ children }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <DesktopAdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - Both Mobile and Desktop */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
            {/* Left side */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <MobileAdminSidebar />
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
              </div>
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
                  <span className="text-sm font-medium text-muted-foreground">
                    {user.firstname}
                  </span>
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
