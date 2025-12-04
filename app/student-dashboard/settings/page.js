"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Lock,
  Mail,
  Bell,
  Globe,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountSettings, setAccountSettings] = useState({
    email: "rajesh.sharma@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNewCourses: true,
    emailLiveClasses: true,
    emailAnnouncements: true,
    pushNotifications: false,
    smsAlerts: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSaveAccountSettings = (e) => {
    e.preventDefault();

    if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (accountSettings.newPassword && accountSettings.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    toast.success("Account settings updated successfully!");
    // Reset password fields
    setAccountSettings({
      ...accountSettings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Update your email and password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccountSettings} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) =>
                      setAccountSettings({ ...accountSettings, email: e.target.value })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Change Password</h4>

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={accountSettings.currentPassword}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, currentPassword: e.target.value })
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password (min 6 characters)"
                        value={accountSettings.newPassword}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, newPassword: e.target.value })
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter new password"
                        value={accountSettings.confirmPassword}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, confirmPassword: e.target.value })
                        }
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

                <Button type="submit" className="w-full sm:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNewCourses">New Courses</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when new courses are available
                  </p>
                </div>
                <Switch
                  id="emailNewCourses"
                  checked={notifications.emailNewCourses}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailNewCourses: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailLiveClasses">Live Classes</Label>
                  <p className="text-xs text-muted-foreground">
                    Reminders for upcoming live classes
                  </p>
                </div>
                <Switch
                  id="emailLiveClasses"
                  checked={notifications.emailLiveClasses}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailLiveClasses: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailAnnouncements">Announcements</Label>
                  <p className="text-xs text-muted-foreground">
                    Important updates and announcements
                  </p>
                </div>
                <Switch
                  id="emailAnnouncements"
                  checked={notifications.emailAnnouncements}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailAnnouncements: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Browser push notifications
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, pushNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsAlerts">SMS Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    Important alerts via SMS
                  </p>
                </div>
                <Switch
                  id="smsAlerts"
                  checked={notifications.smsAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, smsAlerts: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveNotifications} className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                {mounted ? (
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select disabled>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Loading..." />
                    </SelectTrigger>
                  </Select>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Theme changes apply immediately
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
