"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InstructorDashboardLayout from "@/components/instructor/InstructorDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Upload,
  Save,
  Eye,
  Globe,
  Plus,
  GripVertical,
  Edit,
  Trash2,
  Video,
  FileText,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Business",
  "Other",
];

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

// Mock course data
const mockCourse = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  description:
    "Learn HTML, CSS, JavaScript, React, Node.js and more. This comprehensive bootcamp will take you from beginner to professional web developer.",
  shortDescription: "Learn HTML, CSS, JavaScript, React, Node.js and more",
  category: "Web Development",
  level: "Beginner",
  price: "2999",
  language: "Nepali",
  status: "published",
  requirements: "Basic computer skills\nNo programming experience needed",
  objectives:
    "Build responsive websites\nMaster JavaScript fundamentals\nCreate full-stack applications\nDeploy projects to production",
  curriculum: [
    {
      id: 1,
      title: "Getting Started",
      lessons: [
        { id: 1, title: "Welcome to the Course", type: "video", duration: "5:30" },
        { id: 2, title: "Setting Up Your Environment", type: "video", duration: "12:45" },
        { id: 3, title: "Course Resources", type: "document", duration: null },
      ],
    },
    {
      id: 2,
      title: "HTML Fundamentals",
      lessons: [
        { id: 4, title: "Introduction to HTML", type: "video", duration: "15:20" },
        { id: 5, title: "HTML Tags and Elements", type: "video", duration: "20:10" },
        { id: 6, title: "HTML Practice Exercise", type: "document", duration: null },
      ],
    },
    {
      id: 3,
      title: "CSS Styling",
      lessons: [
        { id: 7, title: "CSS Basics", type: "video", duration: "18:30" },
        { id: 8, title: "Flexbox Layout", type: "video", duration: "25:00" },
      ],
    },
  ],
};

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    title: mockCourse.title,
    description: mockCourse.description,
    shortDescription: mockCourse.shortDescription,
    category: mockCourse.category,
    level: mockCourse.level,
    price: mockCourse.price,
    language: mockCourse.language,
    requirements: mockCourse.requirements,
    objectives: mockCourse.objectives,
  });
  const [curriculum, setCurriculum] = useState(mockCourse.curriculum);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call will go here
      toast.success("Course updated successfully!");
    } catch (error) {
      toast.error("Failed to update course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    try {
      toast.success("Course published successfully!");
    } catch (error) {
      toast.error("Failed to publish course.");
    }
  };

  return (
    <InstructorDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/instructor-dashboard/courses">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Edit Course</h1>
                <Badge
                  variant={mockCourse.status === "published" ? "default" : "secondary"}
                >
                  {mockCourse.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{formData.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/courses/${params.id}`}>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </Link>
            {mockCourse.status === "draft" && (
              <Button onClick={handlePublish}>
                <Globe className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shortDescription">Short Description</Label>
                        <Input
                          id="shortDescription"
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Full Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          rows={6}
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              handleSelectChange("category", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Level</Label>
                          <Select
                            value={formData.level}
                            onValueChange={(value) =>
                              handleSelectChange("level", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {levels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="objectives">Learning Objectives</Label>
                        <Textarea
                          id="objectives"
                          name="objectives"
                          rows={4}
                          value={formData.objectives}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          id="requirements"
                          name="requirements"
                          rows={3}
                          value={formData.requirements}
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Thumbnail</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course Curriculum</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {curriculum.map((section, sectionIndex) => (
                  <div
                    key={section.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 bg-muted/50">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <span className="font-medium flex-1">
                        Section {sectionIndex + 1}: {section.title}
                      </span>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="divide-y">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 p-3 pl-12 hover:bg-muted/30"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                          {lesson.type === "video" ? (
                            <PlayCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <FileText className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="flex-1 text-sm">{lesson.title}</span>
                          {lesson.duration && (
                            <span className="text-xs text-muted-foreground">
                              {lesson.duration}
                            </span>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <button className="flex items-center gap-2 p-3 pl-12 w-full text-sm text-muted-foreground hover:bg-muted/30">
                        <Plus className="h-4 w-4" />
                        Add Lesson
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Pricing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (NPR)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      handleSelectChange("language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nepali">Nepali</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Pricing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorDashboardLayout>
  );
}
