"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

export default function InstructorApplication() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    education: "",
    university: "",
    major: "",
    yearsOfExperience: "",
    currentEmployment: "",
    subjectsToTeach: [],
    teachingLevel: "",
    availability: "",
    cv: null,
    certificates: null,
    whyTeach: "",
    agreeTerms: false,
  });

  const subjects = [
    "Mathematics",
    "English",
    "Nepali",
    "Science",
    "Social Studies",
    "Optional Math",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Accountancy",
    "Economics",
    "Business Studies",
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjectsToTeach: prev.subjectsToTeach.includes(subject)
        ? prev.subjectsToTeach.filter((s) => s !== subject)
        : [...prev.subjectsToTeach, subject],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Instructor Application:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="instructor-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"
                fill="white"
                fillOpacity="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#instructor-pattern)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 md:h-12 md:w-12 hover:scale-110 transition-transform">
              <Image
                src="/images/padhaihub_logo.png"
                alt="PadhaiHub Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-white">PadhaiHub</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Become an Instructor</CardTitle>
            <CardDescription className="text-base">
              Join our team of expert educators and help students achieve their goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleChange("gender", value)}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      placeholder="City, District"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Educational Background */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Educational Background</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">Highest Education *</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(value) => handleChange("education", value)}
                    >
                      <SelectTrigger id="education">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">University/College *</Label>
                    <Input
                      id="university"
                      placeholder="University name"
                      value={formData.university}
                      onChange={(e) => handleChange("university", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major/Specialization *</Label>
                  <Input
                    id="major"
                    placeholder="e.g., Mathematics, Physics, English Literature"
                    value={formData.major}
                    onChange={(e) => handleChange("major", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Teaching Experience */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Teaching Experience</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Teaching Experience *</Label>
                    <Select
                      value={formData.yearsOfExperience}
                      onValueChange={(value) => handleChange("yearsOfExperience", value)}
                    >
                      <SelectTrigger id="yearsOfExperience">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentEmployment">Current Employment Status *</Label>
                    <Select
                      value={formData.currentEmployment}
                      onValueChange={(value) => handleChange("currentEmployment", value)}
                    >
                      <SelectTrigger id="currentEmployment">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime-teacher">Full-time Teacher</SelectItem>
                        <SelectItem value="parttime-teacher">Part-time Teacher</SelectItem>
                        <SelectItem value="freelance">Freelance Educator</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teachingLevel">Preferred Teaching Level *</Label>
                  <Select
                    value={formData.teachingLevel}
                    onValueChange={(value) => handleChange("teachingLevel", value)}
                  >
                    <SelectTrigger id="teachingLevel">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="see">SEE (Class 10)</SelectItem>
                      <SelectItem value="plus2">+2 (Grade 11-12)</SelectItem>
                      <SelectItem value="both">Both SEE and +2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subjects You Can Teach * (Select all that apply)</Label>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center gap-2">
                        <Checkbox
                          id={subject}
                          checked={formData.subjectsToTeach.includes(subject)}
                          onCheckedChange={() => handleSubjectToggle(subject)}
                        />
                        <Label htmlFor={subject} className="cursor-pointer text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability *</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => handleChange("availability", value)}
                  >
                    <SelectTrigger id="availability">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time (40+ hrs/week)</SelectItem>
                      <SelectItem value="parttime">Part-time (20-40 hrs/week)</SelectItem>
                      <SelectItem value="flexible">Flexible (less than 20 hrs/week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Documents</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cv">Upload CV/Resume *</Label>
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleChange("cv", e.target.files[0])}
                      required
                    />
                    <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificates">Educational Certificates</Label>
                    <Input
                      id="certificates"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleChange("certificates", e.target.files)}
                    />
                    <p className="text-xs text-muted-foreground">PDF or Images (Max 10MB total)</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="whyTeach">Why do you want to teach at PadhaiHub? *</Label>
                  <Textarea
                    id="whyTeach"
                    placeholder="Tell us about your teaching philosophy and why you'd like to join PadhaiHub..."
                    rows={5}
                    value={formData.whyTeach}
                    onChange={(e) => handleChange("whyTeach", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 pt-4">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleChange("agreeTerms", checked)}
                  required
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and confirm that all information provided is accurate
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Submit Application
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                We'll review your application and get back to you within 3-5 business days
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
