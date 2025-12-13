"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

// Mock data
const pendingApplications = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh.kumar@email.com",
    expertise: "Web Development, JavaScript",
    experience: "5 years",
    appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: "Sunita Adhikari",
    email: "sunita.adhikari@email.com",
    expertise: "Data Science, Python",
    experience: "3 years",
    appliedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: 3,
    name: "Prakash Shrestha",
    email: "prakash.shrestha@email.com",
    expertise: "Mobile Development, Flutter",
    experience: "4 years",
    appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export default function PendingApplications() {
  const handleQuickApprove = (id) => {
    toast.success("Application approved!");
  };

  const handleQuickReject = (id) => {
    toast.success("Application rejected.");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Instructor Applications
          </CardTitle>
          <Badge variant="secondary">{pendingApplications.length} pending</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingApplications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No pending applications
          </p>
        ) : (
          <>
            {pendingApplications.slice(0, 3).map((application) => (
              <div
                key={application.id}
                className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {application.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{application.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {application.expertise}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {application.experience} · Applied{" "}
                      {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleQuickApprove(application.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleQuickReject(application.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
            <Link href="/admin-dashboard/users/applications">
              <Button variant="outline" className="w-full" size="sm">
                View All Applications
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
