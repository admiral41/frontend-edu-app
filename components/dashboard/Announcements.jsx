"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertCircle, Info, Megaphone, Check } from "lucide-react";
import { toast } from "sonner";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      type: "urgent",
      title: "Exam Schedule Released",
      message: "SEE trial exam will be held on Dec 15-20. Check your email for details.",
      date: "Today",
      icon: AlertCircle,
      variant: "destructive",
    },
    {
      id: 2,
      type: "notice",
      title: "Holiday Notice",
      message: "Classes will remain closed on Dec 25-26 for Christmas holidays.",
      date: "Yesterday",
      icon: Bell,
      variant: "secondary",
    },
    {
      id: 3,
      type: "announcement",
      title: "New Course Available",
      message: "Advanced Mathematics course is now available for +2 students.",
      date: "2 days ago",
      icon: Megaphone,
      variant: "default",
    },
    {
      id: 4,
      type: "info",
      title: "Study Material Updated",
      message: "New practice questions added to Physics module.",
      date: "3 days ago",
      icon: Info,
      variant: "outline",
    },
  ]);

  const handleMarkAsRead = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
    toast.success("Marked as read");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notices & Announcements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">No new announcements</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`mt-0.5 shrink-0 ${
                      item.variant === "destructive" ? "text-destructive" :
                      item.variant === "default" ? "text-primary" :
                      "text-muted-foreground"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
                          {item.title}
                        </h4>
                        <Badge variant={item.variant} className="text-xs shrink-0">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-1">
                        {item.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleMarkAsRead(item.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
