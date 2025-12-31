import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/lib/providers/QueryProvider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { NotificationProvider } from "@/lib/providers/NotificationProvider";

export const metadata = {
  title: "PadhaiHub - Nepal's #1 Online Learning Platform",
  description: "Quality education for SEE and +2 students across Nepal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <NotificationProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <AlertDialogProvider>
                  {children}
                  <Toaster />
                </AlertDialogProvider>
              </ThemeProvider>
            </NotificationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
