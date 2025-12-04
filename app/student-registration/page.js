"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    level: "",
    stream: "",
    school: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords are the same"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters"
      });
      return;
    }

    toast.success("Registration Successful!", {
      description: "Welcome to PadhaiHub!"
    });
    console.log("Student Registration:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="reg-pattern"
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
          <rect width="100%" height="100%" fill="url(#reg-pattern)" />
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
            <CardTitle className="text-3xl">Student Registration</CardTitle>
            <CardDescription className="text-base">
              Register now to start your learning journey with PadhaiHub
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

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Academic Information</h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Current Level *</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => handleChange("level", value)}
                    >
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="see">SEE (Class 10)</SelectItem>
                        <SelectItem value="plus2">+2 (Grade 11-12)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stream">
                      Stream {formData.level === "plus2" && "*"}
                    </Label>
                    <Select
                      value={formData.stream}
                      onValueChange={(value) => handleChange("stream", value)}
                      disabled={formData.level !== "plus2"}
                    >
                      <SelectTrigger id="stream">
                        <SelectValue placeholder={formData.level === "plus2" ? "Select stream" : "Select level first"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="humanities">Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school">School/College Name *</Label>
                    <Input
                      id="school"
                      placeholder="Enter your school/college name"
                      value={formData.school}
                      onChange={(e) => handleChange("school", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Create Password</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password (min 6 characters)"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center gap-3 pt-4">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleChange("agreeTerms", checked)}
                  required
                  className="mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer leading-normal">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Complete Registration
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
