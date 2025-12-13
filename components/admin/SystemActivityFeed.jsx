"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  UserPlus,
  BookOpen,
  CreditCard,
  AlertCircle,
  CheckCircle,
  LogIn,
} from "lucide-react";

// Mock data
const activityLogs = [
  {
    id: 1,
    type: "user_registered",
    message: "New student registered: Aarav Sharma",
    timestamp: "5 mins ago",
    icon: UserPlus,
    iconColor: "text-green-500",
  },
  {
    id: 2,
    type: "payment",
    message: "Payment received: Rs. 2,999 for Web Dev course",
    timestamp: "15 mins ago",
    icon: CreditCard,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    type: "course_submitted",
    message: "New course submitted for review: Advanced React",
    timestamp: "1 hour ago",
    icon: BookOpen,
    iconColor: "text-orange-500",
  },
  {
    id: 4,
    type: "login",
    message: "Admin login from 192.168.1.1",
    timestamp: "2 hours ago",
    icon: LogIn,
    iconColor: "text-gray-500",
  },
  {
    id: 5,
    type: "course_approved",
    message: "Course approved: Flutter Development",
    timestamp: "3 hours ago",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  {
    id: 6,
    type: "error",
    message: "Payment gateway timeout - retry successful",
    timestamp: "4 hours ago",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
];

export default function SystemActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          System Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activityLogs.map((log) => {
            const Icon = log.icon;
            return (
              <div
                key={log.id}
                className="flex items-start gap-3 text-sm"
              >
                <div className={`mt-0.5 ${log.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2">{log.message}</p>
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/admin-dashboard/activity-logs">
          <Button variant="outline" className="w-full mt-4" size="sm">
            View All Logs
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
