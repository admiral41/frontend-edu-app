"use client";

import { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  UserPlus,
  Search,
  Eye,
  Check,
  X,
  FileText,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Download,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

// Mock data
const applicationsData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh.kumar@email.com",
    phone: "9861234567",
    education: "Bachelor's in Computer Science",
    university: "Tribhuvan University",
    experience: "5 years",
    expertise: ["Web Development", "JavaScript", "React"],
    currentJob: "Senior Developer at Tech Company",
    teachingLevel: "Intermediate to Advanced",
    subjects: "Web Development, JavaScript, React, Node.js",
    whyTeach: "I want to share my industry experience with students and help them build practical skills.",
    cvUrl: "/uploads/cv-ramesh.pdf",
    certificatesUrl: "/uploads/certs-ramesh.pdf",
    appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "pending",
  },
  {
    id: 2,
    name: "Sunita Adhikari",
    email: "sunita.adhikari@email.com",
    phone: "9871234567",
    education: "Master's in Data Science",
    university: "Kathmandu University",
    experience: "3 years",
    expertise: ["Data Science", "Python", "Machine Learning"],
    currentJob: "Data Scientist at Analytics Firm",
    teachingLevel: "Beginner to Intermediate",
    subjects: "Python, Data Science, Machine Learning, Statistics",
    whyTeach: "Teaching has always been my passion. I want to make data science accessible to everyone.",
    cvUrl: "/uploads/cv-sunita.pdf",
    certificatesUrl: "/uploads/certs-sunita.pdf",
    appliedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: "pending",
  },
  {
    id: 3,
    name: "Prakash Shrestha",
    email: "prakash.shrestha@email.com",
    phone: "9881234567",
    education: "Bachelor's in Software Engineering",
    university: "Pokhara University",
    experience: "4 years",
    expertise: ["Mobile Development", "Flutter", "Dart"],
    currentJob: "Mobile Developer at Startup",
    teachingLevel: "All Levels",
    subjects: "Flutter, Dart, Mobile App Development",
    whyTeach: "I believe mobile development is the future and I want to train the next generation of app developers.",
    cvUrl: "/uploads/cv-prakash.pdf",
    certificatesUrl: null,
    appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "pending",
  },
];

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [applicationToReject, setApplicationToReject] = useState(null);

  const filteredApplications = applicationsData.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApprove = (applicationId) => {
    toast.success("Application approved! Instructor account created.");
    setSelectedApplication(null);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }
    toast.success("Application rejected. Applicant will be notified.");
    setIsRejectDialogOpen(false);
    setRejectReason("");
    setApplicationToReject(null);
    setSelectedApplication(null);
  };

  const openRejectDialog = (application) => {
    setApplicationToReject(application);
    setIsRejectDialogOpen(true);
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Instructor Applications
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Review and process instructor applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">
                {applicationsData.filter((a) => a.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">0</p>
              <p className="text-sm text-muted-foreground">Approved Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-500">0</p>
              <p className="text-sm text-muted-foreground">Rejected Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or expertise..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No applications found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "No pending applications at the moment"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <Avatar className="h-16 w-16 shrink-0">
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {application.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{application.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {application.email}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {application.expertise.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>{application.education}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{application.experience} experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{application.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(application.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openRejectDialog(application)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Application Details Dialog */}
        <Dialog
          open={!!selectedApplication}
          onOpenChange={() => setSelectedApplication(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6 mt-4">
                {/* Personal Info */}
                <div>
                  <h4 className="font-semibold mb-3">Personal Information</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Full Name:</span>
                      <p className="font-medium">{selectedApplication.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Applied:</span>
                      <p className="font-medium">
                        {format(selectedApplication.appliedAt, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="font-semibold mb-3">Education</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Degree:</span>
                      <p className="font-medium">{selectedApplication.education}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">University:</span>
                      <p className="font-medium">{selectedApplication.university}</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-semibold mb-3">Experience</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Years of Experience:</span>
                      <p className="font-medium">{selectedApplication.experience}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Position:</span>
                      <p className="font-medium">{selectedApplication.currentJob}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teaching Level:</span>
                      <p className="font-medium">{selectedApplication.teachingLevel}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Subjects:</span>
                      <p className="font-medium">{selectedApplication.subjects}</p>
                    </div>
                  </div>
                </div>

                {/* Why Teach */}
                <div>
                  <h4 className="font-semibold mb-3">Why do you want to teach?</h4>
                  <p className="text-sm">{selectedApplication.whyTeach}</p>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-semibold mb-3">Documents</h4>
                  <div className="flex gap-2">
                    {selectedApplication.cvUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download CV
                      </Button>
                    )}
                    {selectedApplication.certificatesUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download Certificates
                      </Button>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedApplication.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Application
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => openRejectDialog(selectedApplication)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                Please provide a reason for rejecting this application. The
                applicant will be notified via email.
              </p>
              <div className="space-y-2">
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter the reason for rejection..."
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleReject}
                >
                  Reject Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
