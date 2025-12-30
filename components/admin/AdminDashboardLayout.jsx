"use client";

import { DesktopAdminSidebar, MobileAdminSidebar } from "./AdminSidebar";
import { Shield } from "lucide-react";
import { ProtectedRoute } from "@/components/auth";

export default function AdminDashboardLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <DesktopAdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b bg-background">
            <MobileAdminSidebar />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
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
