"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Edit,
  Save,
  X,
  CreditCard,
  CheckCircle2,
  Eye,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@example.com",
    phone: "+977 9812345678",
    address: "Kathmandu, Nepal",
    grade: "SEE",
    enrolledDate: "January 15, 2024",
  });

  // Enrolled courses with payment info
  const enrolledCourses = [
    {
      id: 1,
      title: "Mathematics - Algebra",
      category: "SEE",
      amount: 5000,
      paymentDate: "2024-01-15",
      paymentMethod: "eSewa",
      status: "verified",
      receipt: "receipt_math_esewa_12345.jpg",
    },
    {
      id: 2,
      title: "Physics - Mechanics",
      category: "SEE",
      amount: 5500,
      paymentDate: "2024-01-20",
      paymentMethod: "Khalti",
      status: "verified",
      receipt: "receipt_physics_khalti_67890.jpg",
    },
    {
      id: 3,
      title: "Chemistry - Organic Chemistry",
      category: "+2",
      amount: 6000,
      paymentDate: "2023-12-10",
      paymentMethod: "eSewa",
      status: "verified",
      receipt: "receipt_chemistry_esewa_54321.jpg",
    },
  ];

  const totalSpent = enrolledCourses.reduce(
    (sum, course) => sum + course.amount,
    0
  );

  const handleSave = () => {
    // API call to save profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>

                <h2 className="text-xl font-semibold mb-1">
                  {formData.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {formData.email}
                </p>

                <Badge variant="secondary" className="mb-4">
                  {formData.grade} Student
                </Badge>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Member since {formData.enrolledDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Grade */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Grade/Class
                </Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {enrolledCourses.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Enrolled Courses
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-info mb-1">125</div>
              <div className="text-xs text-muted-foreground">
                Lessons Completed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success mb-1">1</div>
              <div className="text-xs text-muted-foreground">
                Courses Completed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning mb-1">
                NPR {totalSpent.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses & Payment */}
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Enrolled Courses & Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        {course.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        NPR {course.amount.toLocaleString()}
                      </div>
                      {course.status === "verified" ? (
                        <Badge
                          variant="outline"
                          className="text-xs mt-1 text-success border-success"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs mt-1 text-warning border-warning"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Payment Date:</span>{" "}
                        {course.paymentDate}
                      </div>
                      <div>
                        <span className="font-medium">Method:</span>{" "}
                        {course.paymentMethod}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast.info("Receipt", {
                          description: `Viewing receipt: ${course.receipt}`,
                        })
                      }
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
