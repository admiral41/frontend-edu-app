"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { ArrowLeft, Eye, EyeOff, Loader2, Upload, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRegisterLecturer, useReapplyLecturer, useLecturerApplication } from "@/lib/hooks/useAuth";
import { useAuth } from "@/lib/providers/AuthProvider";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InstructorApplication() {
  const { user, isAuthenticated, isLoading: authLoading, updateUser } = useAuth();
  const registerMutation = useRegisterLecturer();
  const reapplyMutation = useReapplyLecturer();

  // Check if user is a rejected lecturer who can reapply
  const isRejectedLecturer = isAuthenticated &&
    user?.roles?.includes('LECTURER') &&
    user?.lecturerStatus === 'rejected';

  // Fetch existing application data for rejected users
  const {
    data: applicationData,
    isLoading: applicationLoading
  } = useLecturerApplication();

  // Determine if we're in reapplication mode
  const isReapplyMode = isRejectedLecturer;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: null,
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
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-fill form data for rejected users who are reapplying
  useEffect(() => {
    if (isReapplyMode && applicationData?.user) {
      const userData = applicationData.user;

      // Map experience back to select option
      const experienceReverseMap = {
        0: "0-1",
        1: "0-1",
        2: "1-3",
        3: "1-3",
        4: "3-5",
        5: "3-5",
        6: "5-10",
        7: "5-10",
        8: "5-10",
        9: "5-10",
        10: "5-10",
      };
      const getExperienceValue = (exp) => {
        if (exp >= 10) return "10+";
        return experienceReverseMap[exp] || "0-1";
      };

      // Map gender back to select option
      const genderReverseMap = {
        "Male": "male",
        "Female": "female",
        "Other": "other",
      };

      setFormData({
        fullName: `${userData.firstname || ""} ${userData.lastname || ""}`.trim(),
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        dateOfBirth: userData.dob ? new Date(userData.dob) : null,
        gender: genderReverseMap[userData.gender] || userData.gender?.toLowerCase() || "",
        education: userData.highestEducation || "",
        university: userData.universityCollege || "",
        major: userData.majorSpecialization || "",
        yearsOfExperience: getExperienceValue(userData.teachingExperience),
        currentEmployment: userData.employmentStatus || "",
        subjectsToTeach: userData.subjects || [],
        teachingLevel: userData.preferredLevel || "",
        availability: userData.availability || "",
        cv: null, // Can't pre-fill file inputs
        certificates: null,
        whyTeach: userData.teachingMotivation || "",
        password: "",
        confirmPassword: "",
        agreeTerms: true, // They already agreed when they first applied
      });
    }
  }, [isReapplyMode, applicationData]);

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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubjectToggle = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjectsToTeach: prev.subjectsToTeach.includes(subject)
        ? prev.subjectsToTeach.filter((s) => s !== subject)
        : [...prev.subjectsToTeach, subject],
    }));
    if (errors.subjectsToTeach) {
      setErrors((prev) => ({ ...prev, subjectsToTeach: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal info validation (not required in reapply mode since email is fixed)
    if (!isReapplyMode) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Educational background
    if (!formData.education) {
      newErrors.education = "Please select your highest education";
    }

    if (!formData.university.trim()) {
      newErrors.university = "University/College is required";
    }

    // Teaching experience
    if (!formData.teachingLevel) {
      newErrors.teachingLevel = "Please select your preferred teaching level";
    }

    if (formData.subjectsToTeach.length === 0) {
      newErrors.subjectsToTeach = "Please select at least one subject";
    }

    // Documents - CV required only for new applications (reapply can keep existing)
    if (!isReapplyMode && !formData.cv) {
      newErrors.cv = "CV/Resume is required";
    }

    // Motivation
    if (!formData.whyTeach.trim()) {
      newErrors.whyTeach = "Please tell us why you want to teach at PadhaiHub";
    } else if (formData.whyTeach.trim().length < 50) {
      newErrors.whyTeach = "Please provide at least 50 characters";
    }

    // Password validation - only required for new applications
    if (!isReapplyMode) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    // Terms agreement - only required for new applications
    if (!isReapplyMode && !formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if all mandatory fields are filled (for disabling submit button)
  const isFormComplete = () => {
    // Common required fields
    if (!formData.phone.trim()) return false;
    if (!formData.gender) return false;
    if (!formData.education) return false;
    if (!formData.university.trim()) return false;
    if (!formData.teachingLevel) return false;
    if (formData.subjectsToTeach.length === 0) return false;
    if (!formData.whyTeach.trim() || formData.whyTeach.trim().length < 50) return false;

    // Additional fields required only for new applications
    if (!isReapplyMode) {
      if (!formData.fullName.trim()) return false;
      if (!formData.email.trim()) return false;
      if (!formData.cv) return false;
      if (!formData.password || formData.password.length < 6) return false;
      if (!formData.confirmPassword || formData.password !== formData.confirmPassword) return false;
      if (!formData.agreeTerms) return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors", {
        description: "Some required fields are missing or invalid",
      });
      return;
    }

    // Map gender to backend expected format
    const genderMap = {
      male: "Male",
      female: "Female",
      other: "Other",
    };

    // Map years of experience to numeric value
    const experienceMap = {
      "0-1": 0,
      "1-3": 2,
      "3-5": 4,
      "5-10": 7,
      "10+": 12,
    };

    // Create FormData for multipart submission
    const formDataToSend = new FormData();

    if (isReapplyMode) {
      // Reapplication mode - only send updatable fields
      formDataToSend.append("phone", formData.phone.replace(/\s/g, ""));
      if (formData.dateOfBirth) {
        formDataToSend.append("dob", formData.dateOfBirth.toISOString());
      }
      formDataToSend.append("gender", genderMap[formData.gender] || formData.gender);
      formDataToSend.append("address", formData.address.trim());

      // Educational background
      formDataToSend.append("highestEducation", formData.education);
      formDataToSend.append("universityCollege", formData.university.trim());
      formDataToSend.append("majorSpecialization", formData.major.trim());

      // Teaching experience
      formDataToSend.append(
        "teachingExperience",
        experienceMap[formData.yearsOfExperience] || 0
      );
      formDataToSend.append("employmentStatus", formData.currentEmployment);
      formDataToSend.append("preferredLevel", formData.teachingLevel);
      formDataToSend.append("subjects", formData.subjectsToTeach.join(","));
      formDataToSend.append("availability", formData.availability);
      formDataToSend.append("teachingMotivation", formData.whyTeach.trim());

      // Files - optional for reapplication (keep existing if not provided)
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }
      if (formData.certificates) {
        Array.from(formData.certificates).forEach((cert) => {
          formDataToSend.append("certificates", cert);
        });
      }

      reapplyMutation.mutate(formDataToSend, {
        onSuccess: (data) => {
          // Update AuthProvider state with new lecturer status
          if (user) {
            updateUser({ ...user, lecturerStatus: 'pending' });
          }
        },
        onError: (error) => {
          // Handle server validation errors
          if (error.data?.err && Array.isArray(error.data.err)) {
            const serverErrors = {};
            error.data.err.forEach((err) => {
              const fieldMap = {
                highestEducation: "education",
                universityCollege: "university",
                majorSpecialization: "major",
                teachingExperience: "yearsOfExperience",
                employmentStatus: "currentEmployment",
                preferredLevel: "teachingLevel",
                teachingMotivation: "whyTeach",
                dob: "dateOfBirth",
              };
              const field = fieldMap[err.path] || err.path;
              serverErrors[field] = err.msg;
            });
            setErrors(serverErrors);
          }
        },
      });
    } else {
      // New application mode
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(" ");
      const firstname = nameParts[0];
      const lastname = nameParts.slice(1).join(" ") || "";

      // Personal info
      formDataToSend.append("email", formData.email.trim().toLowerCase());
      formDataToSend.append("password", formData.password);
      formDataToSend.append("firstname", firstname);
      formDataToSend.append("lastname", lastname);
      formDataToSend.append("phone", formData.phone.replace(/\s/g, ""));
      if (formData.dateOfBirth) {
        formDataToSend.append("dob", formData.dateOfBirth.toISOString());
      }
      formDataToSend.append("gender", genderMap[formData.gender] || formData.gender);
      formDataToSend.append("address", formData.address.trim());

      // Educational background
      formDataToSend.append("highestEducation", formData.education);
      formDataToSend.append("universityCollege", formData.university.trim());
      formDataToSend.append("majorSpecialization", formData.major.trim());

      // Teaching experience
      formDataToSend.append(
        "teachingExperience",
        experienceMap[formData.yearsOfExperience] || 0
      );
      formDataToSend.append("employmentStatus", formData.currentEmployment);
      formDataToSend.append("preferredLevel", formData.teachingLevel);
      formDataToSend.append("subjects", formData.subjectsToTeach.join(","));
      formDataToSend.append("availability", formData.availability);
      formDataToSend.append("teachingMotivation", formData.whyTeach.trim());

      // Files
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }
      if (formData.certificates) {
        Array.from(formData.certificates).forEach((cert) => {
          formDataToSend.append("certificates", cert);
        });
      }

      // Terms and Privacy Policy acceptance
      formDataToSend.append("termsAccepted", formData.agreeTerms);
      formDataToSend.append("privacyPolicyAccepted", formData.agreeTerms);

      registerMutation.mutate(formDataToSend, {
        onError: (error) => {
          // Handle server validation errors
          if (error.data?.err && Array.isArray(error.data.err)) {
            const serverErrors = {};
            error.data.err.forEach((err) => {
              const fieldMap = {
                firstname: "fullName",
                lastname: "fullName",
                highestEducation: "education",
                universityCollege: "university",
                majorSpecialization: "major",
                teachingExperience: "yearsOfExperience",
                employmentStatus: "currentEmployment",
                preferredLevel: "teachingLevel",
                teachingMotivation: "whyTeach",
                dob: "dateOfBirth",
              };
              const field = fieldMap[err.path] || err.path;
              serverErrors[field] = err.msg;
            });
            setErrors(serverErrors);
          }
        },
      });
    }
  };

  // Show loading while checking auth or loading application data
  if (authLoading || (isRejectedLecturer && applicationLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-secondary">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  const isSubmitting = isReapplyMode ? reapplyMutation.isPending : registerMutation.isPending;

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
            {isReapplyMode ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  <CardTitle className="text-3xl">Resubmit Application</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Update your information and submit your application again
                </CardDescription>
                <Alert className="mt-4 text-left">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your previous application was not approved. You can update your details below and resubmit.
                    Your existing CV will be kept unless you upload a new one.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <>
                <CardTitle className="text-3xl">Become an Instructor</CardTitle>
                <CardDescription className="text-base">
                  Join our team of expert educators and help students achieve their goals
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name {!isReapplyMode && "*"}</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className={errors.fullName ? "border-red-500" : ""}
                      disabled={isReapplyMode}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address {!isReapplyMode && "*"}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      disabled={isReapplyMode}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
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
                      onChange={(e) =>
                        handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <DatePicker
                      date={formData.dateOfBirth}
                      onSelect={(date) => handleChange("dateOfBirth", date)}
                      placeholder="Pick a date"
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
                      <SelectTrigger
                        id="gender"
                        className={errors.gender ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-sm text-red-500">{errors.gender}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="City, District"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
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
                      <SelectTrigger
                        id="education"
                        className={errors.education ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.education && (
                      <p className="text-sm text-red-500">{errors.education}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">University/College *</Label>
                    <Input
                      id="university"
                      placeholder="University name"
                      value={formData.university}
                      onChange={(e) => handleChange("university", e.target.value)}
                      className={errors.university ? "border-red-500" : ""}
                    />
                    {errors.university && (
                      <p className="text-sm text-red-500">{errors.university}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major/Specialization</Label>
                  <Input
                    id="major"
                    placeholder="e.g., Mathematics, Physics, English Literature"
                    value={formData.major}
                    onChange={(e) => handleChange("major", e.target.value)}
                  />
                </div>
              </div>

              {/* Teaching Experience */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Teaching Experience</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Teaching Experience</Label>
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
                    <Label htmlFor="currentEmployment">Current Employment Status</Label>
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
                    <SelectTrigger
                      id="teachingLevel"
                      className={errors.teachingLevel ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="see">SEE (Class 10)</SelectItem>
                      <SelectItem value="plus2">+2 (Grade 11-12)</SelectItem>
                      <SelectItem value="both">Both SEE and +2</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.teachingLevel && (
                    <p className="text-sm text-red-500">{errors.teachingLevel}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Subjects You Can Teach * (Select all that apply)</Label>
                  <div
                    className={`grid sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg ${
                      errors.subjectsToTeach ? "border-red-500" : ""
                    }`}
                  >
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
                  {errors.subjectsToTeach && (
                    <p className="text-sm text-red-500">{errors.subjectsToTeach}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
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
                    <Label htmlFor="cv">
                      Upload CV/Resume {!isReapplyMode && "*"}
                      {isReapplyMode && <span className="text-muted-foreground font-normal"> (Optional - keep existing)</span>}
                    </Label>
                    <div className="relative">
                      <Input
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleChange("cv", e.target.files[0])}
                        className={`h-auto py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer ${
                          errors.cv ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, or DOCX (Max 5MB)
                      {isReapplyMode && " - Leave empty to keep your previously uploaded CV"}
                    </p>
                    {formData.cv && (
                      <p className="text-xs text-green-600">Selected: {formData.cv.name}</p>
                    )}
                    {errors.cv && <p className="text-sm text-red-500">{errors.cv}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificates">Educational Certificates</Label>
                    <Input
                      id="certificates"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleChange("certificates", e.target.files)}
                      className="h-auto py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90 cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">PDF or Images (Max 10MB total)</p>
                    {formData.certificates && formData.certificates.length > 0 && (
                      <p className="text-xs text-green-600">
                        {formData.certificates.length} file(s) selected
                      </p>
                    )}
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
                    placeholder="Tell us about your teaching philosophy and why you'd like to join PadhaiHub... (minimum 50 characters)"
                    rows={5}
                    value={formData.whyTeach}
                    onChange={(e) => handleChange("whyTeach", e.target.value)}
                    className={errors.whyTeach ? "border-red-500" : ""}
                  />
                  <div className="flex justify-between">
                    {errors.whyTeach && (
                      <p className="text-sm text-red-500">{errors.whyTeach}</p>
                    )}
                    <p className={`text-xs ml-auto ${formData.whyTeach.length >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                      {formData.whyTeach.length}/50 characters minimum
                    </p>
                  </div>
                </div>
              </div>

              {/* Create Account Password - Only show for new applications */}
              {!isReapplyMode && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Create Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a password to access your account. You'll be able to log in
                    while your instructor application is being reviewed.
                  </p>

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
                          className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
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
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                      )}
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
                          className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
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
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions - Only show for new applications */}
              {!isReapplyMode && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleChange("agreeTerms", checked)}
                      className="shrink-0"
                    />
                    <Label htmlFor="terms" className="text-sm leading-normal cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and confirm that all information provided is accurate
                    </Label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-500 ml-8">{errors.agreeTerms}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !isFormComplete()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isReapplyMode ? "Resubmitting Application..." : "Submitting Application..."}
                  </>
                ) : (
                  <>
                    {isReapplyMode && <RefreshCw className="mr-2 h-4 w-4" />}
                    {isReapplyMode ? "Resubmit Application" : "Submit Application"}
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {isReapplyMode ? (
                  <>
                    Your application will be reviewed by our admin team.
                    <br />
                    <Link href="/instructor-dashboard/rejected" className="text-primary hover:underline font-medium">
                      Go back to status page
                    </Link>
                  </>
                ) : (
                  <>
                    We'll review your application and get back to you within 3-5 business days.
                    <br />
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </>
                )}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
