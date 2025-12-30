"use client";

import { DesktopSidebar, MobileSidebar } from "./DashboardSidebar";
import { ProtectedRoute } from "@/components/auth";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["LEARNER", "LECTURER", "ADMIN", "SUPERADMIN"]}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b bg-background">
            <MobileSidebar />
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
