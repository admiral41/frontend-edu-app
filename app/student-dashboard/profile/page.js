"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
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
  Users,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@example.com",
    phone: "+977 9812345678",
    dateOfBirth: new Date(2008, 4, 15), // May 15, 2008
    gender: "Male",
    address: "Kathmandu, Nepal",
    currentLevel: "SEE",
    stream: "",
    schoolName: "Kathmandu Secondary School",
    enrolledDate: "January 15, 2024",
  });

  const [parentData, setParentData] = useState({
    fatherName: "Kumar Sharma",
    fatherPhone: "+977 9801234567",
    motherName: "Sita Sharma",
    motherPhone: "+977 9807654321",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
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

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-12 w-12 text-primary" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold mb-1">
                  {formData.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {formData.email}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <Badge variant="secondary">
                    {formData.currentLevel} Student
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Member since {formData.enrolledDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="parent">Parent/Guardian</TabsTrigger>
            <TabsTrigger value="payment">Payment Info</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="mt-6">
            <Card>
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Date of Birth
                    </Label>
                    <DatePicker
                      date={formData.dateOfBirth}
                      onSelect={(date) =>
                        setFormData({ ...formData, dateOfBirth: date })
                      }
                      placeholder="Pick a date"
                      buttonDisabled={!isEditing}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-sm mb-4">Academic Information</h3>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentLevel" className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          Current Level <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.currentLevel}
                          onValueChange={(value) => {
                            setFormData({
                              ...formData,
                              currentLevel: value,
                              stream: "" // Reset stream when level changes
                            });
                          }}
                          disabled={!isEditing}
                        >
                          <SelectTrigger id="currentLevel">
                            <SelectValue placeholder="Select your level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SEE">SEE</SelectItem>
                            <SelectItem value="+2">+2 (Higher Secondary)</SelectItem>
                            <SelectItem value="Bachelor">Bachelor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.currentLevel === "+2" && (
                        <div className="space-y-2">
                          <Label htmlFor="stream">Stream</Label>
                          <Select
                            value={formData.stream}
                            onValueChange={(value) =>
                              setFormData({ ...formData, stream: value })
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger id="stream">
                              <SelectValue placeholder="Select stream" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Science">Science</SelectItem>
                              <SelectItem value="Management">Management</SelectItem>
                              <SelectItem value="Humanities">Humanities</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {formData.currentLevel === "Bachelor" && (
                        <div className="space-y-2">
                          <Label htmlFor="stream">Stream</Label>
                          <Select
                            value={formData.stream}
                            onValueChange={(value) =>
                              setFormData({ ...formData, stream: value })
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger id="stream">
                              <SelectValue placeholder="Select stream" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BBS">BBS (Business Studies)</SelectItem>
                              <SelectItem value="BCA">BCA (Computer Application)</SelectItem>
                              <SelectItem value="BSc">BSc (Science)</SelectItem>
                              <SelectItem value="BA">BA (Arts)</SelectItem>
                              <SelectItem value="BEd">BEd (Education)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="schoolName">
                        School/College Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="schoolName"
                        value={formData.schoolName}
                        onChange={(e) =>
                          setFormData({ ...formData, schoolName: e.target.value })
                        }
                        disabled={!isEditing}
                        placeholder="Enter your school or college name"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parent/Guardian Tab */}
          <TabsContent value="parent" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Parent/Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Father Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Father's Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Full Name</Label>
                      <Input
                        id="fatherName"
                        value={parentData.fatherName}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            fatherName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone">Phone Number</Label>
                      <Input
                        id="fatherPhone"
                        value={parentData.fatherPhone}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            fatherPhone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Mother Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Mother's Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motherName">Full Name</Label>
                      <Input
                        id="motherName"
                        value={parentData.motherName}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            motherName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherPhone">Phone Number</Label>
                      <Input
                        id="motherPhone"
                        value={parentData.motherPhone}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            motherPhone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Guardian Info (Optional) */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">
                    Guardian Information <span className="text-muted-foreground font-normal">(Optional)</span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Full Name</Label>
                      <Input
                        id="guardianName"
                        value={parentData.guardianName}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            guardianName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone">Phone Number</Label>
                      <Input
                        id="guardianPhone"
                        value={parentData.guardianPhone}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            guardianPhone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="guardianRelation">Relation</Label>
                      <Input
                        id="guardianRelation"
                        placeholder="e.g., Uncle, Aunt, etc."
                        value={parentData.guardianRelation}
                        onChange={(e) =>
                          setParentData({
                            ...parentData,
                            guardianRelation: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Info Tab */}
          <TabsContent value="payment" className="mt-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
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
                  <div className="text-xs text-muted-foreground">
                    Total Spent
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment History
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
