import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle } from "lucide-react";

export default function EnrolledModules() {
  const modules = [
    {
      id: 1,
      title: "Mathematics - Algebra",
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      category: "SEE",
    },
    {
      id: 2,
      title: "Science - Physics",
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      category: "SEE",
    },
    {
      id: 3,
      title: "English Grammar",
      progress: 80,
      totalLessons: 10,
      completedLessons: 8,
      category: "+2",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Enrolled Modules
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="p-3 sm:p-4 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {module.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {module.completedLessons} of {module.totalLessons} lessons
                </p>
              </div>
              <Badge variant="secondary" className="text-xs shrink-0">
                {module.category}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-semibold">{module.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>

            <Link href={`/student-dashboard/courses/${module.id}`}>
              <Button size="sm" className="w-full sm:w-auto" variant="outline">
                <PlayCircle className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
