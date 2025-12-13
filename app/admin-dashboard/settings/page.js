"use client";

import { useState } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Save,
  Globe,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Palette,
  ChevronRight,
  Upload,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "PadhaiHub",
    tagline: "Learn. Grow. Succeed.",
    contactEmail: "contact@padhaihub.com",
    supportEmail: "support@padhaihub.com",
    phone: "+977 1-4444444",
    address: "Kathmandu, Nepal",
    description: "PadhaiHub is Nepal's premier online learning platform offering quality courses in technology, business, and creative fields.",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/padhaihub",
    instagram: "https://instagram.com/padhaihub",
    twitter: "https://twitter.com/padhaihub",
    linkedin: "https://linkedin.com/company/padhaihub",
    youtube: "https://youtube.com/padhaihub",
  });

  const [features, setFeatures] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    instructorApplications: true,
    courseReviews: true,
    refundRequests: true,
  });

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully!");
  };

  const handleSaveSocial = () => {
    toast.success("Social links saved successfully!");
  };

  const handleToggleFeature = (feature) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
    toast.success("Setting updated successfully!");
  };

  const settingsLinks = [
    {
      title: "Email Templates",
      description: "Customize email notifications sent to users",
      href: "/admin-dashboard/settings/email-templates",
      icon: Mail,
    },
    {
      title: "Payment Configuration",
      description: "Manage payment gateways and commission rates",
      href: "/admin-dashboard/settings/payment-config",
      icon: CreditCard,
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Configure platform settings and preferences
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {settingsLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic platform information and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  value={generalSettings.platformName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      platformName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={generalSettings.tagline}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      tagline: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={generalSettings.description}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
              <Button onClick={handleSaveGeneral} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Contact details displayed on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      contactEmail: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      supportEmail: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={generalSettings.phone}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={generalSettings.address}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <Button onClick={handleSaveGeneral} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>
                Links to your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(socialLinks).map(([platform, url]) => (
                <div key={platform} className="space-y-2">
                  <Label htmlFor={platform} className="capitalize">
                    {platform}
                  </Label>
                  <Input
                    id={platform}
                    value={url}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, [platform]: e.target.value })
                    }
                    placeholder={`https://${platform}.com/...`}
                  />
                </div>
              ))}
              <Button onClick={handleSaveSocial} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Feature Toggles
              </CardTitle>
              <CardDescription>
                Enable or disable platform features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {features.maintenanceMode && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                    Maintenance Mode
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Show maintenance page to all visitors
                  </p>
                </div>
                <Switch
                  checked={features.maintenanceMode}
                  onCheckedChange={() => handleToggleFeature("maintenanceMode")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New User Registrations</p>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register
                  </p>
                </div>
                <Switch
                  checked={features.newRegistrations}
                  onCheckedChange={() => handleToggleFeature("newRegistrations")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Instructor Applications</p>
                  <p className="text-sm text-muted-foreground">
                    Accept new instructor applications
                  </p>
                </div>
                <Switch
                  checked={features.instructorApplications}
                  onCheckedChange={() => handleToggleFeature("instructorApplications")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Course Reviews</p>
                  <p className="text-sm text-muted-foreground">
                    Allow students to review courses
                  </p>
                </div>
                <Switch
                  checked={features.courseReviews}
                  onCheckedChange={() => handleToggleFeature("courseReviews")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Refund Requests</p>
                  <p className="text-sm text-muted-foreground">
                    Allow students to request refunds
                  </p>
                </div>
                <Switch
                  checked={features.refundRequests}
                  onCheckedChange={() => handleToggleFeature("refundRequests")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
