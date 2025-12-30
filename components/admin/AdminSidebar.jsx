"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  CreditCard,
  Wallet,
  BarChart3,
  Megaphone,
  Activity,
  Settings,
  User,
  LogOut,
  Menu,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";
import { useAuth } from "@/lib/providers/AuthProvider";

const navItems = [
  { href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin-dashboard/users", label: "Users", icon: Users },
  { href: "/admin-dashboard/users/applications", label: "Applications", icon: UserPlus },
  { href: "/admin-dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/admin-dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/admin-dashboard/payments/payouts", label: "Payouts", icon: Wallet },
  { href: "/admin-dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin-dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin-dashboard/activity-logs", label: "Activity Logs", icon: Activity },
  { href: "/admin-dashboard/settings", label: "Settings", icon: Settings },
  { href: "/admin-dashboard/profile", label: "Profile", icon: User },
];

function NavLink({ href, label, icon: Icon, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href ||
    (href !== "/admin-dashboard" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
        isActive
          ? "text-primary font-semibold bg-primary/5"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function SidebarContent({ onLinkClick }) {
  const { showAlert } = useAlertDialog();
  const { logout } = useAuth();

  const handleLogout = () => {
    showAlert({
      title: "Logout",
      description:
        "Are you sure you want to logout? You'll need to login again to access the admin panel.",
      confirmText: "Logout",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        logout();
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">PadhaiHub</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} onClick={onLinkClick} />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function MobileAdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-56">
        <SheetHeader className="sr-only">
          <SheetTitle>Admin Navigation Menu</SheetTitle>
        </SheetHeader>
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopAdminSidebar() {
  return (
    <aside className="hidden lg:flex w-56 border-r sticky top-0 h-screen">
      <SidebarContent />
    </aside>
  );
}
