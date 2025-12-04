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
  BookOpen,
  Video,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student-dashboard/courses", label: "My Courses", icon: BookOpen },
  { href: "/student-dashboard/live-classes", label: "Live Classes", icon: Video },
  { href: "/student-dashboard/assignments", label: "Assignments", icon: FileText },
  { href: "/student-dashboard/progress", label: "Progress", icon: TrendingUp },
  { href: "/student-dashboard/profile", label: "Profile", icon: User },
  { href: "/student-dashboard/settings", label: "Settings", icon: Settings },
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
  return (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="px-4 py-5">
        <h2 className="text-xl font-bold text-primary">PadhaiHub</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Student Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} onClick={onLinkClick} />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t">
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-48">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex w-48 border-r sticky top-0 h-screen">
      <SidebarContent />
    </aside>
  );
}
