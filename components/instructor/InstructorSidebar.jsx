"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  BookOpen,
  Video,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  User,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";
import { toast } from "sonner";

const navItems = [
  { href: "/instructor-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/instructor-dashboard/courses", label: "My Courses", icon: BookOpen },
  {
    href: "/instructor-dashboard/courses/new",
    label: "Create Course",
    icon: PlusCircle,
  },
  { href: "/instructor-dashboard/students", label: "Students", icon: Users },
  {
    href: "/instructor-dashboard/live-classes",
    label: "Live Classes",
    icon: Video,
  },
  {
    href: "/instructor-dashboard/assignments",
    label: "Assignments",
    icon: ClipboardList,
  },
  {
    href: "/instructor-dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  { href: "/instructor-dashboard/profile", label: "Profile", icon: User },
  { href: "/instructor-dashboard/settings", label: "Settings", icon: Settings },
];

function NavLink({ href, label, icon: Icon, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function SidebarContent({ onLinkClick }) {
  const router = useRouter();
  const { showAlert } = useAlertDialog();

  const handleLogout = () => {
    showAlert({
      title: "Logout",
      description:
        "Are you sure you want to logout? You'll need to login again to access your dashboard.",
      confirmText: "Logout",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        router.push("/login");
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="px-4 py-5">
        <h2 className="text-xl font-bold text-primary">PadhaiHub</h2>
        <p className="text-xs text-muted-foreground mt-1">Instructor Portal</p>
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

export function MobileInstructorSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-52">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopInstructorSidebar() {
  return (
    <aside className="hidden lg:flex w-52 border-r sticky top-0 h-screen">
      <SidebarContent />
    </aside>
  );
}
