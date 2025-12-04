import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, PlayCircle, Trophy } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "completed",
      title: "Completed lesson: Linear Equations",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "started",
      title: "Started module: Physics - Motion",
      time: "5 hours ago",
      icon: PlayCircle,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned badge: 7-day streak!",
      time: "1 day ago",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "completed",
      title: "Completed quiz: English Grammar",
      time: "2 days ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex gap-3">
                <div className={`mt-0.5 ${activity.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
