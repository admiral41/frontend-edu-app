"use client";

import { useState } from "react";
import InstructorDashboardLayout from "@/components/instructor/InstructorDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/ui/alert-dialog-provider";

export default function SettingsPage() {
  const { showAlert } = useAlertDialog();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailEnrollments: true,
    emailReviews: true,
    emailQuestions: true,
    emailMarketing: false,
    pushEnrollments: true,
    pushReviews: false,
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsChangingPassword(true);
    try {
      // API call will go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    // Auto-save notification preferences
    toast.success("Notification preferences updated");
  };

  const handleDeleteAccount = () => {
    showAlert({
      title: "Delete Account",
      description:
        "Are you sure you want to delete your account? This action cannot be undone. All your courses, students data, and earnings will be permanently deleted.",
      confirmText: "Delete Account",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        toast.error("Account deletion is not available in demo mode");
      },
    });
  };

  return (
    <InstructorDashboardLayout>
      <div className="px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what emails you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Enrollments</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a student enrolls in your course
                  </p>
                </div>
                <Switch
                  checked={notifications.emailEnrollments}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailEnrollments", checked)
                  }
                />
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Course Reviews</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive a new review
                  </p>
                </div>
                <Switch
                  checked={notifications.emailReviews}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailReviews", checked)
                  }
                />
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Student Questions</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when students ask questions
                  </p>
                </div>
                <Switch
                  checked={notifications.emailQuestions}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailQuestions", checked)
                  }
                />
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive tips and updates about teaching
                  </p>
                </div>
                <Switch
                  checked={notifications.emailMarketing}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailMarketing", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Manage your in-app notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Enrollments</p>
                  <p className="text-sm text-muted-foreground">
                    Show notification for new enrollments
                  </p>
                </div>
                <Switch
                  checked={notifications.pushEnrollments}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("pushEnrollments", checked)
                  }
                />
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Reviews</p>
                  <p className="text-sm text-muted-foreground">
                    Show notification for new reviews
                  </p>
                </div>
                <Switch
                  checked={notifications.pushReviews}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("pushReviews", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InstructorDashboardLayout>
  );
}
