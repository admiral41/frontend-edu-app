"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CreditCard, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data
const recentPayments = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    courseName: "Complete Web Development Bootcamp",
    amount: 2999,
    method: "eSewa",
    status: "completed",
    paidAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 2,
    studentName: "Priya Thapa",
    courseName: "React.js Masterclass",
    amount: 1999,
    method: "Khalti",
    status: "completed",
    paidAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 3,
    studentName: "Bikash Gurung",
    courseName: "Node.js Backend Development",
    amount: 2499,
    method: "eSewa",
    status: "pending",
    paidAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: 4,
    studentName: "Sita Rai",
    courseName: "Complete Web Development Bootcamp",
    amount: 2999,
    method: "Bank Transfer",
    status: "completed",
    paidAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
];

export default function RecentPayments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Recent Payments
        </CardTitle>
        <Link href="/admin-dashboard/payments">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentPayments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {payment.studentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{payment.studentName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {payment.courseName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold">Rs. {payment.amount.toLocaleString()}</p>
              <div className="flex items-center gap-1 justify-end">
                <Badge
                  variant={payment.status === "completed" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {payment.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
