import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/lib/providers/QueryProvider";

export const metadata = {
  title: "PadhaiHub - Nepal's #1 Online Learning Platform",
  description: "Quality education for SEE and +2 students across Nepal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <QueryProvider>
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
        </QueryProvider>
      </body>
    </html>
  );
}
